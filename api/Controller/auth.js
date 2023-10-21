import bcrypt from 'bcrypt'
import User from '../Models/userModal.js'
import {customError} from '../Utils/errors.js'
export const signup = async(req,res,next)=>{
    try{
        const { firstname , lastname , email , password } = req.body
        console.log(firstname , lastname , email , password )
        if(!firstname || !lastname || !email || !password){
          next(customError(404 , "Details not found"))
        }
        const hashedPassword = bcrypt.hashSync(password , 10);
        if(!hashedPassword){
            next(customError(403 , "Not able to hashPassword"))
        }
        const newUser = await User.create({
            firstname , lastname , email , password : hashedPassword
        })
        if(!newUser){
            next(customError(400 , "Not able to create user"))
        }
        return res.status(200).json({
            success : true,
            message : "user created successfully"
        })
    
    }catch(err){
        next(err)
    }
}
