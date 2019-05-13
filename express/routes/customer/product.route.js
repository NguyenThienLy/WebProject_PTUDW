var express = require('express');
// var multer = require('multer');

var controller = require('../../controllers/customer/product.controller');
// var validate = require('../validate/user.validate');

// var upload = multer({ dest: './public/uploads/' });

var router = express.Router();

router.get('/product-detail', controller.productDetail);

router.get('/product-show', controller.productShow);

module.exports = router;