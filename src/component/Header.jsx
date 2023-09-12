import React, { useState } from 'react'
import './style.scss'
import { Avatar, Badge, Button, Divider, IconButton, ListItemIcon, Menu, MenuItem } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { Logout, Settings } from '@mui/icons-material'
import { toast } from 'react-toastify'
import { BsBasketFill } from "react-icons/bs";
import { useSelector } from 'react-redux'



const Header = () => {
  const cartData = useSelector((state) => state.cartData.data)
  console.log(cartData)

  const UserID=window.localStorage.getItem("UserID")

  const navigate=useNavigate()

  const[userMenu,setUserMenu]=useState(false)

const handleLogout=()=>{
  window.localStorage.removeItem('UserID')
  navigate('/login')
  toast.success('Log Out Successful')
  setUserMenu(false)  
}


const handleOpenUsermenu=()=>{
  setUserMenu(true)
}

const handleClose = () => {
  setUserMenu(false)     
};

const handleNavigate=()=>{
  if(!cartData?.length){
return toast.error('Basket is Empty ! ',{
  theme:'dark'
})
  }
  navigate('/singleProduct')
}
  return (
<header className={`header`}>
<h1>Mandi</h1>
<IconButton  className='BsBasketFill' onClick={handleNavigate} >
<Badge color="error" badgeContent={cartData?.length} 
 className='Badge' ></Badge>
<BsBasketFill/>


 </IconButton>

{UserID
 ? 
 ( 
 <IconButton onClick={handleOpenUsermenu} sx={{ p: 0 }}>
   <Avatar />
 </IconButton>
)
//  <Button variant='contained' color='error' onClick={handleLogout}>logout</Button>
:
<Button variant='contained' onClick={()=>navigate('/login')}>login</Button>

 }
       <Menu
        // anchorEl={anchorEl}
        id="account-menu"
        open={userMenu}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 10,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 3,
          
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
         
          },
        }}
        transformOrigin={{ horizontal: 'center', vertical: 'center' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      >
        <MenuItem onClick={handleClose}>
          <Avatar  /> Profile
        </MenuItem>
    

  {/* <MenuItem  onClick={handleNavigatet}>
  <ListItemIcon>
  <CreateNewFolderIcon fontSize="small" />
   </ListItemIcon>
Saved 
</MenuItem>  */}


       

      
        <Divider />
      
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon >
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>

</header>
  )
}

export default Header