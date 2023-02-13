import { Box } from '@mui/system'
import { Badge, colors, Grid, IconButton } from '@mui/material'
import MailIcon from '@mui/icons-material/Mail';

const Messages = () => {
    return ( 
        <>
        <Grid sx={{ position:'fixed' , boxShadow: 3 , border:'1px solid lightgray', borderRadius:'15px' , height: '-webkit-fill-available' , backgroundColor:'#fff' , display: { xs: 'none', sm: 'none', md: 'block' } }} md={3}>
              <Grid sx={{ boxShadow: 3 , m: 3 , p: 1.9 , width: '-webkit-fill-available', height:'50px' , backgroundColor:'lightgray' , borderRadius:'10px' , display:'flex' , justifyContent:'center' }}>
                  <MailIcon />
                <h3 style={{marginLeft:'6px' , fontWeight:'revert' }}>MESSAGES</h3>
              </Grid>
              <Grid className='comp' sx={{ boxShadow: 3 , m: 3 , p: 1 , width: '-webkit-fill-available', height: '-webkit-fill-available' , backgroundColor:'lightgray' , borderRadius:'10px' , overflowY:'scroll' , overflowX: 'hidden' }}>
                <IconButton size='large' sx={{p: 1 , color:'blue' , borderRadius:'0' , width:'100% '}}>
                <Box sx={{width: '-webkit-fill-available' , color:'#111' , display:'flex'}}>
                  <img src="/null-profile.jpg" style={{ width:'18%',borderRadius:'50%',border:'1px solid #000' }} alt="" />
                  <h5 style={{ fontSize:'13px'  , marginLeft:'5px' , lineHeight:'4' }}>Akif Rahman</h5>
                  <p style={{ fontSize:'11px'  , marginLeft:'auto' }}>Jan 10</p>
                </Box>
                </IconButton>
                <hr />
                <IconButton size='large' sx={{p: 1 , color:'blue' , borderRadius:'0' , width:'100% '}}>
                <Box sx={{width: '-webkit-fill-available' , color:'#111' , display:'flex'}}>
                  <img src="/null-profile.jpg" style={{ width:'18%',borderRadius:'50%',border:'1px solid #000' }} alt="" />
                  <h5 style={{ fontSize:'13px'  , marginLeft:'5px' , lineHeight:'4' }}>Akif Rahman</h5>
                  <p style={{ fontSize:'11px'  , marginLeft:'auto' }}>Jan 10</p>
                </Box>
                </IconButton>
                <hr />
                <IconButton size='large' sx={{p: 1 , color:'blue' , borderRadius:'0' , width:'100% '}}>
                <Box sx={{width: '-webkit-fill-available' , color:'#111' , display:'flex'}}>
                  <img src="/null-profile.jpg" style={{ width:'18%',borderRadius:'50%',border:'1px solid #000' }} alt="" />
                  <h5 style={{ fontSize:'13px'  , marginLeft:'5px' , lineHeight:'4' }}>Akif Rahman</h5>
                  <p style={{ fontSize:'11px'  , marginLeft:'auto' }}>Jan 10</p>
                </Box>
                </IconButton>
                <hr />
                <IconButton size='large' sx={{p: 1 , color:'blue' , borderRadius:'0' , width:'100% '}}>
                <Box sx={{width: '-webkit-fill-available' , color:'#111' , display:'flex'}}>
                  <img src="/null-profile.jpg" style={{ width:'18%',borderRadius:'50%',border:'1px solid #000' }} alt="" />
                  <h5 style={{ fontSize:'13px'  , marginLeft:'5px' , lineHeight:'4' }}>Akif Rahman</h5>
                  <p style={{ fontSize:'11px'  , marginLeft:'auto' }}>Jan 10</p>
                </Box>
                </IconButton>
                <hr />
                <IconButton size='large' sx={{p: 1 , color:'blue' , borderRadius:'0' , width:'100% '}}>
                <Box sx={{width: '-webkit-fill-available' , color:'#111' , display:'flex'}}>
                  <img src="/null-profile.jpg" style={{ width:'18%',borderRadius:'50%',border:'1px solid #000' }} alt="" />
                  <h5 style={{ fontSize:'13px'  , marginLeft:'5px' , lineHeight:'4' }}>Akif Rahman</h5>
                  <p style={{ fontSize:'11px'  , marginLeft:'auto' }}>Jan 10</p>
                </Box>
                </IconButton>
                <hr />
                <IconButton size='large' sx={{p: 1 , color:'blue' , borderRadius:'0' , width:'100% '}}>
                <Box sx={{width: '-webkit-fill-available' , color:'#111' , display:'flex'}}>
                  <img src="/null-profile.jpg" style={{ width:'18%',borderRadius:'50%',border:'1px solid #000' }} alt="" />
                  <h5 style={{ fontSize:'13px'  , marginLeft:'5px' , lineHeight:'4' }}>Akif Rahman</h5>
                  <p style={{ fontSize:'11px'  , marginLeft:'auto' }}>Jan 10</p>
                </Box>
                </IconButton>
                <hr />
                <IconButton size='large' sx={{p: 1 , color:'blue' , borderRadius:'0' , width:'100% '}}>
                <Box sx={{width: '-webkit-fill-available' , color:'#111' , display:'flex'}}>
                  <img src="/null-profile.jpg" style={{ width:'18%',borderRadius:'60%',border:'1px solid #000' }} alt="" />
                  <h5 style={{ fontSize:'13px'  , marginLeft:'5px' , lineHeight:'4' }}>Akif Rahman</h5>
                  <p style={{ fontSize:'11px'  , marginLeft:'auto' }}>Jan 10</p>
                </Box>
                </IconButton>
                <hr />
                <IconButton size='large' sx={{p: 1 , color:'blue' , borderRadius:'0' , width:'100% '}}>
                <Box sx={{width: '-webkit-fill-available' , color:'#111' , display:'flex'}}>
                  <img src="/null-profile.jpg" style={{ width:'18%',borderRadius:'50%',border:'1px solid #000' }} alt="" />
                  <h5 style={{ fontSize:'13px'  , marginLeft:'5px' , lineHeight:'4' }}>Akif Rahman</h5>
                  <p style={{ fontSize:'11px'  , marginLeft:'auto' }}>Jan 10</p>
                </Box>
                </IconButton>
                <hr />
              </Grid>
            </Grid>
        </>
     );
}
 
export default Messages;