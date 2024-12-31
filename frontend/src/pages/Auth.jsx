import React from 'react'
import { useState } from 'react';
import Signup from './signup';
import toast from 'react-hot-toast';
import axios from 'axios';
import {Link}from 'react-router-dom'

function Auth({type}) {
  
    const [user, setUser] = useState({ name: "", email: "", password: "" });

    async function handleAuthForm(event) {
      event.preventDefault();
      console.log(user);
  
    //   try {
        
    // //   const datafetch=await fetch(`http://localhost:8000/api/v1/${type}`,{
    // //     method:"POST",
    // //     body:JSON.stringify(user),
    // //     headers:{
    // //       "Content-type":"application/json"
    // //     }
    // //   })
  
    // //   const res=await datafetch.json();
    // //   if(res.success){
    // //     toast.success("Done")
    // //   }
    // //   else{
        
    // //     toast.error("Who are you??")
    // //   }

    // const res = await axios.post(`http://localhost:8000/api/v1/${type}`, user);

    //   console.log(res);

    //   localStorage.setItem("user",JSON.stringify(res.data.user))
    //   localStorage.setItem("token",JSON.stringify(res.data.token))
    //     if(res.data.success){
    //     toast.success(res.data.message)
    //   }
    //   else{
        
    //     toast.error("Who are ??")
    //   }

    //   } catch (error) {
    //     toast.error("Who are you??")
    //     console.log(error);
        
    //   }
       
    //   alert("Hello");
    try {
        const res = await axios.post(`http://localhost:8000/api/v1/${type}`, user);
    
        if (res.status==200) {
          if (res.data.message === "User already exists") {
            toast.error(res.data.message);
          } else {
            toast.success(res.data.message);
            console.log(":here");
            
            localStorage.setItem('user', JSON.stringify(res.data.user));
            localStorage.setItem('token', JSON.stringify(res.data.token));
          }
        } else {
          toast.error(res.data.message || 'Something went wrong');
        }
      } catch (error) {
        toast.error('Internal server error');
        console.error('Error during authentication:', error.response?.data || error.message);
      }

}
  
    return (
      <div className="w-[20%] flex flex-col items-center gap-5  " >
        <h1 className="text-3xl">{type=="signin" ? "Sign_in":"Sign_up"}</h1>
  
        <form
          className="w-[100%] flex flex-col p-2 items-center gap-5"
          onSubmit={handleAuthForm}
        >
          {type=="signup" && (<input
            type="text"
            className="w-full bg-gray-400 h-[6vh] text-black p-2 text-l rounded-lg placeholder-gray-600"
            placeholder="Enter your Name"
            onChange={(e) =>
              setUser((prev) => ({ ...prev, name: e.target.value }))
            }
          />)}
          <input
            type="email"
            className="w-full p-2 bg-gray-400 h-[6vh] text-black text-l rounded-lg placeholder-gray-600"
            placeholder="Enter your Email"
            onChange={(e) =>
              setUser((prev) => ({ ...prev, email: e.target.value }))
            }
          />
          <input
            type="password"
            className="w-full bg-gray-400 h-[6vh] text-black text-l rounded-lg placeholder-gray-600"
            placeholder="Enter your Password"
            onChange={(e) =>
              setUser((prev) => ({ ...prev, password: e.target.value }))
            }
          />
          <button className="w-[50%] bg-gray-800 h-[6vh] text-white text-xl rounded-lg focus:outline-none">
            {type=="signin"?"Login" : "Register"}
          </button>
        </form>
        {type=="signin" ? <p>Dont have an Account ? <Link to={"/signup"}>Sign_up</Link></p>:   <p>Already have an account? <Link to={"/signin"}>Sign_in</Link></p>}
      </div>
    );
  
}

export default Auth