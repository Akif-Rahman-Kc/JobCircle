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
import { AdminGetUsers, AdminisAuthApi } from "@/Apis/adminApi";
import { isActivated, isBlocked } from "@/Apis/adminApi";

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

const Users = () => {
  const [ users , setUsers ] = useState([])
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
      const res = await AdminGetUsers(token)
      if (res) {
        setUsers(res)
      }
    }
    invoke();
  },[refresh])

  const blocked = async (userId) =>{
    let token=  localStorage.getItem('admintoken')
    const res = await isBlocked(userId, token)
    setRefresh(!refresh)
  }

  const actived = async (userId) =>{
    let token=  localStorage.getItem('admintoken')
    const res = await isActivated(userId, token)
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
                                    {users.map((user, i) => (
                                        <StyledTableRow key={user._id}>
                                        <StyledTableCell align="center" component="th" scope="row">
                                            {i + 1}
                                        </StyledTableCell>
                                        <StyledTableCell sx={{ display:'flex' }} component="th" scope="row">
                                        <img src={user.image ? user.image : "/null-profile.jpg"} style={{ width: "30px", height: "fit-content", borderRadius: "50%", border: "1px solid #000", marginRight:'3px' }} alt="" />
                                          <Box sx={{ display:'flex' , justifyContent:'center' , alignItems:'center' }}>
                                              <h5 style={{ fontSize:'13px'  , marginLeft:'5px' , color:'#fff' }}>{user.firstName + ' ' + user.lastName}</h5>   
                                          </Box>
                                        </StyledTableCell>
                                        <StyledTableCell align="center">{user.email}</StyledTableCell>
                                        <StyledTableCell align="center">{user.locality + ', ' + user.city}</StyledTableCell>
                                        <StyledTableCell align="center">{user.phoneNo}</StyledTableCell>
                                        <StyledTableCell align="center">
                                          {user.isBlock ? 
                                            <Button onClick={()=> actived(user._id)} sx={{ ml: 1 , backgroundColor:'#039303' , borderRadius:'29px' , boxShadow:3 , color:'#fff' , fontSize:'10px' , fontWeight:'800' , ":hover":{ backgroundColor:'#03a903' } }}>
                                              active
                                            </Button> :
                                            <Button onClick={()=> blocked(user._id)} sx={{ backgroundColor:'#e70202' , borderRadius:'29px' , boxShadow:3 , color:'#fff' , fontSize:'10px' , fontWeight:'800' , ":hover":{ backgroundColor:'red' } }}>
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