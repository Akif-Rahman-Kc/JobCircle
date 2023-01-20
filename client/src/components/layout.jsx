import Head from "next/head";
import Footer from "./footer";
import Navbar from "./navbar";

const Layout = ({ children }) => {
    return ( 
        <>
        <Head>
            <title>Job Circle</title>
        </Head>
        <Navbar/>
        {children}
        <Footer/>
        </>
     );
}
 
export default Layout;