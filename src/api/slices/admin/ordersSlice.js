import { axios, baseURL } from "@/api/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const endPoint = '/shop/orders';
const url = baseURL + endPoint;

const initialState = {
	orders: [],
	isLoading: false,
	error: null,
};
export const fetchOrders = createAsyncThunk('orders/fetch', async (query, thunkAPI) => {
	try {
		const { data } = await axios.get(url);
		return data;
	} catch (error) {
		console.error(error);
		return thunkAPI.rejectWithValue(error.message);

	}
});
export const createOrder = createAsyncThunk('orders/create', async (order, thunkAPI) => {
	try {
		const { data } = await axios.post(url, order);
		return data;
	} catch (error) {
		console.error(error);
		return thunkAPI.rejectWithValue(error.message)

	}
});
const orderSlice = createSlice({
	name: "orders",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchOrders.fulfilled, (state, { payload }) => {
				state.orders = payload.orders;
				state.isLoading = false;
				state.error = null;
			})
			.addCase(createOrder.fulfilled, (state, { payload }) => {
				state.orders.unshift(payload.order);
				state.isLoading = false;
				state.error = null;
			});
	}
});

export const ordersSelector = (state) => state.orders;
export default orderSlice.reducer;