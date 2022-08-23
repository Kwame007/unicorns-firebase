import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "../features";
import { modalSlice } from "../features";

// redux store
const store = configureStore({
  reducer: {
    Auth: authSlice,
    modal: modalSlice,
  },
});

export default store;
