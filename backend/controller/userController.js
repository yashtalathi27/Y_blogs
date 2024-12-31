const express=require('express');
const User=require('../model/userSchema')
const bcrypt=require('bcrypt');
const {generateJWT}=require('../utils/generateToken')

async function createUser(req, res) {
    console.log(req.body);

    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please provide all details",
            });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        const token = await generateJWT({ email: newUser.email, id: newUser._id });
        // console.log(token);

        return res.status(201).json({
            success: true,
            message: "User created successfully",
            user: {
                name: newUser.name,
                email: newUser.email,
            },
            token,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message,
        });
    }
}


async function login(req,res) {
    
    console.log(req.body);
    
    try{
        let { email , password }=req.body;
        if(!email || !password){
            return res.status(200).json({
                sucess:false,
                message:"Please provide all details",
            });
        }
        // users.push(req.body);
        const alreadu=await User.findOne({email:email});
        if(!alreadu){
            return res.status(200).json({
                sucess:false,
                message:"User not exists",
        })}; 

        let checkdorpass=await bcrypt.compare(password,alreadu.password);

        let token=await generateJWT({email:alreadu.email,id:alreadu._id});

        if(!(checkdorpass)){
            return res.status(200).json({
                sucess:false,
                message:"incorrect password",
               
        })}; 

        return res.json({
            message:"User lgin in successfully",
            sucess:true,
            token:token,
            user:{
                name:alreadu.name,
                email:alreadu.email,
                // blogs:alreadu.blogs
            }
        });
    }catch(err){
        return res.status(400).json({
            sucess:false,
            message:"Internal server error",
            error:err.errmsg});
    }

}

async function getUser(req,res) {
        try{
            const users=await User.find({});
            return res.json({
                sucess:true,
                message:"users fetch sucessfully",
                users
            }); 
    
        }catch(err){    
            return res.status(500).json({
                message:"Internal server error",
                sucess:false,
                error:err
            });
        }     
}

async function getUserbyId(req,res) {
        try{
            const id=req.params.id;
    
            const user=await User.findById(id);
    
            // const user=await User.findOne();
            if(user.length==0){
                return res.json({
                    sucess:true,
                    message:"user not found"
                })
            }
    
            return res.json({
                sucess:true,
                message:"users fetch sucessfully",
                user
            }); 
    
        }catch(err){    
            return res.status(500).json({
                message:"Internal server error",
                sucess:false,
                error:err.message
            });
        }     
    
}

async function updateUser(req,res) {
        console.log("req");
        
        try {
            const id=req.params.id;
            const {name,email,password} =req.body;
            const updatedUser=await User.findOneAndUpdate({_id:id},{
                name:name,
                email:email,
                password:password
            },{new:true})
            
            console.log(updatedUser);
            
            return res.json({
                message:"updated user",
                sucess:true
            })
        } catch (error) {
            return res.status(500).json({
                message:"Internal server error",
                sucess:false,
                error:err.message
            });
        }
}

module.exports={
    createUser,
    getUser,
    getUserbyId,
    updateUser,
    login
}