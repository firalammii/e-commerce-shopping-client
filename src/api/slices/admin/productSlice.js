import { axios } from "@/api/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
	products: [],
	isLoading: false,
	error: null,

};

export const fetchProducts = createAsyncThunk('products/fetch', async (query, thunkAPI) => {
	try {
		const { data } = await axios.get('/admin/products/?' + query);
		console.log(data);
		return data;
	} catch (error) {
		console.error(error);
		return thunkAPI.rejectWithValue(error.response?.data.message || error.message);
	}
});
export const addProduct = createAsyncThunk('products/add', async (formData, thunkAPI) => {
	try {
		const { data } = await axios.post('/admin/products', formData);
		console.log(data);
		return data;
	} catch (error) {
		console.error(error);
		return thunkAPI.rejectWithValue(error.response?.data.message || error.message);
	}
});
export const addProductMulter = createAsyncThunk('products/add', async (formData, thunkAPI) => {
	try {
		const { data } = await axios.post('/admin/products/multer', formData, { headers: { "Content-Type": "multipart/form-data" } });
		console.log(data);
		return data;
	} catch (error) {
		console.error(error);
		return thunkAPI.rejectWithValue(error.response?.data.message || error.message);
	}
});

export const updateProduct = createAsyncThunk('products/update', async (formData, thunkAPI) => {
	try {
		const { data } = await axios.put(`/admin/products/${formData._id}`, formData);
		console.log(data);
		return data;
	} catch (error) {
		console.error(error);
		return thunkAPI.rejectWithValue(error.response?.data.message || error.message);
	}
});

export const deleteProduct = createAsyncThunk('products/delete', async (id, thunkAPI) => {
	try {
		const { data } = await axios.delete(`/admin/products/${id}`);
		console.log(data);
		return data;
	} catch (error) {
		console.error(error);
		return thunkAPI.rejectWithValue(error.response?.data.message || error.message);
	}
});

const productSlice = createSlice({
	name: "products",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchProducts.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(fetchProducts.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.error = payload?.success ? null : payload?.message;
				state.products = payload?.success ? payload?.products : state.products;
			})
			.addCase(fetchProducts.rejected, (state, { payload }) => {
				state.error = payload?.message;
				state.isLoading = false;
			})
			.addCase(addProduct.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(addProduct.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				if (payload?.success) {
					state.error = null;
					state.products.unshift(payload.saved);
				} else state.error = payload?.message;
			})
			.addCase(addProduct.rejected, (state, { payload }) => {
				state.error = payload?.message;
				state.isLoading = false;
			})
			.addCase(updateProduct.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(updateProduct.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				if (payload?.success) {
					state.error = null;
					const index = state.products.findIndex(item => item._id === payload.updated._id);
					if (index > -1)
						state.products[index] = payload.updated;
				} else state.error = payload?.message;

			})
			.addCase(updateProduct.rejected, (state, { payload }) => {
				state.error = payload?.message;
				state.isLoading = false;
			})
			.addCase(deleteProduct.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(deleteProduct.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				if (payload?.success) {
					state.error = null;
					const index = state.products.findIndex(item => item._id === payload.deleted._id);
					if (index > -1)
						state.products.splice(index, 1);
				} else state.error = payload?.message;
			})
			.addCase(deleteProduct.rejected, (state, { payload }) => {
				state.error = payload?.message;
				state.isLoading = false;
			})
		// .addCase(addProductMulter.pending, (state) => {
		// 	state.isLoading = true;
		// 	state.error = null;
		// })
		// .addCase(addProductMulter.fulfilled, (state, { payload }) => {
		// 	state.isLoading = false;
		// 	if (payload?.success) {
		// 		state.error = null;
		// 		state.products.unshift(payload.saved);
		// 	} else state.error = payload?.message;
		// })
		// .addCase(addProductMulter.rejected, (state, { payload }) => {
		// 	state.error = payload?.message;
		// 	state.isLoading = false;
		// });
	}
});

export const productsSelector = (state) => state.products.products;
export default productSlice.reducer;