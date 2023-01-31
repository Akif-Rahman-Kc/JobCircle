import { Inter } from "@next/font/google";
import { Box } from "@mui/system";
import { Button, Grid, TextField } from "@mui/material";
import Notifications from "@/components/Notifications/Notification";
import Messages from "@/components/Messages/Message";
import { useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import VendorNavbar from "@/components/Navabar/VendorNavbar";
import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";
import { AccountCircle } from "@mui/icons-material";

const inter = Inter({ subsets: ["latin"] });

export default function VendorEditProfile() {
  const router = useRouter();

  useEffect(() => {
    let token = localStorage.getItem("vendortoken");
    if (token) {
      axios
        .post("http://localhost:4000/vendor/vendorAuth", {
          headers: { accessVendorToken: token },
        })
        .then((response) => {
          if (response.data.auth) {
            console.log("success");
          } else {
            router.push("/vendor/signin");
          }
        });
    } else {
      router.push("/vendor/signin");
    }
  },[]);

  return (
    <>
      <div>
        <VendorNavbar />
        <Box>
          <Grid
            container
            sx={{ justifyContent: "center", mt: 10, display: "flex" }}
          >
            <Grid md={3}>
              <Notifications />
            </Grid>
            <Grid sm={12} md={5}>
              <Grid sm={12} md={12}>
                <Grid
                  md={4.74}
                  sx={{
                    width: "-webkit-fill-available",
                    backgroundColor: "#e9e5df",
                    borderRadius: "15px",
                    m: 2,
                    mt: -4,
                    pt: 4,
                    display: "flex",
                    position: "fixed",
                    zIndex: 99,
                  }}
                >
                  <Grid
                    sx={{
                      p: 2,
                      width: "-webkit-fill-available",
                      justifyContent: "center",
                      boxShadow: 3,
                      display:'flex',
                      border: "1px solid lightgray",
                      borderRadius: "15px",
                      minHeight: "4.0vw",
                      backgroundColor: "#fff",
                    }}
                  >
                    <AccountCircle/>
                    <h3 style={{ marginLeft:'7px' , fontSize:'22px' }}>Profile</h3>
                  </Grid>
                </Grid>
                <Grid sx={{ pt: 7 }}>
                  <Box
                    sx={{
                      p: 3,
                      width: "-webkit-fill-available",
                      boxShadow: 3,
                      border: "1px solid lightgray",
                      borderRadius: "15px",
                      minHeight: "34.4vw",
                      backgroundColor: "#fff",
                      m: 2,
                    }}
                  >
                    <Box
                      sx={{
                        p: 2,
                        backgroundColor: "lightgray",
                        width: "100%",
                        minHeight: "inherit",
                        borderRadius: "10px",
                      }}
                    >
                      <Box
                        sx={{
                          p: 0.5,
                          backgroundColor: "#fff",
                          width: "fit-content",
                          display: "flex",
                        }}
                      >
                        <img
                          src="/null-profile.jpg"
                          style={{
                            width: "98px",
                            height: "fit-content",
                            borderRadius: "50%",
                          }}
                          alt=""
                        />
                        <div style={{ marginTop: "auto" }}>
                          <label for="upload" class="file-upload__label">
                            <AddAPhotoOutlinedIcon sx={{ ml: -0.5 }} />
                          </label>
                          <input
                            id="upload"
                            class="file-upload__input"
                            type="file"
                            name="file-upload"
                          />
                        </div>
                      </Box>
                      <Box>
                        <Grid container spacing={2} sx={{ mt: 3 }}>
                          <Grid item xs={6}>
                            <TextField
                              required
                              fullWidth
                              id="firstName"
                              label="First Name"
                              size="small"
                              name="firstName"
                              autoComplete="family-name"
                              autoFocus
                              sx={{ backgroundColor: "#fff" }}
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <TextField
                              required
                              fullWidth
                              id="lastName"
                              label="Last Name"
                              name="lastName"
                              size="small"
                              autoComplete="family-name"
                              autoFocus
                              sx={{ backgroundColor: "#fff" }}
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <TextField
                              required
                              fullWidth
                              id="locality"
                              label="Locality"
                              size="small"
                              name="locality"
                              autoComplete="family-name"
                              autoFocus
                              sx={{ backgroundColor: "#fff" }}
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <TextField
                              required
                              fullWidth
                              id="city"
                              size="small"
                              label="City"
                              name="city"
                              autoComplete="family-name"
                              autoFocus
                              sx={{ backgroundColor: "#fff" }}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              required
                              fullWidth
                              id="state"
                              label="State"
                              size="small"
                              name="state"
                              autoComplete="family-name"
                              autoFocus
                              sx={{ backgroundColor: "#fff" }}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              required
                              fullWidth
                              id="email"
                              size="small"
                              label="E-mail"
                              name="email"
                              autoComplete="family-name"
                              autoFocus
                              sx={{ backgroundColor: "#fff" }}
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <TextField
                              required
                              fullWidth
                              id="job"
                              label="Job"
                              size="small"
                              name="job"
                              autoComplete="family-name"
                              autoFocus
                              sx={{ backgroundColor: "#fff" }}
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <TextField
                              required
                              fullWidth
                              id="experiance"
                              label="Experiance per Year"
                              name="experiance"
                              size="small"
                              autoComplete="family-name"
                              autoFocus
                              sx={{ backgroundColor: "#fff" }}
                            />
                          </Grid>
                        </Grid>
                        <Grid sx={{ textAlign: "end" }}>
                          <Button
                            sx={{
                              pl: 4,
                              pr: 4,
                              mt: 3,
                              backgroundColor: "#1976d2",
                              color: "#fff",
                              fontWeight: "900",
                              ":hover": { backgroundColor: "#1976d2" },
                            }}
                          >
                            Save
                          </Button>
                        </Grid>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
            <Grid md={3}>
              <Messages />
            </Grid>
          </Grid>
        </Box>
      </div>
    </>
  );
}
