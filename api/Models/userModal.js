import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username : {
        type : String ,
        required : true,
        unique : false
    },
    
    email :{
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String ,
        required : true,
        
    },
    avatar : {
        type : String,
        default : "https://i.stack.imgur.com/34AD2.jpg"
    }
    
})

const User = mongoose.model('User' , userSchema)
export default User

