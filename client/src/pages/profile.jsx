import { Inter } from "@next/font/google";
import Navbar from "@/components/Navabar/Navbar";
import { Box } from "@mui/system";
import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  IconButton,
} from "@mui/material";
import Notifications from "@/components/Notifications/Notification";
import Messages from "@/components/Messages/Message";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import QuestionAnswerOutlinedIcon from "@mui/icons-material/QuestionAnswerOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import Collapse from "@mui/material/Collapse";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { userDetails } from "@/redux/user";
import HomeIcon from "@mui/icons-material/Home";
import { isAuthApi } from "@/Apis/userApi";
import Posts from "@/components/Posts/Post";
import { GetAllPosts } from "@/Apis/vendorApi";
import { AccountCircle } from "@mui/icons-material";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

const Profile = () => {
    const [ flag, setFlag ] = useState(false)
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
                    <AccountCircle/>
                    <h3 style={{ marginLeft:'7px' , fontSize:'22px' }}>Profile</h3>
                  </Grid>
                </Grid>
                <Grid sx={{ pt: 7 }}>
                  <Box
                    sx={{
                      p: 2,
                      width: "-webkit-fill-available",
                      boxShadow: 3,
                      border: "1px solid lightgray",
                      borderRadius: "15px",
                      minHeight: "34.4vw",
                      backgroundColor: "#fff",
                      m: 2,
                      display:'flex'
                    }}
                  >
                    <Grid xs={5} sx={{ paddingTop:'10%' , paddingBottom:'10%' }} p={1} backgroundColor={'lightgray'} borderRadius={3}>
                        <Box textAlign={"center"}>
                        <img
                            src={user.image ? user.image : "/null-profile.jpg"}
                            style={{
                              width: "67px",
                              height: "fit-content",
                              borderRadius: "50%",
                              border: "1px solid #000",
                            }}
                            alt=""
                          />
                          <h4 style={{ fontWeight: "900" , lineBreak:'auto' }}>
                            Akif Rahman KC
                          </h4>
                          <h6 style={{ lineBreak:'auto' }}>Madakkara, Kannur</h6>
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
                        </Box>
                        { flag ? <Box sx={{ mt: 1 , p: 1 , borderRadius:'5px' , border:'4px double gray' , fontFamily: 'monospace' }}>
                            <h6>Place : <span style={{ color:'blue' , lineBreak:'auto' }}>Kannur</span></h6>
                            <h6>Phone No : <a href={`tel:${988898989}`}><span style={{ color:'blue' , lineBreak:'auto' }}>588888888888</span></a></h6>
                            <h6>Email :<a href={8989898998989}><span style={{ color:'blue' , lineBreak:'auto' }}>akif90@gmail.com</span></a></h6>
                        </Box> : ''}
                        <Link href='/edit_profile'>
                        <Grid
                        xs={12}
                        sx={{
                          mt: 2,
                          p: 0.6,
                          boxShadow: 3,
                          textAlign: "center",
                          border: "1px solid lightgray",
                          borderRadius: "5px",
                          ":active": { backgroundColor: "#f1f0f0" },
                          backgroundColor:'#fff',
                          color:'#000'
                        }}
                      >
                        <h6>EDIT PROFILE</h6>
                      </Grid>
                      </Link>
                      <Button sx={{ boxShadow: 3 , backgroundColor:'#1976d2' , color:'#fff' , fontSize:'9.5px' , py: 0.5 , px: 4 , pt: 0.6 , mt: 4 , ":hover":{ backgroundColor:'#1976d2' } , width: '-webkit-fill-available' , borderRadius:'15px' }}><PersonAddIcon sx={{ width:'18px' , mt: -0.3 , mr: 0.2 }}/>Connections</Button>
                      <Button sx={{ boxShadow: 3 , backgroundColor:'#1976d2' , color:'#fff' , fontSize:'9.5px' , py: 0.5 , px: 4 , pt: 0.6 , mt: 1 , ":hover":{ backgroundColor:'#1976d2' } , width: '-webkit-fill-available' , borderRadius:'15px' }}><BookmarksIcon sx={{ width:'16px' , mt: -0.3 , mr: 0.2 }}/>Saved</Button>
                    </Grid>
                    <Grid className="comments" xs={7} p={2} ml={0.7} backgroundColor={'lightgray'} borderRadius={3} height={'486px'} sx={{ overflowY:'auto' }}>
                        <Box display={'flex'} my={1}>
                            <img src={"/null-profile.jpg"}
                                style={{
                                    width: "30px",
                                    height: "fit-content",
                                    borderRadius: "50%",
                                    border: "1px solid #000",
                                    marginRight:'3px'
                                }}
                                alt=""
                            />
                            <h5 style={{ marginTop:'8px' , lineBreak:'auto' }}>Akif Rahman KC</h5>
                        </Box>
                        <hr />
                        <Box display={'flex'} my={1}>
                            <img src={"/null-profile.jpg"}
                                style={{
                                    width: "30px",
                                    height: "fit-content",
                                    borderRadius: "50%",
                                    border: "1px solid #000",
                                    marginRight:'3px'
                                }}
                                alt=""
                            />
                            <h5 style={{ marginTop:'8px' , lineBreak:'auto' }}>Akif Rahman KC</h5>
                        </Box>
                        <hr />
                        <Box display={'flex'} my={1}>
                            <img src={"/null-profile.jpg"}
                                style={{
                                    width: "30px",
                                    height: "fit-content",
                                    borderRadius: "50%",
                                    border: "1px solid #000",
                                    marginRight:'3px'
                                }}
                                alt=""
                            />
                            <h5 style={{ marginTop:'8px' , lineBreak:'auto' }}>Akif Rahman KC</h5>
                        </Box>
                        <hr />
                        <Box display={'flex'} my={1}>
                            <img src={"/null-profile.jpg"}
                                style={{
                                    width: "30px",
                                    height: "fit-content",
                                    borderRadius: "50%",
                                    border: "1px solid #000",
                                    marginRight:'3px'
                                }}
                                alt=""
                            />
                            <h5 style={{ marginTop:'8px' , lineBreak:'auto' }}>Akif Rahman KC</h5>
                        </Box>
                        <hr />
                        <Box display={'flex'} my={1}>
                            <img src={"/null-profile.jpg"}
                                style={{
                                    width: "30px",
                                    height: "fit-content",
                                    borderRadius: "50%",
                                    border: "1px solid #000",
                                    marginRight:'3px'
                                }}
                                alt=""
                            />
                            <h5 style={{ marginTop:'8px' , lineBreak:'auto' }}>Akif Rahman KC</h5>
                        </Box>
                        <hr />
                        <Box display={'flex'} my={1}>
                            <img src={"/null-profile.jpg"}
                                style={{
                                    width: "30px",
                                    height: "fit-content",
                                    borderRadius: "50%",
                                    border: "1px solid #000",
                                    marginRight:'3px'
                                }}
                                alt=""
                            />
                            <h5 style={{ marginTop:'8px' , lineBreak:'auto' }}>Akif Rahman KC</h5>
                        </Box>
                        <hr />
                        <Box display={'flex'} my={1}>
                            <img src={"/null-profile.jpg"}
                                style={{
                                    width: "30px",
                                    height: "fit-content",
                                    borderRadius: "50%",
                                    border: "1px solid #000",
                                    marginRight:'3px'
                                }}
                                alt=""
                            />
                            <h5 style={{ marginTop:'8px' , lineBreak:'auto' }}>Akif Rahman KC</h5>
                        </Box>
                        <hr />
                        <Box display={'flex'} my={1}>
                            <img src={"/null-profile.jpg"}
                                style={{
                                    width: "30px",
                                    height: "fit-content",
                                    borderRadius: "50%",
                                    border: "1px solid #000",
                                    marginRight:'3px'
                                }}
                                alt=""
                            />
                            <h5 style={{ marginTop:'8px' , lineBreak:'auto' }}>Akif Rahman KC</h5>
                        </Box>
                        <hr />
                        <Box display={'flex'} my={1}>
                            <img src={"/null-profile.jpg"}
                                style={{
                                    width: "30px",
                                    height: "fit-content",
                                    borderRadius: "50%",
                                    border: "1px solid #000",
                                    marginRight:'3px'
                                }}
                                alt=""
                            />
                            <h5 style={{ marginTop:'8px' , lineBreak:'auto' }}>Akif Rahman KC</h5>
                        </Box>
                        <hr />
                        <Box display={'flex'} my={1}>
                            <img src={"/null-profile.jpg"}
                                style={{
                                    width: "30px",
                                    height: "fit-content",
                                    borderRadius: "50%",
                                    border: "1px solid #000",
                                    marginRight:'3px'
                                }}
                                alt=""
                            />
                            <h5 style={{ marginTop:'8px' , lineBreak:'auto' }}>Akif Rahman KC</h5>
                        </Box>
                        <hr />
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
 
export default Profile;