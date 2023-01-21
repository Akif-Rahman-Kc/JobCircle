

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <>
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
            <Grid sx={{ backgroundColor:'#fff' , border:'1px solid lightgray', p:2 , borderRadius:'10px'}} container spacing={2}>
                <Grid item sx={{display: { xs: 'none', sm: 'flex' }}} xs={12} sm={6}>
                    <Box>
                        <img style={{margin:'60px',width:'65%',height:'55vh'}} src="/logo.png" alt="Loading..."/>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Box sx={{ display:'flex' , justifyContent:'center'}}>
                        <Avatar sx={{ bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                    </Box>
                    <Typography sx={{ textAlign:'center', fontWeight:'bold' }} component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box sx={{ border:'1px solid lightgray' , borderRadius:'20px' , mt: 3 , mb: 5 }}>
                        <p>Sign Up With Google</p>
                    </Box>
                    <hr />
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 5 }}>
                        <Grid container spacing={2}>
                        <Grid item xs={6} sm={6}>
                            <TextField
                            autoComplete="given-name"
                            name="firstName"
                            required
                            fullWidth
                            id="firstName"
                            label="First Name"
                            autoFocus
                            />
                        </Grid>
                        <Grid item xs={6} sm={6}>
                            <TextField
                            required
                            fullWidth
                            id="lastName"
                            label="Last Name"
                            name="lastName"
                            autoComplete="family-name"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            />
                        </Grid>
                        <Grid item xs={6} sm={6}>
                            <TextField
                            required
                            fullWidth
                            name="password"
                            label="New Password"
                            type="password"
                            id="password"
                            autoComplete="new-password"
                            />
                        </Grid>
                        <Grid item xs={6} sm={6}>
                            <TextField
                            required
                            fullWidth
                            name="password"
                            label="Confirm Password"
                            type="password"
                            id="password"
                            autoComplete="confirm-password"
                            />
                        </Grid>
                        </Grid>
                        <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        >
                        Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link href="/signin" variant="body2">
                            Already have an account? Sign in
                            </Link>
                        </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
    </>
  );
}