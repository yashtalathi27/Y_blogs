const express=require('express');
const route=express.Router();
const {createBlog,
    deleteBlog,
    updateBlog,
    getBlog,
    getBlogs
}=require('../controller/blogController');
const {
    likeBlog,
    commentBlog,
    deleteComment,
    editComment
}=require('../controller/commentController');
const {uploads}=require('../utils/multer')

const { verifyUser } = require('../middleware/auth');

// blog
route.get('/blog',getBlogs)
route.post('/blog',verifyUser,uploads.single("image"),createBlog)
route.get('/blog/:id',getBlog)
route.patch('/blog/:id',verifyUser,updateBlog)
route.delete('/blog/:id',verifyUser,deleteBlog)

// likes
route.post('/blog/like/:id',verifyUser,likeBlog)

// comments
route.post('/blog/comment/:id',verifyUser,commentBlog)
route.delete('/blog/comment/:id',verifyUser,deleteComment)
route.patch('/blog/comment/:id',verifyUser,editComment)

module.exports=route