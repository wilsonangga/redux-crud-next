import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit"
import axios from "axios"

export const getProduct = createAsyncThunk("product/getProduct", async () => {
    const response = await axios.get('http://localhost:5000/product')
    return response.data
})

export const saveProduct = createAsyncThunk("product/saveProduct", async ({ title, price }) => {
    const response = await axios.post('http://localhost:5000/product', {
        title,
        price
    })
    return response.data
})

export const updateProduct = createAsyncThunk("product/updateProduct", async ({ slug, title, price }) => {
    const response = await axios.patch(`http://localhost:5000/product/${slug}`, {
        title,
        price
    })
    return response.data
})

export const deleteProduct = createAsyncThunk("product/deleteProduct", async (id) => {
    await axios.delete(`http://localhost:5000/product/${id}`)
    return id
})

const productEntity = createEntityAdapter({
    selectId: (product) => product.id
})

const productSlice = createSlice({
    name: "product",
    initialState: productEntity.getInitialState,
    extraReducers: {
        [getProduct.fulfilled]: (state, action) => {
            productEntity.setAll(state, action.payload)
        },
        [saveProduct.fulfilled]: (state, action) => {
            productEntity.addOne(state, action.payload)
        },
        [updateProduct.fulfilled]: (state, action) => {
            productEntity.updateOne(state, { id: action.payload.id, updates: action.payload })
        },
        [deleteProduct.fulfilled]: (state, action) => {
            productEntity.removeOne(state, action.payload)
        },
    }
})

export const productSelector = productEntity.getSelectors(state => state.product)
export default productSlice.reducer