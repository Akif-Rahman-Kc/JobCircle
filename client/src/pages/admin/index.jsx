import Box from '@mui/material/Box';
import { Grid, Typography } from '@mui/material';
import Sidebar from '@/components/Navabar/Sidebar';
import AdminNavbar from '@/components/Navabar/AdminNavbar';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { AdminisAuthApi, GetTotalCount } from '@/Apis/adminApi';

const AdminHome = () => {
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

  useEffect(()=>{
    async function invoke(){
      let token=  localStorage.getItem('admintoken')
      const res = await GetTotalCount(token)
    }
    invoke();
  },[])

    return ( 
        <>
        <Box>
        <Grid sx={{ mt: 1 , justifyContent:'center' , display:'flex' }}>
            {<Sidebar/>}
            <Grid xs={12} sm={12} md={8.4} sx={{ m: 0.5 , display:'block' , width:'-webkit-fill-available'}}>
                <Box>
                    <AdminNavbar/>
                </Box>
                <Box>
                    <Grid xs={12} sx={{ p: 3 , mt: 1.5  , minHeight:'85.8vh' , boxShadow: 3 , borderRadius:'15px' , backgroundColor:'#1976d2' , color:'#fff' }}>
                        <Box>
                            <Grid sx={{ display:{ xs:'block' , sm:'block' , md:'flex' } }}>
                              <Grid m={0.5} sx={{ width:{ xs:'100%' , sm:'100%' , md:'50%' } , display:'flex' , justifyContent:'center' , alignItems:'center' , boxShadow:'1px 1px 10px #111' , bgcolor:'lightgray' }} borderRadius={'10px'}>
                                <Box>
                                  <img src="https://img.freepik.com/free-icon/crowd-users_318-50125.jpg?w=360" alt="" style={{ width:'100%' , borderBottomLeftRadius:'9px' , marginBottom:'-4px' , borderTopLeftRadius:'9px' }} />
                                </Box>
                                <Box sx={{ display:'block' , textAlign:'center' , width:'-webkit-fill-available' , color:'#000' }}>
                                    <h2>Users</h2>
                                    <h1 style={{ fontSize:'55px' }}>128</h1>
                                    <h6>Last updated 3 minutes ago</h6>
                                </Box>
                              </Grid>
                              <Grid m={0.5} sx={{ width:{ xs:'100%' , sm:'100%' , md:'50%' } , display:'flex' , justifyContent:'center' , alignItems:'center' , boxShadow:'1px 1px 10px #111' , bgcolor:'lightgray' }} borderRadius={'10px'}>
                                <Box>
                                  <img src="https://cdn.pixabay.com/photo/2016/04/15/18/05/computer-1331579__340.png" alt="" style={{ width:'103%' , borderBottomLeftRadius:'9px' , marginBottom:'-4px' , borderTopLeftRadius:'9px' }} />
                                </Box>
                                <Box sx={{ display:'block' , textAlign:'center' , width:'-webkit-fill-available' , color:'#000' }}>
                                    <h2>Vendors</h2>
                                    <h1 style={{ fontSize:'55px' }}>23</h1>
                                    <h6>Last updated 3 minutes ago</h6>
                                </Box>
                              </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                </Box>
            </Grid>
        </Grid>
        </Box>
        </>
     );
}
 
export default AdminHome;