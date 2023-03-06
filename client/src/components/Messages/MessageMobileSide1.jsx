import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import { GetUser, ReadedMessages } from '@/Apis/userApi';

const MessageMobileSideOne = ({data, currentUserId, online, refresh}) => {
    
    const [ userData, setUserData ] = useState(null)
    const [ unreadMessages, setUnreadMessages ] = useState(null)

    useEffect(()=>{
        async function invoke() {
            
            const userId = data?.members?.find((id) => id !== currentUserId)
            const response = await GetUser(userId, data._id)
            if (response) {
                setUserData(response.details)
                setUnreadMessages(response.result)
            }else{
                router.push('/404')
            }
        }
        invoke()
    },[data, refresh])

    const AddChat = async ()=>{
        const ids = {
            senderId:user._id,
            recieverId:people._id
        }
        const res = await AddChat(ids)
    }

    return ( 
        <>
            <Box sx={{width: '-webkit-fill-available' , color:'#111' , display:'flex'}}>
                <img src={userData?.image ? userData.image : "/null-profile.jpg"} style={{ width:'11%' , height:'11%' ,borderRadius:'50%',border:'1px solid #000' }} alt="" />
                <Box sx={{ display:'flex' , justifyContent:'center' , alignItems:'center' }}>
                    <Box sx={{ textAlign:'start' }}>
                        <h5 style={{ fontSize:'13px'  , marginLeft:'5px' }}>{userData?.firstName + ' ' + userData?.lastName}</h5>
                        {online && <h5 style={{ fontSize:'8px'  , marginLeft:'5px', color:'green' }}>Online</h5>}
                    </Box>
                </Box>
                <Box sx={{ ml:'auto' , display:'flex' , justifyContent:'center' , alignItems:'center' }}>
                    {unreadMessages === 0 ? '' : <Box sx={{ width:'17px'  ,height:'17px' , borderRadius:'50%' , bgcolor:'#04cb04' , fontSize:'10px' , color:'#fff' , display:'flex' , justifyContent:'center' , alignItems:'center' }}>{unreadMessages}</Box>}
                </Box>
            </Box>
        </>
     );
}
 
export default MessageMobileSideOne;