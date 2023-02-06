import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { Avatar, Button, Grid } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useRouter } from "next/router";
import { useState } from "react";

export default function AdminNavbar(props) {
  const router = useRouter()

  const logout=()=>{
    localStorage.removeItem('admintoken')
    router.push('/admin/signin')
  }   

  return (
    <>
      <AppBar sx={{ boxShadow: 3, borderRadius: "20px" }} position="static">
        <Toolbar>
          <IconButton
            onClick={()=>props.setOPEN(!props.Open)}
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
          <Button onClick={logout} sx={{color:'#fff'}}>Logout</Button>
          <h6>Akif Rahman</h6>
          <IconButton sx={{ ml: 1, p: 0 }}>
            <Avatar alt="Remy Sharp" src="/null-profile.jpg" />
          </IconButton>
        </Toolbar>
      </AppBar>
    </>
  );
}
