import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import { Avatar, Grid } from '@mui/material';

export default function AdminNavbar() {
  return (
    <>
    <Grid>
        <AppBar sx={{ borderRadius:'20px' }} position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <ArrowCircleLeftIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Admin
          </Typography>
          <p>Akif Rahman</p>
          <IconButton sx={{ ml: 1 , p: 0 }}>
                <Avatar alt="Remy Sharp" src="/null-profile.jpg" />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Grid>
    </>
  );
}