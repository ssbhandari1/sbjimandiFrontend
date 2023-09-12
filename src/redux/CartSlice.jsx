import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Base_url } from '../utills/ApiRoutes';
import axios from 'axios';
const userID=window.localStorage.getItem("UserID")




export const fetchBuyProduct=createAsyncThunk('cartData/fetchBuyProduct',async()=>{
    try {
      const res=await axios.get(`${Base_url}/product/buyProduct/${userID}`)
   console.log(res.data.buyProduct)
     return res.data.buyProduct
    } catch (error) {
        throw error;
    }
})





const cartSlice = createSlice({
    name: 'cartData',
    initialState: {
        data: [],

    },
    reducers: {
        saveCartData: (state, action) => {

            state.data=action.payload
        },
        removeCartData: (state, action) => {

            state.data=state.data.filter((item)=>item._id!==action.payload)
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchBuyProduct.pending,(state)=>{
            state.loading=true,
            state.error=null
        })
        .addCase(fetchBuyProduct.fulfilled,(state,action)=>{
            state.loading=false,
          state.data=action.payload
        })
        .addCase(fetchBuyProduct.rejected,(state,action)=>{
           
            state.error = action.error.message;
        })


    }


})
export const { saveCartData ,removeCartData} = cartSlice.actions

export default cartSlice.reducer