import { Button } from "@mui/material";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import { useEffect } from "react";

const NotFound = () => {
    const router = useRouter();

    useEffect(()=>{
        setTimeout(() => { 
            router.back()       
        }, 5000);
    },[])

    return (
        <>
        <Box sx={{ width:'100%' , height:'100vh' , display:'flex' , justifyContent:'center' , alignItems:'center' }}>
            <Box sx={{ color:'#686868' , textAlign:'center' , display:'block'}} className="main-div">
                <h1 style={{ fontSize:'100px' , fontFamily:'cursive' }}>404</h1>
                <h1>Oooops...</h1>
                <h4>That page cannot be found.</h4>
                <Button onClick={()=> router.back()} sx={{ bgcolor:'#fff' , boxShadow: 3 , fontSize:'13px' , mt: 2 , color:'#000' , ":hover":{ bgcolor:'#fff' } , fontFamily:'fantasy'  }}>Go to Back</Button>
            </Box>
        </Box>
        </>
     );
}
 
export default NotFound;