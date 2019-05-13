var express = require('express');
// var multer = require('multer');

 var controller = require('../../controllers/admin/product.controller');
// var validate = require('../validate/user.validate');

// var upload = multer({ dest: './public/uploads/' });

var router = express.Router();

//Xử lý get để render UI
router.get('/product-show', controller.productShow);

router.get('/product-add', controller.productAdd);

//Xử lý post để thêm dữ liệu vào cơ sở dữ liệu

router.post('/product-add',controller.productAddNew);


module.exports = router;