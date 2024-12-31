const express=require('express');
const route=express.Router();
const {createUser,getUser,getUserbyId,updateUser,login}=require('../controller/userController')

route.get('/users',getUser)

route.post('/signup', createUser );

route.post('/signin', login );

route.get('/users/:id',getUserbyId)

route.patch('/users/:id',updateUser)

module.exports=route