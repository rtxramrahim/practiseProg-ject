import express from 'express'
import { signup , signin , googleSignIn , findUser} from '../Controller/auth.js'
import {Auth} from '../Authentication/auth.js'
const router = express.Router()

router.get("/test" , (req,res)=>{
    res.send("this is test route")
})

router.post("/signup" , signup)
router.post('/signin' , signin)
router.post('/signup/outh/google' , googleSignIn)
router.post('/userId' , Auth , findUser)
export default router