import Listing from "../Models/ListingModal.js";

export const createListing = async(req,res)=>{
    try{
        const {name , address , description , regularPrice , discountedPrice , parking , type , offer , imageUrls , bedrooms , bathrooms , furnished } = req.body
        // if(!name || !address || !description || !regularPrice || !discountedPrice || !parking || !type || !offer || !imageUrls || !bedrooms || !bathrooms || !furnished || !userRef ){
        //     return res.status(404).json({
        //         message : "Details not found",
        //         success : false
        //     })
            
        // }
        const userRef = req.user
        if(!name){
            return res.json({
                message : "name not found"
            })
        }
        if(!address){
            return res.json({
                message : "address not found"
            })
        }
        if(!description){
            return res.json({
                message : "description not found"
            })
        }
        if(!regularPrice){
            return res.json({
                message : "regularPrice not found"
            })
        }
        if(!discountedPrice){
            return res.json({
                message : "discountedPrice not found"
            })
        }
        if(parking==undefined){
            return res.json({
                message : "parking not found"
            })
        }
        if(!type){
            return res.json({
                message : "type not found"
            })
        }
        if(offer==undefined){
            return res.json({
                message : "offer not found"
            })
        }
        if(!imageUrls){
            return res.json({
                message : "imageUrls not found"
            })
        }
        if(!bedrooms){
            return res.json({
                message : "bedrooms not found"
            })
        }
        if(!bathrooms){
            return res.json({
                message : "bathrooms not found"
            })
        }
        if(furnished==undefined){
            return res.json({
                message : "furnished not found"
            })
        }
        if(!userRef){
            return res.json({
                message : "userRef not found"
            })
        }
        const newListing = await Listing.create({name : name , address : address , description : description, regularPrice : regularPrice ,
            discountedPrice :  discountedPrice , parking : parking, type : type, offer : offer, imageUrls : imageUrls , bedrooms : bedrooms , bathrooms : bathrooms, furnished : furnished, 
            userRef})
        if(!createListing){
            return res.json({
                success : false,
                message : "not able to create Listing at the moment"
            })
        }
        return res.status(200).json({
            success : true,
            message : "Listing created Successfully",
            listing : newListing
        })    
    }catch(err){
        return res.status(500).json({
            success : false,
            message : "Internal Server Error"
        })
    }
}
export const updateListing = async(req,res)=>{
    try{
        const {name , address , description , regularPrice , discountedPrice , parking , type , offer , imageUrls , bedrooms , bathrooms , furnished , _id} = req.body
        console.log(_id)
        const findListing = await Listing.findById({_id : _id})
        if(!findListing){
            return res.status(404).json({
                success : false,
                message : "Listing not found"
            })
        }
        if(name!=undefined){
            findListing.name = name
        }
        if(address!=undefined){
            findListing.address = address
        }
        if(description!=undefined){
            findListing.description = description
        }
        if(regularPrice!=undefined){
            findListing.regularPrice = regularPrice
        }
        if(discountedPrice!=undefined){
            findListing.discountedPrice = discountedPrice
        }
        if(parking!=undefined){
            findListing.parking = parking
        }
        if(type!=undefined){
            findListing.type = type
        }
        if(offer!=undefined){
            findListing.offer = offer
        }
        if(imageUrls!=undefined){
            findListing.imageUrls = imageUrls
        }
        if(bedrooms!=undefined){
            findListing.bedrooms = bedrooms
        }
        if(bathrooms!=undefined){
            findListing.bathrooms = bathrooms
        }
        if(furnished!=undefined){
            findListing.furnished = furnished
        }
        await findListing.save()
        return res.status(200).json({
            success : true,
            message : `listing ${_id} updated Successfully !!`,
            listing : findListing
        })
    }catch(err){
        return res.status(500).json({
            success : false,
            message : "Internal Server Error"
        })
    }
}
export const userListing = async(req,res)=>{
    try{
        const userId = req.user._id
        console.log("userId" , userId)
        const findAllListings = await Listing.find({userRef : userId})
        if(!findAllListings){
            return res.status(404).json({
                success : false,
                message : "No listing found for the user"
            })
        }
        return res.status(200).json({
            success : true,
            message : "Listing found",
            listing : findAllListings
        })
    }catch(err){
        return res.status(500).json({
            success : false,
            message : "Internal server error"
        })
    }
}
export const findListing = async(req,res)=>{
    try{    
        const {listingId} = req.body
        console.log(listingId)
        const listing = await Listing.findById(listingId) 
        if(!listing){
            return res.status(404).json({
                success : false,
                message : "Listing not found"
            })
        }
        return res.status(200).json({
            success : true,
            message : "Listing found",
            listing : listing
        })
    }catch(err){
        return res.status(500).json({
            success : false,
            message : "Internal Server Error"
        })
    }
}
export const deleteListing = async(req,res)=>{
    try{
        const {listingId} = req.body
        console.log(listingId)
        const dltListing = await Listing.findByIdAndDelete({_id : listingId})
        if(!dltListing){
            return res.status(401).json({
                success : false,
                message : "Not able to delete Listing"
            })
        }
        return res.status(200).json({
            success : true,
            message : "Deleted Successfully"
        })
    }catch(err){
       return res.status(500).json({
            success : false,
            message : "internal Server Error"
        })
    }
}
export const getListing = async(req,res)=>{
    try{
        const limit = parseInt(req.query.limit) || 9
        const startIndex = parseInt(req.query.startIndex) || 0
        let offer = req.query.offer
        
        if(offer === undefined || offer === 'false'){
            offer = {$in : [false,true]}
        }
        let furnished = req.query.furnished
        
        if(furnished === undefined || furnished === 'false'){
            furnished = { $in : [false,true]}
        }
        let parking = req.query.parking
        
        if(parking === undefined || parking === 'false'){
            parking = { $in : [ false , true ]}
        }
        
        let type = req.query.type
        if(type === undefined || type === 'all'){
            type = { $in : ['Sale' ,'Rent'  ]}
        }

        const searchTerm = req.query.searchTerm || ''
        const sortOnTheBasis = req.query.sortOnTheBasis || 'createdAt'
        let { order } = req.query || -1
        if(order === 'desc'){
            order = -1
        }
        if(order === 'asc'){
            order = 1
        }
      

        console.log("offer", req.query.offer)
        console.log("furnished" ,req.query.furnished)
        console.log("parking" , req.query.parking)
        console.log("type " , req.query.type)
        console.log("searchTerm" , req.query.searchTerm)
        console.log("sort" ,req.query.sortOnTheBasis)
        console.log("limit" , req.query.limit ,  "index" ,req.query.startIndex)
        console.log("order" , req.query.order , "sortOnTheBasis" , req.query.sortOnTheBasis)

        
        const listings = await Listing.find({
            name : {
                $regex : searchTerm  , $options : 'i'
            },
            offer,
            furnished,
            parking,
            type
        }).sort({[sortOnTheBasis] : order , }).limit(limit).skip(startIndex)

        if(!listings){
            return res.status(404).json({
                success: false,
                message : "Listing not found"
            })
        }
        return res.status(200).json({
            success : true,
            message : "Listings fetched",
            listings : listings
        })
    }catch(err){
        console.log(err)
    }
}