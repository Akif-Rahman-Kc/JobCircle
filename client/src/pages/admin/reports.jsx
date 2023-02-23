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
import { AdminGetJobs, AdminGetVendors, AdminisAuthApi, DeleteJob } from "@/Apis/adminApi";
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
  const [ jobs , setJobs ] = useState([])
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
      const res = await AdminGetJobs(token)
      if (res) {
        setJobs(res)
      }
    }
    invoke();
  },[refresh])

  const deleteJob = async (jobId) =>{
    let token=  localStorage.getItem('admintoken')
    const res = await DeleteJob(jobId, token)
    if (res.status == "success") {
        setRefresh(!refresh)
    } else {
        Swal.fire({
            icon: 'warning',
            title: 'Existed vendors',
            text: 'Not deleting this job!',
        })
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
                        <Button sx={{ width:{ xs:'100%' , sm:'100%' , md:'49%' } , color:'#000' , fontWeight:'900' , bgcolor:'#fff' , ":hover":{ bgcolor:'#fff' } , p: 2 , borderRadius:'15px' , boxShadow:'1px 2px 7px #111 inset' , ml:0.4 , my:1 }}>
                            Report Posts
                        </Button>
                        <Button sx={{ width:{ xs:'100%' , sm:'100%' , md:'49%' } , color:'#000' , fontWeight:'900' , bgcolor:'#fff' , ":hover":{ bgcolor:'#fff' } , p: 2 , borderRadius:'15px' , boxShadow:'1px 2px 7px #111 inset' , ml:0.7 , my:1 }}>
                            Report Vendors
                        </Button>
                        <Grid sx={{ mr:1 , color:'#fff' , p: 2 , borderRadius:'10px' , boxShadow:3 , height:'69vh' }}>
                            <Card sx={{ maxWidth: 345 }}>
                                <CardMedia
                                    sx={{ height: 140 }}
                                    image="null"
                                    title="green iguana"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                    Lizard
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                    Lizards are a widespread group of squamate reptiles, with over 6,000
                                    species, ranging across all continents except Antarctica
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small">Share</Button>
                                    <Button size="small">Learn More</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    </Grid>
                </Box>
            </Grid>
        </Grid>
        </Box>
        </>
     );
}
 
export default Jobs;