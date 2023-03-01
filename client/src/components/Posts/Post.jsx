import { Inter } from "@next/font/google";
import { Box } from "@mui/system";
import { Avatar, Button, Card, CardContent, CardHeader, Collapse, Grid, IconButton, Input, Modal } from "@mui/material";
import Notifications from "@/components/Notifications/Notification";
import Messages from "@/components/Messages/Message";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import QuestionAnswerOutlinedIcon from "@mui/icons-material/QuestionAnswerOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import VendorNavbar from "@/components/Navabar/VendorNavbar";
import { connect, useDispatch, useSelector } from "react-redux";
import { vendorDetails } from "@/redux/vendor";
import HomeIcon from "@mui/icons-material/Home";
import { AddCommnet, DeleteComment, DeletePost, GetAllPosts, LikedPost, ReportPost, VendorisAuthApi } from "@/Apis/vendorApi";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { BsFillTrashFill } from "react-icons/bs";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import SendIcon from '@mui/icons-material/Send';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import Swal from "sweetalert2";
import ModeIcon from '@mui/icons-material/Mode';
import ReportIcon from '@mui/icons-material/Report';
import DeleteIcon from '@mui/icons-material/Delete';
import EditPostModal from "@/components/Modal/EditPostModal";
import LikeModal from "@/components/Modal/LikeModal";
import Link from "next/link";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Carousel from "react-material-ui-carousel";
import Moment from 'react-moment'
import { AddNotification, ConnectWithPeople, getAllConnectors } from "@/Apis/userApi";
import { AuthContext } from "@/store/Context";

const Posts = (props) => {
    const [comment, setComment] = useState('');
    const [ openComment, setOpenComment] = useState(null)
    const [openEditPostModal, setOpenEditPostModal] = useState(false);
    const [openLikeModal, setOpenLikeModal] = useState(false);
    const [ openMoreBox, setOpenMoreBox] = useState(null)
    const [ openReportBox, setOpenReportBox] = useState(null)
    const [ modalPost, setModalPost] = useState({})

    const { sendNotification, setSendNotification } = useContext(AuthContext)

    const handleEditPostModalOpen = (post) => {
      setModalPost(post)
      setOpenEditPostModal(true)
    }
    const handleEditPostModalClose = () => setOpenEditPostModal(false)

    const handleLikeModalOpen = (post) => {
      setModalPost(post)
      setOpenLikeModal(true)
    }
    const handleLikeModalClose = () => setOpenLikeModal(false)

    const liked = async (postId, vendorId)=>{
        const res = await LikedPost(postId, props.user._id)
        if (res.status === "success") {
            const res = await AddNotification({senderId:props.user._id, recieverId:vendorId, content:`${props.user.firstName + ' ' + props.user.lastName} Liked your post`})
            setSendNotification({recieverId:vendorId, notification:`${props.user.firstName + ' ' + props.user.lastName} Liked your post`})
        }
        props.setrefreshComment(!props.refreshComment)
      }
    
      const addComment = async (postId, vendorId)=>{
        const data = {
          comment,
          postId,
          writerId:props.user._id
        }
        if (data.comment) {
          const res = await AddCommnet(data)
        if (res) {
            const res = await AddNotification({senderId:props.user._id, recieverId:vendorId, content:`${props.user.firstName + ' ' + props.user.lastName} Commented your post`})
            setSendNotification({recieverId:vendorId, notification:`${props.user.firstName + ' ' + props.user.lastName} Commented your post`})
            props.setrefreshComment(!props.refreshComment)
        }
      }
      }
    
      const deleteComment = async (postId, commentId)=>{
        Swal.fire({
          title: "Are you sure",
          confirmButtonText: "Yes",
          cancelButtonText: "No",
          showCancelButton: true,
          customClass: "swal-wide",
        }).then(async (result) => {
          if (result.isConfirmed) {
            const res = await DeleteComment(postId, commentId)
            if (res) {
                props.setrefreshComment(!props.refreshComment)
            }
          }
        });
        
      }

      const reportPost = async (msg,postId)=>{
        const res = await ReportPost(msg,postId,props.user._id)
        setOpenReportBox(null)
        if (res.status == 'failed') {
          toast.error('Your already reported this Post!', {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          })
        }
      }

      const deletePost = async (postId)=> {
        const res = await DeletePost(postId)
        if (res) {
          props.setrefreshComment(!props.refreshComment)
        }
      }

    return ( 
        <>
            <Box sx={{ display: "flex" }}>
            <ToastContainer/>
                      <IconButton>
                        {props.user._id == props.post.vendorId._id ? <Avatar src={props.post.vendorId.image ? props.post.vendorId.image : ''}/> : <Link href={props.vendor ? `/vendor/worker_profile/${props.post.vendorId._id}` : `/worker_profile/${props.post.vendorId._id}`}><Avatar src={props.post.vendorId.image ? props.post.vendorId.image : ''}/></Link> }
                      </IconButton>
                      {props.user._id == props.post.vendorId._id ? <Box sx={{ pt: 1.7, fontFamily: "sans-serif" }}>
                        <Box display={'flex'}>
                          <h4 style={{ color:'#000' , marginRight:'10px' }}>{props.post.vendorId.firstName + ' ' + props.post.vendorId.lastName}</h4>
                          <Moment style={{ fontSize:'10px'  , color:'gray' , marginTop:'4.5px' }} fromNow>{props.post?.updatedAt}</Moment>
                        </Box>
                        <h6 style={{ color:'#000' }}>{props.post.vendorId.job}</h6>
                      </Box> : 
                      <Link href={props.vendor ? `/vendor/worker_profile/${props.post.vendorId._id}` : `/worker_profile/${props.post.vendorId._id}`}>
                      <Box sx={{ pt: 1.7, fontFamily: "sans-serif" }}>
                        <Box display={'flex'}>
                          <h4 style={{ color:'#000' , marginRight:'10px' }}>{props.post.vendorId.firstName + ' ' + props.post.vendorId.lastName}</h4>
                          <Moment style={{ fontSize:'10px'  , color:'gray' , marginTop:'4.5px' }} fromNow>{props.post?.createdAt}</Moment>
                        </Box>
                        <h6 style={{ color:'#000' }}>{props.post.vendorId.job}</h6>
                      </Box>
                      </Link>
                      }
                      {/* { props.user._id == props.post.vendorId._id ? '' :
                      <Box sx={{ ml:'auto' }}>
                        {props.post.connected ?
                        <Button
                          onClick={connect}
                          sx={{
                            ml: "auto",
                            p: 0.1,
                            pl: 1.9,
                            pr: 2,
                            backgroundColor: "#fff",
                            border: 1,
                            mt: 2,
                            mb: 2,
                            borderRadius: "25px",
                            color: "#1976d2",
                            display:'flex',
                            boxShadow: 3 ,
                            ":hover":{ bgcolor:'#fff' }
                          }}
                        >
                          <h6 style={{ marginTop:'3px' , marginBottom:'3px' , fontWeight:'900'  }}>{props.post.status}</h6>
                        </Button>
                        :
                        <Button
                          onClick={connect}
                          sx={{
                            ml: "auto",
                            p: 0.1,
                            pl: 1.9,
                            pr: 2,
                            backgroundColor: "#1976d2",
                            mt: 2,
                            mb: 2,
                            borderRadius: "25px",
                            color: "#fff",
                            display:'flex',
                            boxShadow: 3 ,
                            ":hover":{ bgcolor:'#1976d2' }
                          }}
                        >
                          <PersonAddIcon sx={{ width:'15px' , mr: 0.3 }}/><h6 style={{ marginTop:'3px' }}>Connect</h6>
                        </Button>
                        }
                      </Box>
                       } */}
                    </Box>
                    <p
                      style={{
                        padding: "5px",
                        marginTop: "15px",
                        fontSize: "15px",
                      }}
                    >
                      {props.post.description ? props.post.description : ""}
                    </p>
                    <Carousel sx={{ p:1 , m:0 , height:'320px' }}>
                      {props.post.image.map((img)=>(
                        <Box sx={{ p:0.5 , m:0 , height:'270px' , border: "3px solid gray" , borderRadius:'10px' , backgroundColor:'#f3f3f3e6' , display:'flex' , justifyContent:'center' , alignItems:'center' }}>
                          <img
                            src={img ? img : ""}
                            style={{
                              maxWidth: "100%",
                              maxHeight: "261px",
                            }}
                            alt=""
                          />
                        </Box>
                        
                      ))}
                    </Carousel>
                    <Box
                      sx={{
                        borderRadius: "5px",
                        backgroundColor: "#f5f5f5",
                        textAlign: "center",
                        display: "flex",
                      }}
                    >
                      <Grid xs={3}>
                        <IconButton onClick={()=>liked(props.post._id, props.post.vendorId._id)} size="large" sx={{ color: "#1976d2" }}>
                          {
                            props.post.like ? <ThumbUpAltIcon/> : <ThumbUpOffAltIcon />
                          }
                        </IconButton>
                      </Grid>
                      <Grid xs={3}>
                        <IconButton
                          onClick={() =>
                            openComment
                              ? setOpenComment(null)
                              : setOpenComment(props.post._id)
                          }
                          size="large"
                          sx={{ color: "#1976d2" }}
                        >
                          <QuestionAnswerOutlinedIcon />
                        </IconButton>
                      </Grid>
                      <Grid xs={3}>
                        <IconButton size="large" sx={{ color: "#1976d2" }}>
                          <ShareOutlinedIcon />
                        </IconButton>
                      </Grid>
                      <Grid xs={3}>
                        { props.user._id == props.post.vendorId._id ? 
                        <IconButton onClick={() =>
                          openMoreBox
                            ? setOpenMoreBox(null)
                            : setOpenMoreBox(props.post._id)
                        } size="large" sx={{ color: "#1976d2" }}>
                          <MoreVertIcon />
                        </IconButton>
                        
                       : <IconButton onClick={() =>
                        openReportBox
                          ? setOpenReportBox(null)
                          : setOpenReportBox(props.post._id)
                      } size="large" sx={{ color: "#1976d2" }}> 
                          <ReportGmailerrorredIcon />
                        </IconButton> }
                        <Collapse
                            sx={{ backgroundColor:'#fff' , border:'3px double #111' , position:'absolute' , borderRadius:'7px' , p: 1 , ml: { xs: -9.4 , sm: 0 , md: -5} , zIndex:'100' }}
                            in={openReportBox == props.post._id}
                            timeout="auto"
                            unmountOnExit
                          >
                            <Button onClick={()=> reportPost('Its spam!',props.post._id)} sx={{ fontSize:'12px' , width:'inherit' , color:'#111' , justifyContent: 'flex-start' , textTransform: 'capitalize' }}>Its spam!</Button>
                            <br />
                            <Button onClick={()=> reportPost('Scam or Fraud',props.post._id)} sx={{ fontSize:'12px' , width:'inherit' , color:'#111' , justifyContent: 'flex-start' , textTransform: 'capitalize' }}>Scam or Fraud</Button>
                            <br />
                            <Button onClick={()=> reportPost("I just don't like it!",props.post._id)} sx={{ fontSize:'12px' , width:'inherit' , color:'#111' , justifyContent: 'flex-start' , textTransform: 'capitalize' }}>I just don't like it!</Button>
                            <br />
                            <Button onClick={()=> reportPost('Its illegal!',props.post._id)} sx={{ fontSize:'12px' , width:'inherit' , color:'#111' , justifyContent: 'flex-start' , textTransform: 'capitalize' }}>Its illegal!</Button>
                            <br />
                            <Button onClick={()=> reportPost('False information!',props.post._id)} sx={{ fontSize:'12px' , width:'inherit' , color:'#111' , justifyContent: 'flex-start' , textTransform: 'capitalize' }}>False information!</Button>
                            <br />
                            <Button onClick={()=> reportPost('Something else',props.post._id)} sx={{ fontSize:'12px' , width:'inherit' , color:'#111' , justifyContent: 'flex-start' , textTransform: 'capitalize' }}>Something else</Button>
                          </Collapse>
                        <Collapse
                            sx={{ backgroundColor:'#fff' , border:'3px double #111' , position:'absolute' , borderRadius:'7px' , p: 1 , ml: { xs: -2.4 , sm: 0 , md: 2} }}
                            in={openMoreBox == props.post._id}
                            timeout="auto"
                            unmountOnExit
                          >
                            <Button onClick={()=>handleEditPostModalOpen(props.post)} sx={{ fontSize:'12px' , width:'inherit' , color:'#111' , justifyContent: 'flex-start' }}><ModeIcon sx={{width:'16px' , mr: 0.4 }}/>Edit</Button>
                            <br />
                            <Button onClick={()=>deletePost(props.post._id)} sx={{ fontSize:'12px' , width:'inherit' , color:'#111' , justifyContent: 'flex-start' }}><DeleteIcon sx={{width:'16px' , mr: 0.4 }}/>Delete</Button>
                          </Collapse>
                          <Modal
                            open={openEditPostModal}
                            onClose={handleEditPostModalClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                          >
                            <EditPostModal post={modalPost} setRefresh={props.setrefreshComment} refresh={props.refreshComment} close={setOpenEditPostModal}/>
                          </Modal>
                      </Grid>
                    </Box>
                    <Box
                      sx={{
                        mt: 2,
                        fontFamily: "sans-serif",
                        display: "flex",
                      }}
                    >
                      <p onClick={()=>handleLikeModalOpen(props.post)}>
                        <b>{props.post.Likes.length}</b> Like
                      </p>
                      <Modal
                            open={openLikeModal}
                            onClose={handleLikeModalClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                          >
                            <LikeModal likes = {props.post.Likes} vendor={props.vendor} user = {props.user}/>
                      </Modal>
                      {props.post.Likes[1] ? <img
                        src={props.post.Likes[0].likerImage ? props.post.Likes[0].likerImage : "/null-profile.jpg"}
                        style={{
                          marginLeft: "5px",
                          width: "18px",
                          height: "fit-content",
                          borderRadius: "50%",
                          border: "1px solid #000",
                        }}
                        alt=""
                      /> : ''}
                      {props.post.Likes[1] ? <h6 style={{ margin: "4px" }}>{props.post.Likes[0].likerName ? props.post.Likes[0].likerName : '' } and Others</h6> : ''}
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
                          title={`${props.post.Comments[0] ? props.post.Comments.length : ''} Comments`}
                          action={
                            <IconButton
                              onClick={() =>
                                openComment
                                  ? setOpenComment(null)
                                  : setOpenComment(props.post._id)
                              }
                              aria-label="expand"
                              size="small"
                            >
                              {openComment == props.post._id ? (
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
                            in={openComment == props.post._id}
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
                                src={props.user.image ? props.user.image : "/null-profile.jpg"}
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
                                onChange={(e)=>setComment(e.target.value)}
                                sx={{ width: "100%", pl: 2 }}
                              />
                              <IconButton onClick={()=>addComment(props.post._id, props.post.vendorId._id)} sx={{ backgroundColor:'#1976d2' , color:'#fff' , borderRadius:'30px' , width:'32px' , height:'32px' , ":hover":{ backgroundColor:'#1976d2' } }}><SendIcon sx={{ width:'70%' }}/></IconButton>
                            </Box>
                            <CardContent
                              className="comments"
                              sx={{
                                backgroundColor: "rgb(211 211 211)",
                                p: 1.5,
                                borderRadius: "10px",
                                m: 1,
                                maxHeight: "300px",
                                overflowY: "auto",
                              }}
                            >
                              {props.post.Comments.map((Comment)=>(
                                <>
                                <hr />
                                    <Box sx={{ mt: 2, display: "flex" }}>
                                    {props.user._id == Comment.writerId ?  <img
                                        src={Comment.writerImage ? Comment.writerImage : "/null-profile.jpg"}
                                        style={{
                                          marginLeft: "5px",
                                          width: "25px",
                                          height: "fit-content",
                                          borderRadius: "50%",
                                          border: "1px solid #000",
                                        }}
                                        alt=""
                                      /> : 
                                    <Link href={props.vendor ? `/vendor/worker_profile/${Comment.writerId}` : `/worker_profile/${Comment.writerId}`}>
                                      <img
                                        src={Comment.writerImage ? Comment.writerImage : "/null-profile.jpg"}
                                        style={{
                                          marginLeft: "5px",
                                          width: "25px",
                                          height: "fit-content",
                                          borderRadius: "50%",
                                          border: "1px solid #000",
                                        }}
                                        alt=""
                                      />
                                      </Link> }
                                      {props.user._id == Comment.writerId ? 
                                      <h5
                                        style={{
                                          marginTop: "5px",
                                          marginLeft: "5px",
                                          fontWeight: "bold",
                                          color:'#000'
                                        }}
                                      >
                                        {Comment.writerName}
                                      </h5> : 
                                      <Link href={props.vendor ? `/vendor/worker_profile/${Comment.writerId}` : `/worker_profile/${Comment.writerId}`}>
                                      <h5
                                        style={{
                                          marginTop: "5px",
                                          marginLeft: "5px",
                                          fontWeight: "bold",
                                          color:'#000'
                                        }}
                                      >
                                        {Comment.writerName}
                                      </h5>
                                      </Link> }
                                      <h6
                                        style={{
                                          marginTop: "6px",
                                          marginLeft: "13px",
                                          fontWeight: "bold",
                                        }}
                                      >
                                        {Comment.time}
                                      </h6>
                                      { Comment.writerId == props.user._id ?
                                      <IconButton
                                       onClick={()=>deleteComment(props.post._id, Comment._id)}
                                        size="small"
                                        sx={{ color: "#f53b3b", ml: "auto" }}
                                      >
                                        <BsFillTrashFill style={{ width: "14px" }} />
                                      </IconButton>
                                      : '' }
                                    </Box>
                                    <Box
                                      sx={{
                                        ml: 5,
                                        mb: 2,
                                        mr: 2,
                                      }}
                                    >
                                      <h6>
                                        {Comment.comment}
                                      </h6>
                                    </Box>
                                </>
                              ))}
                            </CardContent>
                          </Collapse>
                        </div>
                      </Card>
                    </Box>
        </>
     );
}
 
export default Posts;