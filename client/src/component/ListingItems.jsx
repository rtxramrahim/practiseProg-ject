import React from 'react'
import { Link } from 'react-router-dom'
import {MdLocationOn} from 'react-icons/md'
function ListingItems({listing}) {
    console.log(listing)
  return (
    <div className='bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-[280px] sm:w-[280px]'>
        <Link to={`/listing/${listing?._id}`}>
            <div className=''>
                <img className=' sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300 ' src={listing?.imageUrls[0]}/>
                <div className='p-3 flex flex-col gap-2'>
                    <p className='text-lg font-semibold text-slate-700 truncate '>{listing?.name}</p>
                    <div className='flex flex-row gap-2 w-full items-center'>
                        <MdLocationOn className='h-4 w-4 text-green-700 '/>
                        <p className='text-sm text-gray-600 w-full truncate'>{listing?.address}</p>
                    </div>
                    <p className='text-sm text-gray-600 w-full truncate'>{listing?.description}</p>
                    <p className='text-slate-500 mt-2 font-semibold'>₹{listing?.offer ? Intl.NumberFormat('en-IN').format(listing?.discountedPrice) : Intl.NumberFormat('en-IN').format(listing?.regularPrice)}
                        {listing?.type === 'Rent' ? "/month" : ""}    
                    </p>
                    <div className='text-slate-600 text-xs font-bold flex flex-row gap-2'> 
                        <p>{listing?.bedrooms > 1 ? `${listing?.bedrooms} Beds` : `${listing?.bedrooms} Bed`}</p>
                        <p>{listing?.bathrooms > 1 ? `${listing?.bathrooms} Baths` : `${listing?.bathrooms} Bath`}</p>
                    </div>
                </div>
                   
            </div>
        </Link>
    </div>
  )
}

export default ListingItems