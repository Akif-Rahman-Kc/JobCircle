import { createSlice } from "@reduxjs/toolkit"

export const userSlice = createSlice({
    name:'User',
    initialState:{
        user:{}
    },
    reducers:{
        userDetails:(state, action)=>{
            state.user = action.payload
        }
    }
})

export const { userDetails } = userSlice.actions
export default userSlice