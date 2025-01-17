import { axios } from '../axios';
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

const initialState = {
	isLoading:false,
	isAuthenticated: false,
	user: null,
	error:null,
}

const registerUser = createAsyncThunk('/auth/register', async (formData, thunkAPI)=>{
	try{
		const { data } = await axios.post('/auth/register', formData);
		return data;
	}catch(err){
		console.error(err)
		return thunkAPI.rejectWithValue(err.response.data)
	}
})
const loginUser = createAsyncThunk('/auth/login',async(formData,thunkAPI)=>{
	try {
		const { data } = await axios.post('/auth/login', formData);
		return data;
	} catch (err) {
		console.error(err);
		return thunkAPI.rejectWithValue(err.response.data);
	}
})
const refreshUser = createAsyncThunk('/auth/refresh', async (justNull, thunkAPI) => {
	console.log('refresh call')
	try {
		const { data } = await axios.get('/auth/refresh', 
			{
				withCredentials: true,
				headers: {
					"Cache-Control":
						"no-store, no-cache, must-revalidate, proxy-revalidate",
				},
			}
		);
		console.log("refresh: ", data)
		return data;
	} catch (err) {
		console.error(err.response.data);
		return thunkAPI.rejectWithValue(err.response.data);
	}
});

const logoutUser = createAsyncThunk('/auth/logout', async(_,thunkAPI)=>{
	try {
		const { data } = await axios.get('/auth/logout');
		return data;
	} catch (err) {
		console.error(err);
		return thunkAPI.rejectWithValue(err.response.data);
	}
})

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {},
	extraReducers: (builder)=>{
		builder
		// register
		.addCase(registerUser.pending, (state)=>{
			state.isLoading = true;
			state.error = null;
		})
		.addCase(registerUser.fulfilled, (state)=>{
			state.isLoading = false;
			state.error = null;
		})
		.addCase(registerUser.rejected, (state, {payload})=>{
			state.isLoading = false;
			state.error= payload?.message
		})
		//login
		.addCase(loginUser.pending, (state) => {
			state.isLoading = true;
			state.error = null;
		})
		.addCase(loginUser.fulfilled, (state, action) => {
			state.isLoading = false;
			state.user = action.payload.success? action.payload.user : null;
			state.isAuthenticated = action.payload.success;
			state.error = null;
		})
		.addCase(loginUser.rejected, (state, {payload}) => {
			state.isLoading = false;
			state.user = null;
			state.isAuthenticated = false;
			state.error= payload?.message
		})
		//refresh
		.addCase(refreshUser.pending, (state) => {
			state.isLoading = true;
			state.error = null;
		})
		.addCase(refreshUser.fulfilled, (state, {payload}) => {
			// console.log(payload);
			state.isLoading = false;
			state.user = payload.success? payload.user : null;
			state.isAuthenticated = payload.success;
			state.error = null;
		})
		.addCase(refreshUser.rejected, (state, {payload}) => {
			console.log(payload);
			state.isLoading = false;
			state.user = null;
			state.isAuthenticated = false;
			state.error= payload?.message
		})
		//logout
		.addCase(logoutUser.pending, (state) => {
			state.isLoading = true;
			state.error = null;
		})
		.addCase(logoutUser.fulfilled, (state, {payload}) => {
			state.isLoading = false;
			state.user = payload.success? null : state.user;
			state.isAuthenticated = !payload.success;
			state.error = null;
		})
		.addCase(logoutUser.rejected, (state, {payload}) => {
			state.isLoading = false;
			state.isAuthenticated = false;
			state.error= payload?.message
		})
	}
})

export const currUserSelector = (state) => state.auth.user;
export const authSelector = (state) => state.auth;

export { registerUser, loginUser, refreshUser , logoutUser};
export default authSlice.reducer;