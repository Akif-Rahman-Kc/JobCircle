import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
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


const theme = createTheme();

export default function VendorSignIn() {
  const router = useRouter()

  useEffect(()=>{
    let token=  localStorage.getItem('vendortoken')
    if (token) {
      axios.post('http://localhost:4000/vendor/vendorAuth',{headers:{"accessVendorToken":token}}).then((response)=>{
        if (response.data.auth) {
          router.push('/vendor')
        } else {
          console.log("failed");
        }
      })
    } else {
      console.log("failed");
    }
  })

  const [ email, setEmail ] = useState(false)
  const [ emailError, setEmailError ] = useState('')
  const [ password, setPassword ] = useState(false)
  const [ passwordError, setPasswordError ] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault();
    let data = new FormData(event.currentTarget);
    data = {
      email: data.get("email"),
      password: data.get("password")
    }

    //axios
    axios.post('http://localhost:4000/vendor/signin',{data}).then((response)=>{
      if (response.data.status === 'failed') {
        if (response.data.emailErr) {
          setEmail(true)
          setEmailError(response.data.message)
        } else {
          setPassword(true)
          setPasswordError(response.data.message)
        }
      } else {
        localStorage.setItem('vendortoken', response.data.token)
        router.push('/vendor')
      }
    
    })
  };
  
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Grid
            sx={{
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
                <Avatar sx={{ bgcolor: "secondary.main" }}>
                  <LockOutlinedIcon />
                </Avatar>
              </Box>
              <Typography
                sx={{ textAlign: "center", fontWeight: "bold" }}
                component="h1"
                variant="h5"
              >
                Vendor Sign in
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
                  sx={{ mt: 3, mb: 2 }}
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
                    <Link href="/signup" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
