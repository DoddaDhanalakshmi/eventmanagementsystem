import React from 'react'
import { useNavigate } from 'react-router-dom'

const Events = () => {
    const navigate=useNavigate()
  return (
    <>
    <button onClick={()=>navigate("/packages/wedding")}>wedding</button>
    <button onClick={()=>navigate("/packages/reception")}>reception</button>
    <button onClick={()=>navigate("/packages/birthday")}>birthday</button>
    </>
  )
}

export default Events