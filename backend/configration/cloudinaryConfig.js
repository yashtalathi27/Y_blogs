const cloudinary=require('cloudinary').v2;
const dotenv=require('dotenv');
dotenv.config();

const api_key=process.env.API_KEY;
const api_secret=process.env.API_SECRET;
const cloud_name=process.env.CLOUD_NAME;

async function cloudinaryConfig() {
    try {
        await cloudinary.config({
            cloud_name, 
            api_key, 
            api_secret
        })    
        console.log("cloudinary sucess");
    } catch (error) {
        console.log("eroorr in cloudinary");
    }   
}

module.exports={
    cloudinaryConfig
}