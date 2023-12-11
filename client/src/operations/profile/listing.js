import {apiConnector} from '../apiConnector'
import { profile } from '../apis'
export const createListing = async(data,token)=>{
    try{
        const response = await apiConnector('POST' , profile.createListing , data , {
            Authorizattion : `Bearer ${token}`
        }    
        )
        console.log(response.data.listing)
        return response.data.listing 
    }catch(err){
        console.log(err)
    }
}

export const getAllListings = async(token , )=>{
    try{
        const response = await apiConnector('POST' , profile.getAllListings , {
            Authorization : `Bearer ${token}`
        })
        console.log(response.data.listing)
        return response.data.listing
    }catch(err){
        console.log(err)
    }
}

export const deleteListing = async( listingId ,token)=>{
    try{
        const response = await apiConnector('DELETE' , profile.deleteListings , {
            listingId 
        } , {
            Athorization : `Bearer ${token}`
        })
        return response.data.success
    }catch(err){
        console.log(err)
    }
}
export const findListing = async(listingId)=>{
    try{
        const response = await apiConnector('POST' , profile.findListing ,  listingId )
        console.log(response.data.listing)
        return response.data.listing
    }
    catch(err){
        console.log(err)
    }
}
export const updateListing = async(data,token)=>{
    try{
        const response = await apiConnector('PUT' , profile.updateListing , data , {
            Authorization : `Bearer ${token}`
        })
        if(!response.data.success){
            console.log("response from client side " , response)
            return
        }
        console.log(response.data.listing)
        return response.data.listing
    }catch(err){    
        console.log(err)
    }
}