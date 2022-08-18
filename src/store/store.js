import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "../features";

// redux store
const store = configureStore({
  reducer: {
    Auth: authSlice,
  },
});

export default store;
