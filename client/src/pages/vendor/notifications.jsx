import Box from '@mui/material/Box';
import { Avatar, Button, Grid, IconButton, Input } from '@mui/material';
import Sidebar from '@/components/Navabar/Sidebar';
import AdminNavbar from '@/components/Navabar/AdminNavbar';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { AdminisAuthApi } from '@/Apis/adminApi';
import Navbar from '@/components/Navabar/Navbar';
import MailIcon from "@mui/icons-material/Mail";
import HomeIcon from "@mui/icons-material/Home";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import BottomNavbar from '@/components/Navabar/BottomNavbar';
import { GetChats, GetNotifications, isAuthApi } from '@/Apis/userApi';
import { AuthContext } from '@/store/Context';
import { useDispatch, useSelector } from 'react-redux';
import MessageSideOne from '@/components/Messages/MessageSide1';
import { userDetails } from '@/redux/user';
import { VendorisAuthApi } from '@/Apis/vendorApi';
import { vendorDetails } from '@/redux/vendor';
import VendorNavbar from '@/components/Navabar/VendorNavbar';
import VendorBottomNavbar from '@/components/Navabar/VendorBottomNavbar';

const VendorNotifications = () => {

    const router = useRouter()
    const [ chats, setChats ] = useState([])
    const [ notifications, setNotifications ] = useState([])
    const { vendor } = useSelector((state) => state.vendorInfo);
    const dispatch = useDispatch()
    const { setCurrentChat, currentChat } = useContext(AuthContext)

    useEffect(()=>{
        async function invoke(){
            let token=  localStorage.getItem('vendortoken')
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
        invoke()
    },[])

    useEffect(()=>{
        async function invoke(){
        const res = await GetChats(vendor._id)
        if (res) {
            setChats(res)
        }

        }
        invoke()
    },[vendor])

    useEffect(()=>{
        async function invoke(){
        const res = await GetNotifications(vendor._id)
        if (res) {
            setNotifications(res)
        }

        }
        invoke()
    },[vendor])

    return ( 
        <>
        <VendorNavbar />
        <Box sx={{ mt: { xs: 10 , sm: 11 , md: 12} }}>
        <Grid sx={{ mt: 1 , justifyContent:'center' , display:'flex' , ml:{ xs: 1 , sm: 3 , md: 6 } , mr:{ xs: 3 , sm: 5 , md: 7 } }}>
            <Grid md={3.3} sx={{ width:'35%' , mx: 1 , height:'84vh' , borderRadius:'15px' , backgroundColor:'#fff' , color:'#000' , boxShadow: 3 , border:'1px solid lightgray' , display: { xs: 'none', sm: 'none', md: 'block' } }}>
                <Grid sx={{ boxShadow: 3 , m: 3 , p: 1.9 , width: '-webkit-fill-available', height:'50px' , backgroundColor:'lightgray' , borderRadius:'10px' , display:'flex' , justifyContent:'center' }}>
                    <MailIcon />
                    <h3 style={{marginLeft:'6px' , fontWeight:'revert' }}>MESSAGES</h3>
                </Grid>
                <Grid className='comp' sx={{ boxShadow: 3 , m: 3 , p: 1 , width: '-webkit-fill-available', height: '30vw' , backgroundColor:'lightgray' , borderRadius:'10px' , overflowY:'scroll' , overflowX: 'hidden' }}>
                    {chats.map((chat)=>(
                        <>
                            <IconButton onClick={()=>{
                                setCurrentChat(chat)
                                router.push('/messages')
                            }} size='large' sx={{p: 1 , color:'blue' , borderRadius:'0' , width:'100% '}}>
                                <MessageSideOne data={chat} currentUserId={vendor._id}/>
                            </IconButton>
                            <hr />
                        </>
                    ))}
                </Grid>
            </Grid>
            <Grid xs={12} sm={12} md={8.4} sx={{ ml: 2 , display:'block' , width:'-webkit-fill-available'}}>
                <Box>
                    <Box sx={{ p: 2 , width: "-webkit-fill-available" , justifyContent: "center" , boxShadow: 3 , display:'flex' , border: "1px solid lightgray" , borderRadius: "15px" , minHeight: "4.0vw" , backgroundColor: "#fff", }}>
                        <NotificationsIcon/>
                        <h3 style={{ marginLeft:'7px' , fontSize:'22px' }}>Notifications</h3>
                    </Box>
                </Box>
                <Box>
                    <Grid xs={12} sx={{ p: 2 , mt: 1.5  , minHeight:{ xs: '60.7vh' , sm:'60vh' , md:'73.5vh' } , boxShadow: 3 , borderRadius:'15px' , backgroundColor:'#fff' , color:'#000' }}>
                        <Grid>
                            <Grid className='comments' sx={{ p: 2 , width:'100%' , height:'69vh' , borderRadius:'15px' , backgroundColor:'#e3e3e3' , color:'#000' , boxShadow: 3 , border:'1px solid lightgray' , overflowY:'auto' }}>
                                {
                                    notifications.map((notification)=>(
                                        <Box sx={{ display:'flex' , backgroundColor:'#fff' , p: 1.5 , borderRadius:'10px' , mb: 0.6 , lineBreak:'anywhere' }}>
                                            <Box sx={{ lineBreak:'anywhere' , width:'90%' }}>
                                                <h4>{notification.content}</h4>
                                            </Box>
                                            <FiberManualRecordIcon sx={{ color:'#8989ff' , width:'15px' , ml:'auto' }}/>
                                        </Box>
                                    ))
                                }
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Grid>
        </Grid>
        </Box>
        <VendorBottomNavbar/>
        </>
     );
}
 
export default VendorNotifications;