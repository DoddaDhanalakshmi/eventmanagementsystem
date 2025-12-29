import axios from 'axios'
import React from 'react'
import { useState,useEffect } from 'react'
const Servicecard = () => {
    const [services,setservices]=useState([])
    const owner_id=localStorage.getItem("owner_id")
    const package_type=localStorage.getItem("package_type")
    useEffect(()=>{
        async function displaypackageservices(){
            try{
                const response=await axios.get(`http://127.0.0.1:8000/api/services/?owner_id=${owner_id} & package_type=${package_type}`)
                setservices(response.data)
            }
            catch(error){
                console.log("hi")
            }
        }
            
        displaypackageservices()

    },[owner_id,package_type])
  return (
    <>
    <div>
        {services.map((each)=>{
            <div>
                <h3>{services.price}</h3>
            </div>
        })}
    </div>
    </>
  )
}

export default Servicecard