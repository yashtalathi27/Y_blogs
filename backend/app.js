const { log, error } = require('console');
const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const {dbconnect}=require('./configration/dbconnect');
const {User}=require('./model/userSchema')
const userRoute=require('./routes/userroute');
const blogRout=require('./routes/blogRoute');
const {verifyUser}=require('./middleware/auth')
const {cloudinaryConfig}=require('./configration/cloudinaryConfig')

const dotenv=require('dotenv');
dotenv.config();
const PORT=process.nextTick.PORT;


const app=express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:true}))

app.use('/api/v1',userRoute);
app.use('/api/v1',blogRout);

app.listen(8000,()=>{
    console.log('Server is running on port ');
    dbconnect();
    cloudinaryConfig()
});

