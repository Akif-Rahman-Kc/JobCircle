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
import Posts from "@/components/Posts/Post";
import { VendorGetPosts } from "@/Apis/vendorApi";
import PersonAddIcon from '@mui/icons-material/PersonAdd';

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

const WorkerProfile = (props) => {

    return ( 
        <>
            <Grid sx={{ pt: 7 }}>
                  <Box
                    sx={{
                      px: 3,
                      py: 4,
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
                            src={props.worker.image ? props.worker.image : "/null-profile.jpg"}
                            style={{
                              width: "50%",
                              height: "fit-content",
                              borderRadius: "50%",
                              border: "1px solid #000",
                            }}
                            alt=""
                          />
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
                    <Box sx={{ width:'100%' , mt: 1 }}>
                            <h3 style={{ fontWeight: "900" }}>
                            {props.worker.firstName + ' ' + props.worker.lastName}
                          </h3>
                          <h6>{props.worker.job}</h6>
                          <Button sx={{ backgroundColor:'#1976d2' , color:'#fff' , fontSize:'9.5px' , py: 0 , px: 4 , pt: 0.2 , ":hover":{ backgroundColor:'#1976d2' } , mb: 0.6 }}><PersonAddIcon sx={{ width:'18px' , mt: -0.3 , mr: 0.2 }}/>Connect</Button>
                            <br/>
                            <Box sx={{ width:'113px' , display:'flex' }}>
                              <IconButton sx={{ backgroundColor:'#1976d2' , color:'#fff' , ":hover":{ backgroundColor:'#1976d2' } , width:'50px' , height:'25px' , borderRadius:'15px' }}>
                                <BsFillChatDotsFill style={{ width:'17px' }}/>
                              </IconButton>
                              <IconButton href={`tel:${props.worker.phoneNo}`} sx={{ ml: 'auto' , backgroundColor:'#1976d2' , color:'#fff' , ":hover":{ backgroundColor:'#1976d2' } , width:'50px' , height:'25px' , borderRadius:'15px' }}>
                                <LocalPhoneIcon sx={{ width:'17px' }}/>
                              </IconButton>
                            </Box>
                    </Box>
                    <Box sx={{ mt: 5 , p: 3 , borderRadius:'5px' , border:'4px double gray' , fontFamily: 'monospace' , lineHeight:'30px' }}>
                      <h4>Place : <span style={{ color:'blue' }}>{props.worker.locality + ', ' + props.worker.city}</span></h4>
                      <h4>Phone No : <a href={`tel:${props.worker.phoneNo}`}><span style={{ color:'blue' }}>{props.worker.phoneNo}</span></a></h4>
                      <h4>Email :<a href={props.worker.email}><span style={{ color:'blue' }}>{props.worker.email}</span></a></h4>
                    </Box>
                  </Box>
                </Grid>
        </>
     );
}
 
export default WorkerProfile;