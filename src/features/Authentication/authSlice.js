import { createSlice } from "@reduxjs/toolkit";

// initial state
const initialState = {
  isLoggedIn: true,
  token: "",
};

const AuthSlice = createSlice({
  name: "Auth-Slice",
  initialState,
  reducers: {
    signInUser: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    logOut: () => {},
  },
});

// auth-slice actions
export const { signInUser, logOut } = AuthSlice.actions;

export default AuthSlice.reducer;
