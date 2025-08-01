"use client";

import React,{useState,useEffect} from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";
import axios from "axios";

 
export default function SignupPage(){
const [user,setUser]=useState({
    email:"",
    password:"",
   
});
const [buttonDisabled,setButtonDisabled]=useState(false);
const [loading,setLoading]=useState(false);
const router = useRouter();



 const onLogin=async()=>{
     try{
        setLoading(true);
        const response=await  axios.post("/api/users/login",user);
        console.log("Login success",response.data);
        toast.success("Login success");
        router.push("/profile");
     }catch(error:any){
       console.log("Login failed",error.message)
       toast.error(error.message);
     }finally{
        setLoading(false);
     }
 }
 useEffect(()=>{
    if(user.email.length>0 && user.password.length>0){
        setButtonDisabled(false);
    }else{
        setButtonDisabled(true);
    }
 })

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{loading?"Processing":"Login"}</h1>
            <hr/>
            
            <label htmlFor="email">email</label>
            <input className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="email"
            type="text"
            value={user.email}
            onChange={(e)=>setUser({...user,email:e.target.value})}
            placeholder="email"
            />
            <label htmlFor="password">password</label>
            <input className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="password"
            type="password"
            value={user.password}
            onChange={(e)=>setUser({...user,password:e.target.value})}
            placeholder="password"
            />
            <button
            onClick={onLogin}
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">{buttonDisabled?"No Login":"Login Here"}</button>
            <Link className="py-2 hover:text-blue-800" href="/forgotpassword">Forgot Password</Link> 
            <Link className="hover:text-blue-800" href="/signup">Visit Signup page</Link>

        </div>
    )
}