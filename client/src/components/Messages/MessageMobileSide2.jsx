import Box from '@mui/material/Box';
import { Grid, IconButton, Input } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useEffect, useRef, useState } from 'react';
import { AddMessage, GetMessages, GetUser } from '@/Apis/userApi';
import moment from 'moment';
import InputEmojiWithRef from 'react-input-emoji';

const MessageMobileSideTwo = ({ chat, currentUserId, setSendMessage, recieveMessage, setMessageTwo, setRefresh, refresh }) => {

    const [ userData, setUserData ] = useState(null)
    const [ messages, setMessages ] = useState([])
    const [ newMessage, setNewMessage ] = useState("")
    const [ notSelectMsg, setNotSelectMessage ] = useState(false)
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
                const response = await GetUser(userId)
                if (response) {
                    setUserData(response)
                }
            }
            
        }
        invoke()
    },[chat, currentUserId])

    useEffect(()=>{
        async function invoke(){
            if (chat !== null) {
                const response = await GetMessages(chat._id)
                if (response) {
                    setMessages(response)
                }
            }
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
            <h1>Tap on a Chat to start Conversation...</h1>
        :
        <>
            <Box sx={{ p: 0.8  , display:'flex' , bgcolor:'lightgray' , borderRadius:'10px' }}>
                <IconButton onClick={()=>setMessageTwo(false)}>
                <ArrowBackIcon/>  
                </IconButton>
                <img src={userData?.image ? userData.image : "/null-profile.jpg"} style={{ width:'45px' ,borderRadius:'50%',border:'1px solid #000' }} alt="" />
                <Box sx={{ display:'flex' , justifyContent:'center' , alignItems:'center' }}>
                    <h4 style={{ fontSize:'13px'  , marginLeft:'5px' }}>{userData?.firstName + ' ' + userData?.lastName}</h4>
                </Box>
            </Box>
            <Box className='comments' sx={{ mt: 0.5 , p: 1  , display:'block' , bgcolor:'lightgray' , borderRadius:'10px' , height:'45.6vh' , overflowY:'auto' }}>
                <Box sx={{ display:'flex' , justifyContent:'center' }}>
                    <Box sx={{ py: 0.5 , px: 2 , backgroundColor:'#b8ccd3' , height:'fit-content' , width:'fit-content' , borderRadius:1 , boxShadow: 1 }}>
                        <h6>Yesterday</h6>
                    </Box>
                </Box>
                <Box sx={{ mt: 2 }}>
                    {messages.map((message)=>(
                        <>
                            {message.senderId == currentUserId ?
                            <Box ref={scroll} sx={{ my: 1 , display:'flex' , ml:'auto' , width:'80%' , lineBreak:'anywhere'  }}>
                                <Box sx={{ display:'block' , ml:'auto' , textAlign:'end' , mr: 1  }}>
                                    <Box sx={{ ml:'auto' , mb:0.2 , p: 1 , fontSize:'12px' , height:'fit-content' , bgcolor:'#e9e9e9' , width:'fit-content' , borderTopLeftRadius:'5px' , borderBottomLeftRadius:'5px' , borderBottomRightRadius:'5px' }}>
                                        {message.text}
                                    </Box>
                                    <h6 style={{ marginLeft:'auto' , fontSize:'8px' , color:'gray' }}>{moment(message.createdAt).format('LT')}</h6>
                                </Box>
                            </Box>
                            :
                            <Box ref={scroll} sx={{ my: 1 , display:'flex' , width:'80%' , lineBreak:'anywhere'  }}>
                                <Box sx={{ display:'block' , ml: 1 , mr: 1 }}>
                                    <Box sx={{ mb:0.2 , p: 1 , height:'fit-content' , fontSize:'12px' , bgcolor:'#a3a3a3' , width:'fit-content' , borderTopRightRadius:'5px' , borderBottomRightRadius:'5px' , borderBottomLeftRadius:'5px' }}>
                                        {message.text}
                                    </Box>
                                    <h6 style={{ fontSize:'8px' , color:'gray' }}>{moment(message.createdAt).format('LT')}</h6>
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
                    <IconButton disabled={newMessage.trim()===""} onClick={handleSend} sx={{ ":disabled":{ bgcolor:'#6CA0E7' } , backgroundColor:'#1976d2' , color:'#fff' , borderRadius:'30px' , width:'48px' , height:'48px' , ":hover":{ backgroundColor:'#1976d2' } }}><SendIcon sx={{ width:'70%' }}/></IconButton>
                </Box>
            </Box>
        </>
        }
        </>
     );
}
 
export default MessageMobileSideTwo;