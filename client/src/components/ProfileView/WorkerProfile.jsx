import { Inter } from "@next/font/google";
import Navbar from "@/components/Navabar/Navbar";
import { Box } from "@mui/system";
import {
  Avatar,
  Button,
  Grid,
  IconButton,
  Modal,
  TextareaAutosize,
  TextField,
} from "@mui/material";
import Notifications from "@/components/Notifications/Notification";
import Messages from "@/components/Messages/Message";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { userDetails } from "@/redux/user";
import EngineeringIcon from "@mui/icons-material/Engineering";
import { Booking, ConnectWithPeople, getAllConnectors, GetJobs, GetWorkers, isAuthApi } from "@/Apis/userApi";
import MailIcon from '@mui/icons-material/Mail';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot';
import axios from "axios";
import PhotoSizeSelectActualIcon from "@mui/icons-material/PhotoSizeSelectActual";
import SmartDisplayIcon from "@mui/icons-material/SmartDisplay";
import Link from "next/link";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { BsFillChatDotsFill, IconName } from "react-icons/bs";
import Posts from "@/components/Posts/Post";
import { VendorGetPosts } from "@/Apis/vendorApi";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import Connections from "../Connections/connection";

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

const WorkerProfile = (props) => {
    const [ location, setLocation ] = useState(false)
    const [ locationErr, setLocationErr ] = useState('')
    const [ date, setDate ] = useState(false)
    const [ dateErr, setDateErr ] = useState('')
    const [ flag, setFlag ] = useState(false)
    const [open, setOpen] = useState(false);
    const [posts, setPosts] = useState([]);
    const [connected, setConnected] = useState(null);
    const [status, setStatus] = useState("");
    const [refreshPost, setrefreshPost] = useState(false);
    const [ connectionLength, setConnectionLength] = useState(null)
    const [ openConnectionBox, setOpenConnectionBox] = useState(false)

    useEffect(() => {
        async function invokePosts(){
          const response = await VendorGetPosts(props.worker._id)
          if (response) {
            response.map(async (doc)=>{
              doc.Likes.map((obj)=>{
                if (obj.likerId == props.user._id) {
                  doc.like = true
                }
              })
              doc.Comments = await doc.Comments.reverse()
            })
            setPosts(response);
          }
        }
        invokePosts();
      }, [ refreshPost , props.user ]);

      useEffect(() => {
        async function invokePosts(){
          const resp = await getAllConnectors(props.user._id)
          if (resp) {
            if (resp.connections.length > 0) {
              resp?.connections.map((obj)=>{
                if (obj.connectorId == props.worker._id) {
                  setConnected(true)
                  setStatus(obj.status)
                }else{
                  setConnected(false)
                }
              })
            } else{
              setConnected(false)
            }
            
          }
          const res = await getAllConnectors(props.worker._id)
          if (res) {
            const connectedConnection = res.connections.filter((obj)=>obj.status == 'connected')
            setConnectionLength(connectedConnection.length)
          }else{
            setConnectionLength('0')
          }
        }
        invokePosts();
      }, [connected, refreshPost , props.user, connectionLength ]);

      useEffect(()=>{
        async function invoke(){
          const res = await getAllConnectors(props.worker._id)
          if (res) {
            const connectedConnection = res.connections.filter((obj)=>obj.status == 'connected')
            setConnectionLength(connectedConnection.length)
          }else{
            setConnectionLength('0')
          }
        }
        invoke()
      },[connected, refreshPost, connectionLength])

    const handleSubmit = async (event) => {
        event.preventDefault();
        let data = new FormData(event.currentTarget);
        data = {
          location: data.get('location'),
          date: data.get('date'),
          details: data.get('details'),
        }
        if (data.location && data.date) {
          setDate(false)
          setLocation(false)
          setLocationErr('')
          setDateErr('')
          handleClose()
          const res = await Booking(data, props.worker._id, props.user._id)
        } else {
          if (data.location =='') {
            setLocation(true)
            setLocationErr('Please enter your location')
          }
          if (data.date =='') {
            setDate(true)
            setDateErr('Please enter the date')
          }
        }
      };
    
      const handleOpen = () => setOpen(true);
      const handleClose = () => {
        setOpen(false);
      };

      const connect = () =>{
        console.log(props.user._id, props.worker._id);
        const response = ConnectWithPeople(props.user._id, props.worker._id)
        if (response) {
          setrefreshPost(!refreshPost)
        }
      }

    return ( 
        <>
            <Grid sx={{ pt: 7 }}>
                {openConnectionBox ? 
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
                  <Button onClick={()=> setOpenConnectionBox(false)} sx={{ float:'right' , fontSize:'10px' , border: 1 , py: 0.3 , pt: 0.5 }}>Back</Button>
                  <br />
                  <Connections user={props.worker} vendor={props.vendor}/>
                </Box>
                  :
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
                    <Box sx={{ display: "flex" }}>
                      <Grid xs={12} sx={{ display: "flex" }}>
                        <Grid xs={4} sx={{ fontFamily: "sans-serif" }}>
                          <img
                            src={props.worker.image ? props.worker.image : "/null-profile.jpg"}
                            style={{
                              width: "67px",
                              height: "fit-content",
                              borderRadius: "50%",
                              border: "1px solid #000",
                            }}
                            alt=""
                          />
                          <h4 style={{ fontWeight: "900" , lineBreak:'auto' }}>
                            {props.worker.firstName + ' ' + props.worker.lastName}
                          </h4>
                          <h6>{props.worker.job}</h6>
                          <a
                          onClick={()=> setFlag(!flag)}
                            style={{
                              fontSize: "10px",
                              fontWeight: "900",
                              textDecoration: "underline",
                              cursor:'pointer',
                              color:'blue'
                            }}
                          >
                            more
                          </a>
                        </Grid>
                        <Grid
                          onClick={()=> setOpenConnectionBox(true)}
                          xs={4}
                          sx={{
                            cursor:'pointer',
                            color: "blue",
                            ":active":{color:'#8282ff'},
                            textAlign: "center",
                            fontFamily: "sans-serif",
                            height: 'fit-content'
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
                          <h4>{connectionLength}</h4>
                        </Grid>
                        <Grid xs={4} sx={{ mt: -1, textAlign: "end" }}>
                          <IconButton>
                            <MoreVertIcon />
                          </IconButton>
                        </Grid>
                      </Grid>
                    </Box>
                    { flag ? <Box sx={{ mt: 1 , p: 2 , borderRadius:'5px' , border:'4px double gray' , fontFamily: 'monospace' }}>
                      <h5>Place : <span style={{ color:'blue' }}>{props.worker.locality + ', ' + props.worker.city}</span></h5>
                      <h5>Phone No : <a href={`tel:${props.worker.phoneNo}`}><span style={{ color:'blue' }}>{props.worker.phoneNo}</span></a></h5>
                      <h5>Email :<a href={props.worker.email}><span style={{ color:'blue' }}>{props.worker.email}</span></a></h5>
                      <h5>Job : <span style={{ color:'blue' }}>{props.worker.job}</span></h5>
                      <h5>Experiance : <span style={{ color:'blue' }}>{props.worker.experiance} Year</span></h5>
                      <h5>Working Days : <span style={{ color:'blue' }}>{props.worker.jobDays} Year</span></h5>
                    </Box> : ''}
                    <Box sx={{ width:'100%' , mt: 1 }}>
                      {connected ? <Button onClick={connect} sx={{ boxShadow: 3 , backgroundColor:'#fff' , color:'#1976d2' , fontSize:'9.5px'  , px: 4 , py: 0.24 , ":hover":{ backgroundColor:'#fff' } , mb: 0.6  , border:'1px solid #1976d2' , fontWeight:'900' }}>{status}</Button> :
                        <Button onClick={connect} sx={{ boxShadow: 3 , backgroundColor:'#1976d2' , color:'#fff' , fontSize:'9.5px' , py: 0 , px: 4 , pt: 0.2 , ":hover":{ backgroundColor:'#1976d2' } , mb: 0.6 }}><PersonAddIcon sx={{ width:'18px' , mt: -0.3 , mr: 0.2 }}/>Connect</Button>
                      }
                      <Button onClick={handleOpen} sx={{ boxShadow: 3 , float:'right' , backgroundColor:'#1976d2' , color:'#fff' , fontSize:'10px' , py: 0 , px: 4 , pt: 0.3 , ":hover":{ backgroundColor:'#1976d2' } }}><BeenhereIcon sx={{ width:'16px' , mt: -0.3 , mr: 0.2 }}/>Booking</Button>
                      <br/>
                      <Box sx={{ width:'113px' , display:'flex' }}>
                        <IconButton sx={{ boxShadow: 3 , backgroundColor:'#1976d2' , color:'#fff' , ":hover":{ backgroundColor:'#1976d2' } , width:'50px' , height:'25px' , borderRadius:'15px' }}>
                          <BsFillChatDotsFill style={{ width:'17px' }}/>
                        </IconButton>
                        <IconButton href={`tel:${props.worker.phoneNo}`} sx={{ boxShadow: 3 , ml: 'auto' , backgroundColor:'#1976d2' , color:'#fff' , ":hover":{ backgroundColor:'#1976d2' } , width:'50px' , height:'25px' , borderRadius:'15px' }}>
                          <LocalPhoneIcon sx={{ width:'17px' }}/>
                        </IconButton>
                      </Box>
                    </Box>
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
                                <h1 style={{ padding:'5px' }}>Booking Form</h1>
                                <Grid sx={{ display: "flex" }}>
                                <Grid xs={6} sx={{ p: 2 , border:1 , borderRadius: 2 , maxHeight:'297px' }}>
                                <h4 style={{ padding:'8px' , lineBreak:'auto' , border:'1px solid black' , borderRadius:'4px' }}>Confirmed Date</h4>
                                <h5 style={{ fontSize:'12px' , margin:'4px' }}>{props.worker.jobDays}</h5>
                                  <Box className='comments' sx={{ border:1 , borderRadius: 1 , height:{xs: '190px' , sm:'200px' , md: '200px' } , overflowY:'auto' }}>  
                                    <hr />
                                    <h6  style={{ padding:'4px' }}>Feb 25, 2023</h6>
                                    <hr />
                                  </Box>
                                </Grid>
                                <Grid xs={6} sx={{ p: 1 , ml: 0.2 , border:1 , borderRadius: 2 }}>
                                    <Grid item xs={12} sx={{ m: 1 }}>
                                    <TextField
                                      fullWidth
                                      id="location"
                                      label="Location"
                                      size="small"
                                      name="location"
                                      autoComplete="family-name"
                                      error={location}
                                      helperText={locationErr}
                                      autoFocus
                                    />
                                  </Grid>
                                  <Grid item xs={12} sx={{ m: 1 }}>
                                    <TextField
                                      fullWidth
                                      id="date"
                                      label="Date"
                                      size="small"
                                      type="date"
                                      name="date"
                                      InputLabelProps={{
                                        shrink: true,
                                      }}
                                      autoComplete="family-name"
                                      error={date}
                                      helperText={dateErr}
                                      autoFocus
                                    />
                                  </Grid>
                                  <TextareaAutosize
                                    name="details"
                                    id="details"
                                    placeholder="Please Enter Details..."
                                    style={{
                                      margin: '10px',
                                      padding:'10px',
                                      maxWidth: "-webkit-fill-available",
                                      minWidth: "-webkit-fill-available",
                                      maxHeight: "100px",
                                      minHeight: "100px",
                                      overflowY: "auto",
                                    }}
                                  ></TextareaAutosize>
                                </Grid>
                                </Grid>
                                <Grid xs={12} sx={{ mt: 2 , textAlign: "end" }}>
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
                    <Grid
                      xs={12}
                      sx={{
                        mt: 2,
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
                      <Posts post = {post} setrefreshComment={setrefreshPost} refreshComment={refreshPost} user={props.user} vendor={true}/>
                    ))}
                  </Box>
                  }
                </Grid>
        </>
     );
}
 
export default WorkerProfile;