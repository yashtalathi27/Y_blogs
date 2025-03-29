import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addSelectedBlog, removeSelectedBlog } from "../utils/blogSlice";
import CommentPanel from "../components/CommentPanel";

function BlogPage() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const data2 = JSON.parse(localStorage.getItem("user"));
  const token = data2?.token;
  const email = data2?.email;
  const userid = data2?.id;
  const [isCommentPanelOpen, setCommentPanelOpen] = useState(false);
  // const { token, email } = useSelector((state) => state.userSlice || {});
  // const { likes } = useSelector((slice) => slice.currentBlog || {});

  const [blogdata, setBlog] = useState({});
  const [isLike, setLike] = useState(false);

  const {comments}=useSelector((state)=>state.blogSlice)

  async function fetchBlogById() {
    try {
      const res = await axios.get(`${backendUrl}/blog/${id}`);
      setBlog(res.data.blog);
      setTotalLike(res.data.blog?.likes.length);
      console.log(res.data.blog?.likes.includes(userid));

      if (res.data.blog?.likes.includes(id)) {
        setLike((prev) => !prev);
      } else {
        setLike((prev) => !prev);
      }
      dispatch(addSelectedBlog(res.data.blog));
    } catch (error) {
      toast.error("Error fetching blog");
    }
  }
  const [totalLike, setTotalLike] = useState(blogdata.likes?.length || 0);

  async function handleLike() {
    try {
      const res = await axios.post(`${backendUrl}/blog/like/${id}`, blogdata, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `bearer ${token}`,
        },
      });
      if (res.data.sucess) {
        if (res.data.liked) {
          setLike((prev) => !prev);
          setTotalLike((prev) => prev + 1);
          toast.success(res.data.message);
        } else {
          setLike((prev) => !prev);
          setTotalLike((prev) => Math.max(prev - 1, 0));
          toast.success(res.data.message);
        }
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Error handling like");
    }
  }
  useEffect(() => {
    const currentPath = window.location.pathname;
    const expectedPath = `/blog/edit/${id}`;

    if (currentPath !== expectedPath) {
      dispatch(removeSelectedBlog());
    }
    fetchBlogById();
  }, [id, dispatch]);

  // if (!token) {
  //   return <div className="text-gray-500 text-lg">Loading...</div>;
  // }

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
          
          <div className="text-center flex justify-between">
                
                <div className="px-4 py-2 bg-slate-100 rounded-md" onClick={handleLike}>
                <p className="text-gray-600 font-semibold">
                  Likes: {totalLike || 0}
                </p>
                  {isLike ? (
                    <i className="fi fi-sr-thumbs-up"></i>
                  ) : (
                    <i className="fi fi-br-social-network"></i>
                  )}
                </div>
                <div
                  className="px-4 py-2 cursor-pointer bg-slate-100 rounded-md"
                  onClick={() => setCommentPanelOpen(!isCommentPanelOpen)}
                >
                  <p className="text-gray-600 font-semibold">Comments :{comments?.length || 0}</p>
                  <i className="fi fi-br-comments"></i>
                </div>
              </div>
          <div className="p-6">
            <p className="text-gray-600 mb-4">{blogdata.description}</p>

            <div className="flex items-center justify-between">
              <div>
                <div className="flex gap-2 ">

                <p className="text-sm text-gray-500">Written by:</p>
                <p className="text-gray-800 font-medium">
                  {blogdata.creator?.name || "Unknown"}
                </p>
                </div>
                <p className="text-sm text-gray-500">
                  Email: {blogdata.creator?.email || "Not available"}
                </p>
              </div>
            </div>

            <div className="flex justify-between">
            <p className="text-sm text-gray-500 mt-4">
              Published on:{" "}
              {new Date(blogdata.createdAt).toLocaleDateString("en-US")}
            </p>

            {token && blogdata.creator?.email === email ? (
              <Link to={`/blog/edit/${id}`}>
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 mt-2">
                  Edit
                </button>
              </Link>
            ) : (
              <div></div>
            )}
            </div>
           
          </div>
        </div>
      ) : (
        <div className="text-gray-500 text-lg">Loading...</div>
      )}
      <CommentPanel
        isOpen={isCommentPanelOpen}
        onClose={() => setCommentPanelOpen(false)}
      />
    </div>
  );
}

export default BlogPage;
