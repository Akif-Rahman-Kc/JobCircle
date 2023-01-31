const { configureStore } = require("@reduxjs/toolkit");
import userSlice from "./user";

export const store = configureStore({
    reducer: { userInfo:userSlice.reducer }
})