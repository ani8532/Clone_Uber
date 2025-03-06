import React  from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';


const User_login = () => {
  const [email, setEmail] = useState('')
  const[password, setPassword]=useState('')
  const[userData, setUserData]=useState({})


  const submitHandler=(e)=>{
    e.preventDefault();
    setUserData({
      email:email,
      password:password })
    setEmail('')
    setPassword('')
  }
  return (
    
    <div>
        <div className= 'p-7 h-screen flex flex-col justify-between'>
        <div>
        <img className='w-20 mb-2' src="http://pluspng.com/img-png/uber-logo-vector-png-uber-icon-png-50-px-1600.png" alt="" />
        <form onSunmit={(e)=>submitHandler(e)}>
      <h3 className='text-lg  font-medium mb-2'> What's Your Email ?</h3>
      <input 
      required 
      value={email}
      onChange={(e)=>setEmail(e.target.value)}
      className= 'bg-[#eeeeee] font-medium mb-7  rounded px-4 py-2 border w-full text-lg placeholder:text-base' 
      type="email"
       placeholder='email@example.com'/>
      <h3>Enter Password</h3>
        <input required
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        className= 'bg-[#eeeeee] mb-7  rounded px-4 py-2 border w-full text-lg placeholder:text-base' 
        type="password"
        placeholder='password'/>
        <button 
        className= 'bg-[#111]  text-white font-semibold  mb-7  rounded px-4 py-2 border w-full text-lg ' 
      >Login</button>

      </form>
      <p className='text-center'>New Here ? </p><Link to='/signup' className='text-blue-600 flex item-center justify-center'>Create New Account</Link>

        </div>
        <div>
            <Link 
            to="/Captainlogin"
            className= 'bg-[#10b461] flex items-center justify-center text-white font-semibold  mb-5  rounded px-4 py-2 border w-full text-lg ' >
                Sign as Captain 
            </Link>
        </div>
      </div>
    </div>
  )
}

export default User_login
