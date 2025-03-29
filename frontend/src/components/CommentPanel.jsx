import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addComment } from "../utils/blogSlice";

function CommentPanel({ isOpen, onClose, onPostComment }) {
  const [newComment, setNewComment] = useState("");
  const { id } = useParams();
  const { name } = useSelector((state) => state.userSlice);
  const { comments } = useSelector((state) => state.blogSlice);
  const dispatch=useDispatch();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const user = JSON.parse(localStorage.getItem("user"));
  const token=user.token

  async function handleComment() {
    if (!newComment.trim()) {
      toast.error("Comment cannot be empty!");
      return;
    }

    try {
      const res = await axios.post(
        `${backendUrl}/blog/comment/${id}`,
        { comment: newComment },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
        
      );

      console.log(res.data.createComment);
      dispatch(addComment(res.data.createComment))
      if (res.data.sucess) {
        toast.success("Comment posted successfully!");
        onPostComment(res.data.comment); // Update parent component
        setNewComment(""); // Clear input field
      }
    } catch (error) {
    //   toast.error("Error posting comment");
    }
  }

  return (
    <div
      className={`fixed top-0 right-0 h-full w-64 bg-gray-100 shadow-lg transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-300 ease-in-out`}
    >
      <div className="p-4 relative h-full flex flex-col">
        <div className="flex-grow overflow-y-auto">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Comments</h2>
          <button
            className="absolute top-2 right-2 text-gray-500"
            onClick={onClose}
          >
            Close
          </button>
          {comments ? (
            <ul className="space-y-4 mt-4">
              {comments.map((c, index) => (
                <li
                  key={index}
                  className="bg-gray-200 p-2 rounded-lg shadow-sm"
                >
                  <p className="text-gray-800 font-medium">
                    {c.user?.name || "Anonymous"}
                  </p>
                  <p className="text-gray-600">{c.comment}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 mt-4">No comments yet.</p>
          )}
        </div>
        <div className="p-4 bg-gray-200 flex flex-col">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            className="w-full px-3 py-2 border rounded-lg mb-2"
          />
          <button
            onClick={handleComment}
            className="w-full px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Post Comment
          </button>
        </div>
      </div>
    </div>
  );
}

export default CommentPanel;
