import { Inter } from "@next/font/google";
import { Box } from "@mui/system";
import { Button, Grid, Input, TextField } from "@mui/material";
import Notifications from "@/components/Notifications/Notification";
import Messages from "@/components/Messages/Message";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import VendorNavbar from "@/components/Navabar/VendorNavbar";
import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";
import { useDispatch, useSelector } from "react-redux";
import { vendorDetails } from "@/redux/vendor";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { storage } from "@/firebase/config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { VendorisAuthApi, VendorProfileEdit, VendorProfilePhotoRemove } from "@/Apis/vendorApi";
import VendorBottomNavbar from "@/components/Navabar/VendorBottomNavbar";
import Swal from "sweetalert2";

const inter = Inter({ subsets: ["latin"] });

export default function VendorEditProfile() {
    const router = useRouter()
    const { vendor } = useSelector((state)=>state.vendorInfo)
    const dispatch = useDispatch()
    const [ firstName, setFirstName ] = useState(false)
    const [ firstNameError, setFirstNameError ] = useState('')
    const [ email, setEmail ] = useState(false)
    const [ emailError, setEmailError ] = useState('')
    const [ box, setBox ] = useState(false)
    const [ experiance, setExperiance ] = useState(false)
    const [ experianceError, setExperianceError ] = useState('')
    const [ totalRequired, setTotalRequired ] = useState('')
    const [ imageShow, setImageShow  ] = useState('')
  
    useEffect(()=>{
      async function invoke(){
        let token = localStorage.getItem("vendortoken");
        if (token) {
          const response = await VendorisAuthApi(token)
          if (response) {
            if (response.auth) {
              if (response.vendorObj.isBlock) {
                Swal.fire(
                  'Blocked!',
                  'Your account is blocked! Not allowed this application...',
                  'error'
                ).then(()=>{
                  localStorage.removeItem('vendortoken')
                  router.push('/vendor/signin')
                })
              }else{
                dispatch(vendorDetails(response.vendorObj))
              }
            } else {
              router.push("/vendor/signin");
            }
          }
        } else {
          router.push("/vendor/signin");
        }
      }
      invoke();
    },[])
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        let data = new FormData(event.currentTarget);
        data = {
          firstName: data.get('firstName'),
          lastName: data.get('lastName'),
          locality: data.get('locality'),
          city: data.get('city'),
          state: data.get('state'),
          email: data.get('email'),
          job: data.get('job'),
          experiance: data.get('experiance'),
          jobDays: data.get('jobDays'),
          image: data.get('image'),
        }
        if(data.firstName && data.email && data.locality && data.city && data.state && data.job){
            let regName =/^[a-zA-Z]+$/;
            let regPhone =/^[0-9]+$/;
            let regEmail =/^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/
            setBox(false)
            setTotalRequired('')
            if(regName.test(data.firstName)){
              setFirstName(false)
              setFirstNameError('')
              if(regEmail.test(data.email)){
                setEmail(false)
                setEmailError('')
                if (regPhone.test(data.experiance)) {
                  setExperiance(false)
                  setExperianceError('')
                  if (data.image.name) {
                    let allowedFormats = /(\.jpg|\.jpeg|\.png|\.gif)$/i
                    if (!allowedFormats.exec(data.image.name)) {
                      toast.error("Invalid file type!", {
                        position: "top-right",
                        autoClose: 4000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                      });
                    } else {
                      const dir = Date.now();
                      const rand = Math.random();
                      const image = data.image
                      const imageRef = ref(storage, `profile/${dir}${rand}/${image?.name}`);
                      const toBase64 = (image) =>
                      new Promise((resolve, reject) => {
                          const reader = new FileReader();
                          reader.readAsDataURL(image);
                          reader.onload = () => resolve(reader.result);
                          reader.onerror = (error) => reject(error);
                      }).catch((err) => {
                          console.log(err);
                      });
                      const imgBase = await toBase64(image);
                      await uploadString(imageRef, imgBase, "data_url").then(async () => {
                          const downloadURL = await getDownloadURL(imageRef);
                          data.image = downloadURL
                      });
                    }
                    
                  }else{
                    data.image = ''
                  }
                  let token = localStorage.getItem("vendortoken");
                  const response = await VendorProfileEdit(vendor._id , data, token)
                  if (response) {
                    if (response.status == "success") {
                      toast.success("Successfully Edited", {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                      });
                      setTimeout(() => {
                        router.back()
                      }, 2000);
                    } else {
                      toast.error("This email is already registered!", {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                      });
                    }
                  }else{
                    // router.push('/404')
                  }       
                } else {
                  setExperiance(true)
                  setExperianceError('Please enter the No.of Year')
                }
              }else{
                setEmail(true)
                setEmailError('Please enter valid Email')
              }
           }else{
            setFirstName(true)
            setFirstNameError('Please enter valid Name')
           }
          }else{
            setBox(true)
            setTotalRequired('Please enter your Details')
          }
      };

      const removeProfilePhoto = async ()=>{
        let token = localStorage.getItem("vendortoken");
        const res = await VendorProfilePhotoRemove(vendor._id, token)
          if (res) {
            router.back()
          }else{
            // router.push('/404')
          }
      }

  return (
    <>
      <div>
        <VendorNavbar />
        <ToastContainer />
        <Box>
          <Grid
            container
            sx={{ justifyContent: "center", mt: 10, display: "flex" }}
          >
            <Grid md={3}>
              <Notifications user={vendor} />
            </Grid>
            <Grid sm={12} md={5} width={'inherit'}>
              <Grid sm={12} md={12}>
                <Grid
                  md={4.74}
                  sx={{
                    width: "-webkit-fill-available",
                    backgroundColor: "#e9e5df",
                    borderRadius: "15px",
                    m: 2,
                    mt: -4,
                    pt: 4,
                    display: "flex",
                    position: "fixed",
                    zIndex: 99,
                  }}
                >
                  <Grid
                    sx={{
                      p: 2,
                      width: "-webkit-fill-available",
                      justifyContent: "center",
                      boxShadow: 3,
                      display:'flex',
                      border: "1px solid lightgray",
                      borderRadius: "15px",
                      minHeight: "4.0vw",
                      backgroundColor: "#fff",
                    }}
                  >
                    <h3 style={{ marginLeft:'7px' , fontSize:'22px' }}>Edit Profile</h3>
                  </Grid>
                </Grid>
                <Grid sx={{ pt: 7 }}>
                  <Box
                    sx={{
                      p: 3,
                      width: "-webkit-fill-available",
                      boxShadow: 3,
                      border: "1px solid lightgray",
                      borderRadius: "15px",
                      minHeight: "34.4vw",
                      backgroundColor: "#fff",
                      m: 2,
                    }}
                  >
                    <Box 
                    component="form" noValidate onSubmit={handleSubmit}
                      sx={{
                        p: 2,
                        backgroundColor: "lightgray",
                        width: "100%",
                        minHeight: "inherit",
                        borderRadius: "10px",
                      }}
                    >
                      <Box
                        sx={{
                          p: 0.5,
                          backgroundColor: "#fff",
                          width: "fit-content",
                          display: "flex",
                        }}
                      >
                        <img
                          src={ imageShow ? URL.createObjectURL(imageShow) : vendor.image ? vendor.image : "/null-profile.jpg" }
                          style={{
                            width: "98px",
                            height: "98px",
                            borderRadius: "50%",
                          }}
                          alt=""
                        />
                        <div style={{ marginTop: "auto" }}>
                          <label for="upload" class="file-upload__label">
                            <AddAPhotoOutlinedIcon sx={{ ml: -0.5 }} />
                          </label>
                          <Input
                            sx={{ display:'none' }}
                            id="upload"
                            class="file-upload__input"
                            type="file"
                            name="image"
                            onChange={(e)=>{
                              let allowedFormats = /(\.jpg|\.jpeg|\.png|\.gif)$/i
                              let fileType = e.target.files[0].name
                              if (!allowedFormats.exec(fileType)) {
                                toast.error("Invalid file type!", {
                                  position: "top-right",
                                  autoClose: 4000,
                                  hideProgressBar: false,
                                  closeOnClick: true,
                                  pauseOnHover: true,
                                  draggable: true,
                                  progress: undefined,
                                  theme: "colored",
                                });
                              } else {
                                setImageShow(e.target.files[0])
                              }
                            }}
                          />
                        </div>
                      </Box>
                      <Button onClick={()=>removeProfilePhoto()} sx={{ border:'1px solid gray' , backgroundColor:'#fff' , borderRadius:'4px'  , width:'fit-content' , p:0.4 , m:0.5 , boxShadow: '1px 1px 3px -1px' , ml: 2 }}>
                        <h6>Remove Photo</h6>
                      </Button>
                      <Box sx={{ display: box ? 'block' : 'none' , backgroundColor:'#ffc5c5' , borderRadius:'3px' , p: 1.7 , mt: 2 , border:'1px solid gray' }}>
                            <p style={{ color:'red' }}>{totalRequired}</p>
                      </Box>
                      <Box>
                        <Grid container spacing={2} sx={{ mt: 3 }}>
                          <Grid item xs={6}>
                            <TextField
                              fullWidth
                              id="firstName"
                              label="First Name"
                              size="small"
                              name="firstName"
                              autoComplete="family-name"
                              autoFocus
                              error={firstName}
                              helperText={firstNameError}
                              defaultValue={vendor.firstName}
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <TextField
                              fullWidth
                              id="lastName"
                              label="Last Name"
                              name="lastName"
                              size="small"
                              autoComplete="family-name"
                              defaultValue={vendor.lastName}
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <TextField
                              fullWidth
                              id="locality"
                              label="Locality"
                              size="small"
                              name="locality"
                              autoComplete="family-name"
                              defaultValue={vendor.locality}
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <TextField
                              fullWidth
                              id="city"
                              size="small"
                              label="City"
                              name="city"
                              autoComplete="family-name"
                              defaultValue={vendor.city}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              fullWidth
                              id="state"
                              label="State"
                              size="small"
                              name="state"
                              autoComplete="family-name"
                              defaultValue={vendor.state}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              fullWidth
                              id="email"
                              size="small"
                              label="E-mail"
                              name="email"
                              autoComplete="family-name"
                              error={email}
                              helperText={emailError}
                              defaultValue={vendor.email}
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <TextField
                              fullWidth
                              id="job"
                              label="Job"
                              size="small"
                              name="job"
                              autoComplete="family-name"
                              defaultValue={vendor.job}
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <TextField
                              fullWidth
                              id="experiance"
                              label="Experiance per Year"
                              name="experiance"
                              size="small"
                              autoComplete="family-name"
                              defaultValue={vendor.experiance}
                              error={experiance}
                              helperText={experianceError}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                            required
                            fullWidth
                            id="jobDays"
                            label="Available Days"
                            name="jobDays"
                            autoComplete="family-name"
                            size="small"
                            defaultValue={vendor.jobDays}
                            />
                          </Grid>
                        </Grid>
                      </Box>
                      <Grid sx={{ textAlign: "end" }}>
                          <Button
                          type="submit"
                            sx={{
                              pl: 4,
                              pr: 4,
                              mt: 3,
                              backgroundColor: "#1976d2",
                              color: "#fff",
                              fontWeight: "900",
                              ":hover": { backgroundColor: "#1976d2" },
                            }}
                          >
                            Save
                          </Button>
                        </Grid>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
            <Grid md={3}>
              <Messages user={vendor} current={'vendor'} />
            </Grid>
          </Grid>
        </Box>
        <VendorBottomNavbar/>
      </div>
    </>
  );
}
