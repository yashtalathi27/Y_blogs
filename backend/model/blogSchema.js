const mongoose=require('mongoose');

const blogSchema=new mongoose.Schema({
    title:{
        type:String,
        trim:true,
        required:true
    },
    description:{
        required:true,
        type:String
    },
    image:{
        type:String,
    },
    imageId:{
        type:String
    },
    draft:{
        type:Boolean,
        default:false
    },
    creator:{
        type:mongoose.Schema.Types.ObjectId,
        // type:String,
        required:true,
        ref:"User"
    },
    likes:[
        {
            type:String,
            ref:"User",
        }
    ],
    comments:[   
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Comment"
    },
],
blogid:{
    type:String,
    required:true
}
},{timestamps:true})

const Blog=mongoose.model('Blog',blogSchema);

module.exports=Blog;