const express=require('express')
const {verifyJWT}=require('../utils/generateToken')

async function verifyUser(req,res,next) {
    console.log(req.headers.authorization); 
    // let token=req.headers.authorization
    let token = req.headers.authorization.split(" ")[1];
    // let token = req.headers.authorization.replace("Bearer ","")

    if (!token) {
        return res.status(400).json({
            success: false,
            message: "Please sign in",
        });
    }

    
   try {
    const verify=await verifyJWT(token);
    console.log(verify);
    
    // console.log("Vefify middleware");
    req.user=verify.id;
    console.log("here");
    
    next();
   } catch (error) {
    return res.json({
        success: false,
        message: "Please login...Sesion is expired",
    });
   }
}

module.exports={
    verifyUser
}