import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
	name: "auth",
	initialState: { user: null, token: null, refresh: null, role: null },
	reducers: {
		setCredentials: (state, action) => {
			const { id, user, accessToken, role, refreshToken } = action.payload;
			state.id = id;
			state.user = user;
			state.role = role;
			state.token = accessToken;
			state.refresh = refreshToken;
		},
		logOut: (state) => {
			state.id = null;
			state.user = null;
			state.token = null;
			state.role = null;
			state.refresh = null;
		},
	},
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentId = (state) => state.auth.id;
export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;
export const selectCurrentRole = (state) => state.auth.role;
export const selectCurrentRefresh = (state) => state.auth.refresh;
