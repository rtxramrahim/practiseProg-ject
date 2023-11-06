import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { signin } from '../operations/authentication/auth'
import {AiOutlineEyeInvisible} from 'react-icons/ai'
import {AiOutlineEye} from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {useDispatch }from 'react-redux'
import { signInStart , signInFailure , signInSuccess , setUser} from '../redux/slices/userSlice.js'
import Oauth from '../component/Oauth.jsx'
function Signin(){
  const [formdata , setFormdata] = useState({firstname : "" , lastname : "" , email : "" , password : ""})
  const {loading , error} = useSelector((state)=>state.user)
  const[showPassword , setShowPassword] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleChange = (e)=>{
  const {name , value } = e.target
    setFormdata((prev)=>({
      ...prev , [name] : value
    }))   
  }
  const submitHandler = async(e)=>{
  
    e.preventDefault()
    dispatch(signInStart())
    const result = await signin(formdata)
    if(result.success==true){
      const user = result.user
      dispatch(signInSuccess())
      dispatch(setUser(user))
      navigate("/profile")
    }else{
        dispatch(signInFailure(result))
    }
    
}
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
      <form onSubmit={submitHandler} className='flex flex-col gap-4'>
          
          <input type='email' placeholder='Email' className='border p-3 rounded-lg shadow-sm' onChange={handleChange} value={formdata.email} name='email'></input>
          <input type={showPassword ? 'text' : 'password'} placeholder='Password' className='border p-3 rounded-lg shadow-sm' onChange={handleChange} value={formdata.password} name='password'></input>
          <div className='relative'>
            <span className='absolute right-6 bottom-8  ' onClick={()=>{
                setShowPassword(!showPassword)
              }}>
                  {showPassword ? <AiOutlineEyeInvisible/> : <AiOutlineEye/>}
            </span>
          </div>
          <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95  shadow-sm disabled:opacity-80'>
            {loading ? "Loading..." : "Sign In" }
          </button>
          <Oauth/>
          {
            error && <span className='text-red-600 '>{error}</span>
          }
      </form>
      <div className='flex flex-row gap-2 mt-5'>
          <p>Not have an account?</p>
          <Link to={"/sign-up"}>
            <span className ='text-blue-700'>Sign Up</span>
          </Link>
      </div>

    </div>
  )
}
export default Signin
