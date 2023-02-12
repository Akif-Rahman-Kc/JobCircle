import AdminNavbar from "@/components/Navabar/AdminNavbar";
import Sidebar from "@/components/Navabar/Sidebar";
import { Button, Grid } from "@mui/material";
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
import { AdminGetVendors, AdminisAuthApi } from "@/Apis/adminApi";
import { useRouter } from "next/router";
import { isVendorActivated, isVendorBlocked } from "@/Apis/vendorApi";

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
  
  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];

const Users = () => {
  const router = useRouter()
  const [ vendors , setVendors ] = useState([])
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
      const res = await AdminGetVendors()
      if (res) {
        setVendors(res)
      }
    }
    invoke();
  },[refresh])

  const blocked = async (vendorId) =>{
    const res = await isVendorBlocked(vendorId)
    setRefresh(!refresh)
  }

  const actived = async (vendorId) =>{
    const res = await isVendorActivated(vendorId)
    setRefresh(!refresh)
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
                        <Box>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                    <TableHead>
                                    <TableRow>
                                        <StyledTableCell align="center">NO</StyledTableCell>
                                        <StyledTableCell align="center">NAME</StyledTableCell>
                                        <StyledTableCell align="center">E-MAIL</StyledTableCell>
                                        <StyledTableCell align="center">PLACE</StyledTableCell>
                                        <StyledTableCell align="center">PHONE NO</StyledTableCell>
                                        <StyledTableCell align="center">OPTIONS</StyledTableCell>
                                    </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    {vendors.map((vendor) => (
                                        <StyledTableRow key={vendor._id}>
                                        <StyledTableCell align="center" component="th" scope="row">
                                            1
                                        </StyledTableCell>
                                        <StyledTableCell align="center" component="th" scope="row">
                                            {vendor.firstName + ' ' + vendor.lastName}
                                        </StyledTableCell>
                                        <StyledTableCell align="center">{vendor.email}</StyledTableCell>
                                        <StyledTableCell align="center">{vendor.locality + ', ' + vendor.city}</StyledTableCell>
                                        <StyledTableCell align="center">{vendor.phoneNo}</StyledTableCell>
                                        <StyledTableCell align="center">
                                          {vendor.isBlock ? 
                                            <Button onClick={()=> actived(vendor._id)} sx={{ ml: 1 , backgroundColor:'#039303' , borderRadius:'29px' , boxShadow:3 , color:'#fff' , fontSize:'10px' , fontWeight:'800' , ":hover":{ backgroundColor:'#03a903' } }}>
                                              active
                                            </Button> :
                                            <Button onClick={()=> blocked(vendor._id)} sx={{ backgroundColor:'#e70202' , borderRadius:'29px' , boxShadow:3 , color:'#fff' , fontSize:'10px' , fontWeight:'800' , ":hover":{ backgroundColor:'red' } }}>
                                              block
                                            </Button>
                                          } 
                                        </StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    </Grid>
                </Box>
            </Grid>
        </Grid>
        </Box>
        </>
     );
}
 
export default Users;