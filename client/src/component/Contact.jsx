import React, { useEffect } from 'react'
import { useState } from 'react'
import { findUser } from '../operations/authentication/auth'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
function Contact({listing , setContact}) {
  const [landLord , setLandLord] = useState(null)
  const {token} = useSelector((state)=>state.user)
  const [message , setMessage] = useState('')
  
  const handleContact = async()=>{
    const response = await findUser(listing.userRef , token)
    setLandLord(response)
    console.log(landLord)
  }
  useEffect(()=>{
    handleContact()
  },[listing.userRef])
  return (
    <div className='mt-6 flex flex-col gap-4  w-10/12'>
      {
        landLord && <div className='flex flex-col gap-3'>
          <p>Contact<span className='font-semibold'> {landLord[0].username}</span> for <span className='font-semibold'>{listing.name}</span></p>
          <textarea className='p-3 border rounded-lg w-full' name=' message' placeholder='Enter Your Message...' value={message} onChange={(e)=>setMessage(e.target.value)}></textarea>
        </div>
      }
   <div className='flex flex-row items-start gap-3'>
   {
      landLord &&
      <Link to={`mailto:${landLord[0].email}?subject=Regarding ${listing.name}&body=${message}`} className='bg-slate-700 text-white w-[20%] text-center p-2 uppercase rounded-lg hover:opacity-95'>Send Message</Link>
     } 
     {
      landLord &&
      <button onClick={()=>setContact(false)}  className='bg-red-900 text-white w-[20%] text-center p-2 uppercase rounded-lg hover:opacity-95'>Later</button>
     } 
   </div> 
    </div>
  )
}

export default Contact