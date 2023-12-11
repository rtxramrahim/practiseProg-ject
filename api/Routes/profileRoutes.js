import express from 'express'
import  {Auth } from '../Authentication/auth.js'
import { updateProfile } from '../Controller/profile.js'
import { createListing , updateListing , userListing , findListing , deleteListing, getListing} from '../Controller/Listing.js'
const router = express.Router()

router.put('/update' , Auth ,  updateProfile) 
router.post('/listing/create' , Auth , createListing ) 
router.put('/listing/update' , Auth , updateListing )  
router.post('/listing/all' , Auth , userListing )
router.delete('/listing/delete' , Auth , deleteListing)
router.post('/listing/find' ,  findListing)
router.post('/listing/get' , getListing)
export default router