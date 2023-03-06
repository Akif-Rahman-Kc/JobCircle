import { Box } from "@mui/system";
import { Button, Grid, IconButton } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { AddChat, AddNotification, ConnectWithPeople, getAllConnectors } from "@/Apis/userApi";
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import { BsFillChatDotsFill } from "react-icons/bs";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Connections from "../Connections/connection";
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

const UserProfile = (props) => {
  const router = useRouter()
  const [connected, setConnected] = useState(null);
  const [status, setStatus] = useState("");
  const [refreshPost, setrefreshPost] = useState(false);
  const [ connectionLength, setConnectionLength] = useState()
  const [ openConnectionBox, setOpenConnectionBox] = useState(false)

  const { setCurrentChat, currentChat } = useContext(AuthContext)
  const { sendNotification, setSendNotification } = useContext(AuthContext)

  useEffect(() => {
    async function invoke(){
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
    invoke();
  }, [connected, refreshPost , props.user]);

  useEffect(() => {
    async function invoke(){
      const res = await getAllConnectors(props.worker._id)
      if (res) {
        const connectedConnection = res.connections.filter((obj)=>obj.status == 'connected')
        setConnectionLength(connectedConnection.length)
      }else{
        setConnectionLength('0')
      }
    }
    invoke();
  }, [connectionLength, refreshPost]);

  const connect = async () =>{
    const response = await ConnectWithPeople(props.user._id, props.worker._id)
    if (response.connection) {
      const res = await AddNotification({senderId:props.user._id, recieverId:props.worker._id, content:`${props.user.firstName + ' ' + props.user.lastName} Connected you`})
      setSendNotification({recieverId:props.worker._id, notification:`${props.user.firstName + ' ' + props.user.lastName} Connected you`})
    }
    setrefreshPost(!refreshPost)
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
                      px: 3,
                      py: 4,
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
                              width: "50%",
                              height: "fit-content",
                              borderRadius: "50%",
                              border: "1px solid #000",
                            }}
                            alt=""
                          />
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
                        </Grid>
                      </Grid>
                    </Box>
                    <Box sx={{ width:'100%' , mt: 1 }}>
                            <h3 style={{ fontWeight: "900" }}>
                            {props.worker.firstName + ' ' + props.worker.lastName}
                          </h3>
                          <h6>{props.worker.job}</h6>
                            {connected ? <Button onClick={connect} sx={{ mt: 1.5 , boxShadow: 3 , backgroundColor:'#fff' , color:'#1976d2' , fontSize:'9.5px'  , px: 4 , py: 0.24 , ":hover":{ backgroundColor:'#fff' } , mb: 0.6  , border:'1px solid #1976d2' , fontWeight:'900' }}>{status}</Button> :
                              <Button onClick={connect} sx={{ mt: 1.5 , boxShadow: 3 , backgroundColor:'#1976d2' , color:'#fff' , fontSize:'9.5px' , py: 0 , px: 4 , pt: 0.2 , ":hover":{ backgroundColor:'#1976d2' } , mb: 0.6 }}><PersonAddIcon sx={{ width:'18px' , mt: -0.3 , mr: 0.2 }}/>Connect</Button>
                            }
                            <br/>
                            <Box sx={{ mt: 0.2 , width:'113px' , display:'flex' }}>
                              <IconButton onClick={addChat} sx={{ backgroundColor:'#1976d2' , color:'#fff' , ":hover":{ backgroundColor:'#1976d2' } , width:'50px' , height:'25px' , borderRadius:'15px' }}>
                                <BsFillChatDotsFill style={{ width:'17px' }}/>
                              </IconButton>
                              <IconButton href={`tel:${props.worker.phoneNo}`} sx={{ ml: 'auto' , backgroundColor:'#1976d2' , color:'#fff' , ":hover":{ backgroundColor:'#1976d2' } , width:'50px' , height:'25px' , borderRadius:'15px' }}>
                                <LocalPhoneIcon sx={{ width:'17px' }}/>
                              </IconButton>
                            </Box>
                    </Box>
                    <Box sx={{ mt: 5 , p: 3 , borderRadius:'5px' , border:'4px double gray' , fontFamily: 'monospace' , lineHeight:'30px' }}>
                      <h4>Place : <span style={{ color:'blue' }}>{props.worker.locality + ', ' + props.worker.city}</span></h4>
                      <h4>Phone No : <a href={`tel:${props.worker.phoneNo}`}><span style={{ color:'blue' }}>{props.worker.phoneNo}</span></a></h4>
                      <h4>Email :<a href={props.worker.email}><span style={{ color:'blue' }}>{props.worker.email}</span></a></h4>
                    </Box>
                  </Box>
                  }
                </Grid>
        </>
     );
}
 
export default UserProfile;