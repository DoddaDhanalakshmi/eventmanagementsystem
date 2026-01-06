
import {  Routes, Route} from "react-router-dom";
import Owner from "./components/owner/owner";
import Packages from "./components/packages/packages";
import EventTypes from "./components/pages/events";
import LoginForm from "./components/pages/ownerlogin";
import Signup from "./components/pages/ownersignup";
import { ToastContainer } from "react-toastify";

import Servicecard from "./components/services/servicecard";
import Packageforms from "./components/packages/Packageforms";


function App() {
  return (
    <>
     <ToastContainer position="top-right" autoClose={1000} />
    <Routes>
      <Route path="/" element={<Owner/>} />
      {/* <Route path="/packageform" element={<Packageform />} /> */}
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/login" element={<LoginForm/>}/>
      <Route path="/events" element={<EventTypes />} />
      <Route path="/packages/:eventtype" element={<Packages />} />
      <Route path="/servicecard" element={<Servicecard/>}/>
      <Route path="/packageforms" element={<Packageforms />} />

    </Routes>
    </>
   
  );
}

export default App;

