import { NextRequest,NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import {connect} from '@/dbConfig/dbConfig';

connect();

export async function POST(req: NextRequest) {
  const { token,newpassword ,confirmpassword } = await req.json();
   if(newpassword!=confirmpassword){
      alert("Password do not match");
      return NextResponse.json({message:"Password do not match"},{status:404})
    }
  try{  
  const decoded: any = jwt.verify(token, process.env.TOKEN_SECRET!);
  const user = await User.findById(decoded.id);
  if (!user) return NextResponse.json({ message: "Invalid token" }, { status: 400 });

  const salt = await bcryptjs.genSalt(10);
  const hashed = await bcryptjs.hash(confirmpassword, salt);

  user.password = hashed;
  await user.save();

  return NextResponse.json({ message: "Password reset successful", success: true });
  }
  catch(error:any){
    return NextResponse.json({message:"Error while password reseting"},{status:500});
  }

}