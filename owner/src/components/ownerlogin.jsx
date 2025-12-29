import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";


function LoginForm() {
  
  const navigate = useNavigate(); 
  const [loginform, setloginForm] = useState({
    owneremail: "",
    ownerpassword: "",
  });
  const handleChange = (e) => {
    setloginForm({ ...loginform, [e.target.name]: e.target.value });
  };

  const handlelogin = async () => {
    
    try {
      const response=await axios.post("http://127.0.0.1:8000/api/owner/login/", loginform);
      toast.success("Owner login successfully");
      const ownerId = response.data.owner_id;
      localStorage.setItem("owner_id", ownerId);
      navigate("/events")
    } catch (error) {
      toast.error("Owner login failed");
    }
  };
  return (
    <div>
    
        <div>
          <h2>Login Form</h2>
          <input
            type="email"
            name="owneremail"
            placeholder="Enter the email"
            onChange={handleChange}
            value={loginform.owneremail}
          />
          <input
            type="password"
            name="ownerpassword"
            placeholder="Enter the password"
            onChange={handleChange}
            value={loginform.ownerpassword}
          />
          <button onClick={handlelogin}>Login</button>
        </div>
    
    </div>
  );
}

export default LoginForm;
