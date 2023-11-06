import bcrypt from 'bcrypt'
import User from '../Models/userModal.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
export const signup = async(req,res)=>{
    try{
        const { username , email , password } = req.body
        
        if(!username  || !email || !password){
            return res.json({
                success : false,
                message : "All  fields are required"
            })
        }
        const existUser = await User.findOne( {email : email})
        if(existUser){
            return res.json({
                success : false,
                message : "User already exists , Please try with different email !!"
            })
        }
        const hashedPassword = await bcrypt.hash(password , 10)
        console.log(hashedPassword)
        if(!hashedPassword){
            return res.json({
                success : false,
                message : "not able to hash password"
            })
        }
        const newUser = await User.create({
            username , email , password : hashedPassword
        })
        if(!newUser){
            return res.status(401).json({
                success : false,
                message : "Not able to create user"
            })
        }
        return res.status(200).json({
           success : true,
            message : "user created successfully",
            user : newUser
        })
        
    }catch(err){
        return res.status(500).json({
            success : false,
            message : err.message
        })
    }
}
export const signin = async(req,res)=>{
    try{
        const {email , password} = req.body
        console.log(email , password)
        if(!email || !password){
            return res.json({
                success : false,
                message : "All fields are required!"
            })
        }
        const validUser = await User.findOne({email : email})
        if(!validUser){
          return res.json({
                success : false,
                message : "Invalid user , Try signup !"
            })
        }
        console.log(validUser.password)
        const validPassword = await bcrypt.compare(password , validUser.password)

        console.log(validPassword)
        if(!validPassword){
            return res.json({
                success : false,
                message : "Incorrect password!"
            })
        }else{
            const payLoad = {
                _id : validUser._id ,
                username : validUser.username,
                email : validUser.email,
                avatar : validUser.avatar
            }

            const options = {
                httpOnly : true,
                expires : new  Date(Date.now() +  24 * 60 * 60 * 1000) 
            }

            const token = jwt.sign(payLoad , process.env.JWT_SECRET)

            return res.cookie('jwt_token' ,token , options).json({
                success : true,
                message : "Welcome to realEstate bussiness!",
                user : payLoad
            })

        }
        }catch(err){
        return res.status(500).json({
            success : false,
            message : "Internal Server Error!"
        })
    }
}
export const googleSignIn = async(req,res)=>{
    try{
        const { email , photoUrl , displayName} = req.body
        if(!email || !photoUrl || !displayName){
            return res.json({
                success : false,
                message : "Not found"
            })
        }
        const existUser = await User.findOne({email : email})
        if(existUser){
            const payLoad = {
                _id : existUser._id ,
                username : existUser.username,
                email : existUser.email,
                avatar : existUser.avatar
            }

            const options = {
                httpOnly : true,
                expires : new  Date(Date.now() +  24 * 60 * 60 * 1000) 
            }

            const token = jwt.sign(payLoad , process.env.JWT_SECRET)

            return res.cookie('jwt_token' ,token , options).json({
                success : true,
                message : "Welcome to realEstate bussiness!",
                user : payLoad
            })

        }
        else{
            const generatePassword = Math.random().toString(36).slice(-8)
            const password = await bcrypt.hash(generatePassword , 10)
            // let firstname, lastname 
            // if(displayName.includes(" ")){
            //     const newName = displayName.split(" ")
            //     firstname = newName[0]
            //     lastname= newName[1]
            // }
            // else{
            //     firstname = displayName +  Math.random().toString(36).slice(-8)
            //     lastname = " "
            // }
             
            
            // console.log(password , firstname , lastname)

            const newUser = await User.create({username : displayName , email , password , avatar : photoUrl})
            if(!newUser){
                return res.json({
                    success : false,
                    message : "Not able to create user at the moment!"
                })
            }

            const payLoad = {
                _id : newUser._id ,
                username : newUser.username,
                email : newUser.email ,
                avatar : newUser.avatar
            }
            return res.status(200).json({
                success : true,
                message : "Welcome to RealEstate Bussiness!!",
                user : payLoad
            })
        }

    }catch(err){
        return res.status(500).json({
            success : false,
            message : 'Internal server Error'
        })
    }
}