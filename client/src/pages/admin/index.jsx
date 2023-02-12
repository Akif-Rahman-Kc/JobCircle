import Box from '@mui/material/Box';
import { Grid } from '@mui/material';
import Sidebar from '@/components/Navabar/Sidebar';
import AdminNavbar from '@/components/Navabar/AdminNavbar';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { AdminisAuthApi } from '@/Apis/adminApi';

const AdminHome = () => {
const router = useRouter()
const [ open, setOpen ] = useState(false)

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
        <Box>
        <Grid sx={{ mt: 1 , justifyContent:'center' , display:'flex' }}>
            { open && <Sidebar/>}
            <Grid xs={12} sm={12} md={8.4} sx={{ m: 0.5 , display:'block' , width:'-webkit-fill-available'}}>
                <Box>
                    <AdminNavbar setOPEN = {setOpen} Open = {open}/>
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