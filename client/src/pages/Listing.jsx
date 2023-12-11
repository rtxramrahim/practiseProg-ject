import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { findListing } from '../operations/profile/listing'
import {Swiper ,SwiperSlide } from 'swiper/react'
import SwiperCore from 'swiper'
import {Navigation , Autoplay} from 'swiper/modules'
import {HiLocationMarker} from 'react-icons/hi'
import 'swiper/css/bundle'
import {FaBed , FaBath , FaParking} from 'react-icons/fa'
import {GiSofa} from 'react-icons/gi'
import Contact from '../component/Contact'
import { useNavigate } from 'react-router-dom'
function Listing() {
const [contact , setContact ] = useState(false)
const listingId = useParams()  
const [listing , setNewListings] = useState({})
const {token , currentUser} = useSelector((state)=>state.user)
const [error ,setError] = useState(null)
const navigate= useNavigate()
const handleListing = async()=>{
    const response = await findListing(listingId)
    setNewListings(response)
    // console.log(listing)
}
useEffect(()=>{
  handleListing()
 
},[])
const handleContact = ()=>{
  if(currentUser == null){
    navigate('/sign-in')
  }
  else{
    setContact(true)
  }
}
return (
    
    <div>
      {error && <h1>{error}</h1>}
      <div>
        <Swiper 
        modules={[Navigation, Autoplay,]} 
        navigation >
            {listing?.imageUrls?.map((images)=>{
              return <SwiperSlide key={images}>
                            <div className='h-[550px] w-100wh'><img className='mx-auto h-full object-cover  bg-no-repeat rounded-md' alt='images' src={images}></img></div>
                      </SwiperSlide>
            })}
        </Swiper>
      </div>
      <div className='w-10/12 mx-auto  sm:p-5'>
        <p className='text-2xl mt-3 font-semibold cursor-pointer '>{listing?.name} - ₹{Intl.NumberFormat('en-IN').format(listing.regularPrice)} {`${listing.type === "Rent" ? "/ month" : ""}`}</p>
        <p className='flex items-center mt-6 gap-2 text-slate-600 my-4 text-base '>
          <HiLocationMarker className='text-green-700 text-xl '/> 
          {listing?.address}
        </p>
        <div className='flex flex-row gap-2'>
          <p className='bg-red-900 w-full max-w-[200px] text-white text-center p-2 rounded-md'>
            {`For ${listing.type}`}
          </p>
          {listing?.offer && <p className='bg-green-800 w-full max-w-[200px] cursor-pointer text-white text-center p-2 rounded-md'>{`${listing?.type === 'Rent' ? "Discount Available" : "Negotiable"} `}</p> }
          
        </div>
        <p className='text-slate-800 mt-5'><span className='font-semibold text-black'>Description - {' '}</span>{listing?.description}</p>
        <ul className='text-green-900 font-semibold text-sm mt-5 flex gap-5 items-center flex-wrap'>
          <li className='flex items-center gap-1'>
            <FaBed className='text-lg' />
            {listing?.bedrooms > 1 ? `${listing?.bedrooms} Beds` : `${listing?.bedrooms} Bed`}
          </li>
          <li className='flex items-baseline gap-1'>
            <FaBath className='text-lg' />
            {listing?.bathrooms > 1 ? `${listing?.bathrooms} Baths` : `${listing?.bathrooms} Bath`}
          </li>
          {
            listing?.parking &&  
            <li className='flex items-center gap-1'>
            <FaParking className='text-lg' />
            <p>Parking Available</p>
            </li>
          }
          {
            listing?.furnished && 
            <li className='flex items-center  gap-1'>
              <GiSofa className='text-lg'/>
              <p>Furnished</p>
            </li>
          }
        </ul>
        <div className='w-[70%] '>
        {
          currentUser?._id !== listing?.userRef && !contact && <div className=' '>
          <button onClick={()=>handleContact(true)} className='bg-slate-700 p-3 w-full mt-6 uppercase  text-white rounded-lg hover:opacity-95'>Contact Landlord</button>
          </div>
        }
        </div>  
        <div className='mb-5'>
          {contact && <Contact listing={listing} setContact={setContact}/>}
        </div>
      </div>
    </div>
  )

}
export default Listing