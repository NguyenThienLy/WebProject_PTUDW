var express = require('express');

 var controller = require('../../controllers/admin/subCategory.controller');

var router = express.Router();

router.get('/subCategory-show', controller.subCategoryShow);

//Xử lý show view add danh mục
router.get('/subCategory-add', controller.subCategoryAdd);

//Xử lý thêm mới danh mục
router.post('/subCategory-add', controller.postSubCategoryAdd);

//Xử lý lấy thông tin chi tiết danh mục
router.get('/subCategory-update/:id', controller.subCategoryUpdate);

//Xử lý cập nhật thông tin chi tiết danh mục
router.post('/subCategory-update/:id', controller.postSubCategoryUpdate);

//Xử lý xóa subCategory
router.post('/subCategory-delete', controller.postDeleteSubCategory);

//Kiểm tra xem xóa subCategory hợp lệ không
router.post('/subCategory-is-valid-delete', controller.postIsValidDeleteSubCategory);

module.exports = router;