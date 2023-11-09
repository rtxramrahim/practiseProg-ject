import express from 'express'
import  {Auth } from '../Authentication/auth.js'
import { updateProfile } from '../Controller/profile.js'
import { createListing , updateListing} from '../Controller/Listing.js'
const router = express.Router()

router.put('/update' , Auth ,  updateProfile) 
router.post('/listing/create' , Auth , createListing ) 
router.put('/listing/update' , Auth , updateListing )  
export default router