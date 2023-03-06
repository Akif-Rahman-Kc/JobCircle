import { Box, Grid, IconButton } from "@mui/material";
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot';
import TurnedInIcon from '@mui/icons-material/TurnedIn';
import { getAllConnectors, SavedVendors } from "@/Apis/userApi";
import { useEffect, useState } from "react";
import ErrorIcon from '@mui/icons-material/Error';
import Link from "next/link";
import { useRouter } from "next/router";

const Connections = ({user, vendor}) => {
    const router = useRouter()
    const [ connectors, setConnectors ] = useState([])

    useEffect(()=>{
        async function invoke(){
            const resp = await getAllConnectors(user._id)
            if (resp) {
                const connectedConnection = resp.connections.filter((obj)=>obj.status == 'connected')
                setConnectors(connectedConnection)
            }
        }
        invoke()
    },[user])

    return (
            <>
            {connectors == 0 ? 
            <Box sx={{ color:'gray' , textAlign:'center' , mt:'50%' }}>
                <ErrorIcon sx={{ fontSize:'80px' }}/>
                <h3>Ther are no Connectors</h3>
            </Box>
            :
            connectors.map((obj)=>(
                <>
                    <Link href={vendor ? `/vendor/worker_profile/${obj.connectorId}` : `/worker_profile/${obj.connectorId}`}>
                    <Box display={'flex'} my={1.5}>
                        <img src={obj?.connectorImage ? obj.connectorImage : "/null-profile.jpg"}
                            style={{
                                width: "30px",
                                height: "fit-content",
                                borderRadius: "50%",
                                border: "1px solid #000",
                                marginRight:'3px'
                            }}
                            alt=""
                        />
                        <h5 style={{ marginTop:'8px' , lineBreak:'auto' , color:'#000' }}>{obj.connectorName}</h5>
                    </Box>
                    </Link>
                    <hr />
                </>
            ))}
            </>
     );
}

export default Connections;