import {connect} from "@/dbConfig/dbConfig";
import {NextRequest,NextResponse} from "next/server";
import User from "@/models/userModel";
import bcryptjs from 'bcryptjs';


connect();

export async function POST(request:NextRequest){
    try{
        const reqBody=await request.json();
        console.log("Request body:", reqBody);
        const {token}=reqBody;
        console.log(token);
       
        const user = await User.findOne({verifyToken: token, verifyTokenExpiry: {$gt: Date.now()}});


 
        console.log(user);
        if(!user){
            console.log("Error using verify")
            return NextResponse.json({error:'Invalid User token'},{status:400});
        }
        
        console.log("Verified",user.isVerified)
        user.isVerified=true;
        user.verifyToken=undefined;
        user.verifyTokenExpiry=undefined;
        await user.save();

        return NextResponse.json({message:"Email verified successfully",
            success:true
        });


    }
    catch(error:any){
        return NextResponse.json({error:error.message},{status:500})
    }
}