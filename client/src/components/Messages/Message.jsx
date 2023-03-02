import { Box } from '@mui/system'
import { Badge, colors, Grid, IconButton } from '@mui/material'
import MailIcon from '@mui/icons-material/Mail';
import { GetChats } from '@/Apis/userApi';
import MessageSideOne from './MessageSide1';
import { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { AuthContext } from '@/store/Context';
import { useRouter } from 'next/router';

const Messages = ({user}) => {
  const router = useRouter()
  const [ chats, setChats ] = useState([])

  const { setCurrentChat, currentChat } = useContext(AuthContext)

  useEffect(()=>{
    async function invoke(){
      const res = await GetChats(user._id)
      if (res) {
        setChats(res)
      }

    }
    invoke()
  },[user])

    return ( 
        <>
        <Grid sx={{ position:'fixed' , boxShadow: 3 , border:'1px solid lightgray', borderRadius:'15px' , height: '39.1vw' , backgroundColor:'#fff' , display: { xs: 'none', sm: 'none', md: 'block' } }} md={3}>
              <Grid sx={{ boxShadow: 3 , m: 3 , p: 1.9 , width: '-webkit-fill-available', height:'50px' , backgroundColor:'lightgray' , borderRadius:'10px' , display:'flex' , justifyContent:'center' }}>
                  <MailIcon />
                <h3 style={{marginLeft:'6px' , fontWeight:'revert' }}>MESSAGES</h3>
              </Grid>
              <Grid className='comp' sx={{ boxShadow: 3 , m: 3 , p: 1 , width: '-webkit-fill-available', height: '31.2vw' , backgroundColor:'lightgray' , borderRadius:'10px' , overflowY:'scroll' , overflowX: 'hidden' }}>
                {chats.map((chat)=>(
                  <>
                  <IconButton onClick={()=>{
                    setCurrentChat(chat)
                    router.push('/messages')
                  }} size='large' sx={{p: 1 , color:'blue' , borderRadius:'0' , width:'100% '}}>
                      <MessageSideOne data={chat} currentUserId={user._id}/>
                  </IconButton>
                  <hr />
                  </>
                ))}
              </Grid>
            </Grid>
        </>
     );
}
 
export default Messages;