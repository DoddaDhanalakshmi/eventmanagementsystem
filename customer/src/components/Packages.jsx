import axios from 'axios'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

const Packages = () => {
    const { eventype } = useParams()
    const [services, setservices] = useState([])
    const [showpackages, setshowpackages] = useState(true)
    const [showserviestocustomer, setshowservicestocustomer] = useState(false)
    const [customerselectionservices, setcustomerselectionservices] = useState([])
    const [showcustomerselectionservices, setshowcustomerselectionservices] = useState(false)
    const [price, setprice] = useState(0)
    const handlecheck = (price, checked) => {
        if (checked) {
            setprice(prev => prev + price)
            console.log(price)
        }
        else {
            setprice(prev => prev - price)
            console.log(price)
        }

    }

    const handleback = () => {
        setshowpackages(true)
        setshowservicestocustomer(false)
        setshowcustomerselectionservices(false)
    }
    const handleservice = (services) => {
        setcustomerselectionservices(services)
        setshowcustomerselectionservices(true)
        setshowservicestocustomer(false)


    }
    const handleclick = async (package_type) => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/packages/${eventype}/${package_type}/`)
            // console.log(response.data)
            setservices(response.data)
            setshowpackages(false)
            setshowservicestocustomer(true)

        }
        catch (error) {
            console.log(error)
        }

    }

    return (
        <>
            {showpackages && (

                <div>
                    <h2>event type :{eventype}</h2>
                    <button onClick={() => handleclick("lowest")} >Lowest</button>
                    <button onClick={() => handleclick("medium")}>medium</button>
                    <button onClick={() => handleclick("premium")}>premium</button>
                    
                </div>
            )}
            {showserviestocustomer && (
                <div>
                    {services.map((each) => {
                        return (
                            <div style={{ border: "2px solid black", marginBottom: "20px" }}>
                                <h6>owner_name:{each.owner}</h6>
                                <h2>total_price:{each.total}</h2>
                                <ul>services they provide:
                                    {each.service.map((item) => (
                                        <li>
                                            {item.name}
                                            {item.price}
                                        </li>

                                    ))}
                                </ul>
                                <button onClick={() => handleservice(each.service)}>select services what you want from tehir providence</button>
                                <button onClick={() => handleback()}>Back</button>


                            </div>

                        )
                    })}
                </div>
            )}

           <div>
             {showcustomerselectionservices && (
                customerselectionservices.length > 0 &&
                customerselectionservices.map((each) => (


                    <div>
                        <input type="checkbox" onChange={(e) => handlecheck(each.price, e.target.checked)} />{each.name}



                    </div>








                ))

            )}
            {showcustomerselectionservices && <p>total_price:{price}</p>}
           </div>

          
        </>
    )
}
export default Packages