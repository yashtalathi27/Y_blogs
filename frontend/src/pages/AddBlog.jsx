import axios from "axios";
import React, { useState } from "react";
import { Navigate } from "react-router-dom";

function AddBlog() {
  const data = JSON.parse(localStorage.getItem("token"));
  if (!data) {
    return <Navigate to="/signin" />;
  }
  const [blogData,setblogData]=useState({title:"",description:"",image:null})
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

    async function handlepostBlog(e) {
        e.preventDefault()
        try {
         console.log(blogData);
         
        const res = await axios.post(`${backendUrl}/blog/`,
            blogData,{
                headers:{
                    "Content-Type":"multipart/form-data",
                    Authorization:`bearer ${data}`
                }
            });

        } catch (error) {
            console.log(error);
            
        }
      }
   


  return (
    <div className="flex flex-col items-center p-5 w-full min-h-screen">
      <h1 className="text-3xl font-bold mb-5">Add a New Blog</h1>
      <form
        className="w-full max-w-lg flex flex-col gap-5 bg-white p-6 shadow-md rounded-md"
        onSubmit={handlepostBlog}
      >
        <div className="flex flex-col">
          <label htmlFor="title" className="font-semibold mb-1">
            Title
          </label>
          <input
            id="title"
            type="text"
            placeholder="Enter blog title"
            onChange={(e) => setblogData((prev)=>{
                setblogData({...prev,title:e.target.value})
            })}
            className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="description" className="font-semibold mb-1">
            Description
          </label>
          <textarea
            id="description"
            placeholder="Enter blog description"
            rows="4"
            onChange={(e) => setblogData((prev)=>{
                setblogData({...prev,description:e.target.value})
            })}
            className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
           </div>

           <div className="flex flex-col">
            
        <div className=" w-[100%] ">
          {/* <label htmlFor="image" className="font-semibold mb-1 cursor-pointer">
            {blogData.image ? (
              <img src={URL.createObjectURL(blogData.image)} alt="Preview" className="w-full h-full focus:ring-blue-500 rounded-md object-cover" />
            ) : (
              // <div className="w-full h-full bg-gray-500 rounded-md flex items-center justify-center text-white focus:ring-blue-500">
              //   Upload Image
              // </div>
            )}
          </label> */}
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={(e) => {
              setblogData((prev)=>({ ...prev, image:  e.target.files[0] }));
            }}
            // className="hidden"
          />
        </div >
        <button
          type="submit"
          className="bg-blue-500 mt-6 text-white p-3 rounded-md hover:bg-blue-600 transition duration-300 "
        >
          Add Blog
        </button>
           </div>
      </form>
    </div>
  );
}

export default AddBlog;
