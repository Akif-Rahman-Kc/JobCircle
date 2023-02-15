import Box from '@mui/material/Box';
import { Grid, IconButton } from '@mui/material';
import Sidebar from '@/components/Navabar/Sidebar';
import AdminNavbar from '@/components/Navabar/AdminNavbar';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { AdminisAuthApi } from '@/Apis/adminApi';
import Navbar from '@/components/Navabar/Navbar';
import HomeIcon from "@mui/icons-material/Home";
import BottomNavbar from '@/components/Navabar/BottomNavbar';

const Messages = () => {
const router = useRouter()

  useEffect(()=>{
    async function invoke(){
      let token=  localStorage.getItem('admintoken')
      if (token) {
        const response = await AdminisAuthApi(token)
        if (response) {
          if (response.auth) {
            console.log("success");
          } else {
            router.push('/admin/signin')
          }
        }
      } else {
        router.push('/admin/signin')
      }
    }
    invoke();
  },[])

    return ( 
        <>
        <Navbar />
        <Box sx={{ mt: 12 }}>
        <Grid sx={{ mt: 1 , justifyContent:'center' , display:'flex' , ml:{ xs: 1 , sm: 3 , md: 6 } , mr:{ xs: 3 , sm: 5 , md: 7 } }}>
            <Grid md={3.3} sx={{ width:'35%' , mx: 1 , height:'84vh' , borderRadius:'15px' , backgroundColor:'#fff' , color:'#000' , boxShadow: 3 , border:'1px solid lightgray' , display: { xs: 'none', sm: 'none', md: 'block' } }}>
            <Grid sx={{ boxShadow: 3 , m: 3 , p: 1.9 , width: '-webkit-fill-available', height:'50px' , backgroundColor:'lightgray' , borderRadius:'10px' , display:'flex' , justifyContent:'center' }}>
                  <NotificationsIcon />
                <h3 style={{marginLeft:'6px' , fontWeight:'revert' }}>NOTIFICATIONS</h3>
              </Grid>
              <Grid className='comp' sx={{ boxShadow: 3 , m: 3 , p: 1 , width: '-webkit-fill-available', height: '30vw' , backgroundColor:'lightgray' , borderRadius:'10px' , overflowY:'scroll' , overflowX: 'hidden' }}>
                <Box sx={{ m: 1 , p: 1 , width: '-webkit-fill-available' , backgroundColor:'#fff' , borderRadius:'10px' }}>
                  <h5>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</h5>
                </Box>
                <Box sx={{ m: 1 , p: 1 , width: '-webkit-fill-available' , backgroundColor:'#fff' , borderRadius:'10px' }}>
                  <h5>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</h5>
                </Box>
                <Box sx={{ m: 1 , p: 1 , width: '-webkit-fill-available' , backgroundColor:'#fff' , borderRadius:'10px' }}>
                  <h5>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</h5>
                </Box>
                <Box sx={{ m: 1 , p: 1 , width: '-webkit-fill-available' , backgroundColor:'#fff' , borderRadius:'10px' }}>
                  <h5>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</h5>
                </Box>
                <Box sx={{ m: 1 , p: 1 , width: '-webkit-fill-available' , backgroundColor:'#fff' , borderRadius:'10px' }}>
                  <h5>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</h5>
                </Box>
                <Box sx={{ m: 1 , p: 1 , width: '-webkit-fill-available' , backgroundColor:'#fff' , borderRadius:'10px' }}>
                  <h5>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</h5>
                </Box>
                <Box sx={{ m: 1 , p: 1 , width: '-webkit-fill-available' , backgroundColor:'#fff' , borderRadius:'10px' }}>
                  <h5>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</h5>
                </Box>
                <Box sx={{ m: 1 , p: 1 , width: '-webkit-fill-available' , backgroundColor:'#fff' , borderRadius:'10px' }}>
                  <h5>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</h5>
                </Box>
                <Box sx={{ m: 1 , p: 1 , width: '-webkit-fill-available' , backgroundColor:'#fff' , borderRadius:'10px' }}>
                  <h5>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</h5>
                </Box>
                <Box sx={{ m: 1 , p: 1 , width: '-webkit-fill-available' , backgroundColor:'#fff' , borderRadius:'10px' }}>
                  <h5>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</h5>
                </Box>
                <Box sx={{ m: 1 , p: 1 , width: '-webkit-fill-available' , backgroundColor:'#fff' , borderRadius:'10px' }}>
                  <h5>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</h5>
                </Box>
                <Box sx={{ m: 1 , p: 1 , width: '-webkit-fill-available' , backgroundColor:'#fff' , borderRadius:'10px' }}>
                  <h5>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</h5>
                </Box>
              </Grid>
            </Grid>
            <Grid xs={12} sm={12} md={8.4} sx={{ ml: 2 , display:'block' , width:'-webkit-fill-available'}}>
                <Box>
                    <Box sx={{ p: 2 , width: "-webkit-fill-available" , justifyContent: "center" , boxShadow: 3 , display:'flex' , border: "1px solid lightgray" , borderRadius: "15px" , minHeight: "4.0vw" , backgroundColor: "#fff", }}>
                        <HomeIcon/>
                        <h3 style={{ marginLeft:'7px' , fontSize:'22px' }}>Home</h3>
                    </Box>
                </Box>
                <Box>
                    <Grid xs={12} sx={{ p: 2 , mt: 1.5  , minHeight:{ xs: '60.7vh' , sm:'60vh' , md:'73.5vh' } , boxShadow: 3 , borderRadius:'15px' , backgroundColor:'#fff' , color:'#000' }}>
                        <Grid sx={{ display:{ xs:'none' , sm:'none' , md:'flex' } }}>
                            <Grid className='comments' sx={{ p: 1 , width:'35%' , height:'69vh' , borderRadius:'15px' , backgroundColor:'#e3e3e3' , color:'#000' , boxShadow: 3 , border:'1px solid lightgray' , overflowY:'auto' }}>
                            <Box>
                                <img src="/null-profile.jpg" style={{ width:'17%' , height:'17%' ,borderRadius:'50%',border:'1px solid #000' }} alt="" />
                                <Box sx={{ display:'flex' , justifyContent:'center' , alignItems:'center' }}>
                                    <h5 style={{ fontSize:'13px'  , marginLeft:'5px' }}>Akif Rahman</h5>
                                </Box>
                            </Box>

                            {/* /////////////////////////////////////   Profile ////////////////////////////// */}
                            <IconButton size='large' sx={{p: 1 , color:'blue' , borderRadius:'0' , width:'100% '}}>
                                <Box sx={{width: '-webkit-fill-available' , color:'#111' , display:'flex'}}>
                                    <img src="/null-profile.jpg" style={{ width:'17%' , height:'17%' ,borderRadius:'50%',border:'1px solid #000' }} alt="" />
                                    <Box sx={{ display:'flex' , justifyContent:'center' , alignItems:'center' }}>
                                        <h5 style={{ fontSize:'13px'  , marginLeft:'5px' }}>Akif Rahman</h5>
                                    </Box>
                                    <p style={{ fontSize:'11px'  , marginLeft:'auto' }}>Jan 10</p>
                                </Box>
                            </IconButton>
                            <hr />
                            <IconButton size='large' sx={{p: 1 , color:'blue' , borderRadius:'0' , width:'100% '}}>
                                <Box sx={{width: '-webkit-fill-available' , color:'#111' , display:'flex'}}>
                                    <img src="/null-profile.jpg" style={{ width:'17%' , height:'17%' ,borderRadius:'50%',border:'1px solid #000' }} alt="" />
                                    <Box sx={{ display:'flex' , justifyContent:'center' , alignItems:'center' }}>
                                        <h5 style={{ fontSize:'13px'  , marginLeft:'5px' }}>Akif Rahman</h5>
                                    </Box>
                                    <p style={{ fontSize:'11px'  , marginLeft:'auto' }}>Jan 10</p>
                                </Box>
                            </IconButton>
                            <hr />
                            <IconButton size='large' sx={{p: 1 , color:'blue' , borderRadius:'0' , width:'100% '}}>
                                <Box sx={{width: '-webkit-fill-available' , color:'#111' , display:'flex'}}>
                                    <img src="/null-profile.jpg" style={{ width:'17%' , height:'17%' ,borderRadius:'50%',border:'1px solid #000' }} alt="" />
                                    <Box sx={{ display:'flex' , justifyContent:'center' , alignItems:'center' }}>
                                        <h5 style={{ fontSize:'13px'  , marginLeft:'5px' }}>Akif Rahman</h5>
                                    </Box>
                                    <p style={{ fontSize:'11px'  , marginLeft:'auto' }}>Jan 10</p>
                                </Box>
                            </IconButton>
                            <hr />
                            <IconButton size='large' sx={{p: 1 , color:'blue' , borderRadius:'0' , width:'100% '}}>
                                <Box sx={{width: '-webkit-fill-available' , color:'#111' , display:'flex'}}>
                                    <img src="/null-profile.jpg" style={{ width:'17%' , height:'17%' ,borderRadius:'50%',border:'1px solid #000' }} alt="" />
                                    <Box sx={{ display:'flex' , justifyContent:'center' , alignItems:'center' }}>
                                        <h5 style={{ fontSize:'13px'  , marginLeft:'5px' }}>Akif Rahman</h5>
                                    </Box>
                                    <p style={{ fontSize:'11px'  , marginLeft:'auto' }}>Jan 10</p>
                                </Box>
                            </IconButton>
                            <hr />
                            <IconButton size='large' sx={{p: 1 , color:'blue' , borderRadius:'0' , width:'100% '}}>
                                <Box sx={{width: '-webkit-fill-available' , color:'#111' , display:'flex'}}>
                                    <img src="/null-profile.jpg" style={{ width:'17%' , height:'17%' ,borderRadius:'50%',border:'1px solid #000' }} alt="" />
                                    <Box sx={{ display:'flex' , justifyContent:'center' , alignItems:'center' }}>
                                        <h5 style={{ fontSize:'13px'  , marginLeft:'5px' }}>Akif Rahman</h5>
                                    </Box>
                                    <p style={{ fontSize:'11px'  , marginLeft:'auto' }}>Jan 10</p>
                                </Box>
                            </IconButton>
                            <hr />
                            <IconButton size='large' sx={{p: 1 , color:'blue' , borderRadius:'0' , width:'100% '}}>
                                <Box sx={{width: '-webkit-fill-available' , color:'#111' , display:'flex'}}>
                                    <img src="/null-profile.jpg" style={{ width:'17%' , height:'17%' ,borderRadius:'50%',border:'1px solid #000' }} alt="" />
                                    <Box sx={{ display:'flex' , justifyContent:'center' , alignItems:'center' }}>
                                        <h5 style={{ fontSize:'13px'  , marginLeft:'5px' }}>Akif Rahman</h5>
                                    </Box>
                                    <p style={{ fontSize:'11px'  , marginLeft:'auto' }}>Jan 10</p>
                                </Box>
                            </IconButton>
                            <hr />
                            <IconButton size='large' sx={{p: 1 , color:'blue' , borderRadius:'0' , width:'100% '}}>
                                <Box sx={{width: '-webkit-fill-available' , color:'#111' , display:'flex'}}>
                                    <img src="/null-profile.jpg" style={{ width:'17%' , height:'17%' ,borderRadius:'50%',border:'1px solid #000' }} alt="" />
                                    <Box sx={{ display:'flex' , justifyContent:'center' , alignItems:'center' }}>
                                        <h5 style={{ fontSize:'13px'  , marginLeft:'5px' }}>Akif Rahman</h5>
                                    </Box>
                                    <p style={{ fontSize:'11px'  , marginLeft:'auto' }}>Jan 10</p>
                                </Box>
                            </IconButton>
                            <hr />
                            <IconButton size='large' sx={{p: 1 , color:'blue' , borderRadius:'0' , width:'100% '}}>
                                <Box sx={{width: '-webkit-fill-available' , color:'#111' , display:'flex'}}>
                                    <img src="/null-profile.jpg" style={{ width:'17%' , height:'17%' ,borderRadius:'50%',border:'1px solid #000' }} alt="" />
                                    <Box sx={{ display:'flex' , justifyContent:'center' , alignItems:'center' }}>
                                        <h5 style={{ fontSize:'13px'  , marginLeft:'5px' }}>Akif Rahman</h5>
                                    </Box>
                                    <p style={{ fontSize:'11px'  , marginLeft:'auto' }}>Jan 10</p>
                                </Box>
                            </IconButton>
                            <hr />
                            <IconButton size='large' sx={{p: 1 , color:'blue' , borderRadius:'0' , width:'100% '}}>
                                <Box sx={{width: '-webkit-fill-available' , color:'#111' , display:'flex'}}>
                                    <img src="/null-profile.jpg" style={{ width:'17%' , height:'17%' ,borderRadius:'50%',border:'1px solid #000' }} alt="" />
                                    <Box sx={{ display:'flex' , justifyContent:'center' , alignItems:'center' }}>
                                        <h5 style={{ fontSize:'13px'  , marginLeft:'5px' }}>Akif Rahman</h5>
                                    </Box>
                                    <p style={{ fontSize:'11px'  , marginLeft:'auto' }}>Jan 10</p>
                                </Box>
                            </IconButton>
                            <hr />
                            </Grid>
                            <Grid sx={{ p: 1 , width:'65%' , ml: 1 , height:'69vh' , borderRadius:'15px' , backgroundColor:'#e3e3e3' , color:'#000' , boxShadow: 3 , border:'1px solid lightgray' }}>
                                aaaa
                            </Grid>
                        </Grid>
                        <Grid sx={{ display:{ xs:'flex' , sm:'flex' , md:'none' } }}>
                            <Grid sx={{ p: 1 , width:'100%' , height:'58vh' , borderRadius:'15px' , backgroundColor:'#e3e3e3' , color:'#000' , boxShadow: 3 , border:'1px solid lightgray' }}>
                                aaaa
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Grid>
        </Grid>
        </Box>
        <BottomNavbar/>
        </>
     );
}
 
export default Messages;