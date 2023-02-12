import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import EngineeringIcon from "@mui/icons-material/Engineering";
import HomeIcon from "@mui/icons-material/Home";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import Swal from "sweetalert2";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function Navbar() {
  const router = useRouter();

  const { user } = useSelector((state) => state.userInfo);

  const logout = () => {
    Swal.fire({
      title: "Are You Sure",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      showCancelButton: true,
      customClass: "swal-wide",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("usertoken");
        router.push("/signin");
      }
    });
  };

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
              display: { xs: "none", md: "flex" },
              fontFamily: "fantasy",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <img src="/logo.png" style={{ width: "50px" }} alt="Loading." />
            <h3 style={{ margin: "auto" }}>JobCircle</h3>
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Link href='/'>
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
            <Link href='/works'>
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
            <Link href='/messages'>
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
            <Link href='/notifications'>
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
            <Link href='/profile'>
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
                  src={user.image ? user.image : "/null-profile.jpg"}
                  style={{ m: 0, width: "24px", borderRadius: "50%" }}
                  alt=""
                />
                <h6 style={{ fontSize: "12px" }}>{user.firstName + ' ' + user.lastName}</h6>
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
