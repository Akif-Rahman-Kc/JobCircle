import AdminNavbar from "@/components/Navabar/AdminNavbar";
import Sidebar from "@/components/Navabar/Sidebar";
import { Button, Grid, IconButton } from "@mui/material";
import { Box } from "@mui/system";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from "react";
import axios from "axios";
import { AdminGetJobs, AdminGetReportPosts, AdminGetReportVendors, AdminGetVendors, AdminisAuthApi, DeleteJob, DeleteReportPost } from "@/Apis/adminApi";
import { useRouter } from "next/router";
import { isVendorActivated, isVendorBlocked } from "@/Apis/adminApi";
import { IoIosTrash } from "react-icons/io"
import Swal from "sweetalert2";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

const Jobs = () => {
  const router = useRouter()
  const [ reportPosts , setReportPosts ] = useState([])
  const [ vendors , setVendors ] = useState([])
  const [ secBox , setSecBox ] = useState(false)
  const [ refresh , setRefresh ] = useState(false)

  useEffect(()=>{
    async function invoke(){
      let token=  localStorage.getItem('admintoken')
      if (token) {
        const response = await AdminisAuthApi(token)
        if (response) {
          if (response.auth) {
            console.log("success");
          } else {
            router.push('/admin/signin')
          }
        }
      } else {
        router.push('/admin/signin')
      }
    }
    invoke();
  },[])

  useEffect(()=>{
    async function invoke(){
      let token=  localStorage.getItem('admintoken')
      const res = await AdminGetReportPosts(token)
      if (res) {
        setReportPosts(res.reportPosts)
      }
    }
    invoke();
  },[refresh])

  useEffect(()=>{
    async function invoke(){
      let token=  localStorage.getItem('admintoken')
      const res = await AdminGetReportVendors(token)
      if (res) {
        setVendors(res.reportVendors)
      }
    }
    invoke();
  },[refresh])

  const deletePost = async (postId) =>{
    Swal.fire({
        title: "Are You Sure",
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        showCancelButton: true,
        customClass: "swal-wide",
      }).then(async (result) => {
        if (result.isConfirmed) {
            let token=  localStorage.getItem('admintoken')
            const res = await DeleteReportPost(postId, token)
            if (res) {
                setRefresh(!refresh)
            } else {
                Swal.fire({
                    icon: 'warning',
                    title: 'Existed vendors',
                    text: 'Not deleting this job!',
                })
            }
        }
    });
  }

  const vendorBlock = async (vendorId) => {
    let token=  localStorage.getItem('admintoken')
    const res = await isVendorBlocked(vendorId, token)
    if (res) {
        setRefresh(!refresh)
    }
  }

  const vendorActive = async (vendorId) => {
    let token=  localStorage.getItem('admintoken')
    const res = await isVendorActivated(vendorId, token)
    if (res) {
        setRefresh(!refresh)
    }
  }

    return ( 
        <>
        <Box>
        <Grid container sx={{ mt: 1 , justifyContent:'center' , display:'flex' }}>
            <Sidebar/>
            <Grid xs={12} sm={12} md={8.4} sx={{ m: 0.5 , display:'block' }}>
                <Box>
                    <AdminNavbar/>
                </Box>
                <Box>
                    <Grid xs={12} sx={{ p: 3 , mt: 1.5  , minHeight:'85.8vh' , boxShadow: 3 , borderRadius:'15px' , backgroundColor:'#1976d2' , color:'#fff' }}>
                        <Button onClick={()=> setSecBox(false)} sx={{ width:{ xs:'100%' , sm:'100%' , md:'49%' } , color:'#000' , fontWeight:'900' , bgcolor:'#fff' , ":hover":{ bgcolor:'#fff' } , p: 2 , borderRadius:'15px' , boxShadow:'1px 2px 7px #111 inset' , ml:0.4 , my:1 }}>
                            Report Posts
                        </Button>
                        <Button onClick={()=> setSecBox(true)} sx={{ width:{ xs:'100%' , sm:'100%' , md:'49%' } , color:'#000' , fontWeight:'900' , bgcolor:'#fff' , ":hover":{ bgcolor:'#fff' } , p: 2 , borderRadius:'15px' , boxShadow:'1px 2px 7px #111 inset' , ml:0.7 , my:1 }}>
                            Report Vendors
                        </Button>
                        {secBox ? 
                        <Grid sx={{ mr:1 , color:'#fff' , p: 2 , borderRadius:'10px' , boxShadow:3 , height:'69vh' , overflowY:'auto' , width:'100%' , display:'flex' }}>
                            {vendors.map((vendor)=>(
                                <Grid xs={11} sm={6} md={3}>
                                    <Card sx={{ maxWidth: 240 , borderRadius:'10px' , boxShadow: 3 , m: 1 }}>
                                        {/* <CardMedia
                                            sx={{ height: 210 , maxWidth:'100%' , boxShadow: 3 }}
                                            image={vendor.image }
                                        /> */}
                                        <Box sx={{ mt: 1 , width: '-webkit-fill-available' , color:'#111' , display:'block' , textAlign:'center'}}>
                                            <img src={vendor.image ? vendor.image : "/null-profile.jpg"} style={{ width:'27%' , height:'27%' ,borderRadius:'50%',border:'1px solid #000' }} alt="" />
                                            <h5 style={{ fontSize:'13px'  , marginLeft:'5px' }}>{vendor.firstName + ' ' + vendor.lastName}</h5> 
                                        </Box>
                                        <CardContent sx={{ textAlign:'center' }}>
                                            <h5><span style={{ fontSize:'18px' , color:'red' }}>{vendor.Reports.length}</span> Reports</h5>
                                            <Grid className="comments" sx={{ mt:0.7 , boxShadow: 3 , borderRadius:'5px' , height:'130px' , width:'100%' , textAlign:'start' , p: 2 , overflowY:'auto' }}>
                                                {vendor.Reports.map((obj)=>(
                                                    <>
                                                        <Box sx={{width: '-webkit-fill-available' , color:'#111' , display:'flex'}}>
                                                            <img src={obj.reporterImage ? obj.reporterImage : "/null-profile.jpg"} style={{ width: "30px", height: "fit-content", borderRadius: "50%", border: "1px solid #000", marginRight:'3px' }} alt="" />
                                                            <Box sx={{ display:'flex' , justifyContent:'center' , alignItems:'center' }}>
                                                                <h5 style={{ fontSize:'12px'}}>{obj.reporterName}</h5>
                                                            </Box>
                                                        </Box>
                                                        <Typography ml={3} mt={0.3} fontSize={'12px'} variant="body2" color="text.secondary">
                                                            {obj.reportMessage}
                                                        </Typography>
                                                    </>
                                                ))}
                                            </Grid>
                                        </CardContent>
                                        <CardActions sx={{ m:0 , p:0 }}>
                                            {vendor.isBlock ? 
                                            <Button onClick={()=> vendorActive(vendor._id)} sx={{ ml:'auto' , mb:1 , mr: 2 , fontSize:'11px' , boxShadow: 3 , color:'#fff' , bgcolor:'green' , ":hover":{ bgcolor:'green' } }} size="small">Active</Button>
                                            :
                                            <Button onClick={()=> vendorBlock(vendor._id)} sx={{ ml:'auto' , mb:1 , mr: 2 , fontSize:'11px' , boxShadow: 3 , color:'#fff' , bgcolor:'red' , ":hover":{ bgcolor:'red' } }} size="small">Block</Button>
                                            }
                                        </CardActions>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                        :
                        <Grid sx={{ mr:1 , color:'#fff' , p: 2 , borderRadius:'10px' , boxShadow:3 , height:'69vh' , overflowY:'auto' , width:'100%' , display:'flex' }}>
                            {reportPosts.map((post)=>(
                                <Grid xs={11} sm={6} md={4}>
                                    <Card sx={{ maxWidth: 340 , borderRadius:'10px' , boxShadow: 3 , m: 1 }}>
                                        <CardMedia
                                            sx={{ height: 210 , maxWidth:'100%' , boxShadow: 3 }}
                                            image={post.image[0]}
                                        />
                                        <CardContent sx={{ textAlign:'center' }}>
                                            <h5><span style={{ fontSize:'18px' , color:'red' }}>{post.Reports.length}</span> Reports</h5>
                                            <Grid className="comments" sx={{ mt:0.7 , boxShadow: 3 , borderRadius:'5px' , height:'130px' , width:'100%' , textAlign:'start' , p: 2 , overflowY:'auto' }}>
                                                {post.Reports.map((obj)=>(
                                                    <>
                                                        <Box sx={{width: '-webkit-fill-available' , color:'#111' , display:'flex'}}>
                                                            <img src={obj.reporterImage ? obj.reporterImage : "/null-profile.jpg"} style={{ width: "30px", height: "fit-content", borderRadius: "50%", border: "1px solid #000", marginRight:'3px' }} alt="" />
                                                            <Box sx={{ display:'flex' , justifyContent:'center' , alignItems:'center' }}>
                                                                <h5 style={{ fontSize:'12px'}}>{obj.reporterName}</h5>
                                                            </Box>
                                                        </Box>
                                                        <Typography ml={3} mt={0.3} fontSize={'12px'} variant="body2" color="text.secondary">
                                                            {obj.reportMessage}
                                                        </Typography>
                                                    </>
                                                ))}
                                            </Grid>
                                        </CardContent>
                                        <CardActions sx={{ m:0 , p:0 }}>
                                            <Button onClick={()=> deletePost(post._id)} sx={{ ml:'auto' , mb:1 , mr: 2 , fontSize:'11px' , boxShadow: 3 , color:'#fff' , bgcolor:'red' , ":hover":{ bgcolor:'red' } }} size="small"><IoIosTrash style={{ marginRight:'5px' , fontSize:'15px' }}/>Delete</Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                        }
                    </Grid>
                </Box>
            </Grid>
        </Grid>
        </Box>
        </>
     );
}
 
export default Jobs;