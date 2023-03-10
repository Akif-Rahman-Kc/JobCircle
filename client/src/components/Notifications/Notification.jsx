import { Box } from '@mui/system'
import { Grid } from '@mui/material'
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { GetNotifications } from '@/Apis/userApi';

const Notifications = ({user}) => {

  const router = useRouter()
  const [ notifications, setNotifications ] = useState([])

  useEffect(()=>{
    async function invoke(){
      const res = await GetNotifications(user._id)
      if (res) {
          setNotifications(res)
      }else{
        // router.push('/404')
      }
      }
    invoke()
  },[user])

    return ( 
        <>
            <Grid sx={{ position:'fixed' , boxShadow: 3 , width: '-webkit-fill-available', border:'1px solid lightgray', borderRadius:'15px' , height: '39.1vw' , backgroundColor:'#fff' ,display: { xs: 'none', sm: 'none', md: 'block' } }} md={3}>
              <Grid sx={{ boxShadow: 3 , m: 3 , p: 1.9 , width: '-webkit-fill-available', height:'50px' , backgroundColor:'lightgray' , borderRadius:'10px' , display:'flex' , justifyContent:'center' }}>
                  <NotificationsIcon />
                <h3 style={{marginLeft:'6px' , fontWeight:'revert' }}>NOTIFICATIONS</h3>
              </Grid>
              <Grid className='comp' sx={{ boxShadow: 3 , m: 3 , p: 1 , width: '-webkit-fill-available', height: '31.2vw' , backgroundColor:'lightgray' , borderRadius:'10px' , overflowY:'scroll' , overflowX: 'hidden' }}>
                {notifications.map((notification)=>(
                  <Box sx={{ m: 1 , p: 1 , width: '-webkit-fill-available' , backgroundColor:'#fff' , borderRadius:'10px' }}>
                    <h5>{notification.content}</h5>
                  </Box>
                ))}
              </Grid>
            </Grid>
        </>
     );
}
 
export default Notifications;