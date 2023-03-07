import { Inter } from "@next/font/google";
import { Box } from "@mui/system";
import { Button, Grid } from "@mui/material";
import Notifications from "@/components/Notifications/Notification";
import Messages from "@/components/Messages/Message";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { vendorDetails } from "@/redux/vendor";
import VendorNavbar from "@/components/Navabar/VendorNavbar";
import EngineeringIcon from "@mui/icons-material/Engineering";
import { VendorGetJobs, VendorisAuthApi } from "@/Apis/vendorApi";
import Link from "next/link";
import VendorBottomNavbar from "@/components/Navabar/VendorBottomNavbar";
import Swal from "sweetalert2";

const inter = Inter({ subsets: ["latin"] });

export default function VendorWorks() {
  const router = useRouter();
  const [jobs, setJobs] = useState([]);
  const { vendor } = useSelector((state)=>state.vendorInfo)
  const dispatch = useDispatch()

  useEffect(()=>{
    async function invoke(){
      let token=  localStorage.getItem('vendortoken')
      if (token) {
        const response = await VendorisAuthApi(token)
        if (response) {
          if (response.auth) {
            if (response.vendorObj.isBlock) {
              Swal.fire(
                'Blocked!',
                'Your account is blocked! Not allowed this application...',
                'error'
              ).then(()=>{
                localStorage.removeItem('vendortoken')
                router.push('/vendor/signin')
              })
            }else{
              dispatch(vendorDetails(response.vendorObj))
            }
          } else {
            router.push('/vendor/signin')
          }
        }
      } else {
        router.push('/vendor/signin')
      }
      let vendorToken=  localStorage.getItem('vendortoken')
      const res = await VendorGetJobs(vendorToken)
      if (res) {
        setJobs(res)
      }else{
        router.push('/404')
      }
    }
    invoke();
  },[])

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
              <Notifications user={vendor} />
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
                      display:'flex',
                      border: "1px solid lightgray",
                      borderRadius: "15px",
                      minHeight: "4.0vw",
                      backgroundColor: "#fff",
                    }}
                  >
                    <EngineeringIcon/>
                    <h3 style={{ marginLeft:'7px' , fontSize:'22px' }}>Workers</h3>
                  </Grid>
                </Grid>
                <Grid sx={{ pt: 7 }}>
                  <Box
                    sx={{
                      p: 2,
                      width: "-webkit-fill-available",
                      boxShadow: 3,
                      textAlign:'center',
                      border: "1px solid lightgray",
                      borderRadius: "15px",
                      minHeight: "34.4vw",
                      backgroundColor: "#fff",
                      m: 2,
                    }}
                  >
                    {jobs?.map((job)=>(
                      <>
                      <Link href={`/vendor/${job.jobName}`}><Button key={job._id} className="workerList" sx={{ p: 1.5 , m: 1 }}>{job.jobName}</Button></Link>
                      </>
                    ))}
                    
                  </Box>
                </Grid>
              </Grid>
            </Grid>
            <Grid md={3}>
              <Messages user={vendor} current={'vendor'} />
            </Grid>
          </Grid>
        </Box>
        <VendorBottomNavbar />
      </div>
    </>
  );
}
