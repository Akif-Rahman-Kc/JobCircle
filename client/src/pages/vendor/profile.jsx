import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import Navbar from '@/components/Navbar'
import { Box } from '@mui/system'
import { Avatar, Badge, Button, colors, Grid, IconButton, Modal, Typography } from '@mui/material'
import Messages from '@/components/Message'
import Notifications from '@/components/Notification'
import Link from 'next/link';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PhotoSizeSelectActualIcon from '@mui/icons-material/PhotoSizeSelectActual';
import SmartDisplayIcon from '@mui/icons-material/SmartDisplay';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import { useState } from 'react'
import { useRouter } from 'next/router'

const inter = Inter({ subsets: ['latin'] })

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '90%' , sm:'70%' , md:'40%' },
  minHeight: { xs: '10%' , sm:'10%' , md:'10%' },
  bgcolor: '#fff',
  border: '2px solid #000',
  boxShadow: 24,
  p: 1,
  borderRadius:'10px'
};

export default function VendorProfile() {
  const router = useRouter()

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
    <div>
      <Navbar/>
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
                <Box sx={{ p: 2 , width: '-webkit-fill-available' , boxShadow: 3 , border:'1px solid lightgray', borderRadius:'15px', minHeight: '34.5vw' , backgroundColor:'#fff' , m: 2 }}>
                  <Box sx={{ display:'flex' }}>
                    <Grid xs={12} sx={{ display:'flex' }}>
                      <Grid xs={4} sx={{ fontFamily:'sans-serif' }}>
                      <img src="/null-profile.jpg" style={{ width:'35%' , height:'fit-content' ,borderRadius:'50%',border:'1px solid #000' }} alt="" />
                        <h4 style={{fontWeight:'900'}}>Akif Rahman</h4>
                        <h6>Software Developer</h6>
                        <Link style={{fontSize:'10px' , fontWeight:'900' , textDecoration:'underline'}} href='#'>Contact info</Link>
                      </Grid >
                      <Grid xs={4} sx={{ color:'blue' , textAlign:'center' , fontFamily:'sans-serif' }}>
                        <h5 style={{fontSize:'12px' , fontWeight:'800' , marginBottom:'10px' }}>Connections</h5>
                        <h4>21</h4>
                      </Grid>
                      <Grid xs={4} sx={{ mt: -1 , textAlign:'end' }}>
                        <IconButton onClick={handleOpen}>
                            <AddAPhotoIcon/>
                        </IconButton>
                          <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                          >
                            <Box sx={style}>
                              <Grid sx={{ height:'-webkit-fill-available' }}>
                                <Grid xs={12} sx={{ p: 1 }}>
                                  <img src="https://i.pcmag.com/imagery/reviews/065rv6nxdAEcCzvE3Qb8T3v-1.fit_lim.size_840x473.v1658424542.jpg" style={{ width:'100%' , height:'fit-content' ,borderRadius:'5px',border:'1px solid #000' }} alt="" />
                                </Grid>
                                <Grid xs={12} sx={{ p: 1  }}>
                                    <textarea name="" id="" style={{ width:'-webkit-fill-available' }} rows="8"></textarea>
                                </Grid>
                                <Grid xs={12} sx={{ textAlign:'end' }}>
                                  <Button onClick={handleClose} sx={{ pl: 2 , pr: 2 , mr: 1 , backgroundColor:'#1976d2' , color:'#fff' , fontWeight:'900' , fontSize:'12px' , ":hover":{ backgroundColor:'#1976d2'}}}>
                                      Cancel
                                  </Button>
                                  <Button sx={{ pl: 2 , pr: 2 , mr: 1 , backgroundColor:'#1976d2' , color:'#fff' , fontWeight:'900' , fontSize:'12px' , ":hover":{ backgroundColor:'#1976d2'}}}>
                                      Submit
                                  </Button>
                                </Grid>
                              </Grid>
                            </Box>
                          </Modal>
                        <IconButton>
                            <MoreVertIcon/>
                        </IconButton>
                      </Grid>
                    </Grid>
                  </Box>
                  <Link href='/vendor/edit_profile'><Grid xs={12} sx={{ mt: 2 , p: 0.8 , boxShadow: 3 , textAlign:'center' , border:'1px solid lightgray' , borderRadius:'5px' , ":active":{ backgroundColor:'#f1f0f0' } }}>
                    <h6>EDIT PROFILE</h6>
                  </Grid></Link>
                  <Grid xs={12} sx={{ mt: 2 , p: 1 , display:'flex' , textAlign:'center' , border:'4px outset lightgray' , borderRadius:'10px' }}>
                    <Grid xs={6}>
                        <IconButton size='small' sx={{color:'#111' , borderRadius:'10px'}}>
                          <PhotoSizeSelectActualIcon/>
                          <h4 style={{marginLeft:'6px' , fontFamily:'sans-serif' }}>Photos</h4>
                      </IconButton>
                    </Grid>
                    <Grid xs={6}>
                        <IconButton size='small' sx={{color:'#111' , borderRadius:'10px'}}>
                          <SmartDisplayIcon/>
                          <h4 style={{marginLeft:'6px' , fontFamily:'sans-serif' }}>Vidoes</h4>
                      </IconButton>
                    </Grid>
                  </Grid>
                  <Grid xs={12} sx={{ mt: 2 }}>
                      <Box sx={{ display:'flex' }}>
                          <img src="/null-profile.jpg" style={{ width:'8%' , height:'fit-content' ,borderRadius:'50%',border:'1px solid #000' }} alt="" />
                          <h5 style={{ fontWeight:'900' , margin:'5px'}}>Akif Rahman</h5>
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
                      
                  </Grid>
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
