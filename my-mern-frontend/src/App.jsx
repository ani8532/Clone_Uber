import React from 'react'
import { Route ,Routes } from 'react-router-dom'
import Home from './pages/Home';
import User_signup from './pages/User_signup';
import User_login from './pages/User_login';
import Captainsignup from './pages/CaptainSignup';
import Captainlogin from './pages/Captainlogin';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<User_login />} />
        <Route path="/signup" element={<User_signup />} />  
        <Route path="/captainsignup" element={<Captainsignup />} />
        <Route path='/Captainlogin' element={<Captainlogin />} />
      </Routes>
    </div>
  )
}

export default App

