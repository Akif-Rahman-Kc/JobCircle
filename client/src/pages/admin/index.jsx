import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import styles from '@/styles/adminHome.module.css'
import { Avatar, Grid } from '@mui/material';

const AdminHome = () => {
    return ( 
        <>
        <Box>
            <Grid container sx={{ mt: 1 , justifyContent:'center' , display:'flex' }}>
            <Grid md={3.3} sx={{ p: 2 , m: 0.5 , minHeight:'96.6vh' , boxShadow: 3 , borderRadius:'15px' , backgroundColor:'#1976d2' , color:'#fff' , display: { xs: 'none', sm: 'none', md: 'block' } }}>
                <Box sx={{ mt: 3 , textAlign:'center' }}>
                    <img style={{ width:'45%' }} src="/logo.png" alt="Loading..."/>
                </Box>
                <Box sx={{ mt: 4 , textAlign:'center' }}>
                    {/* ICONS PENDING */}
                    <button className={styles.button}>HOME</button>
                    <button className={styles.button}>USERS</button>
                    <button className={styles.button}>VENDORS</button>
                    <button className={styles.button}>NOTIFICATIONS</button>
                    <button className={styles.button}>PROFILE</button>
                </Box>
            </Grid>
            <Grid xs={12} sm={12} md={8.4} sx={{ m: 0.5 , display:'block' }}>
                <Box>
                    <AppBar sx={{ boxShadow: 3 , borderRadius:'20px' }} position="static">
                    <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                        Admin
                    </Typography>
                    <h6>Akif Rahman</h6>
                    <IconButton sx={{ ml: 1 , p: 0 }}>
                            <Avatar alt="Remy Sharp" src="/null-profile.jpg" />
                    </IconButton>
                    </Toolbar>
                    </AppBar>
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