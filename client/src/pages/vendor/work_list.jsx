import { Inter } from "@next/font/google";
import { Box } from "@mui/system";
import {
  Button,
  Grid,
} from "@mui/material";
import Notifications from "@/components/Notifications/Notification";
import Messages from "@/components/Messages/Message";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { vendorDetails } from "@/redux/vendor";
import VendorNavbar from "@/components/Navabar/VendorNavbar";
import EngineeringIcon from "@mui/icons-material/Engineering";
import { AcceptBooking, DeclineBooking, GetBookings, VendorGetJobs, VendorisAuthApi } from "@/Apis/vendorApi";
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import Link from "next/link";
import VendorBottomNavbar from "@/components/Navabar/VendorBottomNavbar";
import Swal from "sweetalert2";
import moment from "moment/moment";
import { AddNotification } from "@/Apis/userApi";
import { AuthContext } from "@/store/Context";

const inter = Inter({ subsets: ["latin"] });

export default function VendorWorks() {
  const router = useRouter();
  const [bookings, setBookings] = useState([]);
  const [ refresh, setRefresh ] = useState(false)
  const { vendor } = useSelector((state)=>state.vendorInfo)
  const dispatch = useDispatch()

  const { sendNotification, setSendNotification } = useContext(AuthContext)

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
            router.push('/vendor/signin')
          }
        }
      } else {
        router.push('/vendor/signin')
      }
    }
    invoke();
  },[])

  useEffect(()=>{
    async function invoke(){
        let vendorToken=  localStorage.getItem('vendortoken')
        const res = await GetBookings(vendor._id, vendorToken)
        if (res) {
            setBookings(res.bookings.bookings)
        }
    }
    invoke()
  },[vendor, refresh])

  const accept = async (bookingId)=>{
    let vendorToken=  localStorage.getItem('vendortoken')
    const response = await AcceptBooking(vendor._id, bookingId, vendorToken)
    if (response) {
      const res = await AddNotification({senderId:vendor._id, recieverId:response.currentBookerId, content:`${vendor.firstName + ' ' + vendor.lastName} Accepted your Job request`})
      setSendNotification({recieverId:response.currentBookerId, notification:`${vendor.firstName + ' ' + vendor.lastName} Accepted your Job request`})
      setRefresh(!refresh)
    }
  }

  const decline = async (bookingId)=>{
    let vendorToken=  localStorage.getItem('vendortoken')
    const response = await DeclineBooking(vendor._id, bookingId, vendorToken)
    if (response) {
      const res = await AddNotification({senderId:vendor._id, recieverId:response.currentBookerId, content:`${vendor.firstName + ' ' + vendor.lastName} Declined your Job request`})
      setSendNotification({recieverId:response.currentBookerId, notification:`${vendor.firstName + ' ' + vendor.lastName} Declined your Job request`})
      setRefresh(!refresh)
    }
  }

  return (
    <>
      <div>
        <VendorNavbar />
        <Box>
          <Grid
            container
            sx={{ justifyContent: "center", mt: 10, display: "flex" }}
          >
            <Grid md={3}>
              <Notifications user={vendor} />
            </Grid>
            <Grid sm={12} md={5}>
              <Grid sm={12} md={12}>
                <Grid
                  md={4.74}
                  sx={{
                    width: "-webkit-fill-available",
                    backgroundColor: "#e9e5df",
                    borderRadius: "15px",
                    m: 2,
                    mt: -4,
                    pt: 4,
                    display: "flex",
                    position: "fixed",
                    zIndex: 99,
                  }}
                >
                  <Grid
                    sx={{
                      p: 2,
                      width: "-webkit-fill-available",
                      justifyContent: "center",
                      boxShadow: 3,
                      display:'flex',
                      border: "1px solid lightgray",
                      borderRadius: "15px",
                      minHeight: "4.0vw",
                      backgroundColor: "#fff",
                    }}
                  >
                    <ReceiptLongIcon/>
                    <h3 style={{ marginLeft:'7px' , fontSize:'22px' }}>Work List</h3>
                  </Grid>
                </Grid>
                <Grid sx={{ pt: 7 }}>
                  <Box
                    sx={{
                      p: 2,
                      width: "-webkit-fill-available",
                      boxShadow: 3,
                      border: "1px solid lightgray",
                      borderRadius: "15px",
                      minHeight: "34.4vw",
                      backgroundColor: "#fff",
                      m: 2,
                    }}
                  >
                    {bookings.map((booking)=>(
                        <Grid sx={{ boxShadow:3 , p: 1.5 , borderRadius:'10px' , display:'block' }}>
                            <Grid sx={{display:'flex' }}>
                                <Link href={`/vendor/worker_profile/${booking.bookerId}`}>
                                    <img
                                        src={ booking.bookerImage ? booking.bookerImage: "/null-profile.jpg" }
                                        style={{
                                            width: "35px",
                                            height: "fit-content",
                                            borderRadius: "50%",
                                            border: "1px solid #000",
                                        }}
                                        alt=""
                                    />
                                </Link>
                                <Box sx={{ display:'flex' , justifyContent:'center' , alignItems:'center' , ml:0.5 }}>
                                    <Link href={`/vendor/worker_profile/${booking.bookerId}`}>
                                        <h5 style={{ color:'#000' }}>{booking.bookerName}</h5>
                                    </Link>
                                </Box>
                                {booking.status == 'Confirmed' ? <h4 style={{ color:'green' , marginLeft:'auto' , fontFamily:'math' }}>{booking.status}</h4> : <h4 style={{ color:'red' , marginLeft:'auto' , fontFamily:'math' }}>{booking.status}</h4>}
                                
                            </Grid>
                            <Grid sx={{display:'flex' , my: 1 , fontSize:'16px' , lineHeight:'18px' , width:'100%' }}>
                                <Grid display={'block'} width={'40%'}>
                                    <h6>Location : <span style={{ lineBreak:'auto' , color:'#525252' }}>{booking.location}</span></h6>
                                    <h6>Date : <span style={{ lineBreak:'auto' , color:'#525252' }}>{moment(booking.date).format('ll')}</span></h6>
                                    <h6>Details : <span style={{ lineBreak:'auto' , color:'#525252' }}>{booking.details}</span></h6>
                                </Grid>
                                <Grid sx={{ ml:'auto' , height:'max-content' , mt:'auto' }}>
                                    <Button onClick={()=>decline(booking._id)} sx={{ ml:'auto' , bgcolor:'red' , color:'#fff' , fontSize:{ xs:'9px'  , sm:'10px' , md:'11px'} , py:0.3 , ml:0.3 , ":hover":{ bgcolor:'red' } }}>Decline</Button>
                                    <Button onClick={()=>accept(booking._id)} sx={{ ml:'auto' , bgcolor:'green' , color:'#fff' , fontSize:{ xs:'9px'  , sm:'10px' , md:'11px'} , py:0.3 , ml:0.3 , ":hover":{ bgcolor:'green' } }}>Accept</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    ))}
                  </Box>
                </Grid>
              </Grid>
            </Grid>
            <Grid md={3}>
              <Messages user={vendor} />
            </Grid>
          </Grid>
        </Box>
        <VendorBottomNavbar />
      </div>
    </>
  );
}
