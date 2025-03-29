const mongoose=require('mongoose');

const userSchema= new mongoose.Schema({
    name:String,
    email:{
        type:String,
        unique:true
    },
    password:String,
    blogs:[
        {
            // type:mongoose.Schema.Types.ObjectId,
            type:String,
            ref:"Blog"
        }
    ],
    verify:{
        type:Boolean,
        default:false
    },
    googleAuth:{
        type:Boolean,
        default:false
    },
    
})  

const User=mongoose.model("User",userSchema);

module.exports=User