import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { Avatar, Button, Drawer, Grid } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from '@/styles/adminHome.module.css'
import ReportIcon from '@mui/icons-material/Report';
import Link from "next/link";
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import EngineeringRoundedIcon from '@mui/icons-material/EngineeringRounded';
import PlaylistAddCheckCircleRoundedIcon from '@mui/icons-material/PlaylistAddCheckCircleRounded';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import ManageAccountsRoundedIcon from '@mui/icons-material/ManageAccountsRounded';
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

const drawerWidth = '50%';

export default function AdminNavbar(props) {
  const router = useRouter()
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const logout=()=>{
    localStorage.removeItem('admintoken')
    router.push('/admin/signin')
  }
  
  const drawer = (
    <>
      <Grid md={3.3} sx={{ p: 2 , m: 0.5 , boxShadow: 3 , borderRadius:'15px' , backgroundColor:'#1976d2' , color:'#fff' , height:'inherit'  }}>
                <Box sx={{ mt: 3 , textAlign:'center' }}>
                    <img style={{ width:'37%' }} src="/logo.png" alt="Loading..."/>
                </Box>
                <Box sx={{ mt: 4 , textAlign:' -webkit-center' }}>
                    <Link href='/admin'>
                    <Box className={styles.buttonXs}>
                        <HomeRoundedIcon sx={{ width:'20px' }}/>
                        <p className={styles.butttonXsText}>HOME</p>
                    </Box>
                    </Link>
                    <Link href='/admin/users'>
                    <Box className={styles.buttonXs}>
                        <PeopleAltRoundedIcon sx={{ width:'20px' }}/>
                        <p className={styles.butttonXsText}>USERS</p>
                    </Box>
                    </Link>
                    <Link href='/admin/vendors'>
                    <Box className={styles.buttonXs}>
                        <EngineeringRoundedIcon sx={{ width:'20px' }}/>
                        <p className={styles.butttonXsText}>VENDORS</p>
                    </Box>
                    </Link>
                    <Link href='/admin/notifications'>
                    <Box className={styles.buttonXs}>
                        <PlaylistAddCheckCircleRoundedIcon sx={{ width:'20px' }}/>
                        <p className={styles.butttonXsText}>JOBS</p>
                    </Box>
                    </Link>
                    <Link href='/admin/reports'>
                    <Box className={styles.buttonXs}>
                        <ReportIcon sx={{ width:'20px' }}/>
                        <p className={styles.butttonXsText}>REPORTS</p>
                    </Box>
                    </Link>
                </Box>
            </Grid>
    </>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <AppBar sx={{ boxShadow: 3, borderRadius: "20px" }} position="static">
        <Toolbar>
          <IconButton
            onClick={handleDrawerToggle}
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 , display:{ xs:'block' , sm:'block' , md:'none'}}}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            Admin
          </Typography>
          <h5>Akif Rahman</h5>
          <IconButton sx={{ ml: 1, p: 0 }}>
            <Avatar alt="Remy Sharp" src="/null-profile.jpg" />
          </IconButton>
          <IconButton
              onClick={logout}
              sx={{ color:'#000' , ":hover": { backgroundColor: "#1976d2" }, ml: 3 }}
            >
              <LogoutOutlinedIcon />
            </IconButton>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'block', md:'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </>
  );
}
