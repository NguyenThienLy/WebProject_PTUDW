var express = require("express");
// var multer = require('multer');

var controller = require("../../controllers/customer/product.controller");
var addToCartSessionMiddleware = require("../../middlewares/customer/add_to_cart.middleware");

// var upload = multer({ dest: './public/uploads/' });

var router = express.Router();

router.get("/product-detail/product-simple/:idProduct", controller.productSimpleDetail);

router.get("/product-detail/product-combo/:idProduct", controller.productComboDetail);

router.post("/post-comment-product-detail", controller.postCommentProductDetail);

// Hiển thị tất cả sản phẩm simple và combo
router.get("/product-all-show", controller.productAllShow);

// Hiển thị tất cả sản phẩm combo
router.get("/product-combo-show", controller.productComboShow);

// Hiển thị danh sách sản phẩm simple và combo theo id cat và id sub
router.get(
  "/product-show/:idCat/:idSub",
  controller.productShowFollowIdCatAndIdSub
);

// Đưa thông tin từ sort lên product-all-show
//router.post("/product-filter", controller.applyPostValuesFilter);

// router.post("/product-all-show", controller.applyPostForProductAllShow);

// router.post("/product-combo-show", controller.applyPostForProductComboShow);

// router.post("/product-show/:idCat/:idSub", controller.applyPostForProductShow);

router.post("/get-product-suggestion", controller.getProductSuggestion);

// Đưa thông tin từ sort lên product-all-show
//router.get("/product-filter", controller.applyGetValuesFilter);

// // Reset thông tin từ sort lên product-all-show
// router.post("/product-all-show", controller.cancelPostValuesFilter);

// router.post("/product-combo-show", controller.cancelPostValuesFilter);

// router.post("/product-show/:idCat/:idSub", controller.cancelPostValuesFilter);

// // Thêm sản phẩm vào giỏ hàng theo id cat và id sub
// router.get(
//   "/add-product/:isSelectAll/:idCat/:idSub/:idProSimple",
//   controller.addProductFollowIdCatAndIdSubToSession
// );

// // Thêm sản phẩm combo vào giỏ hàng theo id cat và id sub
// router.get(
//   "/add-product-combo/:isSelectAll/:idProCombo",
//   controller.addProductComboToSession
// );

module.exports = router;
