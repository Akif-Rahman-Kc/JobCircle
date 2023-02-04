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

const theme = createTheme();

export default function OTP() {
  const router = useRouter();

  const { userDetails, setUserDetails } = useContext(AuthContext);
  const { otpConf, setOtpConf } = useContext(AuthContext);

  useEffect(() => {
    if (Object.keys(userDetails) == 0) {
      router.push("/auth/signup");
    }
  }, []);

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
                        autoFocus
                      />
                    </Grid>
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{
                      mt: 3,
                      mb: 2,
                      p: 1.4,
                      fontWeight: "900",
                      marginTop: "90px",
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
