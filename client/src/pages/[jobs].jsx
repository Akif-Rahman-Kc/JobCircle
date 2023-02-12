import { Inter } from "@next/font/google";
import Navbar from "@/components/Navabar/Navbar";
import { Box } from "@mui/system";
import {
  Avatar,
  Button,
  Grid,
  IconButton,
} from "@mui/material";
import Notifications from "@/components/Notifications/Notification";
import Messages from "@/components/Messages/Message";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { userDetails } from "@/redux/user";
import EngineeringIcon from "@mui/icons-material/Engineering";
import { GetJobs, GetWorkers, isAuthApi, SavedVendors } from "@/Apis/userApi";
import MailIcon from '@mui/icons-material/Mail';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot';
import TurnedInIcon from '@mui/icons-material/TurnedIn';
import axios from "axios";
import Link from "next/link";
import BottomNavbar from "@/components/Navabar/BottomNavbar";

const inter = Inter({ subsets: ["latin"] });

export default function Workers({workers}) {
  const router = useRouter();
  const { user } = useSelector((state)=>state.userInfo)
  const dispatch = useDispatch()
  const [ refresh, setRefresh ] = useState(false)

  useEffect(()=>{
    async function invoke(){
      let token=  localStorage.getItem('usertoken')
      if (token) {
        const response = await isAuthApi(token)
        if (response) {
          if (response.auth) {
            dispatch(userDetails(response.userObj))
            workers.map((obj)=>{
              if (response.userObj.Saved.length == 0) {
                obj.saved = false
              }else{
                let flag
                response.userObj.Saved.map((doc)=>{
                  if (doc.vendorId == obj._id) {
                    flag = 1
                    obj.saved = true
                  }
                })
                if (flag != 1) {
                  obj.saved = false
                }
              }
            })
          } else {
            router.push('/auth/signin')
          }
        }
          
      } else {
        router.push('/auth/signin')
      }
    }
    invoke()
  },[refresh])

  const savedVendor = async (vendorId )=>{
    const res = await SavedVendors(vendorId, user._id)
    if (res) {
      setRefresh(!refresh)
    }
  }

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
                    <Grid>
                      {
                        workers.map((worker)=>(
                          <>
                          <Grid sx={{ display:'flex' }}>
                            <IconButton onClick={()=>savedVendor(worker._id)} sx={{ p:0 , my: 2 }}>
                              { worker.saved ? <TurnedInIcon sx={{ m: 1 }}/> : <TurnedInNotIcon sx={{ m: 1 }}/> }
                            </IconButton>
                            <Grid sx={{ width:'-webkit-fill-available' }}>
                            <Link href={`/worker_profile/${worker._id}`} >
                              <Grid key={worker._id} xs={12} sx={{ m: 1 , p: 1 , display:'flex' , border:'1px solid lightgray' , borderRadius:'10px' , backgroundColor:'lightgray' , boxShadow: 3 , ":active":{ backgroundColor:'#c1bdbd' } , color:'#000' }}>
                                
                                <img
                                  src={worker.image ? worker.image : "/null-profile.jpg"}
                                  style={{ m: 0, width: "40px"  , height:"40px" , borderRadius: "50%" }}
                                  alt=""
                                />
                                <Box sx={{ ml:0.5 , mt:0.5 }}>
                                  <h4>{worker.firstName + ' ' + worker.lastName}</h4>
                                  <h5 style={{ fontFamily: 'monospace' }}>{worker.locality + ', ' + worker.city}</h5>
                                </Box>
                              </Grid>
                              </Link>
                            </Grid>
                          </Grid>
                          
                          </>
                        ))
                      }
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
        <BottomNavbar/>
      </div>
    </>
  );
}


export const getServerSideProps = async (context) => {
  try {
    const jobs = context.params.jobs
    const res =await axios.get(`http://localhost:4000/get_workers?jobName=${jobs}`)
    return{
      props : { 
        workers:res.data
      }
    }
  } catch (error) {
    return{
      props : { 
          workers:null
       }
  }
  }

}
