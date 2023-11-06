import express from 'express'
import  {Auth } from '../Authentication/auth.js'
import { updateProfile } from '../Controller/profile.js'
const router = express.Router()

router.put('/update' , Auth ,  updateProfile)    
export default router