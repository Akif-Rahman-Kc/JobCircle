import Head from "next/head";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
    return ( 
        <>
        <Head>
            <title>Job Circle</title>
        </Head>
        {children}
        <Footer/>
        </>
     );
}
 
export default Layout;