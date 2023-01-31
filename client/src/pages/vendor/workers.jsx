import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import Navbar from "@/components/Navabar/Navbar";
import { Box } from "@mui/system";
import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  IconButton,
} from "@mui/material";
import Notifications from "@/components/Notifications/Notification";
import Messages from "@/components/Messages/Message";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import QuestionAnswerOutlinedIcon from "@mui/icons-material/QuestionAnswerOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import Collapse from "@mui/material/Collapse";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { vendorDetails } from "@/redux/vendor";
import VendorNavbar from "@/components/Navabar/VendorNavbar";

const inter = Inter({ subsets: ["latin"] });

export default function VendorWorkers() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { vendor } = useSelector((state)=>state.vendorInfo)
  const dispatch = useDispatch()

  useEffect(()=>{
    let token=  localStorage.getItem('vendortoken')
    if (token) {
      axios.post('http://localhost:4000/vendor/vendorAuth',{headers:{"accessVendorToken":token}}).then((response)=>{
        if (response.data.auth) {
          dispatch(vendorDetails(response.data))
        } else {
          router.push('/vendor/signin')
        }
      })
    } else {
      router.push('/vendor/signin')
    }
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
                      textAlign: "center",
                      boxShadow: 3,
                      border: "1px solid lightgray",
                      borderRadius: "15px",
                      minHeight: "4.0vw",
                      backgroundColor: "#fff",
                    }}
                  >
                    <h2>Welcome To JobCircle</h2>
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
                    <Button className="workerList" sx={{ p: 1.5 , m: 1 }}>Driver</Button>
                    <Button className="workerList" sx={{ p: 1.5 , m: 1 }}>Plumber</Button>
                    <Button className="workerList" sx={{ p: 1.5 , m: 1 }}>Artist</Button>
                    <Button className="workerList" sx={{ p: 1.5 , m: 1 }}>Catering</Button>
                    <Button className="workerList" sx={{ p: 1.5 , m: 1 }}>Bands</Button>
                    <Button className="workerList" sx={{ p: 1.5 , m: 1 }}>Carpentor</Button>
                    <Button className="workerList" sx={{ p: 1.5 , m: 1 }}>Mechanical Engineer</Button>
                    <Button className="workerList" sx={{ p: 1.5 , m: 1 }}>Interior Designer</Button>
                    <Button className="workerList" sx={{ p: 1.5 , m: 1 }}>Electrical Engineer</Button>
                    <Button className="workerList" sx={{ p: 1.5 , m: 1 }}>Software Engineer</Button>
                    <Button className="workerList" sx={{ p: 1.5 , m: 1 }}>Barber</Button>
                    <Button className="workerList" sx={{ p: 1.5 , m: 1 }}>Photographer</Button>
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
