import React from 'react'
import {GoogleAuthProvider , getAuth, signInWithPopup} from 'firebase/auth'
import { app } from '../firebase'
import { signInSuccess , signInFailure , setToken} from '../redux/slices/userSlice'
import { signupOauth } from '../operations/authentication/oauth'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
function Oauth() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleGoogleClick = async()=>{
    try{
      const provider = new GoogleAuthProvider()
      const auth = getAuth(app)
      
      const result = await signInWithPopup(auth, provider)
      console.log(result)
      const data = {
        displayName : result.user.displayName,
        email : result.user.email,
        photoUrl : result.user.photoURL
      }
      
      const response = await signupOauth(data)
      if(response.data.success == true){
        // console.log(response.data.user)
        dispatch(signInSuccess(response.data.user))
        dispatch(setToken(response.data.token))
        navigate("/profile")
      }else{
        dispatch(signInFailure(response))
      }
    }catch(err){ 
    console.log("error from google oauth " , err)
    }
}
  return (
    <button onClick={handleGoogleClick} type='button' className='bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95 '>
      Continue With Google
    </button>
  )
}

export default Oauth