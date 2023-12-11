import { AUTH } from "../apis";
import { apiConnector } from "../apiConnector";
import toast from "react-hot-toast";
export const signup = async(data)=>{
     
    try{
      const response = await apiConnector('POST' , AUTH.signup , {
            username : data.username,
            
            email : data.email,
            password : data.password
        })
        if(!response.data.success){
            console.log("error from client side signup" )
            const message = response.data.message
            console.log("returning message")
            return message
        }else{
            console.log(response.data)
            return true
        }
        
    }catch(err){
        console.log(err.message)
    
    }
} 
export const signin = async(data)=>{
    try{
        const response = await apiConnector('POST' , AUTH.signin , {
            email : data.email,
            password : data.password
        })
        if(!response.data.success){
            console.log("error from client side")
            const message = response.data.message
            console.log("returning message")
            return message
        }else{
            console.log(response.data)
            return response.data
        }
    }catch(err){
        console.log(err.message)
    }
   
}
export const findUser = async(userRef , token)=>{
    try{
        const response = await apiConnector('POST' , AUTH.findUser ,
            {userRef}, {
            Authorization : `Bearer ${token}`
        })
       
        return response.data.user
    }catch(err){
        console.log(err.message)
    }
}