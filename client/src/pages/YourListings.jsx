import React from 'react'
import { getAllListings } from '../operations/profile/listing'
import { deleteListing } from '../operations/profile/listing'
import { useEffect ,useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
function YourListings() {
    const [userListings , setUserListings] = useState([])
    const [noListing , setNoListing] = useState(false)
    const {token} = useSelector((state)=>state.user)
    const {id} = useParams()
    const handleUsersListing = async()=>{
        const response =  await getAllListings(token)
        
        if(response?.length > 0){
           
           setUserListings(response)
        }
        
        
     }
    const handleDeleteListing = async(listingId)=>{
        const response = await deleteListing(listingId ,token)
        if(response){
          const newListingsList = userListings?.filter((listing)=>listing?._id !== listingId)
          console.log("newListing" , newListingsList)
          setUserListings(newListingsList)
        }
      }
    useEffect(()=>{
        handleUsersListing()
    },[id])
  return (
    <div className='sm:w-[720px]  mx-auto p-6'>
        <div className='flex flex-col  gap-2 mt-4'>
        <h1 className='text-3xl font-semibold  text-center text-black'>Your Listings</h1>
        {  userListings?.length > 0 && userListings?.map((listings , index)=>{
          return <div  className='border rounded-lg p-3 justify-between gap-5 flex-wrap  items-center flex' key={index}>
          
          <Link to={`/listing/${listings._id}`} className='w-[60%]'>
              <img src={listings.imageUrls[0]} className='h-16 w-16 object-contain' alt='image'></img>
              <p className='text-slate-700 font-semibold flex-1 hover:underline truncate'>{listings.name}</p>
             
          </Link>
          <div className='flex flex-col gap-2'>
                  
                  <button onClick={()=>handleDeleteListing(listings._id)} className='text-red-700'>Delete</button>
                <Link to={`/listing/update-listing/${listings._id}`}><button  className='text-green-700 '>Edit</button></Link>      
              </div>

          </div>
        })}
        {
            userListings?.length == 0 &&
            <p className='text-slate-800 text-xl p-3'> No listings found ! <span></span></p>
        }
      </div>
    </div>
  )
}

export default YourListings