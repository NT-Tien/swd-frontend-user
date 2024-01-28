import {  createSlice } from '@reduxjs/toolkit';

let initialState = {
	uid: null,
	name: null,
    email: null,
	avatarUrl: null,
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action) => {
			const { name, uid, avatarUrl, email } = action.payload;
			state.avatarUrl = avatarUrl;
			state.name = name;
			state.uid = uid;
			state.email = email;
			sessionStorage.setItem('user', JSON.stringify(state));
		},
		mySignOut: (state) => {
			state.avatarUrl = null;
			state.name = null;
			state.uid = null;
			state.email = null;
			sessionStorage.removeItem('user');
		},
	},
});

export const { setUser, mySignOut } = userSlice.actions;

export default userSlice.reducer;