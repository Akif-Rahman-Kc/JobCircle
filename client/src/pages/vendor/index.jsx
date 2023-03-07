import { Inter } from "@next/font/google";
import { Box } from "@mui/system";
import { Grid } from "@mui/material";
import Notifications from "@/components/Notifications/Notification";
import Messages from "@/components/Messages/Message";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import VendorNavbar from "@/components/Navabar/VendorNavbar";
import { useDispatch, useSelector } from "react-redux";
import { vendorDetails } from "@/redux/vendor";
import HomeIcon from "@mui/icons-material/Home";
import { GetAllPosts, VendorGetAllConnectors, VendorisAuthApi } from "@/Apis/vendorApi";
import Swal from "sweetalert2";
import Posts from "@/components/Posts/Post";
import VendorBottomNavbar from "@/components/Navabar/VendorBottomNavbar";

const inter = Inter({ subsets: ["latin"] });

export default function VendorHome() {
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [connections, setConnections] = useState([]);
  const [refreshComment, setrefreshComment] = useState(false);
  const { vendor } = useSelector((state) => state.vendorInfo);
  const dispatch = useDispatch();

  useEffect(() => {
    async function invoke() {
      let token = localStorage.getItem("vendortoken");
      if (token) {
        const response = await VendorisAuthApi(token);
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
            router.push("/vendor/signin");
          }
        }
      } else {
        router.push("/vendor/signin");
      }
      const resp = await VendorGetAllConnectors(vendor._id)
      if (resp) {
        setConnections(resp.connections)
      }else{
        router.push('/404')
      }
      let vendorToken = localStorage.getItem("vendortoken");
      const res = await GetAllPosts(vendorToken);
      if (res) {
        setPosts(res);
      }else{
        router.push('/404')
      }
    }
    invoke();
  }, []);

  useEffect(()=>{
    async function invoke(){
      let vendorToken = localStorage.getItem("vendortoken");
      const res = await GetAllPosts(vendorToken);
      if (res) {
        if (res.auth != false) {
          res.map(async (doc)=>{
            doc.Likes.map((obj)=>{
              if (obj.likerId == vendor._id) {
                doc.like = true
              }
            })
            doc.Comments = await doc.Comments.reverse()
          })
          setPosts(res);
        }
      }else{
        router.push('/404')
      }
    }
    invoke();
  },[refreshComment, vendor])

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
                    zIndex: 1000,
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
                    <HomeIcon />
                    <h3 style={{ marginLeft: "7px", fontSize: "22px" }}>
                      Home
                    </h3>
                  </Grid>
                </Grid>
                
                <Grid sx={{ pt: 7 }}>
                  <Box
                    sx={{
                      p: 2,
                      width: "-webkit-fill-available",
                      boxShadow: 3,
                      border: "1px solid lightgray",
                      borderRadius: "15px",
                      minHeight: "34.5vw",
                      backgroundColor: "#fff",
                      m: 2,
                    }}
                  >
                  {posts.map((post)=>(
                      <Posts post = {post} setrefreshComment={setrefreshComment} refreshComment={refreshComment} user={vendor} vendor={true}/> 
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
        <VendorBottomNavbar/>
      </div>
    </>
  );
}
