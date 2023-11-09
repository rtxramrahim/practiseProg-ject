import mongoose from "mongoose";
const listingSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    address : {
        type : String,
        required : true
    },
    description : {
        type : String ,
        required : true
    },
    regularPrice : {
        type : String,
        required : true
    },
    discountedPrice : {
        type : String,
        required : true
    },
    parking : {
        type : Boolean,
        required : true
    },
    type : {
        type : String,
        // enum : ["Rent" , "Sell" , "Buy" , "Mortgage" ]
        required : true

    },
    offer : {
        type : Boolean,
        required : true,
        
    },
    imageUrls : {
        type :  Array,
        required : true
    },
    bathrooms : {
        type : Number,
        required : true    
    },
    bedrooms : {
        type : Number,
        required : true
    },
    furnished : {
        type : Boolean,
        required : true
    },
    userRef : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }
    
})
const Listing = mongoose.model('Listing' , listingSchema)
export default Listing