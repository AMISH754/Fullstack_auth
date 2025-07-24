import mongoose from "mongoose";

const userSchema =new mongoose.Schema({
username:{
    type:String,
    required:[true,"Please provide a username"],
    unique:true
},
email:{
    type:String,
    unique:true,
    required:[true,"Please provide a email"]
},
password:{
    type:String,
    required:[true,"Please provide a password"],
},
isVerified:{
    type:Boolean,
    default:false
},
isAdmin:{
    type:Boolean,
    default:false,
},
forgotPasswordToken:String,
forgotPasswordTokenExpiry:Date,
verify:String,
verifyTokenExpiry:Date
})

const User=mongoose.models.users || mongoose.model("users1",userSchema);

export default User