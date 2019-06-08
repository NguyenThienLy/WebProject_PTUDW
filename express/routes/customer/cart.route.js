var express = require('express');
// var multer = require('multer');

 var controller = require('../../controllers/customer/cart.controller');
// var validate = require('../validate/user.validate');

// var upload = multer({ dest: './public/uploads/' });

var router = express.Router();

router.get('/cart-detail', controller.cartDetail);

// router.post('/cart-detail', controller.cartDetail);

// Thêm sản phẩm trong giỏ hàng
router.post('/add-product-in-cart', controller.addProductInCart);

// Xóa sản phẩm trong giỏ hàng
router.post('/remove-product-in-cart', controller.removeProductInCart);

module.exports = router;