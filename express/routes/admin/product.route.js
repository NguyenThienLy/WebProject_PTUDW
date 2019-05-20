var express = require('express');
//Hỗ trợ nhận về POST kiểu multipart
var multer = require('multer');
var path = require('path');

 var controller = require('../../controllers/admin/product.controller');
// var validate = require('../validate/user.validate');

//Tạo Địa chỉ để lưu ảnh
var storage = multer.diskStorage({
    destination:'./public/uploads/',
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
}).fields([
    {name:'img_1'},
    {name:'img_2'},
    {name:'img_3'},
    {name:'img_4'},
    {name:'img_5'},
]);

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

//Xử lý get để render UI
router.get('/product-show', controller.productShow);

router.get('/product-add', controller.productAdd);

//Xử lý post để thêm dữ liệu vào cơ sở dữ liệu
//router.post('/product-add',controller.productAddNew);

//Xử lý post nhận về ảnh và dữ liệu
router.post('/product-add',upload,controller.productAddNew);


module.exports = router;