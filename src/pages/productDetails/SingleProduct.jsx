import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BackspaceIcon from '@mui/icons-material/Backspace';
import './style.scss'
import Img from '../../component/Img'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Box, Button, IconButton, Paper, Typography } from '@mui/material';
import axios from 'axios';
import { Base_url } from '../../utills/ApiRoutes';
import { toast } from 'react-toastify';
import { fetchBuyProduct, removeCartData, saveCartData } from '../../redux/CartSlice';
import { useNavigate } from 'react-router-dom';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import { fetchChangeQuantity } from '../../redux/ProductSlice';




const SingleProduct = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const cartData = useSelector((state) => state.cartData.data)

const totalPrice=cartData?.map((item)=>item.price * item.quantity).reduce((accum,val)=>accum += val,0)
console.log(totalPrice)
  const userID = window.localStorage.getItem("UserID")
const[ChangeQuantity,setChangeQuantity]=useState(0)
  const handleDeleteProduct = async (productID) => {
  
    try {
      const res = await axios.delete(`${Base_url}/product/buyProduct/ids/${userID}/${productID}`)
      console.log(res.data)
      if (res.data.msg === 'Item Removed Successfully') {
        toast.success(res.data.msg)
        dispatch(removeCartData(productID))
       
      }
    } catch (error) {
      console.log(error)
    }
  }


  const handleQuantity = async (type, productID,quantity) => {

    try {
      dispatch(fetchChangeQuantity({ type, productID }))
    
      setChangeQuantity(quantity)
     
    } catch (error) {
      console.log(error)
    }


  }

  useEffect(()=>{
    dispatch(fetchBuyProduct())
  },[ChangeQuantity])




  return (
    <div className="singleContainer">
      {
        cartData?.length ?
          (
            <div className="singleProducts">
              <div className="productDetails">
<h4>Price Details</h4>
<div className="Item"><p> Price ({cartData && cartData.length} item) :</p>  <p>₹{totalPrice}</p></div>
<div className="Item"><p>Discount Price  :</p>  <p>₹15</p></div>
<div className="Item"><p>Delivery Charges  :</p>  <p>₹15</p></div>
<div className="Item"><p>Delivery Charges  :</p>  <p>₹5</p></div>
<div className="totalItem"><p>Total Price   :</p>  <p>₹{`${totalPrice + 15 + 15 +5}`}</p></div>
<Button size='sm' sx={{background:'yellow',color:'black',fontWeight:'bold'}}>Proceed To pay</Button>
              </div>
              {
                cartData?.map((product, index) => {
                  return (
                    <div key={{ index }} className="singleProduct">
                      <div className="posterBloack">
                        <Img src={product.imgUrl} />
                      </div>
                      <div className="info">
                        <h3>{product.title}</h3>
                        <p>Price : {product.price}Rs.</p>
                        <p>Type : {product.productType}</p>
                        <p>Instock : {product.totalQuantity}kg</p>
                        <div className="quantity">

                          {product.quantity > 1 ?
                            <RemoveCircleIcon sx={{ cursor: 'pointer' }} onClick={() => handleQuantity(-1, product._id,product.quantity)} />
                            :
                            <RemoveCircleIcon sx={{ cursor: 'pointer', color: 'gray' }} />

                          }
                          <div className="quantityValue">{product.quantity}</div>
                          <AddCircleIcon sx={{ cursor: 'pointer' }} onClick={() => handleQuantity(1, product._id,product.quantity)} />
                        </div>

                      </div>
                      <IconButton className='BackspaceIcon' onClick={() => handleDeleteProduct(product._id)}>
                        <BackspaceIcon />
                      </IconButton>
                    </div>
                  )
                })
              }


            </div>
          ) :
          (
            <div className="singleProducts">
              <Box sx={{ width: '100%', height: '100%', background: 'rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
                <Paper elevation={20}>
                  <Box className='Empty' >
                    <RemoveShoppingCartIcon sx={{ fontSize: "5rem", color: 'red' }} />
                    <Typography sx={{ fontSize: "1rem", fontWeight: '600', color: 'red' }}>Your cart is Empty !</Typography>
                  </Box>
                </Paper>
              </Box>
            </div>
          )
      }

    </div>
  )
}

export default SingleProduct