import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

function BlogPage() {
  const [blogdata, setBlog] = useState({});
  const { id } = useParams();
  const backendUrl = import.meta.env.VITE_BACKEND_URL

  async function fetchBlogById() {
    try {
      const res = await axios.get(`${backendUrl}/${id}`);
      setBlog(res.data.blog);
    } catch (error) {
      toast.error("Error fetching blog");
    }
  }

  useEffect(() => {
    fetchBlogById();
  }, [id]);

  return (
    <div className="flex flex-col items-center p-5 w-full min-h-screen ">
      {blogdata ? (
        <div className="max-w-3xl w-full bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              {blogdata.title}
            </h1>
          </div>
          <img
            src={blogdata.image}
            alt={blogdata.title}
            className="w-full h-64 object-cover"
          />
          <div className="p-6">
            <p className="text-gray-600 mb-4">{blogdata.description}</p>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Written by:</p>
                <p className="text-gray-800 font-medium">
                  {blogdata.creator?.name || "Unknown"}
                </p>
                <p className="text-sm text-gray-500">
                  Email: {blogdata.creator?.email || "Not available"}
                </p>
              </div>
              <div className="text-center">
                <p className="text-gray-600 font-semibold">
                  Likes: {blogdata.likes?.length || 0}
                </p>
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 mt-2">
                  Like
                </button>
              </div>
            </div>

            <p className="text-sm text-gray-500 mt-4">
              Published on:{" "}
              {new Date(blogdata.createdAt).toLocaleDateString("en-US")}
            </p>

            <div className="mt-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                Comments:
              </h2>
              {blogdata.comments?.length > 0 ? (
                <ul className="space-y-4">
                  {blogdata.comments.map((c, index) => (
                    <li
                      key={index}
                      className="bg-gray-100 p-4 rounded-lg shadow-sm"
                    >
                      <p className="text-gray-800 font-medium">
                        {c.user?.name || "Anonymous"}
                      </p>
                      <p className="text-gray-600">{c.comment}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No comments yet.</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-gray-500 text-lg">Loading...</div>
      )}
    </div>
  );
}

export default BlogPage;
