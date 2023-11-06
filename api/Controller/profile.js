import User from "../Models/userModal.js"
import bcrypt from 'bcrypt'
export const updateProfile = async(req,res)=>{
    try{
        const { username , password , email ,  avatar} = req.body
        console.log(username , password , email , avatar)
        const user = req.user._id
        // console.log(user)
       
        const findUser = await User.findById(req.user._id)
        if(!findUser){
            return res.json({
                success : false,
                message : "User not found"
            })
        }
        if(username!=undefined){
            findUser.username = username
        }
        
        if(email!=undefined){
            findUser.email = email
        }
        if(avatar!=undefined){
            findUser.avatar = avatar
        }
        if(password!=undefined){
            const newPassword =  await bcrypt.hash(password , 10)
            findUser.password = newPassword
        }
        
        await findUser.save()
        return res.status(200).json({
            success : true,
            message : "Profile Updated Successfully!",
            user : findUser
        })
    }catch(err){
        return res.status(500).json({
            success : false,
            message : "Internal server Error"
        })
    }
}