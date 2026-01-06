import React from 'react'
import Customernavbar from './components/Customernavbar'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from './components/Signup';
import Loginform from './components/Loginform';
import Events from './components/Events';
import Packages from './components/Packages';

const App = () => {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Customernavbar/>}/>
      <Route path="/signupform" element={<Signup/>}/>
      <Route path="/loginform" element={<Loginform/>}/>
      <Route path="/events" element={<Events/>}/>
      <Route path="/packages/:eventype" element={<Packages/>}/>
    </Routes>
    </BrowserRouter>
    
    </>
  )
}

export default App