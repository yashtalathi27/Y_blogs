const express=require('express')
const {verifyJWT}=require('../utils/generateToken')

async function verifyUser(req,res,next) {
    // console.log(req.headers.authorization); 
    let token=req.headers.authorization.split(" ")[1]
    // let token=req.headers.authorization
    if(!token){
        return res.json({message:"sign in",sucess:false})
    }
    console.log(token);
    
    const verify=await verifyJWT(token);
    console.log(verify);
    
    // console.log("Vefify middleware");
    req.user=verify.id;
    next();
}

module.exports={
    verifyUser
}