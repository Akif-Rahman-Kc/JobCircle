import { Inter } from "@next/font/google";
import Navbar from "@/components/Navabar/Navbar";
import { Box } from "@mui/system";
import {
  Avatar,
  Button,
  Grid,
  IconButton,
  Modal,
  TextareaAutosize,
  TextField,
} from "@mui/material";
import Notifications from "@/components/Notifications/Notification";
import Messages from "@/components/Messages/Message";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { userDetails } from "@/redux/user";
import EngineeringIcon from "@mui/icons-material/Engineering";
import { GetJobs, GetWorkers, isAuthApi } from "@/Apis/userApi";
import MailIcon from '@mui/icons-material/Mail';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot';
import axios from "axios";
import PhotoSizeSelectActualIcon from "@mui/icons-material/PhotoSizeSelectActual";
import SmartDisplayIcon from "@mui/icons-material/SmartDisplay";
import Link from "next/link";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { BsFillChatDotsFill, IconName } from "react-icons/bs";

const inter = Inter({ subsets: ["latin"] });

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", sm: "70%", md: "40%" },
  minHeight: { xs: "10%", sm: "10%", md: "10%" },
  bgcolor: "#fff",
  border: "2px solid #000",
  boxShadow: 24,
  p: 1,
  borderRadius: "10px",
};

export default function WorkerProfile({worker}) {
  const router = useRouter();
  const [ flag, setFlag ] = useState(false)
  const [open, setOpen] = useState(false);

  const { user } = useSelector((state)=>state.userInfo)
  const dispatch = useDispatch()

  useEffect(()=>{
    async function invoke(){
      let token=  localStorage.getItem('usertoken')
      if (token) {
        const response = await isAuthApi(token)
        if (response) {
          if (response.auth) {
            dispatch(userDetails(response.userObj))
          } else {
            router.push('/auth/signin')
          }
        }
          
      } else {
        router.push('/auth/signin')
      }
    }
    invoke()
  },[])

  const handleSubmit = async (event) => {
    event.preventDefault();
    let data = new FormData(event.currentTarget);
    data = {
      location: data.get('location'),
      date: data.get('date'),
      details: data.get('details'),
    }
    console.log(data);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div>
        <Navbar />
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
                    <EngineeringIcon/>
                    <h3 style={{ marginLeft:'7px' , fontSize:'22px' }}>Workers</h3>
                  </Grid>
                </Grid>
                <Grid sx={{ pt: 7 }}>
                  <Box
                    sx={{
                      p: 2,
                      width: "-webkit-fill-available",
                      border: "1px solid lightgray",
                      borderRadius: "15px",
                      minHeight: "34.4vw",
                      backgroundColor: "#fff",
                      m: 2,
                    }}
                  >
                    <Box sx={{ display: "flex" }}>
                      <Grid xs={12} sx={{ display: "flex" }}>
                        <Grid xs={4} sx={{ fontFamily: "sans-serif" }}>
                          <img
                            src={worker.image ? worker.image : "/null-profile.jpg"}
                            style={{
                              width: "35%",
                              height: "fit-content",
                              borderRadius: "50%",
                              border: "1px solid #000",
                            }}
                            alt=""
                          />
                          <h4 style={{ fontWeight: "900" }}>
                            {worker.firstName + ' ' + worker.lastName}
                          </h4>
                          <h6>{worker.job}</h6>
                          <a
                          onClick={()=> setFlag(!flag)}
                            style={{
                              fontSize: "10px",
                              fontWeight: "900",
                              textDecoration: "underline",
                              cursor:'pointer',
                              color:'blue'
                            }}
                          >
                            more
                          </a>
                        </Grid>
                        <Grid
                          xs={4}
                          sx={{
                            color: "blue",
                            textAlign: "center",
                            fontFamily: "sans-serif",
                          }}
                        >
                          <h5
                            style={{
                              fontSize: "12px",
                              fontWeight: "800",
                              marginBottom: "10px",
                            }}
                          >
                            Connections
                          </h5>
                          <h4>21</h4>
                        </Grid>
                        <Grid xs={4} sx={{ mt: -1, textAlign: "end" }}>
                          <IconButton>
                            <MoreVertIcon />
                          </IconButton>
                        </Grid>
                      </Grid>
                    </Box>
                    { flag ? <Box sx={{ mt: 1 , p: 2 , borderRadius:'5px' , border:'4px double gray' , fontFamily: 'monospace' }}>
                      <h5>Place : <span style={{ color:'blue' }}>{worker.locality + ', ' + worker.city}</span></h5>
                      <h5>Phone No : <a href={`tel:${worker.phoneNo}`}><span style={{ color:'blue' }}>{worker.phoneNo}</span></a></h5>
                      <h5>Email :<a href={worker.email}><span style={{ color:'blue' }}>{worker.email}</span></a></h5>
                      <h5>Job : <span style={{ color:'blue' }}>{worker.job}</span></h5>
                      <h5>Experiance : <span style={{ color:'blue' }}>{worker.experiance} Year</span></h5>
                    </Box> : ''}
                    <Box sx={{ width:'100%' , mt: 1 }}>
                            <Button sx={{ backgroundColor:'#1976d2' , color:'#fff' , fontSize:'9.5px' , py: 0.2 , px: 4 , pt: 0.5 , ":hover":{ backgroundColor:'#1976d2' } , mb: 0.6 }}>Connect</Button>
                            <Button onClick={handleOpen} sx={{ float:'right' , backgroundColor:'#1976d2' , color:'#fff' , fontSize:'10px' , py: 0.2 , px: 4 , pt: 0.5 , ":hover":{ backgroundColor:'#1976d2' } }}>Booking</Button>
                            <br/>
                            <Box sx={{ width:'113px' , display:'flex' }}>
                              <IconButton sx={{ backgroundColor:'#1976d2' , color:'#fff' , ":hover":{ backgroundColor:'#1976d2' } , width:'50px' , height:'25px' , borderRadius:'15px' }}>
                                <BsFillChatDotsFill style={{ width:'17px' }}/>
                              </IconButton>
                              <IconButton href={`tel:${worker.phoneNo}`} sx={{ ml: 'auto' , backgroundColor:'#1976d2' , color:'#fff' , ":hover":{ backgroundColor:'#1976d2' } , width:'50px' , height:'25px' , borderRadius:'15px' }}>
                                <LocalPhoneIcon sx={{ width:'17px' }}/>
                              </IconButton>
                            </Box>
                    </Box>
                    <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                          >
                            <Box
                              sx={style}
                              component="form"
                              noValidate
                              onSubmit={handleSubmit}
                            >
                              <Grid
                                sx={{
                                  height: "-webkit-fill-available",
                                  textAlign: "center",
                                  
                                }}
                              >
                                <h1 style={{ padding:'5px' }}>Booking Form</h1>
                                <Grid sx={{ display: "flex" }}>
                                <Grid xs={6} sx={{ p: 2 , border:1 , borderRadius: 2 , maxHeight:'297px' }}>
                                <h4 style={{ padding:'10px' , lineBreak:'auto' , border:'1px solid black' , borderRadius:'4px' }}>Confirmed Date</h4>
                                  <Box className='comments' sx={{ border:1 , borderRadius: 1 , maxHeight:'220px' , overflowY:'auto' }}>
                                    <hr />
                                    <h6  style={{ padding:'4px' }}>21/01/2023</h6>
                                    <hr />
                                    <h6  style={{ padding:'4px' }}>21/01/2023</h6>
                                    <hr />
                                    <h6 style={{ padding:'4px' }}>21/01/2023</h6>
                                    <hr />
                                    <h6 style={{ padding:'4px' }}>21/01/2023</h6>
                                    <hr />
                                    <h6 style={{ padding:'4px' }}>21/01/2023</h6>
                                    <hr />
                                    <h6  style={{ padding:'4px' }}>21/01/2023</h6>
                                    <hr />
                                    <h6 style={{ padding:'4px' }}>21/01/2023</h6>
                                    <hr />
                                    <h6 style={{ padding:'4px' }}>21/01/2023</h6>
                                    <hr />
                                    <h6 style={{ padding:'4px' }}>21/01/2023</h6>
                                    <hr />
                                    <h6  style={{ padding:'4px' }}>21/01/2023</h6>
                                    <hr />
                                    <h6 style={{ padding:'4px' }}>21/01/2023</h6>
                                    <hr />
                                    <h6 style={{ padding:'4px' }}>21/01/2023</h6>
                                    <hr />
                                    <h6 style={{ padding:'4px' }}>21/01/2023</h6>
                                    <hr />
                                    <h6  style={{ padding:'4px' }}>21/01/2023</h6>
                                    <hr />
                                    <h6 style={{ padding:'4px' }}>21/01/2023</h6>
                                    <hr />
                                    <h6 style={{ padding:'4px' }}>21/01/2023</h6>
                                    <hr />
                                    <h6 style={{ padding:'4px' }}>21/01/2023</h6>
                                  </Box>
                                </Grid>
                                <Grid xs={6} sx={{ p: 1 , ml: 0.2 , border:1 , borderRadius: 2 }}>
                                    <Grid item xs={12} sx={{ m: 1 }}>
                                    <TextField
                                      fullWidth
                                      id="location"
                                      label="Location"
                                      size="small"
                                      name="location"
                                      autoComplete="family-name"
                                      autoFocus
                                    />
                                  </Grid>
                                  <Grid item xs={12} sx={{ m: 1 }}>
                                    <TextField
                                      fullWidth
                                      id="date"
                                      label="Date"
                                      size="small"
                                      name="date"
                                      autoComplete="family-name"
                                      autoFocus
                                    />
                                  </Grid>
                                  <TextareaAutosize
                                    name="details"
                                    id="details"
                                    placeholder="Please Enter Details..."
                                    style={{
                                      margin: '10px',
                                      padding:'10px',
                                      maxWidth: "-webkit-fill-available",
                                      minWidth: "-webkit-fill-available",
                                      maxHeight: "150px",
                                      minHeight: "150px",
                                      overflowY: "auto",
                                    }}
                                  ></TextareaAutosize>
                                </Grid>
                                </Grid>
                                <Grid xs={12} sx={{ mt: 2 , textAlign: "end" }}>
                                  <Button
                                    onClick={handleClose}
                                    sx={{
                                      pl: 2,
                                      pr: 2,
                                      mr: 1,
                                      backgroundColor: "#1976d2",
                                      color: "#fff",
                                      fontWeight: "900",
                                      fontSize: "12px",
                                      ":hover": { backgroundColor: "#1976d2" },
                                    }}
                                  >
                                    Cancel
                                  </Button>
                                  <Button
                                    type="submit"
                                    sx={{
                                      pl: 2,
                                      pr: 2,
                                      mr: 1,
                                      backgroundColor: "#1976d2",
                                      color: "#fff",
                                      fontWeight: "900",
                                      fontSize: "12px",
                                      ":hover": { backgroundColor: "#1976d2" },
                                    }}
                                  >
                                    Submit
                                  </Button>
                                </Grid>
                              </Grid>
                            </Box>
                          </Modal>
                    <Grid
                      xs={12}
                      sx={{
                        mt: 2,
                        p: 1,
                        display: "flex",
                        textAlign: "center",
                        border: "4px outset lightgray",
                        borderRadius: "10px",
                      }}
                    >
                      <Grid xs={6}>
                        <IconButton
                          size="small"
                          sx={{ color: "#111", borderRadius: "10px" }}
                        >
                          <PhotoSizeSelectActualIcon />
                          <h4
                            style={{
                              marginLeft: "6px",
                              fontFamily: "sans-serif",
                            }}
                          >
                            Photos
                          </h4>
                        </IconButton>
                      </Grid>
                      <Grid xs={6}>
                        <IconButton
                          size="small"
                          sx={{ color: "#111", borderRadius: "10px" }}
                        >
                          <SmartDisplayIcon />
                          <h4
                            style={{
                              marginLeft: "6px",
                              fontFamily: "sans-serif",
                            }}
                          >
                            Vidoes
                          </h4>
                        </IconButton>
                      </Grid>
                    </Grid>
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


export const getServerSideProps = async (context) => {
  try {
    const workerId = context.params.v_profile
    const res =await axios.get(`http://localhost:4000/get_worker?vendorId=${workerId}`)
    return{
      props : { 
        worker:res.data
      }
    }
  } catch (error) {
    return{
      props : { 
          worker:null
       }
  }
  }

}
