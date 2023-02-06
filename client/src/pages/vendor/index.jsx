import { Inter } from "@next/font/google";
import { Box } from "@mui/system";
import { Avatar, Card, CardContent, CardHeader, Collapse, Grid, IconButton, Input } from "@mui/material";
import Notifications from "@/components/Notifications/Notification";
import Messages from "@/components/Messages/Message";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import QuestionAnswerOutlinedIcon from "@mui/icons-material/QuestionAnswerOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import VendorNavbar from "@/components/Navabar/VendorNavbar";
import { useDispatch, useSelector } from "react-redux";
import { vendorDetails } from "@/redux/vendor";
import HomeIcon from "@mui/icons-material/Home";
import { GetAllPosts, LikedPost, VendorisAuthApi } from "@/Apis/vendorApi";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { BsFillTrashFill } from "react-icons/bs";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';

const inter = Inter({ subsets: ["latin"] });

export default function VendorHome() {
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [likes, setLikes] = useState(false);
  const [ openComment, setOpenComment] = useState(null)
  const { vendor } = useSelector((state) => state.vendorInfo);
  const dispatch = useDispatch();

  useEffect(() => {
    async function invoke() {
      let token = localStorage.getItem("vendortoken");
      if (token) {
        const response = await VendorisAuthApi(token);
        if (response) {
          if (response.auth) {
            dispatch(vendorDetails(response.vendorObj));
          } else {
            router.push("/vendor/signin");
          }
        }
      } else {
        router.push("/vendor/signin");
      }

      const res = await GetAllPosts();
      if (res) {
        setPosts(res);
      }
    }
    invoke();
  }, []);

  const liked = async (postId)=>{
    const res = await LikedPost(postId, vendor._id)
  }

  useEffect(()=>{
    async function invoke(){
      const res = await GetAllPosts();
      if (res) {
        res.map((doc)=>{
          doc.Liked.map((obj)=>{
            if (obj.vendorId == vendor._id) {
              doc.like = true
            }
          })
        })
        setPosts(res);
      }
    }
    invoke();
  })

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
                    <>
                    <Box sx={{ display: "flex" }}>
                      <IconButton>
                        <Avatar src={post.vendorId.image ? post.vendorId.image : ''}/>
                      </IconButton>
                      <Box sx={{ pt: 1.7, fontFamily: "sans-serif" }}>
                        <h4>{post.vendorId.firstName + ' ' + post.vendorId.lastName}</h4>
                        <h6>{post.vendorId.job}</h6>
                      </Box>
                      <Box
                        sx={{
                          ml: "auto",
                          p: 0.8,
                          pl: 1.9,
                          pr: 2,
                          backgroundColor: "#1976d2",
                          mt: 2,
                          mb: 2,
                          borderRadius: "25px",
                          color: "#fff",
                        }}
                      >
                        <h6>+ Connect</h6>
                      </Box>
                    </Box>
                    <p
                      style={{
                        padding: "5px",
                        marginTop: "15px",
                        fontSize: "15px",
                      }}
                    >
                      {post.description ? post.description : ""}
                    </p>
                    <img
                      src={post.image ? post.image : ""}
                      style={{
                        marginTop: "10px",
                        width: "100%",
                        height: "fit-content",
                        borderRadius: "5px",
                        border: "1px solid #000",
                      }}
                      alt=""
                    />
                    <Box
                      sx={{
                        borderRadius: "5px",
                        backgroundColor: "#f5f5f5",
                        textAlign: "center",
                        display: "flex",
                      }}
                    >
                      <Grid xs={3}>
                        <IconButton onClick={()=>liked(post._id)} size="large" sx={{ color: "blue" }}>
                          {
                            post.like ? <ThumbUpAltIcon/> : <ThumbUpOffAltIcon />
                          }
                        </IconButton>
                      </Grid>
                      <Grid xs={3}>
                        <IconButton
                          onClick={() =>
                            openComment
                              ? setOpenComment(null)
                              : setOpenComment(post._id)
                          }
                          size="large"
                          sx={{ color: "blue" }}
                        >
                          <QuestionAnswerOutlinedIcon />
                        </IconButton>
                      </Grid>
                      <Grid xs={3}>
                        <IconButton size="large" sx={{ color: "blue" }}>
                          <ShareOutlinedIcon />
                        </IconButton>
                      </Grid>
                      <Grid xs={3}>
                        <IconButton size="large" sx={{ color: "blue" }}>
                          <MoreVertIcon />
                        </IconButton>
                      </Grid>
                    </Box>
                    <Box
                      sx={{
                        mt: 2,
                        fontFamily: "sans-serif",
                        display: "flex",
                      }}
                    >
                      <p>
                        <b>150</b> Like{" "}
                      </p>
                      <img
                        src="/null-profile.jpg"
                        style={{
                          marginLeft: "5px",
                          width: "18px",
                          height: "fit-content",
                          borderRadius: "50%",
                          border: "1px solid #000",
                        }}
                        alt=""
                      />
                      <h6 style={{ margin: "4px" }}>Minhaj and Others</h6>
                    </Box>
                    <Box
                      sx={{
                        mt: 2,
                        mb: 4,
                        fontFamily: "sans-serif",
                        display: "flex",
                      }}
                    >
                      <Card sx={{ mt: -2, boxShadow: "none", width: "100%" }}>
                        <CardHeader
                          sx={{ p: 0, width: "fit-content" }}
                          title="Comments"
                          action={
                            <IconButton
                              onClick={() =>
                                openComment
                                  ? setOpenComment(null)
                                  : setOpenComment(post._id)
                              }
                              aria-label="expand"
                              size="small"
                            >
                              {openComment == post._id ? (
                                <KeyboardArrowUpIcon />
                              ) : (
                                <KeyboardArrowDownIcon />
                              )}
                            </IconButton>
                          }
                        ></CardHeader>
                        <div
                          style={{ backgroundColor: "rgba(211,211,211,0.4)" }}
                        >
                          <Collapse
                            in={openComment == post._id}
                            timeout="auto"
                            unmountOnExit
                          >
                            <Box
                              sx={{
                                display: "flex",
                                backgroundColor: "rgb(211 211 211)",
                                p: 1.5,
                                borderRadius: "10px",
                                m: 1,
                              }}
                            >
                              <img
                                src="/null-profile.jpg"
                                style={{
                                  marginLeft: "5px",
                                  width: "33px",
                                  height: "fit-content",
                                  borderRadius: "50%",
                                  border: "1px solid #000",
                                }}
                                alt=""
                              />
                              <Input
                                type="text"
                                placeholder="Add a comment..."
                                sx={{ width: "100%", pl: 2 }}
                              />
                            </Box>
                            <CardContent
                              className="comments"
                              sx={{
                                backgroundColor: "rgb(211 211 211)",
                                p: 1.5,
                                borderRadius: "10px",
                                m: 1,
                                height: "300px",
                                overflowY: "auto",
                              }}
                            >
                              <Box sx={{ mt: 2, display: "flex" }}>
                                <img
                                  src="/null-profile.jpg"
                                  style={{
                                    marginLeft: "5px",
                                    width: "25px",
                                    height: "fit-content",
                                    borderRadius: "50%",
                                    border: "1px solid #000",
                                  }}
                                  alt=""
                                />
                                <h5
                                  style={{
                                    marginTop: "5px",
                                    marginLeft: "5px",
                                    fontWeight: "bold",
                                  }}
                                >
                                  Akif Rahman
                                </h5>
                                <h6
                                  style={{
                                    marginTop: "6px",
                                    marginLeft: "13px",
                                    fontWeight: "bold",
                                  }}
                                >
                                  1.09 PM
                                </h6>
                                <IconButton
                                  size="small"
                                  sx={{ color: "#f53b3b", ml: "auto" }}
                                >
                                  <BsFillTrashFill style={{ width: "14px" }} />
                                </IconButton>
                              </Box>
                              <Box
                                sx={{
                                  ml: 5,
                                  mb: 2,
                                  mr: 2,
                                }}
                              >
                                <h6>
                                  aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaassssssssssssssssssaaasssssssssssssssssa
                                </h6>
                              </Box>
                              <hr />
                              <Box sx={{ mt: 2, display: "flex" }}>
                                <img
                                  src="/null-profile.jpg"
                                  style={{
                                    marginLeft: "5px",
                                    width: "25px",
                                    height: "fit-content",
                                    borderRadius: "50%",
                                    border: "1px solid #000",
                                  }}
                                  alt=""
                                />
                                <h5
                                  style={{
                                    marginTop: "5px",
                                    marginLeft: "5px",
                                    fontWeight: "bold",
                                  }}
                                >
                                  Akif Rahman
                                </h5>
                                <h6
                                  style={{
                                    marginTop: "6px",
                                    marginLeft: "13px",
                                    fontWeight: "bold",
                                  }}
                                >
                                  1.09 PM
                                </h6>
                                <IconButton
                                  size="small"
                                  sx={{ color: "#f53b3b", ml: "auto" }}
                                >
                                  <BsFillTrashFill style={{ width: "14px" }} />
                                </IconButton>
                              </Box>
                              <Box
                                sx={{
                                  ml: 5,
                                  mb: 2,
                                  mr: 2,
                                }}
                              >
                                <h6>aaaaaaaaaaa</h6>
                              </Box>
                              <hr />
                              <Box sx={{ mt: 2, display: "flex" }}>
                                <img
                                  src="/null-profile.jpg"
                                  style={{
                                    marginLeft: "5px",
                                    width: "25px",
                                    height: "fit-content",
                                    borderRadius: "50%",
                                    border: "1px solid #000",
                                  }}
                                  alt=""
                                />
                                <h5
                                  style={{
                                    marginTop: "5px",
                                    marginLeft: "5px",
                                    fontWeight: "bold",
                                  }}
                                >
                                  Akif Rahman
                                </h5>
                                <h6
                                  style={{
                                    marginTop: "6px",
                                    marginLeft: "13px",
                                    fontWeight: "bold",
                                  }}
                                >
                                  1.09 PM
                                </h6>
                                <IconButton
                                  size="small"
                                  sx={{ color: "#f53b3b", ml: "auto" }}
                                >
                                  <BsFillTrashFill style={{ width: "14px" }} />
                                </IconButton>
                              </Box>
                              <Box
                                sx={{
                                  ml: 5,
                                  mb: 2,
                                  mr: 2,
                                }}
                              >
                                <h6>aaaaaaaaaaa</h6>
                              </Box>
                              <hr />
                              <Box sx={{ mt: 2, display: "flex" }}>
                                <img
                                  src="/null-profile.jpg"
                                  style={{
                                    marginLeft: "5px",
                                    width: "25px",
                                    height: "fit-content",
                                    borderRadius: "50%",
                                    border: "1px solid #000",
                                  }}
                                  alt=""
                                />
                                <h5
                                  style={{
                                    marginTop: "5px",
                                    marginLeft: "5px",
                                    fontWeight: "bold",
                                  }}
                                >
                                  Akif Rahman
                                </h5>
                                <h6
                                  style={{
                                    marginTop: "6px",
                                    marginLeft: "13px",
                                    fontWeight: "bold",
                                  }}
                                >
                                  1.09 PM
                                </h6>
                                <IconButton
                                  size="small"
                                  sx={{ color: "#f53b3b", ml: "auto" }}
                                >
                                  <BsFillTrashFill style={{ width: "14px" }} />
                                </IconButton>
                              </Box>
                              <Box
                                sx={{
                                  ml: 5,
                                  mb: 2,
                                  mr: 2,
                                }}
                              >
                                <h6>aaaaaaaaaaa</h6>
                              </Box>
                              <hr />
                              <Box sx={{ mt: 2, display: "flex" }}>
                                <img
                                  src="/null-profile.jpg"
                                  style={{
                                    marginLeft: "5px",
                                    width: "25px",
                                    height: "fit-content",
                                    borderRadius: "50%",
                                    border: "1px solid #000",
                                  }}
                                  alt=""
                                />
                                <h5
                                  style={{
                                    marginTop: "5px",
                                    marginLeft: "5px",
                                    fontWeight: "bold",
                                  }}
                                >
                                  Akif Rahman
                                </h5>
                                <h6
                                  style={{
                                    marginTop: "6px",
                                    marginLeft: "13px",
                                    fontWeight: "bold",
                                  }}
                                >
                                  1.09 PM
                                </h6>
                                <IconButton
                                  size="small"
                                  sx={{ color: "#f53b3b", ml: "auto" }}
                                >
                                  <BsFillTrashFill style={{ width: "14px" }} />
                                </IconButton>
                              </Box>
                              <Box
                                sx={{
                                  ml: 5,
                                  mb: 2,
                                  mr: 2,
                                }}
                              >
                                <h6>
                                  aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaahkuhnkjnnnnnnnnnnnnnnnnnnnnsikjdncskdlznxcmszxkaaaa
                                </h6>
                              </Box>
                              <hr />
                              <Box sx={{ mt: 2, display: "flex" }}>
                                <img
                                  src="/null-profile.jpg"
                                  style={{
                                    marginLeft: "5px",
                                    width: "25px",
                                    height: "fit-content",
                                    borderRadius: "50%",
                                    border: "1px solid #000",
                                  }}
                                  alt=""
                                />
                                <h5
                                  style={{
                                    marginTop: "5px",
                                    marginLeft: "5px",
                                    fontWeight: "bold",
                                  }}
                                >
                                  Akif Rahman
                                </h5>
                                <h6
                                  style={{
                                    marginTop: "6px",
                                    marginLeft: "13px",
                                    fontWeight: "bold",
                                  }}
                                >
                                  1.09 PM
                                </h6>
                                <IconButton
                                  size="small"
                                  sx={{ color: "#f53b3b", ml: "auto" }}
                                >
                                  <BsFillTrashFill style={{ width: "14px" }} />
                                </IconButton>
                              </Box>
                              <Box
                                sx={{
                                  ml: 5,
                                  mb: 2,
                                  mr: 2,
                                }}
                              >
                                <h6>aaaaaaaaaaa</h6>
                              </Box>
                            </CardContent>
                          </Collapse>
                        </div>
                      </Card>
                    </Box>
                    </>
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
      </div>
    </>
  );
}
