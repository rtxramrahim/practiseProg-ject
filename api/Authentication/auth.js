import  jwt  from "jsonwebtoken"
import dotenv from 'dotenv'
dotenv.config()
export const Auth = (req,res,next)=>{
    try{    
        const jwt_token = req.body.jwt_token || req.cookies.jwt_token || req.header("Authorization").replace("Bearer ","")
        try{
            const decode = jwt.verify(jwt_token , process.env.JWT_SECRET)
            req.user = decode
        }catch(err){
            return res.json({
                success : false,
                message : "Error while validating token"
            })
        }
        next();

    }catch(err){
        return res.status(500).json({
            success : false,
            message : "Internal server error in middleware"
        })
    }
}