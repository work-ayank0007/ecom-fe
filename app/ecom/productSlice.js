import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = [];

// Thunk to fetch products asynchronously
export const fetchProduct = () => async (dispatch) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_URL}/product`,{withCredentials:true});
        console.log(response.data.data);
        
        dispatch(setProducts(response.data.data)); // Dispatch the action with the fetched products
    } catch (error) {
        console.error("Failed to fetch products:", error);
    }
};

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setProducts: (state, action) => {
            return action.payload; // Set the products into the state
        },
    },
});

export const { setProducts } = productSlice.actions;
export default productSlice.reducer;
