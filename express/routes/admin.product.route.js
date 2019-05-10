var express = require('express');
// var multer = require('multer');

 var controller = require('../controllers/admin.product.controller');
// var validate = require('../validate/user.validate');

// var upload = multer({ dest: './public/uploads/' });

var router = express.Router();

router.get('/product-show', controller.productShow);

router.get('/product-add', controller.productAdd);

module.exports = router;