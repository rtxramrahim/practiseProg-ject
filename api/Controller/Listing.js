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
        const {name , address , description , regularPrice , discountedPrice , parking , type , offer , imageUrls , bedrooms , bathrooms , furnished , listingId} = req.body
        const findListing = await Listing.findById(listingId)
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
            message : `listing ${listingId} updated Successfully !!`,
            listing : findListing
        })
    }catch(err){
        return res.status(500).json({
            success : false,
            message : "Internal Server Error"
        })
    }
}