import Box from '@mui/material/Box';
import { Grid, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useEffect, useRef, useState } from 'react';
import { AddMessage, GetMessages, GetUser } from '@/Apis/userApi';
import moment from 'moment';
import InputEmojiWithRef from 'react-input-emoji';

const MessageSideTwo = ({ chat, currentUserId, setSendMessage, recieveMessage, setRefresh, refresh, onlineUsers, user }) => {

    const [ userData, setUserData ] = useState(null)
    const [ messages, setMessages ] = useState([])
    const [ newMessage, setNewMessage ] = useState("")
    const [ notSelectMsg, setNotSelectMessage ] = useState(false)
    const [ online, setOnline ] = useState(false)
    const scroll = useRef()

    useEffect(()=>{
        if (recieveMessage !== null && recieveMessage.chatId === chat._id) {
            setMessages([...messages, recieveMessage])
        }
    },[recieveMessage])

    useEffect(()=>{
        async function invoke(){
            if (chat === null) {
                setNotSelectMessage(true)
            } else {
                setNotSelectMessage(false)
                const userId = chat?.members?.find((id) => id !== currentUserId)
                const response = await GetUser(userId, chat._id)
                if (response) {
                    setUserData(response.details)
                }else{
                    // router.push('/404')
                }
            }
        }
        invoke()
    },[chat, currentUserId])

    useEffect(()=>{
        async function invoke(){
            if (chat !== null) {
                const userId = chat?.members?.find((id) => id !== currentUserId)
                const response = await GetMessages(chat._id, userId)
                if (response) {
                    setMessages(response)
                }else{
                    router.push('/404')
                }
            }
        }
        invoke()
    },[chat, currentUserId, messages])

    useEffect(()=>{
        async function invoke(){
            const chatMember = chat?.members.find((member)=> member !== user._id)
            const online = onlineUsers?.find((user)=> user.userId === chatMember)
            setOnline(online)
        }
        invoke()
    },[chat])

    const handleChange = (newMessage)=>{
        setNewMessage(newMessage)
    }

    const handleSend = async (e)=>{
        e.preventDefault();
        const message = {
            chatId: chat._id,
            senderId: currentUserId,
            text: newMessage
        }
        const res = await AddMessage(message)
        if (res) {
            setMessages([...messages, res])
            setNewMessage("")
        }else{
            router.push('/404')
        }
        const recieverId = chat.members.find((id) => id !== currentUserId)
        setSendMessage({...message, recieverId})
        setRefresh(!refresh)
    }

    useEffect(()=>{
        scroll.current?.scrollIntoView({ behavior: "smooth" })
    },[messages])

    return (
        <>
        {notSelectMsg ? 
         <Grid sx={{ p: 1 , width:'65%' , ml: 1 , height:'69vh' , borderRadius:'15px' , backgroundColor:'#e3e3e3' , color:'gray' , boxShadow: 3 , border:'1px solid lightgray' , display:'flex' , justifyContent:'center' , alignItems:'center' }}>
            <h1>Tap on a Chat to start Conversation...</h1>
         </Grid>
        :
        <Grid sx={{ p: 1 , width:'65%' , ml: 1 , height:'69vh' , borderRadius:'15px' , backgroundColor:'#e3e3e3' , color:'#000' , boxShadow: 3 , border:'1px solid lightgray' }}>
            <Box sx={{ p: 0.8  , display:'flex' , bgcolor:'lightgray' , borderRadius:'10px' }}>
                <img src={userData?.image ? userData.image : "/null-profile.jpg"} style={{ width:'45px' ,borderRadius:'50%',border:'1px solid #000' }} alt="" />
                <Box sx={{ display:'flex' , justifyContent:'center' , alignItems:'center' }}>
                    <Box sx={{ textAlign:'start' }}>
                        <h4 style={{ fontSize:'13px'  , marginLeft:'5px' }}>{userData?.firstName + ' ' + userData?.lastName}</h4>
                        {online && <h5 style={{ fontSize:'9px'  , marginLeft:'5px', color:'green' }}>Online</h5>}
                    </Box>
                </Box>
            </Box>
            <Box className='comments' sx={{ mt: 0.5 , p: 2  , display:'block' , bgcolor:'lightgray' , borderRadius:'10px' , height:'47.7vh' , overflowY:'auto' }}>
                <Box sx={{ mt: 1 }}>
                    {messages.map((message)=>(
                        <>
                            {message.senderId == currentUserId ?
                            <Box ref={scroll} sx={{ m: 2 , display:'flex' , ml:'auto' , width:'80%' , lineBreak:'anywhere'  }}>
                                <Box sx={{ display:'block' , ml:'auto' , textAlign:'end' , mr: 1  }}>
                                    <Box className='own' sx={{ ml:'auto' , mb:0.2 , p: 1.2 , height:'fit-content' , width:'fit-content' }}>
                                        {message.text}
                                    </Box>
                                    <h6 style={{ marginLeft:'auto' , fontSize:'9px' , color:'gray' }}>{moment(message.createdAt).format('LT')}</h6>
                                </Box>
                            </Box>
                            :
                            <Box ref={scroll} sx={{ m: 2 , display:'flex' , lineBreak:'anywhere'  }}>
                                <Box sx={{ display:'block' , ml: 1  }}>
                                    <Box className='sender' sx={{ mb:0.2 , p: 1.2 , height:'fit-content' , width:'fit-content' }}>
                                        {message.text}
                                    </Box>
                                    <h6 style={{ fontSize:'9px' , color:'gray' }}>{moment(message.createdAt).format('LT')}</h6>
                                </Box>
                            </Box>
                            }
                        </>
                    ))}
                </Box>
            </Box>
            <Box sx={{ mt: 0.5 , p: 0.8  , display:'flex' , bgcolor:'lightgray' , borderRadius:'10px' }}>
                <Box sx={{ width:'100%' , display:'flex' }}>
                    <Box sx={{ mt:'auto' , display:'flex' , alignItems:'center' , borderRadius:'30px' , width:'90%' , mx: 1 , bgcolor:'#fff' }}>
                        <InputEmojiWithRef value={newMessage} onChange={handleChange} placeholder='Message' sx={{ width:'100%' , fontSize:'13px' , ":before":{ border: 0 , content:'none'  } , ":after":{ border: 0 } }}/>
                    </Box>
                    <IconButton disabled={newMessage.trim()===""} onClick={handleSend} sx={{ ":disabled":{ bgcolor:'#6CA0E7' } , mt: 0.3 , backgroundColor:'#1976d2' , color:'#fff' , borderRadius:'30px' , width:'48px' , height:'48px' , ":hover":{ backgroundColor:'#1976d2' } }}><SendIcon sx={{ width:'70%' }}/></IconButton>
                </Box>
            </Box>
        </Grid>
        }
        </>
     );
}
 
export default MessageSideTwo;