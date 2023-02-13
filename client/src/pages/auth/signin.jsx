import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { isAuthApi, SigninApi } from "@/Apis/userApi";


const theme = createTheme();

export default function SignIn() {
  const router = useRouter()

  useEffect(()=>{
    async function invoke(){
      let token =  localStorage.getItem('usertoken')
      if (token) {
        const response = await isAuthApi(token)
        if (response) {
          if (response.auth) {
            router.push('/')
          } else {
            console.log("failed");
          }
        }
      } else {
        console.log("failed");
      }
    }
    invoke()
  },[])

  const [ email, setEmail ] = useState(false)
  const [ emailError, setEmailError ] = useState('')
  const [ password, setPassword ] = useState(false)
  const [ passwordError, setPasswordError ] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault();
    let data = new FormData(event.currentTarget);
    data = {
      email: data.get("email"),
      password: data.get("password")
    }

    const response = await SigninApi(data)
      if (response.status === 'failed') {
        if (response.emailErr) {
          setEmail(true)
          setEmailError(response.message)
        } else {
          setPassword(true)
          setPasswordError(response.message)
        }
      } else {
        localStorage.setItem('usertoken', response.token)
        router.push('/')
      }
  };
  
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Grid
            sx={{
              boxShadow: 3,
              backgroundColor: "#fff",
              border: "1px solid lightgray",
              p: 2,
              borderRadius: "10px",
            }}
            container
            spacing={2}
          >
            <Grid sx={{display: { xs: 'none', sm: 'flex' }}} item xs={12} sm={6}>
              <Box sx={{ textAlign:'center' }}>
                <img
                  style={{ margin: "40px", width: "300px", height: "55vh" }}
                  src="/logo.png"
                  alt="Loading..."
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Avatar sx={{ mb: 1 , bgcolor: "secondary.main" }}>
                  <LockOutlinedIcon />
                </Avatar>
              </Box>
              <Typography
                sx={{ textAlign: "center", fontWeight: "900" }}
                component="h1"
                variant="h5"
              >
                SIGN IN
              </Typography>
              <Box sx={{ border:'1px solid lightgray' , borderRadius:'20px' , mt: 3 , mb: 5 }}>
                        <p>Sign Up With Google</p>
                </Box>
                <hr />
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 5 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  error={email}
                  helperText={emailError}
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  error={password}
                  helperText={passwordError}
                  autoComplete="current-password"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 , p: 1.4 , fontWeight:'900' }}
                >
                  Sign In
                </Button>
                <Grid sm={12} container>
                  <Grid sm={5} item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid sm={7} item>
                    <Link href="/auth/signup" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
                <br />
                <Link href="/vendor/signin" variant="body2">
                    <Button sx={{ width:'100%' , border:'1px solid gray' , fontWeight:'bold ' }}>
                      Are You Vendor
                    </Button>
                </Link>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
