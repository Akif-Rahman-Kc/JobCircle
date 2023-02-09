import { Inter } from "@next/font/google";
import VendorNavbar from "@/components/Navabar/VendorNavbar";
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
import WorkerProfile from "@/components/ProfileView/WorkerProfile";
import { VendorisAuthApi } from "@/Apis/vendorApi";
import { vendorDetails } from "@/redux/vendor";
import UserProfile from "@/components/ProfileView/UserProfile";

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

export default function VendorWorker_Profile({worker, current}) {
    const router = useRouter();
    const { vendor } = useSelector((state)=>state.vendorInfo)
    const dispatch = useDispatch()
  
    useEffect(()=>{
      async function invoke(){
        let token=  localStorage.getItem('vendortoken')
        if (token) {
          const response = await VendorisAuthApi(token)
          if (response) {
            if (response.auth) {
              dispatch(vendorDetails(response.vendorObj))
            } else {
              router.push('/vendor/signin')
            }
          }
        } else {
          router.push('/vendor/signin')
        }
      }
      invoke();
    },[])

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
                    <EngineeringIcon/>
                    <h3 style={{ marginLeft:'7px' , fontSize:'22px' }}>Worker Profile</h3>
                  </Grid>
                </Grid>
                {current == 'vendor' ? <WorkerProfile worker={worker} user={vendor}/> : <UserProfile worker={worker}/> }
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
    if (res.data.vendor) {
      return{
        props : { 
          worker:res.data.vendor,
          current:'vendor'
        }
      }
    } else{
      return{
        props : { 
          worker:res.data.user,
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
