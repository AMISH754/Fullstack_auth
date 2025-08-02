"use client";
import React ,{useState} from "react";
import {useRouter} from "next/navigation";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";


export default function ResetPassword(){

  const router = useRouter();
  const [user,setUser]=useState({
    newpassword:"",
    confirmpassword:""
  });
  const [loading,setLoading]=useState(false);
  

   setLoading(true); 
  const token = useSearchParams().get('token');
  console.log("Reset useSearchParams",token)
  

  const handleSubmit = async () => {
   try{
    await axios.post("/api/users/resetpassword", { token,user });
    toast.success("Password reset successfully");
    router.push("/login");
    }catch(error:any){
    console.log("Error reseting password");
    toast.error(error.message);
    }
    finally{
    setLoading(false);
    }
  };


  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 mb-4">
      <h1 className="text-2xl ">{loading?"Processing":"Reset your password"}</h1>
       <label htmlFor="newpassword">New password</label>
            <input className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="newpassword"
            type="password"
            value={user.newpassword}
            onChange={(e)=>setUser({...user,newpassword:e.target.value})}
            placeholder="New password"
            />
            <label htmlFor="confirmpassword">Confirm password</label>
            <input className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="confirmpassword"
            type="password"
            value={user.confirmpassword}
            onChange={(e)=>setUser({...user,confirmpassword:e.target.value})}
            placeholder="Confirm password"
            />
      <button onClick={handleSubmit} className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Reset</button>
    </div>
  );
};