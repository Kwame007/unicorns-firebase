import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: { isShowing: false },
  reducers: {
    showModal: (state) => {
      state.isShowing = !state.isShowing;
    },
  },
});

export const { showModal } = modalSlice.actions;
export default modalSlice.reducer;
