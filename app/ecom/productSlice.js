import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = [];


export const fetchProduct = () => async (dispatch) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_URL}/product`,{withCredentials:true});
        dispatch(setProducts(response.data.data)); 
    } catch (error) {
        console.error("Failed to fetch products:", error);
    }
};

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setProducts: (state, action) => {
            return action.payload; 
        },
    },
});

export const { setProducts } = productSlice.actions;
export default productSlice.reducer;
