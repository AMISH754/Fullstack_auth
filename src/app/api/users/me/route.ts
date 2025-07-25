import {getDataFromToken} from "@/helpers/getDataFromToken";

import {NextRequest,NextResponse} from "next/server";

import User from "@/models/userModel";
import {connect} from "@/dbConfig/dbConfig";

connect();

export async function GET(request:NextRequest){
    try{
      console.log("Incoming request to /api/users/me");

       const userId = await getDataFromToken(request);
       console.log("Extracted userId:", userId);
       console.log({_id:userId});
      const user= await User.findOne({_id:userId}).select("-password");
      console.log(user);
      if (!user) {
        console.log("UserId");
       return NextResponse.json({ error: "User not found" }, { status: 404 });
       }

      return NextResponse.json({
        message:"User Found",
        data:user
      })  ;

    }catch(error:any){
        return NextResponse.json({error:error.message},{status:400});
    }

}