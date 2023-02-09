import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import Link from "next/link";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "80%", sm: "60%", md: "35%" },
  maxHeight: { xs: "550px", sm: "550px", md: "650px" },
  bgcolor: "#fff",
  border: "2px solid #000",
  boxShadow: 24,
  p: 1,
  borderRadius: "10px",
};

const LikeModal = (props) => {
  
  return (
    <>
      <Box sx={style}>
        <Grid>
            <Grid sx={{ py: 3 , display:'flex' , justifyContent: "center" , borderRadius:'10px', backgroundColor:'lightgray' }}><ThumbUpAltIcon sx={{mr:0.7}}/><h3>{props.likes.length}</h3></Grid>
            <Grid
            className="comments"
          sx={{
            borderRadius:'10px',
            backgroundColor:'lightgray',
            maxHeight: { xs: "450px", sm: "450px", md: "550px" },
            mt: 1,
            overflowY:'auto'
          }}
        >   {props.likes.map((like)=>(
            <>
                <Link href={props.vendor ? `/vendor/worker_profile/${like.likerId}` : `/worker_profile/${like.likerId}`}>
                <Box sx={{ display:'flex' , px: 3 , py: 1 }}>
                    <img src={like.likerImage ? like.likerImage : "/null-profile.jpg"} style={{ width: "40px"  , height:"40px" , borderRadius: "50%" }} alt=""/>
                    <Typography sx={{ m: 1 , color:'#000' }}><b>{like.likerName}</b></Typography>
                </Box>
                </Link>
            </>
            ))}
        </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default LikeModal;
