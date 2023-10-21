import express from 'express'
import { signup } from '../Controller/auth.js'
const router = express.Router()

router.get("/test" , (req,res)=>{
    res.send("this is test route")
})

router.post("/signup" , signup)



export default router