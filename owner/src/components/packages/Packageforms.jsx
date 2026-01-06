import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import "./packageforms.css"

const Packageforms = () => {
  const Navigate=useNavigate()
  const owner_id = localStorage.getItem("owner_id")
  const event_name = localStorage.getItem("selected_event")
  const package_type = localStorage.getItem("selected_package")
  console.log(event_name)
  console.log(package_type)
  const [seating_capacity, setseating_capacity] = useState("")
  const [selected, setselected] = useState({})
  const [price, setprice] = useState({ hall: { ac: "", non_ac: "" } })
  const location=useLocation()
  const editingdata=location.state
  console.log(editingdata)
  useEffect(()=>{
    if(!editingdata) return
    const selectedData = {}
    const priceData = { hall: { ac: "", non_ac: "" } }
    servicesList.forEach(service=>{
      if(service==="halll") return
      if(editingdata[service]==="yes"){
        selectedData[service]=true
        priceData[service]=editingdata[`${service}_price`]

      }
      else{
        selected[service]=false
      }
    })
      if(Number(editingdata.hall_ac_price)>0||Number(editingdata.hall_non_ac_price)>0){
        selectedData.hall=true
        priceData.hall={
          ac:editingdata.hall_ac_price,
          non_ac:editingdata.hall_non_ac_price
        }
      }
      else{
        selectedData.hall=false
      }
      setselected(selectedData)
      setprice(priceData)
      setseating_capacity(editingdata.seating_capacity)
    

  },[editingdata])

  const handlecheckbox = (eachservice, checked) => {

    if(checked){
      for (let services in selected) {
      if (selected[services]) {
        if (services === "hall") {
          if (!price.hall.ac || !price.hall.non_ac) {
            alert("please enter price for present checkbox an then go to another")
            return
          }
        } else {
          if (!price[services]) {
            alert("please enter price for present checkbox an then go to another")
            return
          }
        }
      }
    }
    }

    setselected((prev) => ({ ...prev, [eachservice]: checked }))

    if (!checked) {
      if (eachservice === "hall") {
        setprice((prev) => ({ ...prev, hall: { ac: "", non_ac: "" } }))
      } else {
        setprice(prev => {
          const updated = { ...prev }
          delete updated[eachservice]
          return updated
        })
      }
    }
  }

  const totalprice = () => {
    let total = 0
    for (let services in selected) {
      if (selected[services]) {
        if (services === "hall") {
          total += Number(price.hall.ac || 0)
          total += Number(price.hall.non_ac || 0)
        } else {
          total += Number(price[services] || 0)
        }
      }
    }
    return total
  }

  const handlesubmit = async (e) => {
    console.log("handlesubmit is called")
    e.preventDefault()

    const data = {
      owner:owner_id,
      event_name,
      package_type,
      seating_capacity,
      total_price: totalprice()
    }
    servicesList.forEach(service=>{
      if(service==="hall"){
        if(selected.hall){
          data.hall_ac_price=price.hall.ac||0
          data.hall_non_ac_price=price.hall.non_ac||0
        }
        else{
          data.hall_ac_price=0
          data.hall_non_ac_price=0
        }
        return 
      }
      if(selected[service]){
        data[service]="yes"
        data[`${service}_price`]=price[service]||0

      }
      else{
        data[service]="no"
        data[`${service}_price`]=0
      }
    })
    try {
      if(editingdata&&editingdata.id){
        await axios.put(`http://127.0.0.1:8000/${event_name}/${package_type}/${editingdata.id}/update/`,data)
        toast.success("service are updated sucessfully")
        Navigate("/servicecard")

      }
      else{
    

      await axios.post(`http://127.0.0.1:8000/api/${event_name}/${package_type}/`, data)
      toast.success("services added sucessfully")
      }
    }
    catch (error) {
      console.log()
      console.log(error)
    }
  }

  const servicesList = [
    "decoration",
    "dj",
    "vip_service",
    "catering",
    "photography",
    "videography",
    "games",
    "gifts",
    "backup_generator",
    "security",
    "hall"
  ]

  return (
    <>
      <form onSubmit={handlesubmit}>
        {servicesList.map(each => (
          <div key={each} style={{ marginBottom: "10px" }}>
            <input
              type="checkbox"
              checked={selected[each] || false}
              onChange={(e) => handlecheckbox(each, e.target.checked)}
            />
            {each}

            {selected[each] && each !== "hall" && (
              <input
                type="number"
                placeholder={`Enter ${each} price`}
                value={price[each] || ""}
                onChange={(e) =>
                  setprice((prev) => ({ ...prev, [each]: Number(e.target.value) }))
                }
                style={{ marginLeft: "10px" }}
                
              />
            )}

            {selected[each] && each === "hall" && (
              <div>
                <input
                  type="number"
                  placeholder="enter price for ac"
                  value={price.hall.ac}
                  onChange={(e) =>
                    setprice((prev) => ({
                      ...prev,
                      hall: { ...prev.hall, ac: Number(e.target.value) }
                    }))
                  }
                  
                />
                <input
                  type="number"
                  placeholder="enter the price for non ac"
                  value={price.hall.non_ac}
                  onChange={(e) =>
                    setprice((prev) => ({
                      ...prev,
                      hall: { ...prev.hall, non_ac: Number(e.target.value) }
                    }))
                  }
                  style={{ marginLeft: "20px" }}
                  
                />
              </div>
            )}
          </div>
        ))}

        <label>seating_capacity</label>
        <input
          type="number"
          value={seating_capacity}
          onChange={(e) => setseating_capacity(Number(e.target.value))}
        />

        <h1>price: {totalprice()}</h1>

        <button type="submit">Add Service</button>
      </form>
    </>
  )
}

export default Packageforms
