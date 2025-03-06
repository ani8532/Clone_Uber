import React from 'react'
import { Link } from 'react-router-dom';
import { useState } from 'react';


const CaptainSignup = () => {
  const [firstname, setfirstname] = useState('')
    const [lastname, setlastname] = useState('')
    const [email, setEmail] = useState('')
    const[password, setPassword]=useState('')
    const[userData, setUserData]=useState({})
  
  
  
    const submitHandler =()=>{
      e.preventDefault()
  
      setfirstname('')
      setlastname('')
      setEmail('')
      setPassword('')
      setUserData({
        fullName:{
          firstname :firstname,
          lastname : lastname
        },
        email:email,
        password:password
      })
    }
  
  return (
    <div>
        <div className= 'p-7 h-screen flex flex-col justify-between'>
        <div>
        <img className='w-20 mb-2' src="http://pluspng.com/img-png/uber-logo-vector-png-uber-icon-png-50-px-1600.png" alt="" />

      <form onSunmit={(e)=>submitHandler(e)}>

      <h3 className='text-base  font-medium mb-2'>What's our Captain Name ?</h3>
      <div className='flex gap-4 mb-5'>
      <input 
      className= 'bg-[#eeeeee] font-medium  w-1/2  rounded px-4 py-2 border  text-lg placeholder:text-base'
       value={firstname} 
       onChange={(e)=>{setfirstname.value}} 
       required 
       type="text" 
       placeholder='First Name' />


      <input 
      className= 'bg-[#eeeeee] font-medium  w-1/2 rounded px-4 py-2 border  text-lg placeholder:text-base'
      value={lastname}
      onChange={(e)=>{setlaststname.value}}
      required 
      type="text" 
      placeholder='Last Name' />


      </div>

      <h3 className='text-base  font-medium mb-2'> What's our Captain Email ?</h3>
      <input 
      required 
      value={email}
      onChange={(e)=>setEmail(e.target.value)}
      className= 'bg-[#eeeeee] mb-6  rounded px-4 py-2 border w-full text-lg placeholder:text-base' 
      type="email"
      placeholder='email@example.com'/>


      <h3>Enter Password</h3>
        <input required
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        className= 'bg-[#eeeeee] mb-6  rounded px-4 py-2 border w-full text-lg placeholder:text-base' 
        type="password"
        placeholder='password'/>


        <button 
        className= 'bg-[#111]  text-white font-semibold  mb-5  rounded px-4 py-2 border w-full text-sm ' 
      >Register</button>

      </form>


      <p className='text-center'>Already Have an Account ? </p><Link to='/Captainlogin' className='text-blue-600 flex justify-center items-center'>Go To Login</Link>

      </div>
      <div>
            <p className='text-[10px] leading'> By proceeding ,you consent to get calls ,whatsapp or SMS Messages ,includes by automated means from uber</p>
        </div>
      </div>
    </div>
  )
}

export default CaptainSignup
