const { createSlice } = require("@reduxjs/toolkit");

export const userSlice = createSlice({
    name:'user',
    initialState:{
        user:{}
    },
    reducers:{
        userDetails:(state, action)=>{
            state.user = action.payload
        }
    }
})

export const userActions = userSlice.actions
export default userSlice