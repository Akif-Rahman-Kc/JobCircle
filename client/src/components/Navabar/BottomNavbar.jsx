import * as React from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Fab from '@mui/material/Fab';
import MenuIcon from '@mui/icons-material/Menu';
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import EngineeringIcon from "@mui/icons-material/Engineering";
import HomeIcon from "@mui/icons-material/Home";
import Link from "next/link";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { Grid } from '@mui/material';

const StyledFab = styled(Fab)({
  position: 'absolute',
  zIndex: 1,
  top: -30,
  left: 0,
  right: 0,
  margin: '0 auto',
});

export default function BottomNavbar() {
  return (
      
      <AppBar position="fixed" color="primary" sx={{ boxShadow: '1px -2px 15px 1px #888888' , top: 'auto', bottom: 0 , display:{ xs:'flex' , sm:'flex' , md:'none' } }}>
        <Toolbar>
        <Grid xs={12} display={'flex'} width={'-webkit-fill-available'} textAlign={'center'}>
            <Grid xs={2} width={'-webkit-fill-available'}>
                <Link href='/'>
            <IconButton
              sx={{ borderRadius: "10px" , color:'#111' }}
              size="large"
              aria-label="home page"
              color="inherit"
            >
              <Box
              >
                <HomeIcon />
              </Box>
            </IconButton>
            </Link>
            </Grid>
            <Grid xs={2} width={'-webkit-fill-available'}>
                <Link href='/works'>
            <IconButton
              sx={{ borderRadius: "10px" , color:'#111' }}
              size="large"
              aria-label="show the workers"
              color="inherit"
            >
              <Box
              >
                <EngineeringIcon />
              </Box>
            </IconButton>
            </Link>
            </Grid>
            <Grid xs={2} width={'-webkit-fill-available'}>
                <Link href='/messages'>
            <IconButton
              sx={{ borderRadius: "10px" , color:'#111' }}
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
            >
              <Box
              >
                <MailIcon />
              </Box>
            </IconButton>
            </Link>
            </Grid>
            <Grid xs={2} width={'-webkit-fill-available'}>
                <Link href='/notifications'>
            <IconButton
              sx={{ borderRadius: "10px" , color:'#111' }}
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Box
              >
                <NotificationsIcon />
              </Box>
            </IconButton>
            </Link>
            </Grid>
            <Grid xs={2} width={'-webkit-fill-available'}>
                <Link href='/profile'>
            <IconButton
              sx={{ borderRadius: "10px" , color:'#111' }}
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              color="inherit"
            >
              <Box
              >
                <img
                  src={"/null-profile.jpg"}
                  style={{ m: 0, width: "24px", borderRadius: "50%" }}
                  alt=""
                />
              </Box>
            </IconButton>
            </Link>
            </Grid>
        </Grid>
        </Toolbar>
      </AppBar>
  );
}