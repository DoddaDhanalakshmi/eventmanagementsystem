import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

function Signup() {
//   const navigate = useNavigate();

  const [form, setForm] = useState({
    ownername: "",
    owneremail: "",
    ownerpassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    try {
      await axios.post(
        "http://127.0.0.1:8000/api/owner/register/",
        form
      );

      toast.success("Signup successful");

    //   // ✅ after signup go to login page
    //   setTimeout(() => {
    //     navigate("/login");
    //   }, 1500);
    } catch (error) {
      toast.error("Signup failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Owner Signup</h2>

      <input
        type="text"
        name="ownername"
        placeholder="Enter name"
        onChange={handleChange}
      />
      <br /><br />

      <input
        type="email"
        name="owneremail"
        placeholder="Enter email"
        onChange={handleChange}
      />
      <br /><br />

      <input
        type="password"
        name="ownerpassword"
        placeholder="Enter password"
        onChange={handleChange}
      />
      <br /><br />

      <button onClick={handleSignup}>Signup</button>

      <ToastContainer />
    </div>
  );
}

export default Signup;
