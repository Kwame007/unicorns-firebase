import { createSlice } from "@reduxjs/toolkit";

// initial state
const initialState = {
  isLoggedIn: false,
  token: null,
};

const AuthSlice = createSlice({
  name: "Auth-Slice",
  initialState,
  reducers: {
    signUp: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    logOut: () => {},
  },
});

// auth-slice actions
export const { signUp, logOut } = AuthSlice.actions;

export default AuthSlice.reducer;
