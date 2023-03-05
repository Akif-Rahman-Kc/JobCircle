import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import EngineeringIcon from '@mui/icons-material/Engineering';
import HomeIcon from '@mui/icons-material/Home';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import Swal from 'sweetalert2';
import { VendorSearchAllPeople } from '@/Apis/vendorApi';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function VendorNavbar() {
    const router = useRouter()
    const [ allPeople, setAllPeople ] = React.useState([])
  const [ openBox, setOpenBox ] = React.useState(false)

  const { vendor } = useSelector((state)=>state.vendorInfo)

  const logout = () => {
    Swal.fire({
      title: "Are You Sure",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      showCancelButton: true,
      customClass: "swal-wide",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('vendortoken')
        router.push('/vendor/signin')
      }
    });
  };

  const searchAllUsers = async (value)=>{
    const response = await VendorSearchAllPeople(value)
    if (response) {
      console.log(response.allPeople);
      setAllPeople(response.allPeople)
    }else{
      router.push('/404')
    }
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'fantasy',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <img src="/logo.png" style={{width:'50px'}}  alt="Loading." />
            <h3 style={{margin:'auto'}}>JobCircle</h3>
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              onChange={(e)=>searchAllUsers(e.target.value)}
              onKeyUp={()=>{
                setOpenBox(true)
              }}
              onFocus={()=>{
                setOpenBox(false)
              }}
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
            { openBox ?
            <a><Box className='search comments' zIndex={-500} mt={-1.5} py={2} bgcolor={'#fff'} position={'fixed'} maxHeight={'300px'} sx={{ borderLeft:'1px solid lightgray' , borderBottom:'1px solid lightgray' , borderRight:'1px solid lightgray' , width:{ xs:'68vw' , sm:'251px' , md:'234px' } , borderBottomRightRadius:'15px' , borderBottomLeftRadius:'15px' , overflowY:'auto' }}>
                {allPeople.length > 0 ? allPeople.map((person)=>(
                <>
                  <Link href={`/vendor/worker_profile/${person._id}`}>
                  <IconButton key={person._id} size='small' sx={{p: 1 , color:'blue' , borderRadius:'0' , width:'100% '}}>
                    <Box sx={{width: '-webkit-fill-available' , color:'#111' , display:'flex'}}>
                      <img src={person.image ? person.image : "/null-profile.jpg"} style={{ width:'30px' , height:'30px' ,borderRadius:'50%',border:'1px solid #000' }} alt="" />
                      <Box sx={{ display:'flex' , justifyContent:'center' , alignItems:'center' }}>
                        <Box sx={{ display:'block'  , textAlign:'left'}}>
                          <h5 style={{ fontSize:'13px'  , marginLeft:'5px' }}>{person.firstName + ' ' + person.lastName}</h5>
                          <h6 style={{ fontSize:'10px'  , marginLeft:'5px' , fontFamily:'monospace' }}>{person?.job}</h6>
                        </Box>
                    </Box>
                    </Box>
                  </IconButton>
                  </Link>
                  <hr />
                </>
              )) : <h5>Sorry, Nothing found!</h5>}
            </Box></a>
            : '' }
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <Link href='/vendor'>
            <IconButton
              sx={{ borderRadius: "10px", width: "105px" , color:'#111' }}
              size="large"
              aria-label="home page"
              color="inherit"
            >
              <Box
                sx={{
                  display: { xs: "none", md: "block", textAlign: "center" },
                }}
              >
                <HomeIcon />
                <h6 style={{ fontSize: "12px" }}>Home</h6>
              </Box>
            </IconButton>
            </Link>
            <Link href='/vendor/works'>
            <IconButton
              sx={{ borderRadius: "10px", width: "105px" , color:'#111' }}
              size="large"
              aria-label="show the workers"
              color="inherit"
            >
              <Box
                sx={{
                  display: { xs: "none", md: "block", textAlign: "center" },
                }}
              >
                <EngineeringIcon />
                <h6 style={{ fontSize: "12px" }}>Workers</h6>
              </Box>
            </IconButton>
            </Link>
            <Link href='/vendor/messages'>
            <IconButton
              sx={{ borderRadius: "10px", width: "105px" , color:'#111' }}
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
            >
              <Box
                sx={{
                  display: { xs: "none", md: "block", textAlign: "center" },
                }}
              >
                <MailIcon />
                <h6 style={{ fontSize: "12px" }}>Messages</h6>
              </Box>
            </IconButton>
            </Link>
            <Link href='/vendor/notifications'>
            <IconButton
              sx={{ borderRadius: "10px", width: "105px" , color:'#111' }}
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Box
                sx={{
                  display: { xs: "none", md: "block", textAlign: "center" },
                }}
              >
                <NotificationsIcon />
                <h6 style={{ fontSize: "12px" }}>Notifications</h6>
              </Box>
            </IconButton>
            </Link>
            <Link href='/vendor/work_list'>
            <IconButton
              sx={{ borderRadius: "10px", width: "105px" , color:'#111' }}
              size="large"
              aria-label="show the work list"
              color="inherit"
            >
              <Box
                sx={{
                  display: { xs: "none", md: "block", textAlign: "center" },
                }}
              >
                <ReceiptLongIcon />
                <h6 style={{ fontSize: "12px" }}>Work List</h6>
              </Box>
            </IconButton>
            </Link>
            <Link href='/vendor/profile'>
            <IconButton
              sx={{ borderRadius: "10px", width: "110px" , color:'#111' }}
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              color="inherit"
            >
              <Box
                sx={{
                  display: { xs: "none", md: "block", textAlign: "center" },
                }}
              >
                <img
                  src={vendor.image ? vendor.image : "/null-profile.jpg"}
                  style={{ m: 0, width: "24px", borderRadius: "50%" }}
                  alt=""
                />
                <h6 style={{ fontSize: "12px" }}>{vendor.firstName + ' ' + vendor.lastName}</h6>
              </Box>
            </IconButton>
            </Link>
          </Box>
          <IconButton
              onClick={logout}
              sx={{ ":hover": { backgroundColor: "#fff" }, ml: 3 }}
            >
              <LogoutOutlinedIcon />
            </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}