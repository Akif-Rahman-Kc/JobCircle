import mapboxgl from "mapbox-gl";
import { useEffect, useState } from "react";

const map = () => {
    const [ map, setMap ] = useState()

    mapboxgl.accessToken = 'pk.eyJ1IjoiYWtpZi1yYWhtYW4tMTEiLCJhIjoiY2xkdWZoNmZ0MDU2ODNucGEzMWN3eWJrcSJ9.lTnfnr6_mLR0nYD3LaxeIA';

    useEffect(()=>{
        const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/akif-rahman-11/cldufk9ij001701qz23irecvn',
            center: [-77.034084, 38.909671],
            zoom: 13,
            scrollZoom: false
        });
        // Add zoom and rotation controls to the map.
        map.addControl(new mapboxgl.NavigationControl());

        setMap(map)
    })

    
    return ( 
        <>
            <h1>Map</h1>
            <div class='sidebar'>
                <div class='heading'>
                    <h1>Our locations</h1>
                </div>
                <div id='listings' class='listings'></div>
            </div>
            <div id="map" class="map"></div>
        </>
     );
}
 
export default map;