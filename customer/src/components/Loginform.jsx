import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'

const Loginform = () => {
    const navigate=useNavigate()
    const [loginform,setloginform]=useState({
        customer_mail:"",
        customer_password:""
    })
    
    const handleChange=(e)=>{
        setloginform({...loginform,[e.target.name]:e.target.value})
    }
    const handleLogin=async()=>{
        try{
            const response=await axios.post("http://127.0.0.1:8000/api/customer/login/",loginform)
            toast.success("logined sucessfully")
            navigate("/events")

        }
        catch(error){
            console.log(error)
            toast.error("incorrect mail or password")
            
        }
       
    }
  return (
   <>
    <input type="email" placeholder=' enter email 'name="customer_mail" onChange={handleChange}/>
    <input type="password" placeholder='enter password here' name="customer_password" onChange={handleChange}  />
    <button onClick={handleLogin}>Login</button>
    <ToastContainer/>
   </>
  )
}

export default Loginform