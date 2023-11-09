import {apiConnector} from '../apiConnector'
import { profile } from '../apis'
export const createListing = async(data,token)=>{
    try{
        const response = await apiConnector('POST' , profile.createListing , data , {
            Authorizattion : `Bearer ${token}`
        }    
        )
        return response.data.listing 
    }catch(err){
        console.log(err)
    }
}

