import Head from "next/head";
import Footer from "./Footer/Footer";
import Navbar from "./Navabar/Navbar";

const Layout = ({ children }) => {
    return ( 
        <>
        <Head>
            <title>Job Circle</title>
            <link href='https://api.tiles.mapbox.com/mapbox-gl-js/v2.9.2/mapbox-gl.css' rel='stylesheet' />
        </Head>
        {children}
        <Footer/>
        <script src='https://api.tiles.mapbox.com/mapbox-gl-js/v2.9.2/mapbox-gl.js'></script>
        </>
     );
}
 
export default Layout;