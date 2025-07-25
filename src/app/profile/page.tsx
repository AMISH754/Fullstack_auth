"use client";
import axios from "axios";
import React,{useState} from "react";
import Link from "next/link";
import {toast} from "react-hot-toast";
import {useRouter} from "next/navigation";
export default  function ProfilePage(){

    const [data,setData]=useState("nothing");
    const  router=useRouter();
    const logout=async()=>{
       try{
       const response=await axios.get("/api/users/logout");
       toast.success("Logout successful");
       router.push("/login");
       }catch(error:any){
        console.log(error.message);
        toast.error(error.message);
       }
    }

    const getUserDetails=async ()=>{
     const res= await  axios.get("/api/users/me");
     console.log(res);
    console.log(res.data);
    setData(res.data.data._id);
    }

    return(
         
            <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr/>
            <p>Profilepage</p>
            <h2 className="bg-blue-400 rounded-md p-4">{data==="nothihng"?"Nothing":<Link href={`/profile/${data}`}>{data}</Link>}</h2>
            <hr/>
            <button onClick={logout} 
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2">
                Logout
            </button>
            <button onClick={getUserDetails} className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-5 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2">
             GetUser Detail
            </button>

            </div>
    );
}