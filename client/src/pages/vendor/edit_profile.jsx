import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import Navbar from '@/components/Navbar'
import { Box } from '@mui/system'
import { Avatar, Button, Grid, IconButton, TextField } from '@mui/material'
import Notifications from '@/components/Notification'
import Messages from '@/components/Message'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import { useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import VendorNavbar from '@/components/VendorNavbar'
import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined';

const inter = Inter({ subsets: ['latin'] })

export default function VendorEditProfile() {
  const router = useRouter()

  useEffect(()=>{
    let token=  localStorage.getItem('vendortoken')
    if (token) {
      axios.post('http://localhost:4000/vendor/vendorAuth',{headers:{"accessVendorToken":token}}).then((response)=>{
        if (response.data.auth) {
          console.log("success");
        } else {
          router.push('/vendor/signin')
        }
      })
    } else {
      router.push('/vendor/signin')
    }
  })

  return (
    <>
    <div>
      <VendorNavbar/>
      <Box>
          <Grid container sx={{ justifyContent:'center' , mt: 10 , display:'flex' }}>
            <Grid md={3}>
              <Notifications/>
            </Grid>
            <Grid sm={12} md={5}>
              <Grid sm={12} md={12}>
                <Grid md={4.74} sx={{ width:'-webkit-fill-available' , backgroundColor:'#e9e5df' , borderRadius:'15px' , m: 2 , mt:-4 , pt: 4 , display:'flex' , position:'fixed' , zIndex: 99 }}>
                <Grid sx={{ p: 2 , width: '-webkit-fill-available' , textAlign:'center' ,  boxShadow: 3 , border:'1px solid lightgray', borderRadius:'15px', minHeight: '4.0vw' , backgroundColor:'#fff'}}>
                  <h2>Welcome To JobCircle</h2>
                </Grid>
                </Grid>
                <Grid sx={{ pt: 7 }}>
                <Box sx={{ p: 3 , width: '-webkit-fill-available' , boxShadow: 3 , border:'1px solid lightgray', borderRadius:'15px', minHeight: '34.4vw' , backgroundColor:'#fff' , m: 2 }}>
                  <Box sx={{ p: 2 , backgroundColor:'lightgray' , width:'100%' , minHeight:'inherit' , borderRadius:'10px' }}>
                    <Box sx={{ p: 0.5 , backgroundColor:'#fff' , width:'fit-content' }}>
                        <img src="/null-profile.jpg" style={{ width:'98px' , height:'fit-content' ,borderRadius:'50%' }} alt="" />
                        <AddAPhotoOutlinedIcon sx={{ ml: -1 }}/>
                    </Box>
                    <Box>
                        <Grid container spacing={2} sx={{ mt: 3 }} >
                            <Grid item xs={6}>
                                <TextField
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                name="firstName"
                                autoComplete="family-name"
                                autoFocus
                                sx={{ backgroundColor:'#fff' }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="family-name"
                                autoFocus
                                sx={{ backgroundColor:'#fff' }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                required
                                fullWidth
                                id="locality"
                                label="Locality"
                                name="locality"
                                autoComplete="family-name"
                                autoFocus
                                sx={{ backgroundColor:'#fff' }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                required
                                fullWidth
                                id="city"
                                label="City"
                                name="city"
                                autoComplete="family-name"
                                autoFocus
                                sx={{ backgroundColor:'#fff' }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                required
                                fullWidth
                                id="state"
                                label="State"
                                name="state"
                                autoComplete="family-name"
                                autoFocus
                                sx={{ backgroundColor:'#fff' }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                required
                                fullWidth
                                id="email"
                                label="E-mail"
                                name="email"
                                autoComplete="family-name"
                                autoFocus
                                sx={{ backgroundColor:'#fff' }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                required
                                fullWidth
                                id="job"
                                label="Job"
                                name="job"
                                autoComplete="family-name"
                                autoFocus
                                sx={{ backgroundColor:'#fff' }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                required
                                fullWidth
                                id="experiance"
                                label="Experiance per Year"
                                name="experiance"
                                autoComplete="family-name"
                                autoFocus
                                sx={{ backgroundColor:'#fff' }}
                                />
                            </Grid>
                        </Grid>
                        <Grid sx={{ textAlign:'end' }}>
                            <Button sx={{ pl: 4 , pr: 4 , mt: 3 , backgroundColor:'#1976d2' , color:'#fff' , fontWeight:'900' , ":hover":{ backgroundColor:'#1976d2'}}}>
                                Save
                            </Button>
                        </Grid>
                    </Box>
                  </Box>
                </Box>
                </Grid>
            </Grid>
            </Grid>
            <Grid md={3}>
              <Messages/>
            </Grid>
          </Grid>
      </Box>
    </div>
    </>
  )
}
