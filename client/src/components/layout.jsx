import Head from "next/head";

const Layout = ({ children }) => {
    return ( 
        <>
        <Head>
            <title>Job Circle</title>
            <link href='https://api.mapbox.com/mapbox-gl-js/v2.12.0/mapbox-gl.css' rel='stylesheet' />
            <link rel="stylesheet" href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v5.0.0/mapbox-gl-geocoder.css" type="text/css"></link>
        </Head>
        {children}
        <script src="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v5.0.0/mapbox-gl-geocoder.min.js"></script>
        </>
     );
}
 
export default Layout;