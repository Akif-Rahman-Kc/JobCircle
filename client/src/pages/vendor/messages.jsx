import Box from '@mui/material/Box';
import { Avatar, Grid, IconButton, Input } from '@mui/material';
import { useRouter } from 'next/router';
import { useContext, useEffect, useRef, useState } from 'react';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MailIcon from "@mui/icons-material/Mail";
import { useDispatch, useSelector } from 'react-redux';
import { AddChat, GetChats, GetNotifications, SearchAllPeople } from '@/Apis/userApi';
import MessageSideOne from '@/components/Messages/MessageSide1';
import MessageSideTwo from '@/components/Messages/MessageSide2';
import { AuthContext } from '@/store/Context';
import MessageMobileSideOne from '@/components/Messages/MessageMobileSide1';
import MessageMobileSideTwo from '@/components/Messages/MessageMobileSide2';
import { VendorisAuthApi } from '@/Apis/vendorApi';
import { vendorDetails } from '@/redux/vendor';
import VendorNavbar from '@/components/Navabar/VendorNavbar';
import VendorBottomNavbar from '@/components/Navabar/VendorBottomNavbar';

const VendorMessages = () => {
const router = useRouter()
const [ chats, setChats ] = useState([])
const [ notifications, setNotifications ] = useState([])
const [ onlineUsers, setOnlineUsers ] = useState([])
const [ sendMessage, setSendMessage ] = useState(null)
const [ recieveMessage, setRecieveMessage ] = useState(null)
const [ allPeople, setAllPeople ] = useState([])
const [ messageTwo, setMessageTwo ] = useState(false)
const [ refresh, setRefresh ] = useState(false)
// const socket = useRef()
const { vendor } = useSelector((state) => state.vendorInfo);
const dispatch = useDispatch()

const { socket, setCurrentChat, currentChat } = useContext(AuthContext)

useEffect(()=>{
    if (sendMessage !== null) {
        socket.emit("send-message", sendMessage)
    }
},[sendMessage])

useEffect(()=>{
    socket.emit("new-user-add", vendor._id)
    socket.on("get-users", (users)=>{
        setOnlineUsers(users)
    })
},[vendor])

useEffect(()=>{
    socket.on("recieve-message", (data)=>{
        setRecieveMessage(data)
    })
},[])

useEffect(()=>{
    async function invoke(){
      let token=  localStorage.getItem('vendortoken')
      if (token) {
        const response = await VendorisAuthApi(token)
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
      const res = await GetChats(vendor._id)
      if (res) {
        setChats(res)
      }else{
        router.push('/404')
      }
    }
    invoke()
  },[])

  useEffect(()=>{
    async function invoke(){
      const res = await GetChats(vendor._id)
      if (res) {
        setChats(res)
      }else{
        router.push('/404')
      }
    }
    invoke()
  },[vendor, refresh])

  const searchAllUsers = async (value)=>{
    const response = await SearchAllPeople(value)
    if (response) {
      setAllPeople(response.allPeople)
    }else{
      router.push('/404')
    }
  }

  const addChat = async (people)=>{
    const ids = {
        senderId:vendor._id,
        recieverId:people._id
    }
    const res = await AddChat(ids)
    if (res) {
        setChats([...chats, res])
    }else{
      router.push('/404')
    }
  }

  const checkOnlineStatus = (chat)=>{
    const chatMember = chat.members.find((member)=> member !== vendor._id)
    const online = onlineUsers.find((user)=> user.userId === chatMember)
    return online ? true : false
  }

  useEffect(()=>{
    async function invoke(){
      const res = await GetNotifications(vendor._id)
      if (res) {
          setNotifications(res)
      }else{
        router.push('/404')
      }
      }
    invoke()
  },[vendor])

    return (
        <>
        <VendorNavbar />
        <Box sx={{ mt: { xs: 10 , sm: 11 , md: 12} }}>
        <Grid sx={{ mt: 1 , justifyContent:'center' , display:'flex' , ml:{ xs: 1 , sm: 3 , md: 6 } , mr:{ xs: 3 , sm: 5 , md: 7 } }}>
            <Grid md={3.3} sx={{ width:'35%' , mx: 1 , height:'84vh' , borderRadius:'15px' , backgroundColor:'#fff' , color:'#000' , boxShadow: 3 , border:'1px solid lightgray' , display: { xs: 'none', sm: 'none', md: 'block' } }}>
            <Grid sx={{ boxShadow: 3 , m: 3 , p: 1.9 , width: '-webkit-fill-available', height:'50px' , backgroundColor:'lightgray' , borderRadius:'10px' , display:'flex' , justifyContent:'center' }}>
                  <NotificationsIcon />
                <h3 style={{marginLeft:'6px' , fontWeight:'revert' }}>NOTIFICATIONS</h3>
              </Grid>
              <Grid className='comp' sx={{ boxShadow: 3 , m: 3 , p: 1 , width: '-webkit-fill-available', height: '30vw' , backgroundColor:'lightgray' , borderRadius:'10px' , overflowY:'scroll' , overflowX: 'hidden' }}>
                {notifications.map((notification)=>(
                  <Box sx={{ m: 1 , p: 1 , width: '-webkit-fill-available' , backgroundColor:'#fff' , borderRadius:'10px' }}>
                    <h5>{notification.content}</h5>
                  </Box>
                ))}
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
                                        {people._id != vendor._id && 
                                        <>
                                            <IconButton onClick={()=>addChat(people)} size='large' sx={{p: 1 , color:'blue' , borderRadius:'0' , width:'100% '}}>
                                                <Box sx={{width: '-webkit-fill-available' , color:'#111' , display:'flex'}}>
                                                    <img src={people?.image ? people.image : "/null-profile.jpg"} style={{ width:'17%' , height:'17%' ,borderRadius:'50%',border:'1px solid #000' }} alt="" />
                                                    <Box sx={{ display:'flex' , justifyContent:'center' , alignItems:'center' }}>
                                                        <h5 style={{ fontSize:'13px'  , marginLeft:'5px' }}>{people?.firstName + ' ' + people?.lastName}</h5>   
                                                    </Box>
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
                                            <MessageSideOne data={chat} currentUserId={vendor._id} online={checkOnlineStatus(chat)}/>
                                        </IconButton>
                                        <hr />
                                        </>
                                    ))}
                                </Box>
                            </Grid>
                            <MessageSideTwo chat={currentChat} currentUserId={vendor._id} setSendMessage={setSendMessage} recieveMessage={recieveMessage} setRefresh={setRefresh} refresh={refresh} onlineUsers={onlineUsers} user={vendor}/>
                        </Grid>
                        <Grid sx={{ display:{ xs:'flex' , sm:'flex' , md:'none' } }}>
                            <Grid sx={{ p: 1 , width:'100%' , height:'65vh' , borderRadius:'15px' , backgroundColor:'#e3e3e3' , color:'#000' , boxShadow: 3 , border:'1px solid lightgray' }}>
                                {!messageTwo && 
                                <Box sx={{ display:'flex' , backgroundColor:'#fff' , p: 0.5 , borderRadius:'10px' , boxShadow: 3 , mb: 1 }}>
                                    <Avatar sx={{ width: { xs:35 , sm:40 }, height: { xs:35 , sm:40 } }}/>
                                    <Box sx={{ display:'flex' , alignItems:'center' , border:'1px solid gray' , borderRadius:'30px' , width:'100%' , mx: 1 , px: 2 }}>
                                        <Input onFocus={(()=>setAllPeople([]))} onChange={(e)=>searchAllUsers(e.target.value)} placeholder='Search...' sx={{ width:'100%' , fontSize:'13px' , ":before":{ border: 0 , content:'none'  } , ":after":{ border: 0 } }}/>
                                    </Box>
                                </Box>
                                }
                                {!messageTwo && 
                                <Box className='comments' sx={{ overflowY:'auto' , width:'100%' , height:'56vh' }}>
                                    {allPeople.map((people)=>(
                                        <>
                                        {people._id != vendor._id && 
                                        <>
                                            <IconButton onClick={()=>addChat(people)} size='large' sx={{p: 1 , color:'blue' , borderRadius:'0' , width:'100% '}}>
                                                <Box sx={{width: '-webkit-fill-available' , color:'#111' , display:'flex'}}>
                                                    <img src={people?.image ? people.image : "/null-profile.jpg"} style={{ width:'11%' , height:'11%' ,borderRadius:'50%',border:'1px solid #000' }} alt="" />
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
                                        <IconButton onClick={()=>{
                                            setCurrentChat(chat)
                                            setMessageTwo(true)
                                            }} size='large' sx={{p: 1 , color:'blue' , borderRadius:'0' , width:'100% '}}>
                                            <MessageMobileSideOne data={chat} currentUserId={vendor._id}  online={checkOnlineStatus(chat)} />
                                        </IconButton>
                                        <hr />
                                        </>
                                    ))}
                                </Box>
                                }
                                {messageTwo &&
                                <MessageMobileSideTwo chat={currentChat} currentUserId={vendor._id} setSendMessage={setSendMessage} recieveMessage={recieveMessage} setMessageTwo = {setMessageTwo} setRefresh={setRefresh} refresh={refresh} onlineUsers={onlineUsers} user={vendor}/>
                                }
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Grid>
        </Grid>
        </Box>
        <VendorBottomNavbar/>
        </>
     );
}
 
export default VendorMessages;