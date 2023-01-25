import Box from '@mui/material/Box';
import { Avatar, Grid } from '@mui/material';
import Sidebar from '@/components/Sidebar';
import AdminNavbar from '@/components/AdminNavbar';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import axios from 'axios';

const AdminHome = () => {
const router = useRouter()

  useEffect(()=>{
    let token=  localStorage.getItem('admintoken')
    if (token) {
      axios.post('http://localhost:4000/admin/adminAuth',{headers:{"accessAdminToken":token}}).then((response)=>{
        if (response.data.auth) {
          console.log("success");
        } else {
          router.push('/admin/signin')
        }
      })
    } else {
      router.push('/admin/signin')
    }
  })

    return ( 
        <>
        <Box>
        <Grid container sx={{ mt: 1 , justifyContent:'center' , display:'flex' }}>
            <Sidebar/>
            <Grid xs={12} sm={12} md={8.4} sx={{ m: 0.5 , display:'block' }}>
                <Box>
                    <AdminNavbar/>
                </Box>
                <Box>
                    <Grid xs={12} sx={{ p: 3 , mt: 1.5  , minHeight:'85.8vh' , boxShadow: 3 , borderRadius:'15px' , backgroundColor:'#1976d2' , color:'#fff' }}>
                        <Box>
                            <h1>aaaaa</h1>
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