import { AUTH } from "../apis";
import { apiConnector } from "../apiConnector";

export const signupOauth = async(data)=>{
    try{
        const response = await apiConnector('POST' , AUTH.signupOAuth , {
            displayName : data.displayName,
            photoUrl : data.photoUrl,
            email : data.email
        })
        if(!response.data.success){
            return response.data.message
        }else{
            // console.log(response)
            return response
        }
    }catch(err){
        console.log("error from OAuth" , err)
    }
}