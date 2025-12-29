
import axios from "axios";
import React from "react";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Packageform = () => {
    const navigate=useNavigate()
    const owner_id=localStorage.getItem("owner_id")
    const event_name=localStorage.getItem("selected_event")
    const package_type=localStorage.getItem("selected_package")
    const [formdata,setformdata]=useState({
        decoration:false,
        stage_setup:false,
        lighting:false,
        sound_system:false,
        dj:false,
        catering:false,
        photography:false,
        videography:false,
        games:false,
        gifts:false,
        backup_generator:false,
        security:false,
        vip_service:false,
        seating_capacity:"",
        food_type:"",
        staff_count:"",
        price:""

    })
    const handleChange=(e)=>{
        const {name,value,type,checked}=e.target
        setformdata({...formdata,[name]:type==="checkbox"?checked:value})

    }
    const handlesubmit=async (e)=>{
        e.preventDefault()
        const data={
            owner:parseInt(owner_id),
            event_name,
            decoration:formdata.decoration?"YES":"NO",
            lighting:formdata.lighting?"YES":"NO",
            stage_setup:formdata.stage_setup?"YES":"NO",
            sound_system:formdata.sound_system?"YES":"NO",
            dj:formdata.dj?"YES":"NO",
            catering:formdata.catering?"YES":"NO",
            photography:formdata.photography?"YES":"NO",
            videography:formdata.videography?"YES":"NO",
            games:formdata.games?"YES":"NO",
            gifts:formdata.gifts?"YES":"NO",
            backup_generator:formdata.backup_generator?"YES":"NO",
            security:formdata.security?"YES":"NO",
            vip_service:formdata.vip_service?"YES":"NO",
            seating_capacity:formdata.seating_capacity?parseInt(formdata.seating_capacity):0,
            staff_count:formdata.staff_count?parseInt(formdata.staff_count):0,
            food_type:formdata.food_type,
            price:formdata.price?parseFloat(formdata.price):0.0


        }
        try{
            const url=`http://127.0.0.1:8000/${event_name}/${package_type}/`
            
            const response=await axios.post(url,data)
            toast.success("services added sucessfully")
            if(response.status===201){
                console.log("ok")
                toast.success("service added sucessfully")
                navigate("/events")
            }
           
        }
        catch(error){
            console.log(error)
        }

    }
  return (
    <div>
        <h2>{event_name}-{package_type} package</h2>
        <form onSubmit={handlesubmit}>
            <label><input type="checkbox" name="decoration" onChange={handleChange}/>decoration</label><br />
            <label><input type="checkbox" name="stage_setup" onChange={handleChange}/>stage_setup</label><br />
            <label><input type="checkbox" name="sound_system"onChange={handleChange}/>sound_system</label><br />
            <label><input type="checkbox" name="dj" onChange={handleChange}/>dj</label><br />
            <label><input type="checkbox" name="catering" onChange={handleChange}/>catering</label><br />
            <label><input type="checkbox" name="photography" onChange={handleChange}/>photography</label><br />
            <label><input type="checkbox" name="videography" onChange={handleChange}/>Videography</label><br />
            <label><input type="checkbox" name="games" onChange={handleChange}/>games</label><br />
            <label><input type="checkbox" name="gifts"onChange={handleChange}/>gifts</label><br />
            <label><input type="checkbox" name="backup_generator"onChange={handleChange}/>backup_generator</label><br />
            <label><input type="checkbox" name="security" onChange={handleChange}/>security</label><br />
            <label><input type="checkbox" name="vip_service" onChange={handleChange}/>vip_service</label><br />
            <label><input type="checkbox" name="lighting" onChange={handleChange} />lighting</label>
            seating_capacity<input type="number" name="seating_capacity"onChange={handleChange} value={formdata.seating_capacity}/><br />
            staff_count<input type="number" name="staff_count" onChange={handleChange} value={formdata.staff_count}/><br />
            food_type<select name="food_type" onChange={handleChange} value={formdata.food_type}>
           <option value="">Select</option>
          <option value="Veg">Veg</option>
          <option value="Non-Veg">Non-Veg</option>
           <option value="Both">Both</option>        
           </select><br /><br />
           price<input type="number" placeholder="enter the price"name="price" onChange={handleChange} value={formdata.price}/><br /><br />
           <button type="submit">Add services</button>

            
        </form>
           
    </div>
  )
}

export default Packageform