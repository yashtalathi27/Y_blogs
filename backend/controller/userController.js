const express=require('express');
const User=require('../model/userSchema')
const bcrypt=require('bcrypt');
const {generateJWT, verifyJWT}=require('../utils/generateToken')
const {transporter}=require('../utils/transporter')

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
            if(existingUser.googleAuth){
                return res.json({
                    success: false,
                    message: "User already exists by Google ",
                });
            }
            else{
                return res.json({
                    success: false,
                    message: "User already exists",
                });
            }
            
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        // console.log(hashedPassword);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        const token = await generateJWT({ email: newUser.email, id: newUser._id });
        // console.log(token);
        const semail=transporter.sendMail({
            from:"yashtalathi10th@gmail.com",
            to:email,
            subject:"Email Verification",
            html:`<h1>Click on link to vefify email</h1>
            <a href="http://localhost:5173/verify-email/${token}">Verify Email</a>`
        })

        return res.status(200).json({
            success: true,
            message: "Verify your email send on your mail id",
        });
    } catch (err) {
        return res.status(400).json({
            success: false,
            message: "No signed",
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
        if(alreadu.googleAuth){
            return res.json({
                success: false,
                message: "User already exists by Google ",
            });
        }
        if(!alreadu){
            return res.status(200).json({
                sucess:false,
                message:"User not exists",
        })}; 

        let checkdorpass=await bcrypt.compare(password,alreadu.password);

        let token=await generateJWT({email:alreadu.email,id:alreadu._id});
        
        
        if(!(alreadu.verify)){
            return res.status(200).json({
                sucess:false,
                message:"please vefrify your email through signup",
               
        })}; 

        if(!(checkdorpass)){
            return res.json({
                sucess:false,
                message:"incorrect password",
               
        })}; 
        console.log("hi");
         
        return res.json({
            message:"User lgin in successfully",
            sucess:true,
            token:token,
            user:{
                name:alreadu.name,
                email:alreadu.email,
                token,
                id:alreadu._id
                // blogs:alreadu.blogs
            }
        });
    }catch(err){
        return res.json({
            sucess:false,
            message:"Internal server error LOGIN",
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

async function verifyEmail(req,res) {
    try {
        const {token}=req.params;

        const verifytoken=await verifyJWT(token);

        if(!verifytoken){
            return res.json({
                sucess:false,
                message:"invalid token"
            })
        }
        const {email,id}=verifytoken
        const user=await User.findByIdAndUpdate(id,{
            verify:true
        },{new:true})
        console.log(user) ;
        
        return res.json({
            sucess:true,
            message:"Email valid sucessfuly"
        })

    } catch (error) {
        
    }
}



module.exports={
    createUser,
    getUser,
    getUserbyId,
    updateUser,
    login,
    verifyEmail,
}