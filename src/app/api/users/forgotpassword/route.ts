import {connect} from '@/dbConfig/dbConfig';
import User from "@/models/userModel";
import { NextRequest,NextResponse } from "next/server";

connect();

export async function POST(request:NextRequest){

    const reqBody=await request.json();
    const {email,newpassword,confirmpassword}=reqBody;
    console.log("Parsing request");
    



}

