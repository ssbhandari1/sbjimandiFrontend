import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Header from './component/Header'
import Footer from './component/Footer'
import Login from './auth/Login'
import Register from './auth/Register'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from 'react-redux'
import { fetchAllProductData } from './redux/ProductSlice'
import SingleProduct from './pages/productDetails/SingleProduct'
import axios from 'axios'
import { fetchBuyProduct, saveCartData } from './redux/CartSlice'
import { Base_url } from './utills/ApiRoutes'



const App = () => {
  const dispatch=useDispatch()

  const userID=window.localStorage.getItem("UserID")
  useEffect(()=>{
    dispatch(fetchAllProductData())
  },[dispatch])

  useEffect(()=>{
   dispatch(fetchBuyProduct())
  },[])



  return (
 
    <BrowserRouter>
    <ToastContainer/>
<Header/>
    <Routes>
<Route path='/' element={<Home/>}/>
<Route path='/login' element={<Login/>}/>
<Route path='/register' element={<Register/>}/>
<Route path='/singleProduct' element={<SingleProduct/>}/>

    </Routes>
    {/* <Footer/> */}
    </BrowserRouter>
  )
}

export default App