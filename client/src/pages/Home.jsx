import React from 'react'
import { Link } from 'react-router-dom'
import { apiConnector } from '../operations/apiConnector'
import { profile } from '../operations/apis'
import { useEffect ,useState } from 'react'
import {Swiper ,SwiperSlide } from 'swiper/react'
import SwiperCore from 'swiper'
import {Navigation , Autoplay } from 'swiper/modules'
import ListingItems from '../component/ListingItems'
import Footer from '../component/Footer'
function Home() {
  const  [offerListings , setOfferListings] = useState([])
  const [rentListings , setRentListings] = useState([])
  const [saleListings , setSaleListings] = useState([])
  const handleOfferListings = async ()=>{
    const urlParams = new URLSearchParams()
    urlParams.set("offer" , true)
    urlParams.set('limit' , 4)
    urlParams.set('startIndex' , 2)
    const searchQuery = urlParams.toString()
    const url = `${profile.getListing}?${searchQuery}`
    // console.log(url)
    const response = await apiConnector('POST' , url)
    setOfferListings(response?.data?.listings)
    console.log("response for offerlistings" , offerListings)
  }
  const handleRentListings = async()=>{
    const urlParams = new URLSearchParams()
    urlParams.set("type" , 'Rent')
    urlParams.set('limit' , 4)
    const searchQuery = urlParams.toString()
    const url = `${profile.getListing}?${searchQuery}`
    const response = await apiConnector('POST' , url)
    setRentListings(response?.data?.listings)
    console.log("response for rentlistings" , rentListings)
  }
  const handleSaleListings = async()=>{
    const urlParams = new URLSearchParams()
    urlParams.set('type' , 'Sale' )
    urlParams.set('limit' , 4)
    const searchQuery = urlParams.toString()
    const url = `${profile.getListing}?${searchQuery}`
    // console.log("url for sale listing" , url)
    const response = await apiConnector('POST' , url)
    setSaleListings(response?.data?.listings)
    console.log("response for salelistings" , saleListings)
  }
  useEffect(()=>{
    handleOfferListings(),
    handleRentListings(),
    handleSaleListings()
  },[])
  return (
    <div className='mx-auto '>
      {/* top */}
      <div className='flex flex-col gap-6 mt-10 p-5 md:px-28 max-w-6xl'>
          <h1 className='text-slate-700 fond-bold text-3xl sm:text-6xl'>Find Your <span className='text-slate-500'>Perfect</span><br/>Place With Ease</h1>
          <div className='text-gray-400 text-xs sm:text-base  '>
            RealEstate.com will help to find your home fast , easy and comfortably<br/>
            Our expert support is always available
          </div>
          <Link to={'/search'} className='text-xs sm:text-base font-semibold  text-blue-800 underline '>Lets get started...</Link>
      </div>
      <Swiper
       modules={[Navigation, Autoplay,]} navigation
       
       >
        {
          offerListings?.length > 0 && offerListings?.map((listing)=>{
            return <SwiperSlide>
              <div className='h-[750px]'>
                  <img src={listing?.imageUrls[0]} className='sm:w-screen sm:h-full  bg-no-repeat object-cover'/>
              </div>
            </SwiperSlide>
          })
        }
      </Swiper>
        {/* rent */}
        <div className='flex flex-col flex-wrap items-start w-11/12 mx-auto '>
                <div className='sm:max-w-screen px-3 flex flex-wrap flex-col gap-8 my-10'>
                  {
                    offerListings?.length > 0 && <div className='mx-auto flex flex-col gap-3'>
                      <div>
                        <h2 className='text-2xl font-semibold text-slate-600 '>Recent Offers</h2>
                        <Link className='text-sm text-blue-700 hover:underline' to={'/search?offer=true'}>Show More Offers</Link>
                      </div>
                      <div className='flex flex-wrap gap-4 mx-auto'>
                        {offerListings?.map((listing)=>{
                          return <ListingItems listing={listing} key={listing._id}/>
                        })}
                      </div>
                    </div>
                  }
                
              </div>
              <div className='sm:max-w-screen px-3 flex flex-wrap flex-col gap-8 my-10'>
                  {
                    saleListings?.length > 0 && <div className='mx-auto flex flex-col gap-3'>
                      <div>
                        <h2 className='text-2xl font-semibold text-slate-600 '>Recent places for sale</h2>
                        <Link className='text-sm text-blue-700 hover:underline' to={'/search?type=Sale'}>Show more </Link>
                      </div>
                      <div className='flex flex-wrap sm:flex-row flex-col gap-4 mx-auto'>
                        {saleListings?.map((listing)=>{
                          return <ListingItems listing={listing} key={listing._id}/>
                        })}
                      </div>
                    </div>
                  }
                
              </div>
              <div className='max-w-screen  px-3 flex flex-wrap flex-col gap-8 my-10'>
                  {
                    rentListings?.length > 0 && <div className='mx-auto flex flex-wrap flex-col gap-3'>
                      <div>
                        <h2 className='text-2xl font-semibold text-slate-600 '>Recent places for rent</h2>
                        <Link className='text-sm text-blue-700 hover:underline' to={'/search?type=Rent'}>Show more </Link>
                      </div>
                      <div className='flex flex-wrap gap-4 mx-auto'>
                        {rentListings?.map((listing)=>{
                          return <ListingItems listing={listing} key={listing._id}/>
                        })}
                      </div>
                    </div>
                  }
                
              </div>
        </div>
      <Footer/>
    </div>
  )
}

export default Home