import Box from '@mui/material/Box';
import { Avatar, Button, Grid, IconButton, Input } from '@mui/material';
import Sidebar from '@/components/Navabar/Sidebar';
import AdminNavbar from '@/components/Navabar/AdminNavbar';
import { useRouter } from 'next/router';
import { useContext, useEffect, useRef, useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { AdminisAuthApi } from '@/Apis/adminApi';
import Navbar from '@/components/Navabar/Navbar';
import MailIcon from "@mui/icons-material/Mail";
import HomeIcon from "@mui/icons-material/Home";
import BottomNavbar from '@/components/Navabar/BottomNavbar';
import { useDispatch, useSelector } from 'react-redux';
import { AddChat, GetChats, isAuthApi, SearchAllPeople } from '@/Apis/userApi';
import { userDetails } from '@/redux/user';
import MessageSideOne from '@/components/Messages/MessageSide1';
import MessageSideTwo from '@/components/Messages/MessageSide2';
import { io } from 'socket.io-client';
import { AuthContext } from '@/store/Context';

const Messages = () => {
const router = useRouter()
const [ chats, setChats ] = useState([])
const [ currentChat, setCurrentChat ] = useState(null)
const [ onlineUsers, setOnlineUsers ] = useState([])
const [ sendMessage, setSendMessage ] = useState(null)
const [ recieveMessage, setRecieveMessage ] = useState(null)
const [ allPeople, setAllPeople ] = useState([])
// const socket = useRef()
const { user } = useSelector((state)=>state.userInfo)
const dispatch = useDispatch()

const { socket } = useContext(AuthContext)

useEffect(()=>{
    if (sendMessage !== null) {
        socket.emit("send-message", sendMessage)
    }
},[sendMessage])

useEffect(()=>{
    
    socket.emit("new-user-add", user._id)
    socket.on("get-users", (users)=>{
        setOnlineUsers(users)
    })
},[user])

useEffect(()=>{
    socket.on("recieve-message", (data)=>{
        setRecieveMessage(data)
    })
},[])

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
      const res = await GetChats(user._id)
      if (res) {
        setChats(res)
      }

    }
    invoke()
  },[])

  useEffect(()=>{
    async function invoke(){
      const res = await GetChats(user._id)
      if (res) {
        setChats(res)
      }

    }
    invoke()
  },[user])

  const searchAllUsers = async (value)=>{
    const response = await SearchAllPeople(value)
    if (response) {
      setAllPeople(response.allPeople)
    }
  }

  const addChat = async (people)=>{
    const ids = {
        senderId:user._id,
        recieverId:people._id
    }
    const res = await AddChat(ids)
    if (res) {
        setChats([...chats, res])
    }
  }

    return ( 
        <>
        <Navbar />
        <Box sx={{ mt: { xs: 10 , sm: 11 , md: 12} }}>
        <Grid sx={{ mt: 1 , justifyContent:'center' , display:'flex' , ml:{ xs: 1 , sm: 3 , md: 6 } , mr:{ xs: 3 , sm: 5 , md: 7 } }}>
            <Grid md={3.3} sx={{ width:'35%' , mx: 1 , height:'84vh' , borderRadius:'15px' , backgroundColor:'#fff' , color:'#000' , boxShadow: 3 , border:'1px solid lightgray' , display: { xs: 'none', sm: 'none', md: 'block' } }}>
            <Grid sx={{ boxShadow: 3 , m: 3 , p: 1.9 , width: '-webkit-fill-available', height:'50px' , backgroundColor:'lightgray' , borderRadius:'10px' , display:'flex' , justifyContent:'center' }}>
                  <NotificationsIcon />
                <h3 style={{marginLeft:'6px' , fontWeight:'revert' }}>NOTIFICATIONS</h3>
              </Grid>
              <Grid className='comp' sx={{ boxShadow: 3 , m: 3 , p: 1 , width: '-webkit-fill-available', height: '30vw' , backgroundColor:'lightgray' , borderRadius:'10px' , overflowY:'scroll' , overflowX: 'hidden' }}>
                <Box sx={{ m: 1 , p: 1 , width: '-webkit-fill-available' , backgroundColor:'#fff' , borderRadius:'10px' }}>
                  <h5>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</h5>
                </Box>
                <Box sx={{ m: 1 , p: 1 , width: '-webkit-fill-available' , backgroundColor:'#fff' , borderRadius:'10px' }}>
                  <h5>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</h5>
                </Box>
                <Box sx={{ m: 1 , p: 1 , width: '-webkit-fill-available' , backgroundColor:'#fff' , borderRadius:'10px' }}>
                  <h5>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</h5>
                </Box>
                <Box sx={{ m: 1 , p: 1 , width: '-webkit-fill-available' , backgroundColor:'#fff' , borderRadius:'10px' }}>
                  <h5>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</h5>
                </Box>
                <Box sx={{ m: 1 , p: 1 , width: '-webkit-fill-available' , backgroundColor:'#fff' , borderRadius:'10px' }}>
                  <h5>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</h5>
                </Box>
                <Box sx={{ m: 1 , p: 1 , width: '-webkit-fill-available' , backgroundColor:'#fff' , borderRadius:'10px' }}>
                  <h5>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</h5>
                </Box>
                <Box sx={{ m: 1 , p: 1 , width: '-webkit-fill-available' , backgroundColor:'#fff' , borderRadius:'10px' }}>
                  <h5>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</h5>
                </Box>
                <Box sx={{ m: 1 , p: 1 , width: '-webkit-fill-available' , backgroundColor:'#fff' , borderRadius:'10px' }}>
                  <h5>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</h5>
                </Box>
                <Box sx={{ m: 1 , p: 1 , width: '-webkit-fill-available' , backgroundColor:'#fff' , borderRadius:'10px' }}>
                  <h5>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</h5>
                </Box>
                <Box sx={{ m: 1 , p: 1 , width: '-webkit-fill-available' , backgroundColor:'#fff' , borderRadius:'10px' }}>
                  <h5>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</h5>
                </Box>
                <Box sx={{ m: 1 , p: 1 , width: '-webkit-fill-available' , backgroundColor:'#fff' , borderRadius:'10px' }}>
                  <h5>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</h5>
                </Box>
                <Box sx={{ m: 1 , p: 1 , width: '-webkit-fill-available' , backgroundColor:'#fff' , borderRadius:'10px' }}>
                  <h5>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</h5>
                </Box>
              </Grid>
            </Grid>
            <Grid xs={12} sm={12} md={8.4} sx={{ ml: 2 , display:'block' , width:'-webkit-fill-available'}}>
                <Box>
                    <Box sx={{ p: 2 , width: "-webkit-fill-available" , justifyContent: "center" , boxShadow: 3 , display:'flex' , border: "1px solid lightgray" , borderRadius: "15px" , minHeight: "4.0vw" , backgroundColor: "#fff", }}>
                        <MailIcon/>
                        <h3 style={{ marginLeft:'7px' , fontSize:'22px' }}>Messages</h3>
                    </Box>
                </Box>
                <Box>
                    <Grid xs={12} sx={{ p: 2 , mt: 1.5  , minHeight:{ xs: '60.7vh' , sm:'60vh' , md:'73.5vh' } , boxShadow: 3 , borderRadius:'15px' , backgroundColor:'#fff' , color:'#000' }}>
                        <Grid sx={{ display:{ xs:'none' , sm:'none' , md:'flex' } }}>
                            <Grid sx={{ p: 1 , width:'35%' , height:'69vh' , borderRadius:'15px' , backgroundColor:'#e3e3e3' , color:'#000' , boxShadow: 3 , border:'1px solid lightgray' }}>
                                <Box sx={{ display:'flex' , backgroundColor:'#fff' , p: 0.5 , borderRadius:'10px' , boxShadow: 3 , mb: 1 }}>
                                    <Avatar/>
                                    <Box sx={{ display:'flex' , alignItems:'center' , border:'1px solid gray' , borderRadius:'30px' , width:'100%' , mx: 1 , px: 2 }}>
                                        <Input onFocus={(()=>setAllPeople([]))} onChange={(e)=>searchAllUsers(e.target.value)} placeholder='Search...' sx={{ width:'100%' , fontSize:'13px' , ":before":{ border: 0 , content:'none'  } , ":after":{ border: 0 } }}/>
                                    </Box>
                                </Box>
                                <Box className='comments' sx={{ overflowY:'auto' , width:'100%' , height:'59vh' }}>
                                    {allPeople.map((people)=>(
                                        <>
                                        {people._id != user._id && 
                                        <>
                                            <IconButton onClick={()=>addChat(people)} size='large' sx={{p: 1 , color:'blue' , borderRadius:'0' , width:'100% '}}>
                                                <Box sx={{width: '-webkit-fill-available' , color:'#111' , display:'flex'}}>
                                                    <img src={people?.image ? people.image : "/null-profile.jpg"} style={{ width:'17%' , height:'17%' ,borderRadius:'50%',border:'1px solid #000' }} alt="" />
                                                    <Box sx={{ display:'flex' , justifyContent:'center' , alignItems:'center' }}>
                                                        <h5 style={{ fontSize:'13px'  , marginLeft:'5px' }}>{people?.firstName + ' ' + people?.lastName}</h5>   
                                                    </Box>
                                                    <p style={{ fontSize:'11px'  , marginLeft:'auto' }}>Jan 10</p>
                                                </Box>
                                            </IconButton>
                                            <hr />
                                        </>
                                        }
                                        </>
                                    ))}
                                    {allPeople.length > 0 ? <hr style={{ height:'10px' , backgroundColor:'gray' }}/> : ''}
                                    {allPeople.length > 0 ? <hr/> : ''}
                                    {chats.map((chat)=>(
                                        <>
                                        <IconButton onClick={()=>setCurrentChat(chat)} size='large' sx={{p: 1 , color:'blue' , borderRadius:'0' , width:'100% '}}>
                                            <MessageSideOne data={chat} currentUserId={user._id}/>
                                        </IconButton>
                                        <hr />
                                        </>
                                    ))}
                                </Box>
                            </Grid>
                            <MessageSideTwo chat={currentChat} currentUserId={user._id} setSendMessage={setSendMessage} recieveMessage={recieveMessage}/>
                        </Grid>
                        <Grid sx={{ display:{ xs:'flex' , sm:'flex' , md:'none' } }}>
                            <Grid sx={{ p: 1 , width:'100%' , height:'58vh' , borderRadius:'15px' , backgroundColor:'#e3e3e3' , color:'#000' , boxShadow: 3 , border:'1px solid lightgray' }}>
                                {/* <Box sx={{ p: 0.8  , display:'flex' , bgcolor:'lightgray' , borderRadius:'10px' }}>
                                    <img src="/null-profile.jpg" style={{ width:'45px' ,borderRadius:'50%',border:'1px solid #000' }} alt="" />
                                    <Box sx={{ display:'flex' , justifyContent:'center' , alignItems:'center' }}>
                                        <h4 style={{ fontSize:'13px'  , marginLeft:'5px' }}>Akif Rahman</h4>
                                    </Box>
                                </Box>
                                <Box className='comments' sx={{ mt: 0.5 , p: 1  , display:'block' , bgcolor:'lightgray' , borderRadius:'10px' , height:'40.6vh' , overflowY:'auto' }}>
                                    <Box sx={{ display:'flex' , justifyContent:'center' }}>
                                        <Box sx={{ py: 0.5 , px: 2 , backgroundColor:'#b8ccd3' , height:'fit-content' , width:'fit-content' , borderRadius:1 , boxShadow: 1 }}>
                                            <h6>Yesterday</h6>
                                        </Box>
                                    </Box>
                                    <Box sx={{ mt: 2 }}>
                                        <Box sx={{ my: 1 , display:'flex' , ml:'auto' , width:'80%' , lineBreak:'anywhere'  }}>
                                            <Box sx={{ display:'block' , ml:'auto' , textAlign:'end' , mr: 1  }}>
                                                <Box sx={{ ml:'auto' , mb:0.2 , p: 1 , fontSize:'12px' , backgroundColor:'#e9e9e9' , height:'fit-content' , width:'fit-content' , borderTopLeftRadius:'5px' , borderBottomLeftRadius:'5px' , borderBottomRightRadius:'9px' }}>
                                                    Hello
                                                </Box>
                                                <h6 style={{ marginLeft:'auto' , fontSize:'8px' , color:'gray' }}>1.20 PM</h6>
                                            </Box>
                                        </Box>
                                        <Box sx={{ my: 1 , display:'flex' , width:'80%' , lineBreak:'anywhere'  }}>
                                            
                                            <Box sx={{ ml: 1 , display:'block' , mr: 1  }}>
                                                <Box sx={{ fontSize:'12px' , p: 1 , mb:0.2 , backgroundColor:'#a3a3a3' , height:'fit-content' , width:'fit-content' , borderTopRightRadius:'5px' , borderBottomLeftRadius:'9px' , borderBottomRightRadius:'5px'  }}>
                                                Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.
                                                </Box>
                                                <h6 style={{ fontSize:'8px' , color:'gray' }}>1.20 PM</h6>
                                            </Box>
                                        </Box>
                                        <Box sx={{ my: 1 , display:'flex' , ml:'auto' , width:'80%' , lineBreak:'anywhere'  }}>
                                            <Box sx={{ display:'block' , ml:'auto' , textAlign:'end' , mr: 1  }}>
                                                <Box sx={{ ml:'auto' , mb:0.2 , p: 1 , fontSize:'12px' , backgroundColor:'#e9e9e9' , height:'fit-content' , width:'fit-content' , borderTopLeftRadius:'5px' , borderBottomLeftRadius:'5px' , borderBottomRightRadius:'9px' }}>
                                                    Hello
                                                </Box>
                                                <h6 style={{ marginLeft:'auto' , fontSize:'8px' , color:'gray' }}>1.20 PM</h6>
                                            </Box>
                                        </Box>
                                        <Box sx={{ my: 1 , display:'flex' , width:'80%' , lineBreak:'anywhere'  }}>
                                            <Box sx={{ ml: 1 , display:'block' , mr: 1  }}>
                                                <Box sx={{ fontSize:'12px' , p: 1 , mb:0.2 , backgroundColor:'#a3a3a3' , height:'fit-content' , width:'fit-content' , borderTopRightRadius:'5px' , borderBottomLeftRadius:'9px' , borderBottomRightRadius:'5px'  }}>
                                                Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.
                                                </Box>
                                                <h6 style={{ fontSize:'8px' , color:'gray' }}>1.20 PM</h6>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                                <Box sx={{ mt: 0.5 , p: 0.8  , display:'flex' , bgcolor:'lightgray' , borderRadius:'10px' }}>
                                    <Box sx={{ width:'100%' , display:'flex' }}>
                                        <Box sx={{ mt:'auto' , display:'flex' , alignItems:'center' , borderRadius:'30px' , width:'90%' , mx: 1 , px: 2 , py: 0.7 , bgcolor:'#fff' }}>
                                            <Input placeholder='Message' sx={{ width:'100%' , fontSize:'13px' , ":before":{ border: 0 , content:'none'  } , ":after":{ border: 0 } }}/>
                                        </Box>
                                        <IconButton sx={{ backgroundColor:'#1976d2' , color:'#fff' , borderRadius:'30px' , width:'39px' , height:'39px' , ":hover":{ backgroundColor:'#1976d2' } }}><SendIcon sx={{ width:'70%' }}/></IconButton>
                                    </Box>
                                </Box> */}
                                {/* ////////////////////////////////////// */}
                                <Box sx={{ display:'flex' , backgroundColor:'#fff' , p: 0.5 , borderRadius:'10px' , boxShadow: 3 , mb: 1 }}>
                                    <Avatar sx={{ width: { xs:35 , sm:40 }, height: { xs:35 , sm:40 } }}/>
                                    <Box sx={{ display:'flex' , alignItems:'center' , border:'1px solid gray' , borderRadius:'30px' , width:'100%' , mx: 1 , px: 2 }}>
                                        <Input placeholder='Search...' sx={{ width:'100%' , fontSize:'13px' , ":before":{ border: 0 , content:'none'  } , ":after":{ border: 0 } }}/>
                                    </Box>
                                </Box>
                                <Box className='comments' sx={{ overflowY:'auto' , width:'100%' , height:'48vh' }}>
                                    <IconButton size='large' sx={{p: 1 , color:'blue' , borderRadius:'0' , width:'100% '}}>
                                        <Box sx={{width: '-webkit-fill-available' , color:'#111' , display:'flex'}}>
                                            <img src="/null-profile.jpg" style={{ width:'11%' , height:'11%' ,borderRadius:'50%',border:'1px solid #000' }} alt="" />
                                            <Box sx={{ display:'flex' , justifyContent:'center' , alignItems:'center' }}>
                                                <h5 style={{ fontSize:'13px'  , marginLeft:'5px' }}>Akif Rahman</h5>
                                            </Box>
                                            <p style={{ fontSize:'11px'  , marginLeft:'auto' }}>Jan 10</p>
                                        </Box>
                                    </IconButton>
                                    <hr />
                                    <IconButton size='large' sx={{p: 1 , color:'blue' , borderRadius:'0' , width:'100% '}}>
                                        <Box sx={{width: '-webkit-fill-available' , color:'#111' , display:'flex'}}>
                                            <img src="/null-profile.jpg" style={{ width:'11%' , height:'11%' ,borderRadius:'50%',border:'1px solid #000' }} alt="" />
                                            <Box sx={{ display:'flex' , justifyContent:'center' , alignItems:'center' }}>
                                                <h5 style={{ fontSize:'13px'  , marginLeft:'5px' }}>Akif Rahman</h5>
                                            </Box>
                                            <p style={{ fontSize:'11px'  , marginLeft:'auto' }}>Jan 10</p>
                                        </Box>
                                    </IconButton>
                                    <hr />
                                    <IconButton size='large' sx={{p: 1 , color:'blue' , borderRadius:'0' , width:'100% '}}>
                                        <Box sx={{width: '-webkit-fill-available' , color:'#111' , display:'flex'}}>
                                            <img src="/null-profile.jpg" style={{ width:'11%' , height:'11%' ,borderRadius:'50%',border:'1px solid #000' }} alt="" />
                                            <Box sx={{ display:'flex' , justifyContent:'center' , alignItems:'center' }}>
                                                <h5 style={{ fontSize:'13px'  , marginLeft:'5px' }}>Akif Rahman</h5>
                                            </Box>
                                            <p style={{ fontSize:'11px'  , marginLeft:'auto' }}>Jan 10</p>
                                        </Box>
                                    </IconButton>
                                    <hr />
                                    <IconButton size='large' sx={{p: 1 , color:'blue' , borderRadius:'0' , width:'100% '}}>
                                        <Box sx={{width: '-webkit-fill-available' , color:'#111' , display:'flex'}}>
                                            <img src="/null-profile.jpg" style={{ width:'11%' , height:'11%' ,borderRadius:'50%',border:'1px solid #000' }} alt="" />
                                            <Box sx={{ display:'flex' , justifyContent:'center' , alignItems:'center' }}>
                                                <h5 style={{ fontSize:'13px'  , marginLeft:'5px' }}>Akif Rahman</h5>
                                            </Box>
                                            <p style={{ fontSize:'11px'  , marginLeft:'auto' }}>Jan 10</p>
                                        </Box>
                                    </IconButton>
                                    <hr />
                                    <IconButton size='large' sx={{p: 1 , color:'blue' , borderRadius:'0' , width:'100% '}}>
                                        <Box sx={{width: '-webkit-fill-available' , color:'#111' , display:'flex'}}>
                                            <img src="/null-profile.jpg" style={{ width:'11%' , height:'11%' ,borderRadius:'50%',border:'1px solid #000' }} alt="" />
                                            <Box sx={{ display:'flex' , justifyContent:'center' , alignItems:'center' }}>
                                                <h5 style={{ fontSize:'13px'  , marginLeft:'5px' }}>Akif Rahman</h5>
                                            </Box>
                                            <p style={{ fontSize:'11px'  , marginLeft:'auto' }}>Jan 10</p>
                                        </Box>
                                    </IconButton>
                                    <hr />
                                    <IconButton size='large' sx={{p: 1 , color:'blue' , borderRadius:'0' , width:'100% '}}>
                                        <Box sx={{width: '-webkit-fill-available' , color:'#111' , display:'flex'}}>
                                            <img src="/null-profile.jpg" style={{ width:'11%' , height:'11%' ,borderRadius:'50%',border:'1px solid #000' }} alt="" />
                                            <Box sx={{ display:'flex' , justifyContent:'center' , alignItems:'center' }}>
                                                <h5 style={{ fontSize:'13px'  , marginLeft:'5px' }}>Akif Rahman</h5>
                                            </Box>
                                            <p style={{ fontSize:'11px'  , marginLeft:'auto' }}>Jan 10</p>
                                        </Box>
                                    </IconButton>
                                    <hr />
                                    <IconButton size='large' sx={{p: 1 , color:'blue' , borderRadius:'0' , width:'100% '}}>
                                        <Box sx={{width: '-webkit-fill-available' , color:'#111' , display:'flex'}}>
                                            <img src="/null-profile.jpg" style={{ width:'11%' , height:'11%' ,borderRadius:'50%',border:'1px solid #000' }} alt="" />
                                            <Box sx={{ display:'flex' , justifyContent:'center' , alignItems:'center' }}>
                                                <h5 style={{ fontSize:'13px'  , marginLeft:'5px' }}>Akif Rahman</h5>
                                            </Box>
                                            <p style={{ fontSize:'11px'  , marginLeft:'auto' }}>Jan 10</p>
                                        </Box>
                                    </IconButton>
                                    <hr />
                                    <IconButton size='large' sx={{p: 1 , color:'blue' , borderRadius:'0' , width:'100% '}}>
                                        <Box sx={{width: '-webkit-fill-available' , color:'#111' , display:'flex'}}>
                                            <img src="/null-profile.jpg" style={{ width:'11%' , height:'11%' ,borderRadius:'50%',border:'1px solid #000' }} alt="" />
                                            <Box sx={{ display:'flex' , justifyContent:'center' , alignItems:'center' }}>
                                                <h5 style={{ fontSize:'13px'  , marginLeft:'5px' }}>Akif Rahman</h5>
                                            </Box>
                                            <p style={{ fontSize:'11px'  , marginLeft:'auto' }}>Jan 10</p>
                                        </Box>
                                    </IconButton>
                                    <hr />
                                    <IconButton size='large' sx={{p: 1 , color:'blue' , borderRadius:'0' , width:'100% '}}>
                                        <Box sx={{width: '-webkit-fill-available' , color:'#111' , display:'flex'}}>
                                            <img src="/null-profile.jpg" style={{ width:'11%' , height:'11%' ,borderRadius:'50%',border:'1px solid #000' }} alt="" />
                                            <Box sx={{ display:'flex' , justifyContent:'center' , alignItems:'center' }}>
                                                <h5 style={{ fontSize:'13px'  , marginLeft:'5px' }}>Akif Rahman</h5>
                                            </Box>
                                            <p style={{ fontSize:'11px'  , marginLeft:'auto' }}>Jan 10</p>
                                        </Box>
                                    </IconButton>
                                    <hr />
                                    <IconButton size='large' sx={{p: 1 , color:'blue' , borderRadius:'0' , width:'100% '}}>
                                        <Box sx={{width: '-webkit-fill-available' , color:'#111' , display:'flex'}}>
                                            <img src="/null-profile.jpg" style={{ width:'11%' , height:'11%' ,borderRadius:'50%',border:'1px solid #000' }} alt="" />
                                            <Box sx={{ display:'flex' , justifyContent:'center' , alignItems:'center' }}>
                                                <h5 style={{ fontSize:'13px'  , marginLeft:'5px' }}>Akif Rahman</h5>
                                            </Box>
                                            <p style={{ fontSize:'11px'  , marginLeft:'auto' }}>Jan 10</p>
                                        </Box>
                                    </IconButton>
                                    <hr />
                                    <IconButton size='large' sx={{p: 1 , color:'blue' , borderRadius:'0' , width:'100% '}}>
                                        <Box sx={{width: '-webkit-fill-available' , color:'#111' , display:'flex'}}>
                                            <img src="/null-profile.jpg" style={{ width:'11%' , height:'11%' ,borderRadius:'50%',border:'1px solid #000' }} alt="" />
                                            <Box sx={{ display:'flex' , justifyContent:'center' , alignItems:'center' }}>
                                                <h5 style={{ fontSize:'13px'  , marginLeft:'5px' }}>Akif Rahman</h5>
                                            </Box>
                                            <p style={{ fontSize:'11px'  , marginLeft:'auto' }}>Jan 10</p>
                                        </Box>
                                    </IconButton>
                                    <hr />
                                    <IconButton size='large' sx={{p: 1 , color:'blue' , borderRadius:'0' , width:'100% '}}>
                                        <Box sx={{width: '-webkit-fill-available' , color:'#111' , display:'flex'}}>
                                            <img src="/null-profile.jpg" style={{ width:'11%' , height:'11%' ,borderRadius:'50%',border:'1px solid #000' }} alt="" />
                                            <Box sx={{ display:'flex' , justifyContent:'center' , alignItems:'center' }}>
                                                <h5 style={{ fontSize:'13px'  , marginLeft:'5px' }}>Akif Rahman</h5>
                                            </Box>
                                            <p style={{ fontSize:'11px'  , marginLeft:'auto' }}>Jan 10</p>
                                        </Box>
                                    </IconButton>
                                    <hr />
                                    <IconButton size='large' sx={{p: 1 , color:'blue' , borderRadius:'0' , width:'100% '}}>
                                        <Box sx={{width: '-webkit-fill-available' , color:'#111' , display:'flex'}}>
                                            <img src="/null-profile.jpg" style={{ width:'11%' , height:'11%' ,borderRadius:'50%',border:'1px solid #000' }} alt="" />
                                            <Box sx={{ display:'flex' , justifyContent:'center' , alignItems:'center' }}>
                                                <h5 style={{ fontSize:'13px'  , marginLeft:'5px' }}>Akif Rahman</h5>
                                            </Box>
                                            <p style={{ fontSize:'11px'  , marginLeft:'auto' }}>Jan 10</p>
                                        </Box>
                                    </IconButton>
                                    <hr />
                                    <IconButton size='large' sx={{p: 1 , color:'blue' , borderRadius:'0' , width:'100% '}}>
                                        <Box sx={{width: '-webkit-fill-available' , color:'#111' , display:'flex'}}>
                                            <img src="/null-profile.jpg" style={{ width:'11%' , height:'11%' ,borderRadius:'50%',border:'1px solid #000' }} alt="" />
                                            <Box sx={{ display:'flex' , justifyContent:'center' , alignItems:'center' }}>
                                                <h5 style={{ fontSize:'13px'  , marginLeft:'5px' }}>Akif Rahman</h5>
                                            </Box>
                                            <p style={{ fontSize:'11px'  , marginLeft:'auto' }}>Jan 10</p>
                                        </Box>
                                    </IconButton>
                                    <hr />
                                    <IconButton size='large' sx={{p: 1 , color:'blue' , borderRadius:'0' , width:'100% '}}>
                                        <Box sx={{width: '-webkit-fill-available' , color:'#111' , display:'flex'}}>
                                            <img src="/null-profile.jpg" style={{ width:'11%' , height:'11%' ,borderRadius:'50%',border:'1px solid #000' }} alt="" />
                                            <Box sx={{ display:'flex' , justifyContent:'center' , alignItems:'center' }}>
                                                <h5 style={{ fontSize:'13px'  , marginLeft:'5px' }}>Akif Rahman</h5>
                                            </Box>
                                            <p style={{ fontSize:'11px'  , marginLeft:'auto' }}>Jan 10</p>
                                        </Box>
                                    </IconButton>
                                    <hr />
                                    <IconButton size='large' sx={{p: 1 , color:'blue' , borderRadius:'0' , width:'100% '}}>
                                        <Box sx={{width: '-webkit-fill-available' , color:'#111' , display:'flex'}}>
                                            <img src="/null-profile.jpg" style={{ width:'11%' , height:'11%' ,borderRadius:'50%',border:'1px solid #000' }} alt="" />
                                            <Box sx={{ display:'flex' , justifyContent:'center' , alignItems:'center' }}>
                                                <h5 style={{ fontSize:'13px'  , marginLeft:'5px' }}>Akif Rahman</h5>
                                            </Box>
                                            <p style={{ fontSize:'11px'  , marginLeft:'auto' }}>Jan 10</p>
                                        </Box>
                                    </IconButton>
                                    <hr />
                                    <IconButton size='large' sx={{p: 1 , color:'blue' , borderRadius:'0' , width:'100% '}}>
                                        <Box sx={{width: '-webkit-fill-available' , color:'#111' , display:'flex'}}>
                                            <img src="/null-profile.jpg" style={{ width:'11%' , height:'11%' ,borderRadius:'50%',border:'1px solid #000' }} alt="" />
                                            <Box sx={{ display:'flex' , justifyContent:'center' , alignItems:'center' }}>
                                                <h5 style={{ fontSize:'13px'  , marginLeft:'5px' }}>Akif Rahman</h5>
                                            </Box>
                                            <p style={{ fontSize:'11px'  , marginLeft:'auto' }}>Jan 10</p>
                                        </Box>
                                    </IconButton>
                                    <hr />
                                </Box>
                                {/* /////////////////////////////// */}
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Grid>
        </Grid>
        </Box>
        <BottomNavbar/>
        </>
     );
}
 
export default Messages;