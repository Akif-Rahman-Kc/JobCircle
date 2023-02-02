import { Inter } from "@next/font/google";
import { Box } from "@mui/system";
import { Button, Grid, Input, TextField } from "@mui/material";
import Notifications from "@/components/Notifications/Notification";
import Messages from "@/components/Messages/Message";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import VendorNavbar from "@/components/Navabar/VendorNavbar";
import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";
import { AccountCircle } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { vendorDetails } from "@/redux/vendor";
import { getDownloadURL } from "firebase/storage";

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
    const [ totalRequired, setTotalRequired ] = useState('')
  
    useEffect(()=>{
      let token=  localStorage.getItem('vendortoken')
      if (token) {
        axios.post('http://localhost:4000/vendor/vendorAuth',{headers:{"accessVendorToken":token}}).then((response)=>{
          if (response.data.auth) {
            dispatch(vendorDetails(response.data.vendorObj))
          } else {
            router.push('/vendor/signin')
          }
        })
      } else {
        router.push('/vendor/signin')
      }
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
          image: data.get('image'),
        }
        console.log(data);
        if(data.firstName && data.email && data.locality && data.city && data.state && data.job){
            let regName =/^[a-zA-Z]+$/;
            let regEmail =/^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/
            setBox(false)
            setTotalRequired('')
            if(regName.test(data.firstName)){
              setFirstName(false)
              setFirstNameError('')
              if(regEmail.test(data.email)){
                setEmail(false)
                setEmailError('')

                // const dir = Date.now();
                // const rand = Math.random();
                // const image = data.image
                // const imageRef = ref(storage, `profile/${dir}${rand}/${image?.name}`);
                // const toBase64 = (image) =>
                // new Promise((resolve, reject) => {
                //     const reader = new FileReader();
                //     reader.readAsDataURL(image);
                //     reader.onload = () => resolve(reader.result);
                //     reader.onerror = (error) => reject(error);
                // }).catch((err) => {
                //     console.log(err);
                // });
                // const imgBase = await toBase64(image);
                // await uploadString(imageRef, imgBase, "data_url").then(async () => {
                //     const downloadURL = await getDownloadURL(imageRef);
                //     data.image = downloadURL
                //     axios
                //         .put(`http://localhost:4000/vendor/edit_profile?vendorId=${vendor._id}`, data)
                //         .then((response) => {
                //         setImage("");
                //         });
                //     });
                //     setImage(null);
                //     setOpen(false);
                
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

  return (
    <>
      <div>
        <VendorNavbar />
        <Box>
          <Grid
            container
            sx={{ justifyContent: "center", mt: 10, display: "flex" }}
          >
            <Grid md={3}>
              <Notifications />
            </Grid>
            <Grid sm={12} md={5}>
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
                        {vendor.image ? <img src="/null-profile.jpg" style={{ width: "98px", height: "fit-content", borderRadius: "50%", }} alt="" /> : <img
                          src="/null-profile.jpg"
                          style={{
                            width: "98px",
                            height: "fit-content",
                            borderRadius: "50%",
                          }}
                          alt=""
                        />}
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
                          />
                        </div>
                      </Box>
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
              <Messages />
            </Grid>
          </Grid>
        </Box>
      </div>
    </>
  );
}
