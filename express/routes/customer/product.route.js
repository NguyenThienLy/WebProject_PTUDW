var express = require('express');
// var multer = require('multer');

var controller = require('../../controllers/customer/product.controller');
// var validate = require('../validate/user.validate');

// var upload = multer({ dest: './public/uploads/' });

var router = express.Router();

router.get('/product-detail', controller.productDetail);

router.get('/product-show', controller.productShow);

router.get('/product-show/:idCat', controller.productShowFollowIdCat);

router.get('/product-show/:idCat/:idSub', controller.productShowFollowIdSub);

router.get('/add-product/:id', controller.addProductToSession);

router.get('/add-product-combo/:id', controller.addProductComboToSession);

module.exports = router;