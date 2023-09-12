import { configureStore } from "@reduxjs/toolkit";
import ProductReducer from "./ProductSlice";
import CartReducer from "./CartSlice";


const store=configureStore({
    reducer:{
        allProduct:ProductReducer,
        cartData:CartReducer
    }
})

export default store