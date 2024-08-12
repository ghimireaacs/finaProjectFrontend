import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
  },
  reducers: {
    getUser: (state, action) => {
      state.user = action.payload;
    },
    signOut: (state) => {
      state.user = {};
    
      // reset other state fields
    },
  },
});
export const { getUser, signOut } = userSlice.actions;
export default userSlice.reducer;
