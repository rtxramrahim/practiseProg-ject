import React, { useEffect } from 'react'
import { getStorage } from 'firebase/storage'
import { app } from '../firebase'

import { useState } from 'react'
import { ref } from 'firebase/storage'
import { uploadBytesResumable } from 'firebase/storage'
import { getDownloadURL } from 'firebase/storage'
import {AiFillCloseCircle} from 'react-icons/ai'
import { updateListing } from '../operations/profile/listing'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setNewListing } from '../redux/slices/listingSlice'
import { useParams } from 'react-router-dom'
import { findListing } from '../operations/profile/listing'
function UpdateListing() {
    const [files ,setFiles] = useState([])
    const {token} = useSelector((state)=>state.user)
    const navigate = useNavigate()
    const listingId = useParams()
  
    const [formdata , setFormData] = useState({ imageUrls : [] , name : '' , address : '' , description : '' , type : 'Rent' , bedrooms : 1 ,
        bathrooms : 1 , regularPrice : 5000 , discountedPrice : 4500 , furnished : false , parking : false , offer : false} )
    const [uploading , setUploading] = useState(false)
    const [error ,setError] = useState(null)
    const [listing , setListing] = useState(false)
    const dispatch = useDispatch()
    const handledata = async()=>{
        const response = await findListing(listingId , token)
        setFormData(response)
    }
    const uploadImage =async ()=>{
    
       if(files.length == 0){
        setError("Please select atleast one file")
       } 
       else if(files.length > 7 || files.length + formdata.imageUrls.length > 7){
           setError("You can only upload upto 6 images")
        }
        else if(files.length > 0 && files.length + formdata.imageUrls.length < 7){
            setError(null)
            setUploading(true)
            const promise = []
            for(let i = 0 ; i < files.length ; i++){
                promise.push(handleFileChange(files[i]))
                
            }
           
            Promise.all(promise).then((urls)=>{
                setFormData({
                    ...formdata , imageUrls : formdata.imageUrls.concat(urls)
                })
                setUploading(false)
            }).catch((err)=>{
                console.log(err)
                setUploading(false)
            })
           
        }
   
       
    }
    const handleFileChange = async(file)=>{
       
       if(files.length > 0 && files.length + formdata.imageUrls.length < 7){
        return new Promise((resolve , reject)=>{
            const storage = getStorage(app)
            const fileName = new Date().getTime() + file.name
            const storageRef = ref(storage , fileName)
            const uploadTask = uploadBytesResumable(storageRef , file)
        
            uploadTask.on('state_changed' , 
              (snapshot)=>{
                const progress = (snapshot.bytesTransferred/snapshot.totalBytes) * 100
                
               },
               (error)=>{
                reject(error)
               },
               ()=>{
                getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl)=>{
                    resolve(downloadUrl)
                })
               }
        
            )
           })
       }else{
        setError("You can only upload 6 images per listing")
       }
       
      
    }
    const handleRemovePicture = (img)=>{
        const newImageUrls = formdata.imageUrls.filter((url) => img!==url)
        
        setFormData({...formdata , imageUrls : newImageUrls})
    }
    const handleChange = (e)=>{
        const {id ,value} = e.target
        if(id === "Rent" || id === "Sale" || id === "Buy" || id === "Mortgage"){
            setFormData({...formdata , type : id })
        }
        if(id === "parking" || id === "furnished" || id === "offer"){
            setFormData({...formdata , [e.target.id] : e.target.checked})
        }
        if(e.target.type === "number" || e.target.type === "text" || e.target.type === "textarea"){
            setFormData({...formdata , [e.target.id] : e.target.value})
        }
    }
    const handleSubmit = async (e)=>{

        e.preventDefault()
        if( formdata.offer &&  formdata.discountedPrice  > formdata.regularPrice ){
            alert('discounted price should be less than regular price')
            return
        }
        if(formdata.imageUrls.length === 0 ){
            setError('Please select atleast one image')
            return
        }
        else{
            setListing(true)
         
            console.log(formdata)
            const response = await updateListing(formdata , token)
            // dispatch(setNewListing(response))
            setListing(false)
            navigate(`/listing/${response._id}`)
       
        }
    }
    useEffect(()=>{
        handledata()
    },[])
  return (
    <div className='p-3 max-w-4xl mx-auto'>
        <h1 className='text-3xl font-semibold text-center my-7'>Update Listing</h1>
        <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-4'>
            <div className='flex flex-col gap-4 flex-1'>
                <input type='text' placeholder='Name' onChange={handleChange} value={formdata.name} className='border p-3 rounded-lg ' id='name' maxLength={62} minLength={10} required></input>
                <textarea type='text' placeholder='Description' onChange={handleChange} value={formdata.description} className='border p-3 rounded-lg ' id='description' required></textarea>
                <input type='text' placeholder='Address' onChange={handleChange} value={formdata.address} className='border p-3 rounded-lg ' id='address' maxLength={62} minLength={10} required></input>
                <div className='flex flex-wrap gap-10'>
                    <div className='flex flex-row gap-2'>
                        <input type='checkbox' id="Rent" checked={formdata.type === "Rent"} onChange={handleChange}></input>
                        <span>Rent</span>
                    </div>
                    <div className='flex flex-row gap-2'>
                        <input type='checkbox' id="Sale" checked={formdata.type === "Sale"} onChange={handleChange} ></input>
                        <span>Sell</span>
                    </div>
                    {/* <div className='flex flex-row gap-2'>
                        <input type='checkbox' id="Buy" checked={formdata.type === "Buy"} onChange={handleChange} ></input>
                        <span>Buy</span>
                    </div>
                    
                    <div className='flex flex-row gap-2'>
                        <input type='checkbox' id="Mortgage" checked={formdata.type === "Mortgage"} onChange={handleChange} ></input>
                        <span>Mortgage</span>
                    </div> */}
                    <div className='flex flex-row gap-2'>
                        <input type='checkbox' id="parking" checked={formdata.parking} onChange={handleChange} ></input>
                        <span>Parking Spot</span>
                    </div>
                    <div className='flex flex-row gap-2'>
                        <input type='checkbox' id="furnished" checked={formdata.furnished} onChange={handleChange} ></input>
                        <span>Furnished</span>
                    </div>
                    <div className='flex flex-row gap-2'>
                        <input type='checkbox' id="offer" checked={formdata.offer} onChange={handleChange}></input>
                        <span>Offer</span>
                    </div>
                </div>
                <div className='flex flex-wrap flex-row gap-4'>
                    <div className='flex flex-row items-center gap-5'>
                        <input className='p-3 border border-gray-300 rounded-lg' onChange={handleChange} value={formdata.bedrooms} type='number' id='bedrooms' min='1'></input>
                        <label htmlFor='bedrooms'>Beds</label>
                    </div>
                    <div className='flex flex-row items-center gap-5'>
                        <input className='p-3 border border-gray-300 rounded-lg' onChange={handleChange} value={formdata.bathrooms} type='number' id='bathrooms' min='1'></input>
                        <label htmlFor='bathrooms'>Baths</label>
                    </div>
                    <div className='flex flex-row items-center gap-5'>
                        <input className='p-3 border border-gray-300 rounded-lg' onChange={handleChange} value={formdata.regularPrice} type='text' id='regularPrice' ></input>
                        <label htmlFor='regularPrice'>{`Price {₹ / month}`}</label>
                    </div>
                   {
                    formdata.offer &&  <div className='flex flex-row items-center gap-5'>
                        <input className='p-3 border border-gray-300 rounded-lg' onChange={handleChange} value={formdata.discountedPrice} type='text' id='discountedPrice' ></input>
                        <label htmlFor='discountedPrice'>{`Discounted Price`}</label>
                    </div>
                   }
                </div>
            </div>
           <div className='flex flex-col flex-1 gap-4'>
           <div className='flex items-start'>
                <p className='font-semibold'>Images :</p>
                <span className='font-normal text-gray-600 ml-2'>The first image will be set as cover image (max 6)</span>
            </div>
            <div className='flex flex-col gap-4'>
                <input onChange={(e)=>setFiles(e.target.files)} className='p-3 border border-gray-300 rounded w-full ' type='file' id='images' accept='image/*' multiple></input>
                <button type='button' disabled={uploading} onClick={uploadImage} className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-85 '>{`${uploading ? "Uploading..." : "Upload"}`}</button>
                {
                    error && <div className='flex flex-row gap-3 items-baseline'>
                        <span className='text-red-700 '>{error}</span>
                        <button type='button' onClick={()=>setError(null)}><AiFillCloseCircle className='text-slate-700'/></button>
                    </div>
                    
                }
            </div>
            {
            formdata.imageUrls?.length > 0 && formdata.imageUrls.map((image)=>{
               return <div  key={image} className='flex flex-row justify-between items-center'>
                    <img  src={image} alt='listing img' className='w-20 h-20 object-contain rounded-lg '></img>
                    <button type='button' onClick={()=>handleRemovePicture(image)} className='text-red-700 uppercase hover:opacity-95'>Delete</button>
               </div>
            })
           }
            <button disabled={uploading || listing} type='submit' className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>{`${listing ? "Updating..." : "Update Listing"}`}</button>
          
           </div>
            
        </form>
    </div>
  )
}

export default UpdateListing