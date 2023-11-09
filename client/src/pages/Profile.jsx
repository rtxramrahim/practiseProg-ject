import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { setUser } from '../redux/slices/userSlice'
import { useNavigate } from 'react-router-dom'
import { app } from '../firebase'
import { getDownloadURL, ref } from 'firebase/storage'
import {getStorage , uploadBytesResumable } from 'firebase/storage'
import { profileUpdate } from '../operations/profile/profileUpdates'
import { updateUserSuccess , updateUserStart , updateUserFailure } from '../redux/slices/userSlice'
function Profile() {
  const {currentUser} = useSelector((state)=>state.user)
  const dispatch = useDispatch()
  const {error , loading}  = useSelector((state)=>state.user)
  const [message , setMesssage ] = useState(null)
  const navigate = useNavigate()
  const [file ,setFile] = useState(undefined)
  const [prevScr , setPrevScr] = useState(currentUser.avatar)
  const[formdata , setFormdata] = useState({})
  const [fileUploadError , setFileUploadError] = useState(false)
  const fileRef = useRef(null)
  const [filePrec , setFilePerc] = useState(0)
  const handleSignOut = ()=>{
    dispatch(setUser(null))
    navigate("/")
  }
  useEffect(()=>{
    if(file){
      handleChangeFile(file)
    }
  },[file])
  // console.log(filePrec)
  // console.log(formdata)
  const handleChangeFile = (file)=>{
    const storage = getStorage(app)
    const fileName = new Date().getTime() + file.name;
    console.log(fileName)
    const storageRef = ref(storage , fileName)
    const uploadTask = uploadBytesResumable(storageRef , file)

    uploadTask.on('state_changed' , 
      (snapshot)=>{
        const progress = (snapshot.bytesTransferred/snapshot.totalBytes) * 100
        setFilePerc(Math.round(progress))
       },
       (error)=>{
        setFileUploadError(true)
       },
       ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl)=>{
          setFormdata({...formdata , avatar : downloadUrl})
        })
       }

    )
    
}
  const handleChange = (e)=>{
    setFormdata({...formdata , [e.target.id] : e.target.value  })
    console.log(formdata)
  }
  const handleSubmit = async(e)=>{
  e.preventDefault()
  console.log("formdata " , formdata)
  try{
      dispatch(updateUserStart())
      console.log
      const response = await profileUpdate(formdata)
      if(response.user){
        dispatch(updateUserSuccess(response.user))
        setMesssage(response.message)
      }
      else{
        dispatch(updateUserFailure(response.message))
      }
  
  }catch(err){
    console.log(err.message)
  }
  
}
  return (
    <div className='p-3 max-w-lg mx-auto -mt-[20px]'>
      <h1 className='text-3xl font-semibold text-center my-7 '>Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type='file' onChange={(e)=>setFile(e.target.files[0])} hidden accept='image/*' ref={fileRef}></input>
        <img onClick={()=>fileRef.current.click()} className='h-24 w-24 self-center  cursor-pointer  rounded-full object-cover' src={formdata.avatar || currentUser.avatar} alt='image'></img>
        <div className='text-center'>
        {
          fileUploadError ? <span className='text-red-700 '>Error in uploading Image</span> : 
          (filePrec > 0 && filePrec < 100) ? <span className='text-slate-700 '>{` ${filePrec}`}</span> :
          filePrec ===  100 ? <span className='text-green-600 '>Successfully Uploaded!</span> : <></>
        
        }
          
        </div>
        <input type='text' placeholder={currentUser.username} onChange={handleChange} id='username' className='border p-3 rounded-lg'></input>
        <input type='email' placeholder={currentUser.email} onChange={handleChange} id='email' className='border p-3 rounded-lg'></input>
        <input type='text' placeholder="Change password" onChange={handleChange} id='password' className='border p-3 rounded-lg'></input>
        <button disabled={loading} className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95'>{`${loading ? "Loading..." : "Update"}`}</button>
        {error && <span className='text-red-800 text-center '>{error}</span>} 
        {
          message && <span className='text-green-700'>{message}</span>
        }
        <button onClick={()=>navigate('/listing/create')} className='bg-green-700  text-white rounded-lg p-3 uppercase hover:opacity-95'>Create Listing</button>
      </form>

      <div className='flex flex-row mt-5 justify-between'>
        <button onClick={()=>alert('This function is currently Disabled')} className='text-red-700 '>Delete Account</button>
        <button onClick={handleSignOut} className='text-red-700 '>Sign Out</button>
      </div>
    </div>
  )
}

export default Profile