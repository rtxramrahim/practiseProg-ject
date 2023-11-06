import { apiConnector } from "../apiConnector"
import {profile } from '../apis'


export const profileUpdate = async(data , dispatch )=>{
  
    try{    
        const response = await apiConnector("PUT" , profile.update , {
            username : data.username,
            email : data.email,
            password : data.password,
            avatar : data.avatar
        } )
        if(!response.data.success){
            console.log("error from profile api")
            console.log(response.data)
            return response.data
        }
        else{
            console.log(response.data)
            
            return response.data
        }
    }catch(err){
        console.log("error from profile api " , err)
    }
}