const express = require("express");
const Blog = require("../model/blogSchema");
const User = require("../model/userSchema");
const Comment=require("../model/commentSchema")

async function likeBlog(req, res) {
    try {
      const creator = req.user;
      const { id } = req.params;
  
      const blog = await Blog.findOne({blogid:id});
  
      if (!blog) {
        return res.status(500).json({
          message: "Blog not found",
        });
      }
  
      if (!blog.likes.includes(creator)) {
        await Blog.findOneAndUpdate({blogid:id}, { $push: { likes: creator } });
        return res.status(200).json({
          liked:true,
          sucess:true,
          message: "Blog Liked sucessfully",
        });
      } else {
        await Blog.findOneAndUpdate({blogid:id}, { $pull: { likes: creator } });
        return res.status(200).json({
          liked:false,
          sucess:true,
          message: "Blog UnLiked sucessfully",
        });
      }
    } catch (error) {
      return res.status(500).json({
        message: "Internal server error",
        error: error.errmsg,
      });
    }
  }
  
async function commentBlog(req, res) {
    try {
      // console.log("Sad");
      
      console.log(req.body);
      
      const { id } = req.params;
      const {comment} =req.body;
      const creator = req.user;
      // console.log(id,comment,creator);
      
      if(!comment){
          return res.status(404).json({
              message: "Comment not found",
              success: false,
          });  
      }
  
      const blog = await Blog.findOne({blogid:id});
  
      // console.log(blog);
      
      if (!blog) {
        return res.status(404).json({
          message: "Blog not found",
          success: false,
        });
      }
  
      // create comment
      const createComment=await Comment.create({
          comment,
          blog:id,
          user:creator
      }).then((comment)=>{
        return comment.populate({
          path:"user",
          select:"name"
        })
      })
  
      await Blog.findOneAndUpdate({blogid:id},{$push:{comments:createComment._id}})
  
      return res.status(200).json({
          message: "Comment added sucessfully",
          sucess:true,
          createComment
      });
  
    } catch (err) {
      return res.status(500).json({
        message: "Internal server error",
        error: err.errmsg,
      });
    }
}  
  
async function deleteComment(req, res) {
      try {
        const { id } = req.params;
        const userid = req.user;
        // console.log(id,comment,creator);
        
        const comment = await Comment.findById(id).populate({
          path:"blog",
          select:"creator"
        });
    
      //   console.log(comment.blog.creator, userid, comment.user);
        
        if (!comment) {
          return res.status(404).json({
            message: "Comment not found",
            success: false,
          });
        }
  
        if(comment.user != userid && comment.blog.creator!=userid){
          return res.status(404).json({
              message: "not an authorized",
              success: false,
            });
        }
  
        await Comment.findByIdAndDelete(id);
        await Blog.findByIdAndUpdate(comment.blog._id,{$pull:{comments:id}})
  
        return res.status(200).json({
            success:true,
            message: "Comment deleted sucessfully",
        });
    
      } catch (err) {
        return res.status(500).json({
          message: "Internal server error",
          error: err.errmsg,
        });
      }
} 

async function editComment(req, res) {
    try {
      const { id } = req.params;
      const userid = req.user;
      const updatedcomment=req.body.comment;
      // console.log(id,comment,creator);
      
      const comment = await Comment.findById(id).populate({
        path:"blog",
        select:"creator"
      });

      console.log(comment);
      
    //   console.log(comment.blog.creator, userid, comment.user);
      
      if (!comment) {
        return res.status(404).json({
          message: "Comment not found",
          success: false,
        });
      }

      if(comment.blog.creator!=userid){
        return res.status(404).json({
            message: "not an authorized",
            success: false,
          });
      }
      await Comment.findByIdAndUpdate(id,{comment:updatedcomment});
      return res.status(200).json({
          success:true,
          message: "Comment edited sucessfully",
      });
  
    } catch (err) {
      return res.status(500).json({
        message: "Internal server error",
        error: err.errmsg,
      });
    }
} 


module.exports = {
    likeBlog,
    commentBlog,
    deleteComment,
    editComment
};
