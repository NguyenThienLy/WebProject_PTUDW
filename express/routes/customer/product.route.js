var express = require('express');
// var multer = require('multer');

var controller = require('../../controllers/customer/product.controller');
// var validate = require('../validate/user.validate');

// var upload = multer({ dest: './public/uploads/' });

var router = express.Router();

router.get('/product-detail', controller.productDetail);

router.get('/product-show', controller.productShow);

// Hiển thị danh sách sản phẩm simple theo id cat
router.get('/product-show/:idCat', controller.productShowFollowIdCat);

// Hiển thị danh sách sản phẩm simple theo id cat và id sub
router.get('/product-show/:idCat/:idSub', controller.productShowFollowIdCatAndIdSub);

// Thêm sản phẩm vào giỏ hàng theo id cat
router.get('/add-product/:idCat/:idProSimple', controller.addProductFollowIdCatToSession);

// Thêm sản phẩm vào giỏ hàng theo id cat và id sub
router.get('/add-product/:idCat/:idSub/:idProSimple', controller.addProductFollowIdCatAndIdSubToSession);

// Thêm sản phẩm combo vào giỏ hàng theo id cat
router.get('/add-product-combo/:idCat/:idSub/:idProCombo', controller.addProductComboFollowIdCatToSession);

// Thêm sản phẩm combo vào giỏ hàng theo id cat và id sub
router.get('/add-product-combo/:idCat/:idSub/:idProCombo', controller.addProductComboFollowIdCatAndIdSubToSession);

module.exports = router;