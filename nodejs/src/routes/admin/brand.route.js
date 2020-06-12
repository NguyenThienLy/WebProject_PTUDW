var express = require('express');

 var controller = require('../../controllers/admin/brand.controller');

var router = express.Router();

router.get('/brand-show', controller.brandShow);

//Xử lý lấy thông tin chi tiết brand
router.post('/brand-info', controller.brandInfo);

//Xử lý thêm brand
router.post('/brand-add', controller.postAddBrand);

// Xử lí post sửa tên brand
router.post("/brand-name-update", controller.postBrandNameUpdate);

//Xử lý xóa brand
router.post('/brand-delete', controller.postDeleteBrand);

module.exports = router;