import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiConnector } from '../operations/apiConnector'
import { profile }from '../operations/apis'
import Spinner from '../component/Spinner'
import ListingItems from '../component/ListingItems'
function Search() {
    const navigate = useNavigate()
    const [loading , setLoading ] = useState(false)
    const [listings , setListing] = useState(null)
    const [showmore , setshowMore] = useState(false)
  const [sidebardata , setSideBarData] = useState({
    searchTerm : '',
    type : 'all',
    parking : false,
    furnished : false,
    offer : false,
    sort : 'createdAt',
    order : 'desc'
  })  
  const handleShowMoreClick = async()=>{
    setshowMore(false)
    const numberOfListings = listings?.length
    const startIndex = listings?.length
    const urlParams = new URLSearchParams(location.search)
    urlParams.set("startIndex" , startIndex)
    const searchQuery = urlParams.toString()
    const url = `${profile.getListing}?${urlParams}`
    const response = await apiConnector('POST' , url)
    if(response?.data?.listings?.length == 9){
      setshowMore(true)
      setListing([...listings , ...response.data.listings])
    }else{
      setListing([...listings , ...response.data.listings])
    }
    

  }
  const handleChange = (e)=>{
        const {id , value} = e.target
        if(id === 'all' || id === 'Rent' || id === 'Sale'){
            setSideBarData({...sidebardata , type : id})
        }
        if(id === 'searchTerm'){
            setSideBarData({...sidebardata , searchTerm : value})
        }
        if(id==='parking' || id === 'offer' || id === 'furnished'){
            setSideBarData({...sidebardata , [id] : e.target.checked || e.target.checked === 'true' ? true : false })
        }
        if(id === 'sort'){
            const sort = value.split('_')[0] || 'createdAt'
            const order = value.split('_')[1] || 'desc'
            setSideBarData({...sidebardata , sort , order})
        }
  }
  const handleSubmit = (e)=>{
    e.preventDefault()
    // console.log("formdata" , sidebardata)
    const urlParams = new URLSearchParams(window.location.search)
    urlParams.set('searchTerm' , sidebardata.searchTerm)
    urlParams.set('type' , sidebardata.type)
    urlParams.set('parking' , sidebardata.parking)
    urlParams.set('furnished' , sidebardata.furnished)
    urlParams.set('offer' , sidebardata.offer)
    urlParams.set('sortOnTheBasis' , sidebardata.sort)
    urlParams.set('order' , sidebardata.order)
    const searchQuery = urlParams.toString()
    navigate(`/search?${searchQuery}`)
  }
  const setData = ()=>{
    const urlParams = new URLSearchParams(window.location.search)
    const searchTermFromUrl = urlParams.get('searchTerm')
    const typeFromUrl = urlParams.get('type')
    const parkingFromUrl = urlParams.get('parking')
    const furnishedFromUrl = urlParams.get('furnished')
    const offerFromUrl = urlParams.get('offer')
    const sortFromUrl = urlParams.get('sortOnTheBasis')
    const orderFromUrl = urlParams.get('order')
    if(searchTermFromUrl || typeFromUrl || parkingFromUrl || furnishedFromUrl || offerFromUrl || sortFromUrl || orderFromUrl  ){
        setSideBarData({
            searchTerm : searchTermFromUrl || '',
            type : typeFromUrl ||  'all',
            parking : parkingFromUrl === 'true' ? true : false,
            furnished : furnishedFromUrl === 'true' ? true : false ,
            offer : offerFromUrl === 'true' ? true : false,
            sort : sortFromUrl || 'createdAt',
            order : orderFromUrl || 'desc'
        })
    }
    
    const fetchListing = async()=>{
      setshowMore(false)
        setLoading(true)
        const url = `${profile.getListing}?${urlParams}`
        const response = await apiConnector('POST' , url.toString()  )
        if(response?.data?.listings?.length == 9){
          setshowMore(true)
        }
        setListing(response.data.listings)
       
       
        setLoading(false)
    }
    fetchListing()
  }
  useEffect(()=>{
    setData()
  },[location.search])
  return (
    <div className='flex flex-col md:flex-row'>
        <div  className='p-7  border-b-2 md:border-r-2 md:min-h-screen'>
            <form onSubmit={handleSubmit} className='flex flex-col gap-8 '>
              <label className='whitespace-nowrap'>
                <span className='font-semibold'>Search Term : </span>               
                <input type='text' onChange={handleChange} id='searchTerm' value={sidebardata.searchTerm} placeholder='Search...' className='border-b-2 rounded-lg ml-2 p-2'>

                </input>
          
              </label>
               <div className='flex flex-row flex-wrap'>
                    <div className='flex flex-row gap-2 items-start flex-wrap'>
                        <label className='font-semibold'>Type :</label>  
                        <div className='flex flex-row gap-2'>
                            <input  type='checkbox' checked={sidebardata.type === 'all'} onChange={handleChange} id='all' className='w-4' ></input>
                            <span>Rent & Sale</span>
                        </div>
                        <div className='flex flex-row gap-2 '>
                            <input  type='checkbox' onChange={handleChange} checked={sidebardata.type === 'Rent'} id='Rent'  className='w-4' ></input>
                            <span>Rent</span>
                        </div>
                        <div className='flex flex-row gap-2 '>
                            <input  type='checkbox' id='Sale' onChange={handleChange} checked={sidebardata.type === 'Sale'} className='w-4' ></input>
                            <span>Sale</span>
                        </div>
                        <div className='flex flex-row gap-2 '>
                            <input  type='checkbox' id='offer' onChange={handleChange} checked={sidebardata.offer} className='w-4' ></input>
                            <span>Offer</span>
                        </div> 
                    </div>
                </div>
                <div className='flex flex-row flex-wrap'>
                    <div className='flex flex-row gap-2 items-start flex-wrap'>
                        <label className='font-semibold'>Amenities :</label>  
                        <div className='flex flex-row gap-2'>
                            <input  type='checkbox' onChange={handleChange} checked={sidebardata.parking} id='parking' className='w-4' ></input>
                            <span>Parking</span>
                        </div>
                        <div className='flex flex-row gap-2 '>
                            <input  type='checkbox' id='furnished' onChange={handleChange} checked={sidebardata.furnished} className='w-4' ></input>
                            <span>Furnished</span>
                        </div>
                        
                    </div>
                </div>
                {/* <div className='flex flex-row flex-wrap gap-3 items-center'>
                    <label className='font-semibold'  htmlFor='sort'>
                        Sort : 
                    </label>
                    <select id='sort' defaultValue={'createdAt_desc'} onChange={handleChange} className='border rounded-md p-2   '>
                        <option value={'regularPrice_desc'}>Price Low To High</option>
                        <option value={'regularPrice_asc'}>Price High To Low</option>
                        <option value={'createdAt_desc'}>Latest</option>
                        <option value={'createdAt_asc'}>Oldest</option>
                    </select>
                </div> */}
               <button type='submit' className='p-2 bg-slate-700 text-white rounded-lg hover:opacity-95'>Search</button> 
            </form>
        </div>
        <div className='w-full p-7'>
               <div  className=' text-3xl font-semibold border-b w-full p-3 text-slate-700 '><p >Listing Results :</p> </div>
               <div className='mx-auto ml-[50%] mt-[10%] '>
                    {loading && <Spinner></Spinner>} 
               </div> 
              {
                !loading && listings?.length === 0 && <span className='text-xl mx-auto text-slate-700 p-3  text-center'>No Listing Found !</span>
              }
              <div className='flex flex-row gap-4 flex-wrap -mt-5'>
              {
                !loading && listings?.length !== 0 && listings?.map((listing)=>{
                    return <ListingItems key={listing?._id} listing={listing}></ListingItems>
                })
              }
              </div>
              {
                showmore && <button onClick={()=>handleShowMoreClick()} className='text-green-700 text-center p-3 font-semibold underline mt-4'>Show More</button>
              }  
        </div>
    </div>
  )
}

export default Search