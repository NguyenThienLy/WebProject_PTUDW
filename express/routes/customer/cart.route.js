var express = require("express");
var controller = require("../../controllers/customer/cart.controller");

var router = express.Router();

router.get("/cart-detail", controller.cartDetail);

router.get("/cart-order", controller.cartOrder);

// router.post('/cart-detail', controller.cartDetail);

// Thêm sản phẩm trong giỏ hàng
router.post('/add-product-in-cart', controller.addProductInCart);

// Kiểm tra sản phẩm trong giỏ hàng
router.post('/check-product-in-cart', controller.checkProductInCart);

// Xóa sản phẩm trong giỏ hàng
router.post('/remove-product-in-cart', controller.removeProductInCart);

// Cập nhật số lượng sản phẩm trong giỏ hàng
router.post('/update-quantity-product-in-cart', controller.updateQuantityProductInCart);

// Kiểm tra xem các mặt hàng và số lượng tại cart detail và cập nhật lại
router.post('/check-real-quantity-product', controller.checkRealQuantityProduct);

module.exports = router;

