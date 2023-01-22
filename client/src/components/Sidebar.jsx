import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import styles from '@/styles/adminHome.module.css'
import Link from "next/link";

const Sidebar = () => {

    function clicked() {
        
    }

    return ( 
        <>
            <Grid md={3.3} sx={{ p: 2 , m: 0.5 , minHeight:'96.6vh' , boxShadow: 3 , borderRadius:'15px' , backgroundColor:'#1976d2' , color:'#fff' , display: { xs: 'none', sm: 'none', md: 'block' } }}>
                <Box sx={{ mt: 3 , textAlign:'center' }}>
                    <img style={{ width:'45%' }} src="/logo.png" alt="Loading..."/>
                </Box>
                <Box sx={{ mt: 4 , textAlign:'center' }}>
                    {/* ICONS PENDING */}
                    <Link href='/admin'><button onClick={clicked} className={styles.button}>HOME</button></Link>
                    <Link href='/admin/users'><button className={styles.button}>USERS</button></Link>
                    <Link href='/admin/vendors'><button className={styles.button}>VENDORS</button></Link>
                    <Link href='/admin/notifications'><button className={styles.button}>NOTIFICATIONS</button></Link>
                    <Link href='/admin/profile'><button className={styles.button}>PROFILE</button></Link>
                </Box>
            </Grid>
        </>
     );
}
 
export default Sidebar;