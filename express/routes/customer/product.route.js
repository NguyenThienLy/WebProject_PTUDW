var express = require('express');
// var multer = require('multer');

var controller = require('../../controllers/customer/product.controller');
// var validate = require('../validate/user.validate');

// var upload = multer({ dest: './public/uploads/' });

var router = express.Router();

router.get('/product-detail', controller.productDetail);

// Hiển thị tất cả sản phẩm simple và combo
router.get('/product-all-show', controller.productAllShow);

// Hiển thị tất cả sản phẩm combo
router.get('/product-combo-show', controller.productComboShow);

// Hiển thị danh sách sản phẩm simple và combo theo id cat và id sub
router.get('/product-show/:idCat/:idSub', controller.productShowFollowIdCatAndIdSub);

// Thêm sản phẩm vào giỏ hàng theo id cat và id sub
router.get('/add-product/:isSelectAll/:idCat/:idSub/:idProSimple', controller.addProductFollowIdCatAndIdSubToSession);

// Thêm sản phẩm combo vào giỏ hàng theo id cat và id sub
router.get('/add-product-combo/:isSelectAll/:idProCombo', controller.addProductComboToSession);

// Đưa thông tin từ sort lên product-all-show
router.post('/product-all-show', controller.productAllShow);

// Đưa thông tin từ sort lên product-all-show
router.post('/product-combo-show', controller.productComboShow);

// Đưa thông tin từ sort lên product-all-show
router.post('/product-show/:idCat/:idSub', controller.productShowFollowIdCatAndIdSub);

module.exports = router;