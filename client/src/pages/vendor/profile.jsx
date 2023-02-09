import { Inter } from "@next/font/google";
import { Box } from "@mui/system";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  Collapse,
  Input,
  Modal,
  TextareaAutosize,
} from "@mui/material";
import Messages from "@/components/Messages/Message";
import Notifications from "@/components/Notifications/Notification";
import Link from "next/link";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PhotoSizeSelectActualIcon from "@mui/icons-material/PhotoSizeSelectActual";
import SmartDisplayIcon from "@mui/icons-material/SmartDisplay";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import QuestionAnswerOutlinedIcon from "@mui/icons-material/QuestionAnswerOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import VendorNavbar from "@/components/Navabar/VendorNavbar";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { vendorDetails } from "@/redux/vendor";
import { AccountCircle } from "@mui/icons-material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { BsFillTrashFill, IconName } from "react-icons/bs";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { storage } from "@/firebase/config";
import { DeletePost, EditPost, VendorAddPost, VendorGetPosts, VendorisAuthApi } from "@/Apis/vendorApi";
import ModeIcon from '@mui/icons-material/Mode';
import ReportIcon from '@mui/icons-material/Report';
import DeleteIcon from '@mui/icons-material/Delete';
import EditPostModal from "@/components/Modal/EditPostModal";
import Posts from "@/components/Posts/Post";

const inter = Inter({ subsets: ["latin"] });

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", sm: "70%", md: "40%" },
  minHeight: { xs: "10%", sm: "10%", md: "10%" },
  bgcolor: "#fff",
  border: "2px solid #000",
  boxShadow: 24,
  p: 1,
  borderRadius: "10px",
};

export default function VendorProfile() {
  const router = useRouter();
  const { vendor } = useSelector((state) => state.vendorInfo);
  const dispatch = useDispatch();
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [posts, setPosts] = useState([]);
  const [refreshPost, setrefreshPost] = useState(false);
  const [ openMoreBox, setOpenMoreBox] = useState(null)
  const [ modalPost, setModalPost] = useState({})

  useEffect(() => {
    async function invoke(){
      let token = localStorage.getItem("vendortoken");
      if (token) {
        const response = await VendorisAuthApi(token)
        if (response) {
          if (response.auth) {
            dispatch(vendorDetails(response.vendorObj));
            const res = await VendorGetPosts(response.vendorObj._id)
            if (res) {
              setPosts(res);
            }
          } else {
            router.push("/vendor/signin");
          }
        }
      } else {
        router.push("/vendor/signin");
      }
    }
    invoke();
  }, []);

  useEffect(() => {
    async function invokePosts(){
      const response = await VendorGetPosts(vendor._id)
      if (response) {
        console.log(response);
        response.map(async (doc)=>{
          doc.Likes.map((obj)=>{
            if (obj.likerId == vendor._id) {
              doc.like = true
            }
          })
          doc.Comments = await doc.Comments.reverse()
        })
        setPosts(response);
      }
    }
    invokePosts();
  }, [refreshPost , vendor]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    let dir = Date.now();
    let rand = Math.random();
    const imageRef = ref(storage, `posts/${dir}${rand}/${image?.name}`);
    const toBase64 = (image) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      }).catch((err) => {
        console.log(err);
      });
    const imgBase = await toBase64(image);
    await uploadString(imageRef, imgBase, "data_url").then(async () => {
      const downloadURL = await getDownloadURL(imageRef);
      const data = {
        vendorId: vendor._id,
        description: description,
        image: downloadURL,
      };
      const resp = await VendorAddPost(data)
      if (resp) {
        setImage("");
        setOpen(false);
        setDescription("");
        setrefreshPost(!refreshPost)
      }
    });
    setImage(null);
    setOpen(false);
  };

  const deletePost = async (postId)=> {
    const res = await DeletePost(postId)
    if (res) {
      setrefreshPost(!refreshPost)
    }
  }

  const [open, setOpen] = useState(false);
  const [openEditPostModal, setOpenEditPostModal] = useState(false);
  const [ openComment, setOpenComment] = useState(null)

  const handleEditPostModalOpen = (post) => {
    setModalPost(post)
    setOpenEditPostModal(true)
  }
  const handleEditPostModalClose = () => setOpenEditPostModal(false)

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setImage("");
    setOpen(false);
  };

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
                    <AccountCircle />
                    <h3 style={{ marginLeft: "7px", fontSize: "22px" }}>
                      Profile
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
                    <Box sx={{ display: "flex" }}>
                      <Grid xs={12} sx={{ display: "flex" }}>
                        <Grid xs={4} sx={{ fontFamily: "sans-serif" }}>
                          <img
                            src={
                              vendor.image ? vendor.image : "/null-profile.jpg"
                            }
                            style={{
                              width: "67px",
                              height: "fit-content",
                              borderRadius: "50%",
                              border: "1px solid #000",
                            }}
                            alt=""
                          />
                          <h4 style={{ fontWeight: "900" }}>
                            {vendor.firstName + " " + vendor.lastName}
                          </h4>
                          <h6>{vendor.job}</h6>
                          <Link
                            style={{
                              fontSize: "10px",
                              fontWeight: "900",
                              textDecoration: "underline",
                            }}
                            href="#"
                          >
                            Contact info
                          </Link>
                        </Grid>
                        <Grid
                          xs={4}
                          sx={{
                            color: "blue",
                            textAlign: "center",
                            fontFamily: "sans-serif",
                          }}
                        >
                          <h5
                            style={{
                              fontSize: "12px",
                              fontWeight: "800",
                              marginBottom: "10px",
                            }}
                          >
                            Connections
                          </h5>
                          <h4>21</h4>
                        </Grid>
                        <Grid xs={4} sx={{ mt: -1, textAlign: "end" }}>
                          <IconButton onClick={handleOpen}>
                            <AddAPhotoIcon />
                          </IconButton>
                          <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                          >
                            <Box
                              sx={style}
                              component="form"
                              noValidate
                              onSubmit={handleSubmit}
                            >
                              <Grid
                                sx={{
                                  height: "-webkit-fill-available",
                                  textAlign: "center",
                                }}
                              >
                                <Grid xs={12} sx={{ p: 1 }}>
                                  <img
                                    src={
                                      image ? URL.createObjectURL(image) : ""
                                    }
                                    style={{
                                      height: "150px",
                                      borderRadius: "5px",
                                      border: "1px solid #000",
                                      // width: '-webkit-fill-available'
                                    }}
                                    alt=""
                                  />
                                  <Input
                                    sx={{
                                      width: "100%",
                                      height: "fit-content",
                                      borderRadius: "5px",
                                      border: "1px solid #000",
                                    }}
                                    id="upload"
                                    class="file-upload__input"
                                    type="file"
                                    name="image"
                                    onChange={(e) =>
                                      setImage(e.target.files[0])
                                    }
                                  />
                                </Grid>
                                <Grid xs={12} sx={{ p: 1 }}>
                                  <TextareaAutosize
                                    onChange={(e) =>
                                      setDescription(e.target.value)
                                    }
                                    name="description"
                                    id=""
                                    style={{
                                      maxWidth: "-webkit-fill-available",
                                      minWidth: "-webkit-fill-available",
                                      maxHeight: "150px",
                                      minHeight: "150px",
                                      overflowY: "auto",
                                    }}
                                  ></TextareaAutosize>
                                </Grid>
                                <Grid xs={12} sx={{ textAlign: "end" }}>
                                  <Button
                                    onClick={handleClose}
                                    sx={{
                                      pl: 2,
                                      pr: 2,
                                      mr: 1,
                                      backgroundColor: "#1976d2",
                                      color: "#fff",
                                      fontWeight: "900",
                                      fontSize: "12px",
                                      ":hover": { backgroundColor: "#1976d2" },
                                    }}
                                  >
                                    Cancel
                                  </Button>
                                  <Button
                                    type="submit"
                                    sx={{
                                      pl: 2,
                                      pr: 2,
                                      mr: 1,
                                      backgroundColor: "#1976d2",
                                      color: "#fff",
                                      fontWeight: "900",
                                      fontSize: "12px",
                                      ":hover": { backgroundColor: "#1976d2" },
                                    }}
                                  >
                                    Submit
                                  </Button>
                                </Grid>
                              </Grid>
                            </Box>
                          </Modal>
                          <IconButton>
                            <MoreVertIcon />
                          </IconButton>
                        </Grid>
                      </Grid>
                    </Box>
                    <Link href="/vendor/edit_profile">
                      <Grid
                        xs={12}
                        sx={{
                          mt: 2,
                          p: 0.8,
                          boxShadow: 3,
                          textAlign: "center",
                          border: "1px solid lightgray",
                          borderRadius: "5px",
                          ":active": { backgroundColor: "#f1f0f0" },
                        }}
                      >
                        <h6>EDIT PROFILE</h6>
                      </Grid>
                    </Link>
                    <Grid
                      xs={12}
                      sx={{
                        mt: 2,
                        mb: 2,
                        p: 1,
                        display: "flex",
                        textAlign: "center",
                        border: "4px outset lightgray",
                        borderRadius: "10px",
                      }}
                    >
                      <Grid xs={6}>
                        <IconButton
                          size="small"
                          sx={{ color: "#111", borderRadius: "10px" }}
                        >
                          <PhotoSizeSelectActualIcon />
                          <h4
                            style={{
                              marginLeft: "6px",
                              fontFamily: "sans-serif",
                            }}
                          >
                            Photos
                          </h4>
                        </IconButton>
                      </Grid>
                      <Grid xs={6}>
                        <IconButton
                          size="small"
                          sx={{ color: "#111", borderRadius: "10px" }}
                        >
                          <SmartDisplayIcon />
                          <h4
                            style={{
                              marginLeft: "6px",
                              fontFamily: "sans-serif",
                            }}
                          >
                            Vidoes
                          </h4>
                        </IconButton>
                      </Grid>
                    </Grid>
                    {posts.map((post)=>(
                    <>
                      <Posts post = {post} setrefreshComment={setrefreshPost} refreshComment={refreshPost} user={vendor} vendor={true}/>
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
