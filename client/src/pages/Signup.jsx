import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { signup } from '../operations/authentication/auth'
import {AiOutlineEyeInvisible} from 'react-icons/ai'
import {AiOutlineEye} from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import Oauth from '../component/Oauth.jsx'

function Signup(){
  const [formdata , setFormdata] = useState({firstname : "" , lastname : "" , email : "" , password : ""})
  const[loading , setLoading ] = useState(false)
  const [error , setError] = useState(null)
  const[showPassword , setShowPassword] = useState(false)
  const navigate = useNavigate()
  const handleChange = (e)=>{
    const {name , value } = e.target
    setFormdata((prev)=>({
      ...prev , [name] : value
    }))   
  }
  const submitHandler = async(e)=>{
    setLoading(true)
    e.preventDefault()
    const result = await signup(formdata)
    if(result==true){
      setLoading(false)
      navigate("/sign-in")
    }else{
        setLoading(false)
        setError(result)
    }
    
}
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
      <form onSubmit={submitHandler} className='flex flex-col gap-4'>
          <div className='flex flex-row gap-2 justify-between'>
          <input type='text' placeholder='Firstname' className='border p-3 rounded-lg shadow-sm ' onChange={handleChange} value={formdata.firstname} name='firstname'></input>
          <input type='text' placeholder='Lastname' className='border p-3 rounded-lg  shadow-sm' onChange={handleChange} value={formdata.lastname} name='lastname'></input>
          </div>
          <input type='email' placeholder='Email' className='border p-3 rounded-lg shadow-sm' onChange={handleChange} value={formdata.email} name='email'></input>
          <input type={showPassword ? 'text' : 'password'} placeholder='Password' className='border p-3 rounded-lg shadow-sm' onChange={handleChange} value={formdata.password} name='password'>
            
          </input>
          <div className='relative'>
            <span className='absolute right-6 bottom-8  ' onClick={()=>{
                setShowPassword(!showPassword)
              }}>
                  {showPassword ? <AiOutlineEyeInvisible/> : <AiOutlineEye/>}
            </span>
          </div>
          <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95  shadow-sm disabled:opacity-80'>
            {loading ? "Loading..." : "Sign Up" }
          </button>
          <Oauth/>
          {
            error && <span className='text-red-600 '>{error}</span>
          }
      </form>
      <div className='flex flex-row gap-2 mt-5'>
          <p>Have an account?</p>
          <Link to={"/sign-in"}>
            <span className ='text-blue-700'>Sign In</span>
          </Link>
      </div>

    </div>
  )
}
export default Signup
