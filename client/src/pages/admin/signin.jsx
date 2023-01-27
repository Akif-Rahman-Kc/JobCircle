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
import { AdminSigninApi } from "@/Apis/adminApi";

const theme = createTheme();

export default function AdminSignIn() {
  const router = useRouter()

  useEffect(()=>{
    let token=  localStorage.getItem('admintoken')
    if (token) {
      axios.post('http://localhost:4000/admin/adminAuth',{headers:{"accessAdminToken":token}}).then((response)=>{
        if (response.data.auth) {
          router.push('/admin')
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    let data = new FormData(event.currentTarget);
    data = {
      email: data.get("email"),
      password: data.get("password"),
    }
    const response = await AdminSigninApi(data)
      if (response.status === 'failed') {
        if (response.emailErr) {
          setEmail(true)
          setEmailError(response.message)
        } else {
          setPassword(true)
          setPasswordError(response.message)
        }
      } else {
        localStorage.setItem('admintoken', response.token)
        router.push('/admin')
      }
  };

  return (
    <Box sx={{backgroundColor:'#1976d2'}}>
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Box
          sx={{
            paddingTop: 12,
            minHeight:'100vh',
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
              <Box>
                <img
                  style={{ margin: "40px", width: "300px", height: "55vh" }}
                  src="/logo.png"
                  alt="Loading..."
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box sx={{ mt: 4 , display: "flex", justifyContent: "center" }}>
                <Avatar sx={{ bgcolor: "secondary.main" }}>
                  <LockOutlinedIcon />
                </Avatar>
              </Box>
              <Typography
                sx={{ mt: 1 , textAlign: "center", fontWeight: "bold" }}
                component="h1"
                variant="h5"
              >
                Admin
              </Typography>
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
                  autoComplete="email"
                  autoFocus
                  error={email}
                  helperText={emailError}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  error={password}
                  helperText={passwordError}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
    </Box>
  );
}
