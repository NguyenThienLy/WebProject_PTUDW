var express = require("express");
var controller = require("../../controllers/customer/cart.controller");

var router = express.Router();

router.get("/cart-detail", controller.cartDetail);

router.get("/cart-order", controller.cartOrder);

// router.post('/cart-detail', controller.cartDetail);

// Thêm sản phẩm trong giỏ hàng
router.post('/add-product-in-cart', controller.addProductInCart);

// Xóa sản phẩm trong giỏ hàng
router.post('/remove-product-in-cart', controller.removeProductInCart);

// Cập nhật số lượng sản phẩm trong giỏ hàng
router.post('/update-quantity-product-in-cart', controller.updateQuantityProductInCart);

module.exports = router;

