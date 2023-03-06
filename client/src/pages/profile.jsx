import { Inter } from "@next/font/google";
import Navbar from "@/components/Navabar/Navbar";
import { Box } from "@mui/system";
import { Button, Grid, IconButton } from "@mui/material";
import Notifications from "@/components/Notifications/Notification";
import Messages from "@/components/Messages/Message";
import { use, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { userDetails } from "@/redux/user";
import { isAuthApi, SavedVendors } from "@/Apis/userApi";
import { AccountCircle } from "@mui/icons-material";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import Link from "next/link";
import BottomNavbar from "@/components/Navabar/BottomNavbar";
import Swal from "sweetalert2";
import Connections from "@/components/Connections/connection";
import TurnedInIcon from '@mui/icons-material/TurnedIn';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import ErrorIcon from '@mui/icons-material/Error';
import Bookings from "@/components/Bookings/Booking";

const inter = Inter({ subsets: ["latin"] });

const Profile = () => {
    const [ flag, setFlag ] = useState(false)
    const [ page, setPage ] = useState('')
    const [ refresh, setRefresh ] = useState(false)
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
    },[refresh])

    const savedVendor = async (vendorId)=>{
      let userToken=  localStorage.getItem('usertoken')
      const res = await SavedVendors(vendorId, user._id, userToken)
      if (res) {
        setRefresh(!refresh)
      }else{
        router.push('/404')
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
              <Notifications user={user} />
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
                            {user.firstName + ' ' + user.lastName}
                          </h4>
                          <h6 style={{ lineBreak:'auto' }}>{user.locality}, {user.city}</h6>
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
                            <h6>Place : <span style={{ color:'blue' , lineBreak:'auto' }}>{user.locality}, {user.city}</span></h6>
                            <h6>Phone No : <a href={`tel:${user.phoneNo}`}><span style={{ color:'blue' , lineBreak:'auto' }}>{user.phoneNo}</span></a></h6>
                            <h6>Email :<a href={user.email}><span style={{ color:'blue' , lineBreak:'auto' }}>{user.email}</span></a></h6>
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
                      <Button onClick={()=> setPage('')} sx={{ boxShadow: 3 , backgroundColor:'#1976d2' , color:'#fff' , fontSize:'9.5px' , py: 0.5 , px: 4 , pt: 0.6 , mt: 4 , ":hover":{ backgroundColor:'#1976d2' } , width: '-webkit-fill-available' , borderRadius:'15px' }}><PersonAddIcon sx={{ width:'18px' , mt: -0.3 , mr: 0.2 }}/>Connections</Button>
                      <Button onClick={()=> setPage('saved')} sx={{ boxShadow: 3 , backgroundColor:'#1976d2' , color:'#fff' , fontSize:'9.5px' , py: 0.5 , px: 4 , pt: 0.6 , mt: 1 , ":hover":{ backgroundColor:'#1976d2' } , width: '-webkit-fill-available' , borderRadius:'15px' }}><BookmarksIcon sx={{ width:'16px' , mt: -0.3 , mr: 0.2 }}/>Saved</Button>
                      <Button onClick={()=> setPage('bookings')} sx={{ boxShadow: 3 , backgroundColor:'#1976d2' , color:'#fff' , fontSize:'9.5px' , py: 0.5 , px: 4 , pt: 0.6 , mt: 1 , ":hover":{ backgroundColor:'#1976d2' } , width: '-webkit-fill-available' , borderRadius:'15px' }}><BorderColorIcon sx={{ width:'16px' , mt: -0.3 , mr: 0.2 }}/>Bookings</Button>
                    </Grid>
                    <Grid className="comments" xs={7} p={2} ml={0.7} backgroundColor={'lightgray'} borderRadius={3} height={'486px'} sx={{ overflowY:'auto' }}>
                    {page == 'saved' ? 
                     user.Saved.length == 0 ? 
                     <Box sx={{ color:'gray' , textAlign:'center' , mt:'50%' }}>
                        <ErrorIcon sx={{ fontSize:'80px' }}/>
                        <h3>Ther are no Saved Workers</h3>
                     </Box>
                      : user.Saved.map((worker)=>(
                        <>
                        <Grid sx={{ display:'flex' }}>
                          <IconButton onClick={()=>savedVendor(worker.vendorId)} sx={{ p:0 , my: 2.2 }}>
                            <TurnedInIcon sx={{ m: 0.5 , width:'20px' }}/>
                          </IconButton>
                          <Grid sx={{ width:'-webkit-fill-available' }}>
                          <Link href={`/worker_profile/${worker.vendorId}`} >
                            <Grid key={worker._id} xs={12} sx={{ mt: 2 , ml:0.3 , display:'flex' , color:'#000' }}>
                              <img
                                src={worker.vendorImage ? worker.vendorImage : "/null-profile.jpg"}
                                style={{ m: 0, width: "35px"  , height:"35px" , borderRadius: "50%" }}
                                alt=""
                              />
                              <Box sx={{ ml:0.5 , mt:0.5 }}>
                                <h5>{worker.vendorName}</h5>
                                <h6 style={{ fontFamily: 'monospace' }}>{worker.vendorPlace}</h6>
                              </Box>
                            </Grid>
                            </Link>
                          </Grid>
                        </Grid>
                        <hr />
                        
                        </>
                      ))
                    : page == 'bookings' ? <Bookings user={user}/> : <Connections user={user} vendor={false}/>}
                    </Grid>
                  </Box>
                </Grid>
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
 
export default Profile;