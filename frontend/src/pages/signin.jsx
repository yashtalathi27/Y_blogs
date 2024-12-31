import React, { useState } from "react";

function Signin() {
  const [user, setUser] = useState({ name: "", email: "", password: "" });

  async function handleSignin(event) {
    event.preventDefault();
    console.log(user);

    try {
      
    const datafetch=await fetch("http://localhost:8000/api/v1/users",{
      method:"POST",
      body:JSON.stringify(user),
      headers:{
        "Content-type":"application/json"
      }
    })

    const res=await datafetch.json();
    console.log(res);
    } catch (error) {
      console.log(error);
      
    }
     
    alert("Hello");
  }

  return (
    <div className="w-[20%] flex flex-col items-center gap-5 ">
      <h1 className="text-3xl">Sign In</h1>

      <form
        className="w-[100%] flex flex-col p-2 items-center gap-5"
        onSubmit={handleSignin}
      >
        <input
          type="text"
          className="w-full bg-gray-400 h-[6vh] text-black p-2 text-l rounded-lg placeholder-gray-600"
          placeholder="Enter your Name"
          onChange={(e) =>
            setUser((prev) => ({ ...prev, name: e.target.value }))
          }
        />
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
          Sign In
        </button>
      </form>
    </div>
  );
}

export default Signin;
