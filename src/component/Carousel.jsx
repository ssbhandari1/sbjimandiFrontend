import React, { useEffect, useRef, useState } from "react";

import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs";

import "./style.scss";
import ContentWrapper from "./ContentWrapper";
import { useDispatch, useSelector } from "react-redux";
import Img from "./Img";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { fetchBuyProduct, saveCartData } from "../redux/CartSlice";
import axios from "axios";
import { saveUserId } from "../redux/ProductSlice";
import { Base_url } from "../utills/ApiRoutes";
import { toast } from "react-toastify";


const Carousel = () => {
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const [buyProductID,setBuyProductID]=useState([])
    const userID=window.localStorage.getItem("UserID")

    const allProduct=useSelector((state)=>state.allProduct.data)
    const isloading=useSelector((state)=>state.allProduct.loading)


    const buyProduct=useSelector((state)=>state.allProduct.userID)

const carouselContainer = useRef()

const navigation=(dir)=>{
    const container = carouselContainer.current

    const scrollAmount = dir === 'left' ? container.scrollLeft - (container.offsetWidth )
        :
        container.scrollLeft + (container.offsetWidth )

        container.scrollTo({
            left:scrollAmount,
            behavior:'smooth',
        })
}
 
const handleBuyProduct=async(productID)=>{
    if(!userID){
        return toast.error('Please log in First',{theme:'dark'})
    }
    try {
        const res=await axios.put(`${Base_url}/product`,{productID , userID})
//    console.log(res.data)
   setBuyProductID(res.data.buyProduct)
 
    } catch (error) {
        console.log(error)
    }
  
    
}

useEffect(()=>{
    dispatch(fetchBuyProduct())
   },[dispatch,buyProductID])

  useEffect(()=>{
    const fetchUserID=async()=>{
    try {
      const res=await axios.get(`${Base_url}/product/buyProduct/ids/${userID}`)
      // console.log(res.data.buyProduct)
      dispatch(saveUserId(res.data.buyProduct))
    } catch (error) {
      console.log(error)
    }
    }
    fetchUserID()
    },[dispatch,buyProductID])

    return (
        <div className="carousel">
            <ContentWrapper>
            <BsFillArrowLeftCircleFill
                    className="carouselLeftNav arrow"
                    onClick={() => navigation("left")}
                />
                <BsFillArrowRightCircleFill
                    className="carouselRighttNav arrow"
                    onClick={() => navigation("right")}
                />



   <div className="carouselItems" ref={carouselContainer}>
{
    allProduct && allProduct.map((product)=>{
        return(
            <div  key={product._id} className="carouselItem">
                <div className="posterBloack">
                <Img src={product.imgUrl}/>
                </div>
                <div className="discription">
                    <h4>{product.title}</h4>
                    <p>{product.price} / kg</p>
                </div>
                <Button variant="contained" disabled={buyProduct?.includes(product._id)} color='success' size="small" sx={{ width: '100%' }} onClick={()=>handleBuyProduct(product._id)}>buy now</Button>

            </div>
        )
    })
}
   </div>

            
            </ContentWrapper>
        </div>
    )
}

export default Carousel