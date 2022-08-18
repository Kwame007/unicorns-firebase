import { createSlice } from "@reduxjs/toolkit";

// initial state
const initialState = {
  isLoggedIn: true,
  token: null,
};

const AuthSlice = createSlice({
  name: "Auth-Slice",
  initialState,
  reducers: {
    login: () => {},
    logOut: () => {},
  },
});

// auth-slice actions
export const { login, logOut } = AuthSlice.actions;

export default AuthSlice.reducer;
