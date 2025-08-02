"use client";
import React,{useState} from "react"
import {useRouter} from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";

export default function ForgotPassword(){
    const [user,setUser]=useState({
        email:"",
        newpassword:"",
        confirmpassword:""
    });
    const [loading,setLoading]=useState(false);
     const router=useRouter();
   const  handleSubmit=async()=>{
    
    try{
        setLoading(true);
        const response=await axios.post("/api/users/forgotpassword",user);
        console.log(response);
        console.log("Password reset successfully");
        toast.success("Password reset successffully");
        router.push("/login");

    }catch(error:any){
        console.log("Error reseting password");
        toast.error(error.message);
    }finally{
        setLoading(false);
    }
    

    }
     
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 mb-4">
          <h1 className="text-2xl ">{loading?"Processing":"Create New Password"}</h1>
            <hr/>

          <label htmlFor="email">Email</label>
            <input className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="email"
            type="text"
            value={user.email}
            onChange={(e)=>setUser({...user,email:e.target.value})}
            placeholder="email"
            />
           
            <button onClick={handleSubmit} className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Submit</button>

        </div>    
    )
}