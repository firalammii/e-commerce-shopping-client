import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const orderSlice = createSlice({
	name: "orders",
	initialState,
	reducers: {},
	extraReducers: {}
});

export const ordersSelector = (state) => state.orders;
export default orderSlice.reducer;