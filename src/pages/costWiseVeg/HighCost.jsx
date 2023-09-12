import React, { useEffect, useState } from 'react'
import ContentWrapper from '../../component/ContentWrapper'
import { useDispatch, useSelector } from 'react-redux'
import Img from '../../component/Img'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'
import axios from 'axios'
import { fetchBuyProduct, saveCartData } from '../../redux/CartSlice'
import { saveUserId } from '../../redux/ProductSlice'
import { Base_url } from '../../utills/ApiRoutes'
import { toast } from 'react-toastify'




const HighCost = () => {
    // const navigate = useNavigate()
    const dispatch=useDispatch()
    const allProduct = useSelector((state) => state.allProduct.data)
const [buyProductID,setBuyProduct]=useState([])

const buyProduct=useSelector((state)=>state.allProduct.userID)


const userID=window.localStorage.getItem("UserID")

    const handleBuyProduct=async(productID)=>{
        if(!userID){
            return toast.error('Please log in First',{theme:'dark'})
        }
        try {
            const res=await axios.put(`${Base_url}/product`,{productID , userID})
    //    console.log(res.data)
       setBuyProduct(res.data.buyProduct)
    
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
        <div className='carouselSection'>
            <ContentWrapper>
                <span className="carouselTitle">
                    Trending
                </span>
                {/* <SwitchTabs data={['Day','Week']} onTabChange={onTabChange}/> */}

            </ContentWrapper>
            <div className="carousel">
                <ContentWrapper>


                    <div className=" highcostItems" >
                        {
                            allProduct && allProduct.map((product) => {
                                return (
                                    <div key={product._id} className="carouselItem" >
                                        <div className="posterBloack">
                                            <Img src={product.imgUrl} />
                                        </div>
                                        <div className="discription">
                                            <h4>{product.title}</h4>
                                            <p>{product.price}Rs./ kg</p>
                                        </div>
                                        <Button variant="contained" disabled={buyProduct?.includes(product._id)} color='success' size="small" sx={{ width: '100%' }} onClick={()=>handleBuyProduct(product._id)}>buy now</Button>

                                    </div>
                                )
                            })
                        }
                    </div>


                </ContentWrapper>
            </div>
        </div>
    )
}

export default HighCost