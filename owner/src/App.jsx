
import {  Routes, Route} from "react-router-dom";
import Owner from "./components/owner";
import Packages from "./components/packages";
import EventTypes from "./components/events";
import LoginForm from "./components/ownerlogin";
import Signup from "./components/ownersignup";
import { ToastContainer } from "react-toastify";
import Packageform from "./components/Packageform";
import Logout from "./components/ownerlogout";
import Servicecard from "./components/servicecard";


function App() {
  return (
    <>
     <ToastContainer position="top-right" autoClose={1000} />
    <Routes>
      <Route path="/" element={<Owner/>} />
      <Route path="/logout" element={<Logout/>}/>
      <Route path="/packageform" element={<Packageform />} />
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/login" element={<LoginForm/>}/>
      <Route path="/events" element={<EventTypes />} />
      <Route path="/packages/:eventtype" element={<Packages />} />
      <Route path="/servicecard" element={<Servicecard/>}/>
    </Routes>
    </>
   
  );
}

export default App;

