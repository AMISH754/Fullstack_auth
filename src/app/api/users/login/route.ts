import {connect} from '@/dbConfig/dbConfig';
import User from "@/models/userModel";
import { NextRequest,NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request:NextRequest){
    try{
       const reqBody=await request.json();
       const {email,password}=reqBody;
       console.log("Parsing request body");

       console.log(reqBody);
       console.log("Finding user...");

       const user=await User.findOne({email});
       if(!user){
        return NextResponse.json({error:"User does not exist"},{status:400})
       }
       //check password 
       const validPassword=await bcryptjs.compare(password,user.password);
       if(!validPassword){
        return NextResponse.json({error:"invalid password"},{status:400})
       }
       //create token data
       const tokenData={
        id:user._id,
        username:user.username,
        email:user.email

       }
       //create Token
       const token=  jwt.sign(tokenData,process.env.TOKEN_SECRET!,{expiresIn:"1d"});
        
       //set token to user cookie
       const response=NextResponse.json({
        message:"Login Successful",
        success:true
       });
       response.cookies.set("token",token,{
        httpOnly:true  //- This flag makes the cookie inaccessible to JavaScript on the client side.

       });
       console.log("Response is",response);
       return response;

    }catch(error:any){
        return NextResponse.json({error:error.message},{status:500})

    }
}