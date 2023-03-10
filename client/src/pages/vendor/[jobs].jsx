import { Inter } from "@next/font/google";
import { Box } from "@mui/system";
import { Grid } from "@mui/material";
import Notifications from "@/components/Notifications/Notification";
import Messages from "@/components/Messages/Message";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import EngineeringIcon from "@mui/icons-material/Engineering";
import Link from "next/link";
import { VendorisAuthApi } from "@/Apis/vendorApi";
import { vendorDetails } from "@/redux/vendor";
import VendorNavbar from "@/components/Navabar/VendorNavbar";
import VendorBottomNavbar from "@/components/Navabar/VendorBottomNavbar";
import { GetWorkers } from "@/Apis/userApi";

const inter = Inter({ subsets: ["latin"] });

export default function VendorWorkers({workers}) {
  const router = useRouter();
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
    }
    invoke();
  },[])

  return (
    <>
      <div>
        <VendorNavbar user={vendor} />
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
                      border: "1px solid lightgray",
                      borderRadius: "15px",
                      minHeight: "34.4vw",
                      backgroundColor: "#fff",
                      m: 2,
                    }}
                  >
                    <Grid>
                      {
                        workers?.map((worker)=>(
                        
                          <Link href={`/vendor/worker_profile/${worker._id}`}>
                            { vendor._id == worker._id ? '' :
                          <Grid key={worker._id} xs={12} sx={{ m: 1 , p: 1 , display:'flex' , border:'1px solid lightgray' , borderRadius:'10px' , backgroundColor:'lightgray' , boxShadow: 3 , ":active":{ backgroundColor:'#c1bdbd' } , color:'#000' }}>
                            <img
                              src={worker.image ? worker.image : "/null-profile.jpg"}
                              style={{ m: 0, width: "40px"  , height:"40px" , borderRadius: "50%" }}
                              alt=""
                            />
                            <Box sx={{ ml:0.5 , mt:0.5 }}>
                              <h4>{worker.firstName + ' ' + worker.lastName}</h4>
                              <h5 style={{ fontFamily: 'monospace' }}>{worker.locality + ', ' + worker.city}</h5>
                            </Box>
                          </Grid>
                          }
                          </Link>
                        ))
                      }
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
            <Grid md={3}>
              <Messages user={vendor} current={'vendor'} />
            </Grid>
          </Grid>
        </Box>
        <VendorBottomNavbar/>
      </div>
    </>
  );
}


export const getServerSideProps = async (context) => {
  try {
    const jobs = context.params.jobs
    const res = await GetWorkers(jobs)
    return{
      props : { 
        workers:res
      }
    }
  } catch (error) {
    return{
      props : { 
          workers:null
       }
  }
  }

}
