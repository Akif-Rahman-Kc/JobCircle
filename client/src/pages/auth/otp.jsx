import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/store/Context";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SignupApi } from "@/Apis/userApi";
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { auth } from '@/firebase/config';

const theme = createTheme();

export default function OTP() {
  const router = useRouter();
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(30);
  const [captchaDiv, setCaptchaDiv] = useState(false);
  const { userDetails, setUserDetails } = useContext(AuthContext);
  const { otpConf, setOtpConf } = useContext(AuthContext);

  useEffect(() => {
    if (Object.keys(userDetails) == 0) {
      router.push("/auth/signup");
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
  
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);
  
    return () => {
      clearInterval(interval);
    };
  }, [seconds]);

  const resendOTP = () => {
    setCaptchaDiv(false)
    setUpRecaptcha("+91" + userDetails.phoneNo).then((res)=>{
      setOtpConf(res)
      setMinutes(1);
      setSeconds(30);
      setCaptchaDiv(true)
    })
  };

  const [otp, setOtp] = useState(false);
  const [otpErr, setOtpErr] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    let data = new FormData(event.currentTarget);
    data = {
      otp: data.get("otp"),
    };

    if (data.otp === "" || data.otp === null) {
      setOtp(true);
      setOtpErr("Please Enter The Otp number");
    } else {
      try {
        await otpConf.confirm(data.otp);
        const response = await SignupApi(userDetails);
        if (response.status == "success") {
          toast.success("Registered", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          setTimeout(() => {
            localStorage.setItem("usertoken", response.token);
            router.push("/");
          }, 2000);
        } else {
          toast.error("This email is already registered!", {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
      } catch (error) {
        if (error.message == "Firebase: Error (auth/code-expired).") {
          setOtp(true);
          setOtpErr("Otp Expired");
        } else {
          setOtp(true);
          setOtpErr("Please Enter correct Otp number");
        }
      }
    }
  };

  function setUpRecaptcha(number) {
    const recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {},
      auth
    );
    recaptchaVerifier.render();
    return signInWithPhoneNumber(auth, number, recaptchaVerifier)
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <ToastContainer />
        <Container component="main" maxWidth="md">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 11,
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
              <Grid
                item
                sx={{ display: { xs: "none", sm: "flex" } }}
                xs={12}
                sm={6}
              >
                <Box>
                  <img
                    style={{ margin: "40px", width: "300px", height: "55vh" }}
                    src="/logo.png"
                    alt="Loading..."
                  />
                </Box>
              </Grid>
              <Grid sx={{ marginTop: "100px" }} item xs={12} sm={6}>
                <Box
                  component="form"
                  noValidate
                  onSubmit={handleSubmit}
                  sx={{ mt: 3 }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="otp"
                        label="OTP"
                        name="otp"
                        error={otp}
                        helperText={otpErr}
                        autoComplete="family-name"
                      />
                    </Grid>
                  </Grid>
                  {captchaDiv? '' : 
                  <Grid item xs={12} sx={{ px:2 }}>
                      <div style={{ marginTop:'5px' }} id='recaptcha-container'/>
                  </Grid>
                  }
                  <div className="countdown-text" style={{ display:'flex' , marginTop:'10px' , justifyContent:'center' }}>
                    {seconds > 0 || minutes > 0 ? (
                      <p style={{ fontSize:'12px' }}>
                        Time Remaining: {minutes < 10 ? `0${minutes}` : minutes}:
                        {seconds < 10 ? `0${seconds}` : seconds}
                      </p>
                    ) : ''}

                    <a
                      disabled={seconds > 0 || minutes > 0}
                      style={{
                        color: seconds > 0 || minutes > 0 ? "#fff" : "rgb(215 62 28)",
                        backgroundColor:'#fff',
                        border:0,
                        fontWeight:'bold'
                      }}
                      onClick={resendOTP}
                    >
                      Resend OTP
                    </a>
                  </div>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{
                      mt: 3,
                      mb: 2,
                      p: 1.4,
                      fontWeight: "900",
                    }}
                  >
                    Sign Up
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}
