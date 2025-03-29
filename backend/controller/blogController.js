const express = require("express");
const Blog = require("../model/blogSchema");
const User = require("../model/userSchema");
const Comment = require("../model/commentSchema");
const { verifyJWT, decodeJWT } = require("../utils/generateToken");
const {uploadImage,deleteImage}=require('../utils/cloudinary')
const fs=require('fs');
const uniqid=require('uniqid');
const { log } = require("console");

// SAFE ROUTES

async function createBlog(req, res) {
  // const blog=req.body;
  // if(!req.body.token){
  //     return res.status(200).json({
  //         message:"please signin",
  //         sucess:false,
  //     })
  // }

  // let decode=await decodeJWT(req.body.token);

  // let isValid=await verifyJWT(req.body.token) ;
  // if(!isValid){
  //     return res.status(200).json({
  //         message:"please signin",
  //         sucess:false,
  //     })
  // }

  // console.log(blog);
//   const { title, description, draft } = req.body;
    const { title, description,draft } = req.body;
    console.log(req.body);
    
  const creator = req.user;
  const image=req.file;
  console.log("Creator:", creator);
  console.log("Request Body:", req.body);
  console.log("Request File:", req.File);

  if (!title || !description) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const findUser = await User.findById(creator);
    const imagePath = image.path;
    const result = await uploadImage(imagePath);
    // console.log(url);
    let secureUrl=result.secure_url;
    let publicKey=result.public_id

    if (!findUser) {
      return res.status(404).json({ message: "User not found" });
    }

    fs.unlinkSync(imagePath);

    // const blogid=title.tolowercase().replace(/ /g,"-");
    
    let blogid=title.toLowerCase().split(" ").join("-");
    blogid=blogid+"-"+uniqid().split(0,7);
    console.log(blogid);
    

    const blog = await Blog.create({
      title,
      description,
      creator,
      draft,
      image:secureUrl,
      imageId:publicKey,
      blogid
    });

    console.log("Blog created:", blog);

    await User.findByIdAndUpdate(blog.creator, {
      $push: { blogs: blog._id },
    });

    return res.status(201).json(
        { message: "Blog created successfully" });
  } catch (error) {
    console.error("Error creating blog:", error);
    return res.status(500).json({ message: "An error occurred", error });
  }
}

async function getBlogs(req, res) {
  try {
    // const blogs=await Blog.find().populate("creator");

    const blogs = await Blog.find().populate({
      path: "creator",
      // select:"name"
      select: "-password",
    });

    if (blogs.length > 0) {
      return res.json({ blogs });
    }
    if (blogs.length == 0) {
      return res.json({ message: "no blogs are there" });
    }
  } catch (error) {}
}

async function getBlog(req, res) {
  try {
    const { id } = req.params;
    const blog = await Blog.findOne({blogid:id}).populate([
      {
        path: "comments",
        populate: {
          path: "user",
          select: "name",
        },
      }
    ]).populate(
      {
      path:"creator",
      select:"email name"
    });
    
    console.log(blog);

    if (blog) {
      return res.json({ blog });
    } else {
      return res.json({ message: "no blogs are there" });
    }
  } catch (error) {
    return res.json({ message: "internal error" });
  }
}

async function updateBlog(req, res) {
  try {
    const { title, description } = req.body;
    log(req.body)
    console.log(title,description);
    
    // console.log(creator);
    // console.log(req.body);
    const { id } = req.params;
    const creator = req.user; // Assume this is populated by middleware
    console.log("Authenticated User:", creator);

    const blog = await Blog.findOne({blogid:id});
    if (!blog) {
      return res.status(400).json({
        message: "Blog not found",
        success: false,
      });
    }
    const blodidd=blog.creator?._id.toString();
    console.log("Blog Creator:", blodidd,creator);

    if(blodidd!=creator){
      return res.json({
        success:false,
        message:"not your blog"
      })
    }
    

    const upd = await Blog.findOneAndUpdate(
      { blogid: id },
      {
        title,
        description,
        
      },
      { new: true } // This ensures the updated document is returned
    );
    
    // console.log(upd);
    
    return res.json({
      message: "Blog updates",
      success: true,
    });

    // const user=await User.findById(creator).select("-password");
    // console.log(user);
    // const blg=await user.blogs.find((blgig)=>(blgig===id)) ;
    // console.log(blg );
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
      error: err.errmsg,
    });
  }
}

async function deleteBlog(req, res) {
  try {
    const { id } = req.params;
    const creator = req.user;

    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
        success: false,
      });
    }

    console.log("Blog Creator:", blog.creator);

    if (blog.creator.toString() !== creator.toString()) {
      return res.status(403).json({
        message: "This is not your blog",
        success: false,
      });
    }
    console.log(blog.imageId);
    
    await deleteImage(blog.imageId);

    const b = await Blog.findByIdAndDelete(id);
    console.log(b);

    await User.findByIdAndUpdate(creator, { $pull: { blogs: id } });

    return res.json({
      message: "Blog updates",
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
      error: err.errmsg,
    });
  }
}

module.exports = {
  createBlog,
  deleteBlog,
  updateBlog,
  getBlog,
  getBlogs,
};
