import { createSlice } from "@reduxjs/toolkit"

export const vendorSlice = createSlice({
    name:'Vendor',
    initialState:{
        vendor:{}
    },
    reducers:{
        vendorDetails:(state, action)=>{
            state.vendor = action.payload
        }
    }
})

export const { vendorDetails } = vendorSlice.actions
export default vendorSlice