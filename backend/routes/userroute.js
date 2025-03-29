const express=require('express');
const route=express.Router();
const {createUser,getUser,getUserbyId,updateUser,login,verifyEmail}=require('../controller/userController');
const {googleAuth}=require('../configration/firebase')

route.get('/users',getUser)

route.post('/signup', createUser );

route.post('/signin', login );

route.get('/users/:id',getUserbyId)

route.patch('/users/:id',updateUser)

// verifyuser token
route.get('/verify-email/:token',verifyEmail)

route.post('/google-auth',googleAuth)

module.exports=route