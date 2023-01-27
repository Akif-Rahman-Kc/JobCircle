const { configureStore } = require("@reduxjs/toolkit");
import userSlice from "./user";

const store = configureStore({
    reducer: { userInfo:userSlice.reducer }
})

export default store