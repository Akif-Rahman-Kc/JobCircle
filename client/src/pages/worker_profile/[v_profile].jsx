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
import { GetJobs, GetWorker, GetWorkers, isAuthApi } from "@/Apis/userApi";
import MailIcon from '@mui/icons-material/Mail';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot';
import axios from "axios";
import PhotoSizeSelectActualIcon from "@mui/icons-material/PhotoSizeSelectActual";
import SmartDisplayIcon from "@mui/icons-material/SmartDisplay";
import Link from "next/link";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { BsFillChatDotsFill, IconName } from "react-icons/bs";
import WorkerProfile from "@/components/ProfileView/WorkerProfile";
import UserProfile from "@/components/ProfileView/UserProfile";
import BottomNavbar from "@/components/Navabar/BottomNavbar";
import Swal from "sweetalert2";
import AccountCircle from "@mui/icons-material/AccountCircle";

const inter = Inter({ subsets: ["latin"] });

export default function Worker_Profile({worker, current}) {
  const router = useRouter();

  const { user } = useSelector((state)=>state.userInfo)
  const dispatch = useDispatch()

  useEffect(()=>{
    async function invoke(){
      let token=  localStorage.getItem('usertoken')
      if (token) {
        const response = await isAuthApi(token)
        if (response) {
          if (response.auth) {
            if (response.userObj.isBlock) {
              Swal.fire(
                'Blocked!',
                'Your account is blocked! Not allowed this application...',
                'error'
              ).then(()=>{
                localStorage.removeItem("usertoken");
                router.push("/auth/signin");
              })
            }else{
              dispatch(userDetails(response.userObj))
            }
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
              <Notifications user={user} />
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
                    zIndex: 1000,
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
                    {current == 'vendor' ? <EngineeringIcon/> : <AccountCircle/>}
                    
                    {current == 'vendor' ? <h3 style={{ marginLeft:'7px' , fontSize:'22px' }}>Worker Profile</h3> : <h3 style={{ marginLeft:'7px' , fontSize:'22px' }}>User Profile</h3> }
                  </Grid>
                </Grid>
                {current == 'vendor' ? <WorkerProfile worker={worker} user={user} vendor={false}/> : <UserProfile user={user} worker={worker} vendor={false}/> }
                
              </Grid>
            </Grid>
            <Grid md={3}>
              <Messages user={user} current={'user'} />
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
    const workerId = context.params.v_profile
    const res = await GetWorker(workerId)
    if (res.vendor) {
      return{
        props : { 
          worker:res.vendor,
          current:'vendor'
        }
      }
    } else{
      return{
        props : { 
          worker:res.user,
          current:'user'
        }
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
