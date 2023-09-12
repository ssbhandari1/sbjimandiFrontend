import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Base_url } from '../utills/ApiRoutes';
import { toast } from 'react-toastify';



const userID=window.localStorage.getItem("UserID")




export const fetchAllProductData=createAsyncThunk('product/fetchAllProductData',async()=>{
    try {
        const res=await axios.get(`${Base_url}/product`)
        return res.data
    } catch (error) {
        throw error;
    }
})



export const fetchChangeQuantity=createAsyncThunk('product/fetchChangeQuantity',async({type,productID})=>{
    try {
      const res=await axios.put(`${Base_url}/product/buyProduct/${userID}`,{type,productID})
  
      return res.data
    } catch (error) {
        throw error;
    }
})



const productSlice=createSlice({
    name:'product',
    initialState:{
        data: [],
        userID:[],
        loading: false,
        error: null,
    },
reducers:{
    saveUserId:(state,action)=>{
state.userID=action.payload
    }
},

    extraReducers:(builder)=>{
        builder
        .addCase(fetchAllProductData.pending,(state)=>{
            state.loading=true,
            state.error=null
        })
        .addCase(fetchAllProductData.fulfilled,(state,action)=>{
            state.loading=false,
          state.data=action.payload
        })
        .addCase(fetchAllProductData.rejected,(state,action)=>{
           
            state.error = action.error.message;
        })


    }
})
export const {saveUserId} =productSlice.actions
export default productSlice.reducer