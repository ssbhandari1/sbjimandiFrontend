
import React, { useEffect, useState } from 'react'
import { Box, Button, Paper, Stack, TextField, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Base_url } from '../utills/ApiRoutes'


const Register = () => {
  const navigate=useNavigate()

  const[user,setUser]=useState({
    username:'',
    email:'',
    password:''
  })
 
  


const handleChange=(e)=>{
  setUser({...user,[e.target.name]:e.target.value})

}


  const handleRegister=async()=>{
  try {
    const res=await axios.post(`${Base_url}/register`,user)
    console.log(res.data)
    if(res.data.msg==='email already exists'){
      return toast.error('Email Already Exists')
    }else{
      toast.success('Register Successfully')
      navigate('/login')
    }
    
  } catch (error) {
    console.log(error)
    toast.error(error)
  }
    
  }

  
  return (
    <Box sx={{width:'100%',height:'100vh',background:'rgba(0,0,0,0.05)',display:'flex',alignItems:'center',justifyContent:'center',color:'white'}}>
<Paper elevation={20}>
    <Box sx={{width:300,height:400,background:'white',color:"black"}}>
    <Stack direction='column' justifyContent='space-around' alignItems='center' sx={{width:'100%',height:'100%'}}>
      <Typography variant='h6' sx={{fontWeight:'600',color:'red'}}>Register</Typography>
    
    <TextField
          label="Email"
          id="outlined-size-small"
          name='email'
          value={user.email}
          onChange={handleChange}
          size="small"
        />
          <TextField
          label="Name"
          id="outlined-size-small"
          name='username'
          value={user.username}
          onChange={handleChange}
          size="small"
        />
         <TextField
          label="Password"
          id="outlined-size-small"
          name='password'
       value={user.password}
       onChange={handleChange}
       size="small"
        />
        <Stack direction='column' sx={{width:'80%'}}>
      <Button size='small' variant='contained' onClick={handleRegister} > Create</Button>

<Button color='secondary' size='small'  sx={{marginTop:'1rem'}}  onClick={()=>navigate('/login')}>Already have an account </Button>

</Stack>
    </Stack>
    </Box>
    </Paper>
  </Box>
  )
}

export default Register