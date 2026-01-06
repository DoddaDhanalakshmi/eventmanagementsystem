import axios from 'axios'
import React from 'react'
import { toast } from 'react-toastify'
import {  useNavigate } from 'react-router-dom'
import { useState,useEffect } from 'react'
import "./servicecard.css"
const Servicecard = () => {
    const [services,setservices]=useState([])
    const owner_id=localStorage.getItem("owner_id")
    const package_type=localStorage.getItem("selected_package")
    const event_type=localStorage.getItem("selected_event")
    const navigate=useNavigate()
    useEffect(()=>{
        async function displaypackageservices(){
            try{
                const response=await axios.get(`http://127.0.0.1:8000/api/services/?owner_id=${owner_id}&package_type=${package_type}`)
                setservices(response.data.services)
               
            }
            catch(error){
                console.log(error.response)
                toast.error("package deletion will failed ")
            }
        }
            
        displaypackageservices()

    },[owner_id,package_type])
    const handledelete=async()=>{
        try{
            const response=await axios.delete(`http://127.0.0.1:8000/api/packages/${owner_id}/${package_type}/${event_type}/delete`)
            setservices([])
            console.log("package is deleted successfully...")
            
        }
        
        catch(error){
            console.log(error)
        }

    }
  return (
    <>
    <div>
        {services.map((each)=>{
            return(
            <div key={each.id}>
                    <h1>totalprice of a package:{each.total_price}</h1>
                <button  type="button"onClick={handledelete}>delete</button>
                <button type="button" onClick={() => navigate("/packageforms", { state: each })}>update</button>
            </div>
            )
        })}
    </div>
    </>
  )
}

export default Servicecard