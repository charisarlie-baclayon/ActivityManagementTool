import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, token: null, role: null },
  reducers: {
    setCredentials: (state, action) => {
      const { user, accessToken, role } = action.payload;
      state.user = user;
      state.role = role;
      state.token = accessToken;
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
      state.role = null;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;
export const selecCurrentRole = (state) => state.auth.role;
