import { Box } from "@mui/system";
import {
  Button,
  Collapse,
  Grid,
  IconButton,
  Modal,
  TextareaAutosize,
  TextField,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { AddChat, AddNotification, Booking, ConnectWithPeople, getAllConnectors, ReportVendor } from "@/Apis/userApi";
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import PhotoSizeSelectActualIcon from "@mui/icons-material/PhotoSizeSelectActual";
import SmartDisplayIcon from "@mui/icons-material/SmartDisplay";
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import { BsFillChatDotsFill } from "react-icons/bs";
import Posts from "@/components/Posts/Post";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GetBookingDates, VendorGetPosts } from "@/Apis/vendorApi";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import Connections from "../Connections/connection";
import moment from "moment/moment";
import { AuthContext } from "@/store/Context";
import { useRouter } from "next/router";

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
    const router = useRouter()
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
    const [ openReportBox, setOpenReportBox] = useState(null)
    const [ booked, setBooked] = useState(false)
    const [ bookings, setBookings] = useState([])

    const { setCurrentChat, currentChat } = useContext(AuthContext)
    const { sendNotification, setSendNotification } = useContext(AuthContext)

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
          }else{
            router.push('/404')
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

      useEffect(()=>{
        async function invoke(){
          const res = await GetBookingDates(props.worker._id)
          if (res) {
            setBookings(res.bookings?.bookings)
          }else{
            router.push('/404')
          }
        }
        invoke()
      },[booked])

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
          const existDate = bookings.find((obj)=> moment(obj.date).format('ll') == moment(data.date).format('ll'))
          if (existDate) {
            toast.error('Already booked this date', {
              position: "top-right",
              autoClose: 4000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            })
          } else {
            const res = await Booking(data, props.worker._id, props.user._id)
            if (res) {
              setBooked(!booked)
              toast.success('Booking Successfully', {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
              })
            }else{
              router.push('/404')
            }
          }
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

      const connect = async () =>{
        const response =await ConnectWithPeople(props.user._id, props.worker._id)
        if (response.connection) {
          const res = await AddNotification({senderId:props.user._id, recieverId:props.worker._id, content:`${props.user.firstName + ' ' + props.user.lastName} Connected you`})
          setSendNotification({recieverId:props.worker._id, notification:`${props.user.firstName + ' ' + props.user.lastName} Connected you`})
        }
        setrefreshPost(!refreshPost)
      }

      const reportVendor = async (msg,vendorId)=>{
        const res = await ReportVendor(msg, vendorId, props.user._id)
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

      const addChat = async ()=>{
        const ids = {
            senderId:props.user._id,
            recieverId:props.worker._id
        }
        const res = await AddChat(ids)
        if (res) {
          setCurrentChat(res.result)
          props.vendor ? router.push('/vendor/messages') : router.push('/messages')
        }else{
          router.push('/404')
        }
      }

    return ( 
        <>
          <ToastContainer/>
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
                          <IconButton onClick={() =>
                            openReportBox
                              ? setOpenReportBox(null)
                              : setOpenReportBox(props.worker._id)
                          }>
                            <ReportGmailerrorredIcon />
                          </IconButton>
                          <Collapse
                            sx={{ backgroundColor:'#fff' , border:'3px double #111' , position:'absolute' , borderRadius:'7px' , p: 1 , ml: { xs: 0 , sm: 7 , md: 2} , zIndex:'100' }}
                            in={openReportBox == props.worker._id}
                            timeout="auto"
                            unmountOnExit
                          >
                            <Button onClick={()=> reportVendor('Its spam!',props.worker._id)} sx={{ fontSize:'12px' , width:'inherit' , color:'#111' , justifyContent: 'flex-start' , textTransform: 'capitalize' }}>Its spam!</Button>
                            <br />
                            <Button onClick={()=> reportVendor('Scam or Fraud',props.worker._id)} sx={{ fontSize:'12px' , width:'inherit' , color:'#111' , justifyContent: 'flex-start' , textTransform: 'capitalize' }}>Scam or Fraud</Button>
                            <br />
                            <Button onClick={()=> reportVendor("I just don't like it!",props.worker._id)} sx={{ fontSize:'12px' , width:'inherit' , color:'#111' , justifyContent: 'flex-start' , textTransform: 'capitalize' }}>I just don't like it!</Button>
                            <br />
                            <Button onClick={()=> reportVendor('Its illegal!',props.worker._id)} sx={{ fontSize:'12px' , width:'inherit' , color:'#111' , justifyContent: 'flex-start' , textTransform: 'capitalize' }}>Its illegal!</Button>
                            <br />
                            <Button onClick={()=> reportVendor('False information!',props.worker._id)} sx={{ fontSize:'12px' , width:'inherit' , color:'#111' , justifyContent: 'flex-start' , textTransform: 'capitalize' }}>False information!</Button>
                            <br />
                            <Button onClick={()=> reportVendor('Something else',props.worker._id)} sx={{ fontSize:'12px' , width:'inherit' , color:'#111' , justifyContent: 'flex-start' , textTransform: 'capitalize' }}>Something else</Button>
                          </Collapse>
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
                        <IconButton onClick={addChat} sx={{ boxShadow: 3 , backgroundColor:'#1976d2' , color:'#fff' , ":hover":{ backgroundColor:'#1976d2' } , width:'50px' , height:'25px' , borderRadius:'15px' }}>
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
                                    {bookings?.map((obj)=>(
                                      <>
                                        <h6  style={{ padding:'4px' }}>{moment(obj.date).format('ll')}</h6>
                                        <hr />
                                      </>
                                    ))}
                                    
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