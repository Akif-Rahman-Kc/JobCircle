import { Inter } from "@next/font/google";
import Navbar from "@/components/Navabar/Navbar";
import { Box } from "@mui/system";
import {
  Avatar,
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
import { userDetails } from "@/redux/user";
import HomeIcon from "@mui/icons-material/Home";
import { getAllConnectors, isAuthApi, UserGetAllPosts } from "@/Apis/userApi";
import Posts from "@/components/Posts/Post";
import { GetAllPosts } from "@/Apis/vendorApi";
import BottomNavbar from "@/components/Navabar/BottomNavbar";
import Swal from "sweetalert2";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [refreshComment, setrefreshComment] = useState(false);
  const { user } = useSelector((state)=>state.userInfo)
  const dispatch = useDispatch()

  useEffect(()=>{
    async function invoke(){
      let token=  localStorage.getItem('usertoken')
      if (token) {
        const response = await isAuthApi(token)
        if (response) {
          if (response.auth) {
            if (response.userObj.isBlock) {
              Swal.fire(
                'Blocked!',
                'Your account is blocked! Not allowed this application...',
                'error'
              ).then(()=>{
                localStorage.removeItem("usertoken");
                router.push("/auth/signin");
              })
            }else{
              dispatch(userDetails(response.userObj))
            }
          } else {
            router.push('/auth/signin')
          }
        }
          
      } else {
        router.push('/auth/signin')
      }
      let userToken=  localStorage.getItem('usertoken')
      const res = await UserGetAllPosts(userToken);
      if (res) {
        setPosts(res);
      }
    }
    invoke()
  },[])

  useEffect(()=>{
    async function invoke(){
      let userToken=  localStorage.getItem('usertoken')
      const res = await UserGetAllPosts(userToken);
      if (res.auth != false) {
        res.map(async (doc)=>{
          doc.Likes.map((obj)=>{
            if (obj.likerId == user._id) {
              doc.like = true
            }
          })
          doc.Comments = await doc.Comments.reverse()
        })
        setPosts(res);
      }
    }
    invoke();
  },[refreshComment, user])

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
                    zIndex: 1000,
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
                    <HomeIcon/>
                    <h3 style={{ marginLeft:'7px' , fontSize:'22px' }}>Home</h3>
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
                      minHeight: "33.2vw",
                      backgroundColor: "#fff",
                      m: 2,
                    }}
                  >
                    {posts.map((post)=>(
                      <Posts post = {post} setrefreshComment={setrefreshComment} refreshComment={refreshComment} user={user} vendor={false}/>
                    ))}
                  </Box>
                </Grid>
              </Grid>
            </Grid>
            <Grid md={3}>
              <Messages />
            </Grid>
          </Grid>
        </Box>
        <BottomNavbar/>
      </div>
    </>
  );
}
