

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
import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';


const theme = createTheme();

export default function SignUp() {
  const router = useRouter()

  const [ firstName, setFirstName ] = useState(false)
  const [ firstNameError, setFirstNameError ] = useState('')
  const [ lastName, setLastName ] = useState(false)
  const [ lastNameError, setLastNameError ] = useState('')
  const [ email, setEmail ] = useState(false)
  const [ emailError, setEmailError ] = useState('')
  const [ password, setPassword ] = useState(false)
  const [ passwordError, setPasswordError ] = useState('')
  const [ confPassword, setConfPassword ] = useState(false)
  const [ confPasswordError, setConfPasswordError ] = useState('')
  const [ totalRequired, setTotalRequired ] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault();
    let data = new FormData(event.currentTarget);
    data = {
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),
      email: data.get('email'),
      password: data.get('password'),
      confPassword: data.get('confPassword'),
    }

    if(data.firstName && data.email && data.password && data.confPassword){
      let regName =/^[a-zA-Z]+$/;
      let regEmail =/^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/
      setTotalRequired('')
      if(regName.test(data.firstName)){
        setFirstName(false)
        setFirstNameError('')
        if(regEmail.test(data.email)){
          setEmail(false)
          setEmailError('')
          if( data.password.length >= 6 ){
            setPassword(false)
            setPasswordError('')
            if(data.password === data.confPassword){
              setPassword(false)
              setConfPassword(false)
              setPasswordError('')
              setConfPasswordError('')

              //axios set
              return axios.post('http://localhost:4000/signup',{data}).then((response)=>{
                router.push('/signup_details')
              })

            }else{
              setPassword(true)
              setConfPassword(true)
              setPasswordError('Password is not match')
              setConfPasswordError('Password is not match')
            }
          }else{
            setPassword(true)
            setPasswordError('Minimum 6 character')
          }
        }else{
          setEmail(true)
          setEmailError('Please enter valid Email')
        }
     }else{
      setFirstName(true)
      setFirstNameError('Please enter valid Name')
     }
    }else{
      setTotalRequired('Please enter your Details')
    }
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
                    <Box sx={{ textAlign:'center' }}>
                        <img style={{margin:'60px',width:'65%',height:'55vh'}} src="/logo.png" alt="Loading..."/>
                        <br />
                        <Link href="/vendor/signup" variant="body2">
                            Are You Vendor
                          </Link>
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
                    <Box sx={{p:1 , border:'1px solid lightgray' , borderRadius:'20px' , mt: 3 , mb: 5 }}>
                        <p>Sign Up With Google</p>
                    </Box>
                    <hr />
                    <br/>
                    <Box sx={{ backgroundColor:'#ffc5c5' , borderRadius:'3px' , pl:2 }}>
                      <p style={{ color:'red' }}>{totalRequired}</p>
                    </Box>
                    
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
                            error={firstName}
                            helperText={firstNameError}
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
                            error={lastName}
                            helperText={lastNameError}
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
                            error={email}
                            helperText={emailError}
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
                            error={password}
                            helperText={passwordError}
                            />
                        </Grid>
                        <Grid item xs={6} sm={6}>
                            <TextField
                            required
                            fullWidth
                            name="confPassword"
                            label="Confirm Password"
                            type="password"
                            id="confPassword"
                            autoComplete="confirm-password"
                            error={confPassword}
                            helperText={confPasswordError}
                            />
                        </Grid>
                        </Grid>
                        <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        >
                        Next
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
      </Container>
    </ThemeProvider>
    </>
  );
}