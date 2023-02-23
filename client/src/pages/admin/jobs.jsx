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
                        {jobs.map((job)=>(
                            <Button sx={{ width:{ xs:'100%' , sm:'100%' , md:'49%' } , color:'#000' , fontWeight:'900' , bgcolor:'#fff' , ":hover":{ bgcolor:'#fff' } , p: 2 , borderRadius:'15px' , boxShadow:'1px 2px 7px #111 inset' , mx:{xs:0 , sm:0 , md:0.3} , justifyContent:'flex-start' , my:1 }}>
                                {job.jobName}
                                <IconButton onClick={()=>deleteJob(job._id)} sx={{ ml:'auto' }}>
                                    <IoIosTrash style={{ color:'red' , fontSize:'19px' }}/>
                                </IconButton>
                            </Button>
                        ))}
                    </Grid>
                </Box>
            </Grid>
        </Grid>
        </Box>
        </>
     );
}
 
export default Jobs;