import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [blogs, setBlogs] = useState([]);

  async function fetchBlogs() {
    try {
      const res = await axios.get("http://localhost:8000/api/v1/blog/");
      setBlogs(res.data.blogs);
      console.log(res.data.blogs);
      
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  }

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
     <div className="w-[60%] mx-auto">
      {blogs.length > 0 ? (
        blogs.map((blog) => (
          <Link to={`blog/${blog.blogid}`}>
          <div
            key={blog._id}
            className="my-5 flex w-full justify-between bg-white shadow-md rounded-md p-5"
          >
            {/* Left Section */}
            <div className="w-[60%] flex-col gap-1">
              <div className="flex items-center gap-2">
                <img
                  src={blog.authorImage || "https://via.placeholder.com/40"}
                  alt="Author"
                  className="w-10 h-10 rounded-full"
                />
                <p>{blog.creator.name || "Anonymous"}</p>
              </div>
              <h2 className="font-bold text-3xl mt-2">{blog.title}</h2>
              <h4 className="line-clamp-2 text-gray-700 mt-1">
                {blog.description || "No content available."}
              </h4>
              <div className="flex gap-5 mt-3 text-sm text-gray-500">
                <p>{new Date(blog.createdAt).toLocaleDateString()}</p>
                <p>{blog.likes.length} Likes</p>
                <p>{blog.comments.length} Comments</p>
              </div>
            </div>

            {/* Right Section */}
            <div className="w-[25%]">
              <img height={"50%"}
                src={
                  blog.image ||
                  "https://via.placeholder.com/150"
                }
                alt={blog.title}
                className="w-full  rounded-md"
              />
            </div>
          </div></Link>
        ))
      ) : (
        <p className="text-center text-gray-500 mt-10">No blogs available.</p>
      )}
    </div>
   
  );
}

export default Home;
