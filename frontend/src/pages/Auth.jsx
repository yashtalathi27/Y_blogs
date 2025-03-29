import React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import googleIcon from '../assets/google-icon-logo-svgrepo-com.svg'
import {googleAuth} from '../utils/firebase'
// import { login } from "../utils/userSlice";

function Auth({ type }) {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleAuthForm(event) {
    event.preventDefault();
    // console.log(user);
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
      const res = await axios.post(
        `http://localhost:8000/api/v1/${type}`,
        user
      );

      if (type === "signup") {
        toast.success(res.data.message);
        if (res.data.sucess == true) {
          navigate("/signin");
        }
      } else {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        // dispatch(login(res.data.user))
        toast.success(res.data.message);
        if (res.data.sucess == true) {
          navigate("/");
        }
      }
    } catch (error) {
      toast.error("Internal server error");
      console.error(
        "Error during authentication:",
        error.response?.data || error.message
      );
    }
  }
  async function handleGoogleAuth() {
    try {
      const data = await googleAuth();
  
      const accessToken = data.user.accessToken;
      const res = await axios.post("http://localhost:8000/api/v1/google-auth", {
        accessToken,
      });
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // dispatch(googleSlice(res.data.user));
      // dispatch(login(res.data.user))
      console.log(res.data.sucess);
      
      if (res.data?.sucess) {
        toast.success(res.data.message);
        navigate("/"); 
      } else {
        toast.error(res.data?.message);
        navigate("/signin"); 
      }
    } catch (error) {
      // Log and display an error if something goes wrong.
      console.error("Error during Google Authentication:", error.response?.data || error.message);
      toast.error("An error occurred during authentication. Please try again.");
    }
  }

  return (
    <div className="w-[20%] flex flex-col items-center gap-5  ">
      <h1 className="text-3xl">{type == "signin" ? "Sign_in" : "Sign_up"}</h1>

      <form
        className="w-[100%] flex flex-col p-2 items-center gap-5"
        onSubmit={handleAuthForm}
      >
        {type == "signup" && (
          <input
            type="text"
            className="w-full bg-gray-400 h-[6vh] text-black p-2 text-l rounded-lg placeholder-gray-600"
            placeholder="Enter your Name"
            onChange={(e) =>
              setUser((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        )}
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
          {type == "signin" ? "Login" : "Register"}
        </button>
        <p className="font-medium">or</p>

        <div onClick={handleGoogleAuth} className="bg-slate-100 hover:bg-slate-300 w-full flex justify-center overflow-hidden cursor-pointer py-2 px-2 rounded-md">
          <p className="text-1xl font-semibold mr-3">Continue with  </p>
          <div>
            <img className="h-8 w-8 " src={googleIcon} alt="" />
          </div>
        </div>
      </form>
      {type == "signin" ? (
        <p>
          Dont have an Account ? <Link to={"/signup"}>Sign_up</Link>
        </p>
      ) : (
        <p>
          Already have an account? <Link to={"/signin"}>Sign_in</Link>
        </p>
      )}
    </div>
  );
}

export default Auth;
