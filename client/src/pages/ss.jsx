////////////////////////////////////   DATA GRID    /////////////////////////////////////////////////

// const { Box } = require("@mui/material");
// import { MdCloudUpload } from "react-icons/md";

// import * as React from 'react';
// import { DataGrid, GridToolbar } from '@mui/x-data-grid';

// export default function ToolbarGrid() {
//   const rows = [
//   { id: 1, col1: 'Hello', col2: 'World' },
//   { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
//   { id: 3, col1: 'MUI', col2: 'is Amazing' },
// ];

// const columns = [
//   { field: 'col1', headerName: 'Column 1', width: 150 },
//   { field: 'col2', headerName: 'Column 2', width: 150 },
// ];

//   return (
//     <div style={{ height: 300, width: '100%' }}>
//       <DataGrid rows={rows} columns={columns}
//       components={{
//         Toolbar: GridToolbar,
//       }}
//       />
//     </div>
//   );
// }


//////////////////////////////////////////////   CAROUSAL   ///////////////////////////////////////////////////

// import React from 'react';
// import Carousel from 'react-material-ui-carousel'
// import { Paper, Button } from '@mui/material'

// const ss = () => {
//   var items = [
//     {
//         name:"/null-profile.jpg"
//     },
//     {
//       name:"/logo.png"
//     }
// ]
//   return ( 
//         <Carousel>
//             {
//                 items.map( (item, i) => 
//                 <img
//                   src={item.name}
//                   style={{
//                     height: "150px",
//                     borderRadius: "5px",
//                     border: "1px solid #000",
//                     // width: '-webkit-fill-available'
//                   }}
//                   alt=""
//                 />
//                 )
//             }
//         </Carousel>
//    );
// }
 
// export default ss;

///////////////////////////////////////////////////////////////   LAZY LOADING    /////////////////////////////////////////

// import * as React from 'react';
// import Skeleton from '@mui/material/Skeleton';
// import Stack from '@mui/material/Stack';

// export default function Variants() {
//   return (
//     <Stack spacing={1}>
//       {/* For variant="text", adjust the height via font-size */}
//       <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
//       {/* For other variants, adjust the size with `width` and `height` */}
//       <Skeleton variant="circular" width={40} height={40} />
//       <Skeleton variant="rectangular" width={210} height={60} />
//       <Skeleton variant="rounded" width={210} height={60} />
//     </Stack>
//   );
// }

/////////////////////////////////  PLACES /////////////////////////


// import { getCode, getName } from "country-list";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Country, State, City } from "country-state-city";
// import Select from "react-select";
import { useEffect, useState } from "react";

export default function App() {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [ state, setState ] = useState('')
  const [ city, setCity ] = useState('')
  useEffect(() => {
    setStates(State?.getStatesOfCountry('IN'))
    if (state != '') {
      setCities(City.getCitiesOfState(state?.countryCode,state?.isoCode))
    }
  }, [states, state]);
  const handleChange = (event) => {
    setState(event.target.value);
    setCities(City.getCitiesOfState(state?.countryCode,state?.isoCode))
  };
  const handleChangeSs = (event) => {
    setCity(event.target.value);
  };
  return (
    <div className="App">
      <FormControl sx={{ width:'100%' }}>
      <InputLabel id="state">State *</InputLabel>
        <Select
          labelId="state"
          fullWidth
          id="state"
          value={state}
          name='state'
          label="State"
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {
            states.map((state)=>(
              <MenuItem value={state}>{state.name}</MenuItem>
            ))
          }
        </Select>
        </FormControl>
        <FormControl sx={{ width:'100%' }}>
      <InputLabel id="city">City *</InputLabel>
        <Select
          labelId="city"
          fullWidth
          id="city"
          value={city}
          name='city'
          label="City"
          onChange={handleChangeSs}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {
            cities?.map((city)=>(
              <MenuItem value={city}>{city.name}</MenuItem>
            ))
          }
        </Select>
        </FormControl>
      {/* <Select
        options={Country.getAllCountries()}
        getOptionLabel={(options) => {
          return options["name"];
        }}
        getOptionValue={(options) => {
          return options["name"];
        }}
        value={selectedCountry}
        onChange={(item) => {
          setSelectedCountry(item);
        }}
      />
      <Select
        options={State?.getStatesOfCountry(selectedCountry?.isoCode)}
        getOptionLabel={(options) => {
          return options["name"];
        }}
        getOptionValue={(options) => {
          return options["name"];
        }}
        value={selectedState}
        onChange={(item) => {
          setSelectedState(item);
        }}
      />
      <Select
        options={City.getCitiesOfState(
          selectedState?.countryCode,
          selectedState?.isoCode
        )}
        getOptionLabel={(options) => {
          return options["name"];
        }}
        getOptionValue={(options) => {
          return options["name"];
        }}
        value={selectedCity}
        onChange={(item) => {
          setSelectedCity(item);
        }}
      /> */}
    </div>
  );
}
