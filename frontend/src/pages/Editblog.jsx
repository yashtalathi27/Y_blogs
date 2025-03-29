import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams,Navigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { addSelectedBlog, removeSelectedBlog } from "../utils/blogSlice";

function EditBlog() {
    // const data = JSON.parse(localStorage.getItem("token"));
    const data2 = JSON.parse(localStorage.getItem("user"));
    const data=data2.token;
    const dispatch=useDispatch();
  if (!data) {
    return <Navigate to="/signin" />;
  }
  const [blogData, setBlogData] = useState({
    title: "",
    description: "",
    image: null,
  });
  const { id } = useParams();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const {title,description,image}=useSelector(state=>state.blogSlice);

  // Fetch blog data by ID
  async function fetchBlogById() {
    try {
      // const res = await axios.get(`${backendUrl}/blog/${id}`);
      // const { title, description, image } = res.data.blog;
      // one api call is reduceddd

      setBlogData({ title, description, image });
    } catch (error) {
      toast.error("Error fetching blog data");
    }
  }

  // Update blog data
  async function handleUpdateBlog(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", blogData.title);
    formData.append("description", blogData.description);
    if (blogData.image) formData.append("image", blogData.image);

    try {
      await axios.patch(`${backendUrl}/blog/${id}`,
         formData, {
        headers: { "Content-Type": "application/json",
            Authorization:`bearer ${data}`
         },
      });
      toast.success("Blog updated successfully!");
    } catch (error) {
      toast.error("Error updating blog");
    }
  }useEffect(() => {
    const currentPath = window.location.pathname;
    const expectedPath = `/blog/edit/${id}`;
    
    if (currentPath !== expectedPath) {
        dispatch(removeSelectedBlog());
    }
    fetchBlogById();
}, [id, dispatch]);

  return (
    <div className="flex flex-col items-center p-5 w-full min-h-screen">
      <h1 className="text-3xl font-bold mb-5">Edit Blog</h1>
      <form
        className="w-full max-w-lg flex flex-col gap-5 bg-white p-6 shadow-md rounded-md"
        onSubmit={handleUpdateBlog}
      >
        <div className="flex flex-col">
          <label htmlFor="title" className="font-semibold mb-1">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={blogData.title}
            onChange={(e) =>
              setBlogData((prev) => ({ ...prev, title: e.target.value }))
            }
            className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="description" className="font-semibold mb-1">
            Description
          </label>
          <textarea
            id="description"
            rows="4"
            value={blogData.description}
            onChange={(e) =>
              setBlogData((prev) => ({ ...prev, description: e.target.value }))
            }
            className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>
        <div className="flex flex-col">
          <label htmlFor="image" className="font-semibold mb-1">
            Update Image
          </label>
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={(e) =>
              setBlogData((prev) => ({ ...prev, image: e.target.files[0] }))
            }
            className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 mt-6 text-white p-3 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Update Blog
        </button>
      </form>
    </div>
  );
}

export default EditBlog;
