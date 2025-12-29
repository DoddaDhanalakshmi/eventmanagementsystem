import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Packages() {
  const { eventtype } = useParams();
  const [selectpackageform, setselectpackageform] = useState(null)
  const [selectedpackage, setselectedpackage] = useState("")
  const navigate = useNavigate();
  useEffect(() => {
    if (eventtype) {
      localStorage.setItem("selected_event", eventtype);
    }
  }, [eventtype]);
  const handlepackageclick = async (packagetype) => {
    setselectedpackage(packagetype)
    localStorage.setItem("selected_package", packagetype);
    const ownerid = localStorage.getItem("owner_id")
    if (!ownerid) {
      alert("owner not loged in")
      return;
    }
    const eventype = localStorage.getItem("selected_event")
    const data = {
      owner_id: ownerid,
      event_type: eventype,
      event_package: packagetype
    }
    console.log(data)
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/packages/register/",
        data
      )
      toast.success("package registred sucessfully")
    }
    catch (error) {
    if (!(error.response && error.response.status === 409)) {
      toast.error("Package registration failed");
      return;
    }
  }
    try{
      const servicecheck = await axios.post(
        "http://127.0.0.1:8000/api/check_service/", {
        owner_id:Number(ownerid),
        package_type:packagetype
      }
      
      )
      
      
      console.log(servicecheck.data)
      if (servicecheck.data.exists) {
        localStorage.setItem("service_data",JSON.stringify(servicecheck.data.data));
        toast.info("Services already exist");
        navigate("/servicecard");
      } 
      else {
        navigate("/packageform");
      }
    }
  

    catch(error) {
      console.error(error)
      toast.error("Something went wrong");
    }
  }
  
  //     if(response.status === 201) {
  //     toast.success("Package stored successfully");
  //     }
  //     navigate("/packageform")

  // }
  // catch(error){
  //   if(error.response && error.response.status === 409) {
  //     toast.info("Package already selected");
  //     navigate("/packageform")
  //   }
  //   else{
  //   toast.error("package add is failed")
  //   console.log(error)
  //   }
  // }



return (
  <div style={{ padding: "20px" }}>
    <h1>Packages Page</h1>
    <h2>Event Type: {eventtype}</h2>
    <button onClick={() => handlepackageclick("lowest")}>Lowest Package</button><br /><br />
    <button onClick={() => handlepackageclick("medium")}>Medium Package</button><br /><br />
    <button onClick={() => handlepackageclick("premium")}>Premium Package</button><br /><br />
    <button onClick={() => navigate("/events")}>Back</button>
    {/* {selectpackageform && (<div>
                                      <form action="">
                                        <input type="text"  />
                                        <input type="text" />
                                        <input type="text" />
                                        </form>
                              </div>)} */}
  </div>

);
}

export default Packages;
