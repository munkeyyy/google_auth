import mongoose, { Schema } from "mongoose";

const UserSChema = new Schema({
    email:{
        type:String,
        unique:true,
        requiredL:true
    },
    name:{
        type:String,
        required:true
    },
    googleId:{
        type:String
    },
    image:{
        type:String,
        default:null
    }
})

export default mongoose.model("user", UserSChema)