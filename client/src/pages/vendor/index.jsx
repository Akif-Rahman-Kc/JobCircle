import { Inter } from '@next/font/google'
import { Box } from '@mui/system'
import { Avatar, Grid, IconButton } from '@mui/material'
import Notifications from '@/components/Notifications/Notification'
import Messages from '@/components/Messages/Message'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import { useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import VendorNavbar from '@/components/Navabar/VendorNavbar'
import { useDispatch, useSelector } from 'react-redux'
import { vendorDetails } from '@/redux/vendor'
import HomeIcon from "@mui/icons-material/Home";
import { VendorisAuthApi } from '@/Apis/vendorApi'

const inter = Inter({ subsets: ['latin'] })

export default function VendorHome() {
  const router = useRouter()
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
      <VendorNavbar/>
      <Box>
          <Grid container sx={{ justifyContent:'center' , mt: 10 , display:'flex' }}>
            <Grid md={3}>
              <Notifications/>
            </Grid>
            <Grid sm={12} md={5}>
              <Grid sm={12} md={12}>
                <Grid md={4.74} sx={{ width:'-webkit-fill-available' , backgroundColor:'#e9e5df' , borderRadius:'15px' , m: 2 , mt:-4 , pt: 4 , display:'flex' , position:'fixed' , zIndex: 99 }}>
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
                    <HomeIcon/>
                    <h3 style={{ marginLeft:'7px' , fontSize:'22px' }}>Home</h3>
                  </Grid>
                </Grid>
                <Grid sx={{ pt: 7 }}>
                <Box sx={{ p: 2 , width: '-webkit-fill-available' , boxShadow: 3 , border:'1px solid lightgray', borderRadius:'15px', minHeight: '33.2vw' , backgroundColor:'#fff' , m: 2 }}>
                  <Box sx={{ display:'flex' }}>
                    <IconButton>
                      <Avatar/>
                    </IconButton>
                    <Box sx={{ pt: 1.7 , fontFamily:'sans-serif' }}>
                      <h4>Akif Rahman</h4>
                      <h6>Driver</h6>
                    </Box>
                    <Box sx={{ ml: 'auto' , p: 0.8 , pl: 1.9 , pr: 2 , backgroundColor:'#1976d2' , mt: 2 , mb: 2 , borderRadius:'25px' , color:'#fff' }}>
                        <h6>+Connect</h6>
                    </Box>
                  </Box>
                  <p style={{ marginTop:'15px' , fontSize:'13px'}}>Its New Laptop</p>
                      <img src="https://i.pcmag.com/imagery/reviews/065rv6nxdAEcCzvE3Qb8T3v-1.fit_lim.size_840x473.v1658424542.jpg" style={{ marginTop:'10px' , width:'100%' , height:'fit-content' ,borderRadius:'5px',border:'1px solid #000' }} alt="" />
                      <Box sx={{ borderRadius:'5px' , backgroundColor:'#f5f5f5' , textAlign:'center' , display:'flex' }}>
                          <Grid xs={4}>
                            <IconButton size='large' sx={{color:'black'}}>
                                <ThumbUpOffAltIcon/>
                            </IconButton>
                          </Grid>
                          <Grid xs={4}>
                            <IconButton size='large' sx={{color:'black'}}>
                                <QuestionAnswerOutlinedIcon/>
                            </IconButton>
                          </Grid>
                          <Grid xs={4}>
                            <IconButton size='large' sx={{color:'black'}}>
                                <ShareOutlinedIcon/>
                            </IconButton>
                          </Grid>
                      </Box>
                      <Box sx={{ mt: 2 , fontFamily:'sans-serif' , display:'flex'}}>
                          <p><b>150</b> Like </p><img src="/null-profile.jpg" style={{ marginLeft:'5px' , width:'18px' , height:'fit-content' ,borderRadius:'50%',border:'1px solid #000' }} alt="" /><h6 style={{ margin:'4px' }}>Minhaj and Others</h6>
                      </Box>
                      <h5>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</h5>
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
