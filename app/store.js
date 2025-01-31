import { configureStore } from "@reduxjs/toolkit";
import  userSlice  from "./ecom/userSlice";
import productSlice  from "./ecom/productSlice";

export const store = configureStore({
    reducer:{
        user:userSlice,
        product:productSlice
    }
})