import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";


const initialState = {
    loggedIn: false,
    role: "guest",
    cart: [],
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logged: (state, action) => {
            state.loggedIn = action.payload;
        },
        setRole: (state, action) => {
            state.role = action.payload;
        },
        setCart: (state, action) => {
            state.cart = action.payload;
        },
    },
});

export const fetchCart = () => async (dispatch) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_URL}/cart`, {
            withCredentials: true,
        });
        dispatch(setCart(response.data.data)); 
    } catch (error) {
        console.error("Failed to fetch cart:", error);
    }
};
// export const AddToCart = (id) => async (dispatch) => {
//     try {
//         console.log("Making POST request to add item to cart with ID:", id);
//         const response = await axios.post(${import.meta.env.VITE_URL}/cart/${id}, { withCredentials: true });
//         console.log("Add to Cart response:", response);
//         dispatch(setCart(response.data.data)); 
//     } catch (error) {
//         console.error("Failed to Add to cart:", error);
//     }
// };

export const AddToCart = (id) => async (dispatch) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_URL}/cart/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include', // Ensures cookies are sent along with the request (like withCredentials in axios)
        });

        if (!response.ok) {
            throw new Error(`Failed to add item, status: ${response.status}`);
        }

        const data = await response.json();
        toast.success("Product added to cart");
        dispatch(setCart(data.data))
    } catch (error) {
        console.error("Failed to add item to cart:", error);
    }
};


export const RemoveFromCart = (id) => async (dispatch) => {
    try {
        const response = await axios.delete(`${import.meta.env.VITE_URL}/cart/${id}`, {
            withCredentials: true,
        });
        toast.success("Product Removed from Cart");
        dispatch(setCart(response.data.data)); 
    } catch (error) {
        console.error("Failed to Add to cart:", error);
    }
};

export const { logged, setRole, setCart } = userSlice.actions;
export default userSlice.reducer;