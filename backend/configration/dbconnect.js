const mongoose=require('mongoose');

const dotenv=require('dotenv');
dotenv.config();
const dbURL=process.env.DB_URL;

async function dbconnect(){
    try {
        await mongoose.connect(dbURL);
        console.log('Connected to db');
    } catch (error) {
        log(error);
    }
}

module.exports={dbconnect};
