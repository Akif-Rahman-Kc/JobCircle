import { configureStore } from "@reduxjs/toolkit"
import userSlice from "./user";
import vendorSlice from "./vendor";

export const store = configureStore({
    reducer: {
        userInfo:userSlice.reducer,
        vendorInfo:vendorSlice.reducer
    }
})