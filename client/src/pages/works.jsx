import { Inter } from "@next/font/google";
import Navbar from "@/components/Navabar/Navbar";
import { Box } from "@mui/system";
import { Button, Grid } from "@mui/material";
import Notifications from "@/components/Notifications/Notification";
import Messages from "@/components/Messages/Message";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { userDetails } from "@/redux/user";
import EngineeringIcon from "@mui/icons-material/Engineering";
import { GetJobs, isAuthApi } from "@/Apis/userApi";
import Link from "next/link";
import BottomNavbar from "@/components/Navabar/BottomNavbar";
import Swal from "sweetalert2";

const inter = Inter({ subsets: ["latin"] });

export default function Works() {
  const router = useRouter();
  const [jobs, setJobs] = useState([]);
  const { user } = useSelector((state) => state.userInfo);
  const dispatch = useDispatch();

  useEffect(() => {
    async function invoke() {
      let token = localStorage.getItem("usertoken");
      if (token) {
        const response = await isAuthApi(token);
        if (response) {
          if (response.auth) {
            if (response.userObj.isBlock) {
              Swal.fire(
                "Blocked!",
                "Your account is blocked! Not allowed this application...",
                "error"
              ).then(() => {
                localStorage.removeItem("usertoken");
                router.push("/auth/signin");
              });
            } else {
              dispatch(userDetails(response.userObj));
            }
          } else {
            router.push("/auth/signin");
          }
        }
      } else {
        router.push("/auth/signin");
      }
      let userToken = localStorage.getItem("usertoken");
      const res = await GetJobs(userToken);
      if (res) {
        setJobs(res);
      } else{
        // router.push('/404')
      }
    }
    invoke();
  }, []);

  return (
    <>
      <div>
        <Navbar />
        <Box>
          <Grid
            container
            sx={{ justifyContent: "center", mt: 10, display: "flex" }}
          >
            <Grid md={3}>
              <Notifications user={user} />
            </Grid>
            <Grid sm={12} md={5} width={'inherit'}>
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
                      display: "flex",
                      border: "1px solid lightgray",
                      borderRadius: "15px",
                      minHeight: "4.0vw",
                      backgroundColor: "#fff",
                    }}
                  >
                    <EngineeringIcon />
                    <h3 style={{ marginLeft: "7px", fontSize: "22px" }}>
                      Workers
                    </h3>
                  </Grid>
                </Grid>
                <Grid sx={{ pt: 7 }}>
                  <Box
                    sx={{
                      p: 2,
                      width: "-webkit-fill-available",
                      boxShadow: 3,
                      textAlign: "center",
                      border: "1px solid lightgray",
                      borderRadius: "15px",
                      minHeight: "34.4vw",
                      backgroundColor: "#fff",
                      m: 2,
                    }}
                  >
                    {jobs?.map((job) => (
                      <>
                        <Link href={`/${job.jobName}`}>
                          <Button
                            key={job._id}
                            className="workerList"
                            sx={{ p: 1.5, m: 1 }}
                          >
                            {job.jobName}
                          </Button>
                        </Link>
                      </>
                    ))}
                  </Box>
                </Grid>
              </Grid>
            </Grid>
            <Grid md={3}>
              <Messages user={user} current={'user'} />
            </Grid>
          </Grid>
        </Box>
        <BottomNavbar />
      </div>
    </>
  );
}
