import {connect} from '@/dbConfig/dbConfig';
import User from "@/models/userModel";
import { NextRequest,NextResponse } from "next/server";
import {sendEmail} from "@/helpers/mailer"

connect();

export async function POST(request:NextRequest){
    try{
    const reqBody=await request.json();
    const {email,newpassword,confirmpassword}=reqBody;
    console.log("Parsing request");
    const user=await User.findOne({email});
    console.log("User detail forgot password",user);
    if(!user){
       return NextResponse.json({message:"User not found"},{status:404});
    }
   
    //send mail
    const mail=  await sendEmail({email,emailType:"RESET",userId:user._id});
    return NextResponse.json({message:"Email for reseting password send correctly"},{status:200});

}catch(error:any){
    return NextResponse.json({message:"Error while sending email in forgot password"},{status:500})
}
    

}

