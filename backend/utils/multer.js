const multer=require('multer');
const path=require('path')

const storage=multer.diskStorage({
    destination:"uploads/",
    filename:function(req,file,cb){
        cb(null,Date.now()+path.extname(file.originalname))
    }
})

const uploads=multer({
    storage
})

module.exports={
    uploads
}