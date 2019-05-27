var express = require('express');

var multer = require('multer');
var path = require('path');

var infoValidate = require('../../validate/info.validate');

 var controller = require('../../controllers/admin/info.controller');

//Tạo Địa chỉ để lưu ảnh
var storage = multer.diskStorage({
    destination: '././public/uploads/',
    //Tên ảnh sau khi được tải lên
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now()
            + path.extname(file.originalname));
    }
});

//Gán thuộc tính cho multer 
var upload = multer({
    storage: storage,
    limits: { fileSize: 100000000 },
    fileFilter:(req,file,cb)=>{
        checkFileType(file,cb);
    }
});

//Hàm kiểm tra loại file up lên
function checkFileType(file,cb){
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype  = filetypes.test(file.mimetype);

    if(mimetype && extname){
        return cb(null,true);
    }else{
        cb('Error: Images Only!');
    }
}

var router = express.Router();

router.get('/info-show', controller.infoShow);

router.get('/info-add', controller.infoAdd);

router.post('/info-add', upload.single('image_info'), controller.postInfoAdd);

module.exports = router;