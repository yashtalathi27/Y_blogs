const mongoose=require('mongoose');

const commentSchema=new mongoose.Schema({
    comment:{
        type:String,
        required:true
    },
    blog:{
        type:String,
        ref:"Blog"
    },
    user:{
        type:String,
        ref:"User"
    },
    

},{timestamps:true})

const Comment=mongoose.model("Comment",commentSchema);

module.exports=Comment;