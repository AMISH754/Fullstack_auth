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
    username:""
});
const [buttonDisabled,setButtonDisabled]=useState(false);
const [loading,setLoading]=useState(false);
const router = useRouter();
 const onSignup=async()=>{
   try{
    setLoading(true);
  const response=await  axios.post("/api/users/signup",user);
  console.log("SignUp Success",response.data);
  router.push("/login");

   }catch(error:any){
    console.log("SignUp Failed",error.message);
    toast.error(error.message);

   }finally{
    setLoading(false);
   }
 }
 useEffect(()=>{
   if(user.email.length>0){
    setButtonDisabled(false);

   }else{
    setButtonDisabled(true);
   }
 })

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{loading?"Processing":"SignUp"}</h1>
            <hr/>
            <label htmlFor="username">username</label>
            <input className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="username"
            type="text"
            value={user.username}
            onChange={(e)=>setUser({...user,username:e.target.value})}
            placeholder="username"
            />
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
            onClick={onSignup}
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">{buttonDisabled?"No Signup":"Signup Here"}</button>
            <Link href="/login">Visit login page</Link>

        </div>
    )
}