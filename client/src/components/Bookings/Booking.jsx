import { GetUserBookings } from "@/Apis/userApi"
import { useEffect, useState } from "react"


const Bookings = ({user}) => {
    const [ bookings, setBookings ] = useState([])

    // useEffect(()=>{
    //     async function invoke(){
    //         const res = await GetUserBookings(user._id)
    //         if (res) {
    //             setBookings(res.bookings.bookings)
    //         }else{
    //              router.push('/404')
    //         }
    //     }
    //     invoke()
    // },[user])

    return (
        <h5>1111111111</h5>
        // {bookings.map((booking)=>(
        //     <Grid sx={{ boxShadow:3 , p: 1.5 , borderRadius:'10px' , display:'block' }}>
        //         <Grid sx={{display:'flex' }}>
        //             <Link href={`/worker_profile/${booking.bookerId}`}>
        //                 <img
        //                     src={ booking.bookerImage ? booking.bookerImage: "/null-profile.jpg" }
        //                     style={{
        //                         width: "35px",
        //                         height: "fit-content",
        //                         borderRadius: "50%",
        //                         border: "1px solid #000",
        //                     }}
        //                     alt=""
        //                 />
        //             </Link>
        //             <Box sx={{ display:'flex' , justifyContent:'center' , alignItems:'center' , ml:0.5 }}>
        //                 <Link href={`/vendor/worker_profile/${booking.bookerId}`}>
        //                     <h5 style={{ color:'#000' }}>{booking.bookerName}</h5>
        //                 </Link>
        //             </Box>
        //             {booking.status == 'Confirmed' ? <h4 style={{ color:'green' , marginLeft:'auto' , fontFamily:'math' }}>{booking.status}</h4> : <h4 style={{ color:'red' , marginLeft:'auto' , fontFamily:'math' }}>{booking.status}</h4>}
                    
        //         </Grid>
        //         <Grid sx={{display:'flex' , my: 1 , fontSize:'16px' , lineHeight:'18px' , width:'100%' }}>
        //             <Grid display={'block'} width={'40%'}>
        //                 <h6>Location : <span style={{ lineBreak:'auto' , color:'#525252' }}>{booking.location}</span></h6>
        //                 <h6>Date : <span style={{ lineBreak:'auto' , color:'#525252' }}>{moment(booking.date).format('ll')}</span></h6>
        //                 <h6>Details : <span style={{ lineBreak:'auto' , color:'#525252' }}>{booking.details}</span></h6>
        //             </Grid>
        //             <Grid sx={{ ml:'auto' , height:'max-content' , mt:'auto' }}>
        //                 <Button onClick={()=>decline(booking._id)} sx={{ ml:'auto' , bgcolor:'red' , color:'#fff' , fontSize:{ xs:'9px'  , sm:'10px' , md:'11px'} , py:0.3 , ml:0.3 , ":hover":{ bgcolor:'red' } }}>Decline</Button>
        //                 <Button onClick={()=>accept(booking._id)} sx={{ ml:'auto' , bgcolor:'green' , color:'#fff' , fontSize:{ xs:'9px'  , sm:'10px' , md:'11px'} , py:0.3 , ml:0.3 , ":hover":{ bgcolor:'green' } }}>Accept</Button>
        //             </Grid>
        //         </Grid>
        //     </Grid>
        // ))}
     );
}
 
export default Bookings;