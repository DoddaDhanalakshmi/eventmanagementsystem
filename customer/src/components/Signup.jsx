import React, { useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';

const Signup = () => {
  const [signupformdata,setsignupformdata]=useState({
    customer_name:"",
    customer_email:"",
    customer_password:""

  })
  const handlechange=(e)=>{
    setsignupformdata({...signupformdata,[e.target.name]:e.target.value})
  }
  const handlesignup=async()=>{
    try{
      const response=await axios.post("http://127.0.0.1:8000/api/customer/register/",signupformdata)
      toast.success(response.data.msg)
      
    }
    catch(error){
        if(error.response && error.response.status===400){
          toast.error(error.response.data.msg)
        }
    
    }

  }


  return (
    <>
    <input type="text"placeholder='enter the customer name' name="customer_name"onChange={handlechange}/>
    <input type="email" placeholder='enter the customer email' name="customer_email" onChange={handlechange}/>
    <input type="password" placeholder='enter the password' name="customer_password" onChange={handlechange} />
    <button onClick={handlesignup}>signup</button>
    <ToastContainer/>
    </>
  )
}

export default Signup