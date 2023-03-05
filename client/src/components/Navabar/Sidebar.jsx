import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import styles from '@/styles/adminHome.module.css'
import Link from "next/link";
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import EngineeringRoundedIcon from '@mui/icons-material/EngineeringRounded';
import PlaylistAddCheckCircleRoundedIcon from '@mui/icons-material/PlaylistAddCheckCircleRounded';
import ReportIcon from '@mui/icons-material/Report';

const Sidebar = () => {

    return ( 
        <>
            <Grid md={3.3} sx={{ width:'35%' , p: 2 , m: 0.5 , minHeight:'96.6vh' , boxShadow: 3 , borderRadius:'15px' , backgroundColor:'#1976d2' , color:'#fff' , display: { xs: 'none', sm: 'none', md: 'block' } }}>
                <Box sx={{ mt: 3 , textAlign:'center' }}>
                    <img style={{ width:'37%' }} src="/logo.png" alt="Loading..."/>
                </Box>
                <Box sx={{ mt: 4 , textAlign:' -webkit-center' }}>
                    <Link href='/admin'>
                    <Box className={styles.button}>
                        <HomeRoundedIcon/>
                        <p className={styles.butttonText}>HOME</p>
                    </Box>
                    </Link>
                    <Link href='/admin/users'>
                    <Box className={styles.button}>
                        <PeopleAltRoundedIcon/>
                        <p className={styles.butttonText}>USERS</p>
                    </Box>
                    </Link>
                    <Link href='/admin/vendors'>
                    <Box className={styles.button}>
                        <EngineeringRoundedIcon/>
                        <p className={styles.butttonText}>VENDORS</p>
                    </Box>
                    </Link>
                    <Link href='/admin/jobs'>
                    <Box className={styles.button}>
                        <PlaylistAddCheckCircleRoundedIcon/>
                        <p className={styles.butttonText}>JOBS</p>
                    </Box>
                    </Link>
                    <Link href='/admin/reports'>
                    <Box className={styles.button}>
                        <ReportIcon/>
                        <p className={styles.butttonText}>REPORTS</p>
                    </Box>
                    </Link>
                </Box>
            </Grid>
        </>
     );
}
 
export default Sidebar;