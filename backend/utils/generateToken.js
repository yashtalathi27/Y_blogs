const jwt=require('jsonwebtoken');

const dotenv=require('dotenv');
dotenv.config();
const token_secret=process.env.TOKEN_SECRET;

async function generateJWT(payload){
    let token = await jwt.sign(payload,token_secret,{expiresIn:"70d"});
    return token;
}

async function verifyJWT(token){
    let isValid = await jwt.verify(token,token_secret,);
    return isValid; 
}

async function decodeJWT(token){
    let decode = await jwt.decode(token,token_secret);
    return decode; 
}

module.exports={
    generateJWT,
    verifyJWT,
    decodeJWT
}