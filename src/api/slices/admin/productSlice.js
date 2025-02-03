import { axios } from "@/api/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
	products: [],
	totalProds: 0,
	isLoading: false,
	error: null,
	modalProduct: null,
};

export const fetchProducts = createAsyncThunk('products/fetch', async (query, thunkAPI) => {
	try {
		const { data } = await axios.get('/admin/products/?' + query);
		return data;
	} catch (error) {
		console.error(error);
		return thunkAPI.rejectWithValue(error.response?.data.message || error.message);
	}
});
export const getProduct = createAsyncThunk('products/getProduct', async (id, thunkAPI) => {
	try {
		const { data } = await axios.get(`/admin/products/${id}`);
		return data;
	} catch (error) {
		console.error(error);
		return thunkAPI.rejectWithValue(error.response?.data.message || error.message);
	}
});
export const addProduct = createAsyncThunk('products/add', async (formData, thunkAPI) => {
	try {
		const { data } = await axios.post('/admin/products', formData);
		return data;
	} catch (error) {
		console.error(error);
		return thunkAPI.rejectWithValue(error.response?.data.message || error.message);
	}
});
export const addProductMulter = createAsyncThunk('products/add', async (formData, thunkAPI) => {
	try {
		const { data } = await axios.post('/admin/products/multer', formData, { headers: { "Content-Type": "multipart/form-data" } });
		return data;
	} catch (error) {
		console.error(error);
		return thunkAPI.rejectWithValue(error.response?.data.message || error.message);
	}
});

export const updateProduct = createAsyncThunk('products/update', async (formData, thunkAPI) => {
	try {
		const { data } = await axios.put(`/admin/products/${formData._id}`, formData);
		return data;
	} catch (error) {
		console.error(error);
		return thunkAPI.rejectWithValue(error.response?.data.message || error.message);
	}
});

export const deleteProduct = createAsyncThunk('products/delete', async (id, thunkAPI) => {
	try {
		const { data } = await axios.delete(`/admin/products/${id}`);
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
				state.totalProds = payload?.success ? payload?.totalProds : state.totalProds;
			})
			.addCase(fetchProducts.rejected, (state, { payload }) => {
				state.error = payload?.message;
				state.isLoading = false;
			})
			.addCase(getProduct.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.modalProduct = payload?.product;
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
export const prodSliceSelector = (state) => state.products;
export const modalProductSelector = (state) => state.products.modalProduct;
export default productSlice.reducer;