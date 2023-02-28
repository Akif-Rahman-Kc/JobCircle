import Box from '@mui/material/Box';
import { Avatar, Grid, IconButton, Input } from '@mui/material';
import { useEffect, useState } from 'react';
import { GetUser } from '@/Apis/userApi';

const MessageMobileSideOne = ({data, currentUserId}) => {
    
    const [ userData, setUserData ] = useState(null)

    useEffect(()=>{
        async function invoke() {
            
            const userId = data?.members?.find((id) => id !== currentUserId)
            const response = await GetUser(userId)
            if (response) {
                setUserData(response)
            }
        }
        invoke()
    },[data])

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
                    <h5 style={{ fontSize:'13px'  , marginLeft:'5px' }}>{userData?.firstName + ' ' + userData?.lastName}</h5>
                </Box>
                <p style={{ fontSize:'11px'  , marginLeft:'auto' }}>Jan 10</p>
            </Box>
        </>
     );
}
 
export default MessageMobileSideOne;