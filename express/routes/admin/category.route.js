var express = require('express');

 var controller = require('../../controllers/admin/category.controller');

var router = express.Router();

router.get('/category-show', controller.categoryShow);

//Xử lý show view add danh mục
router.get('/category-add', controller.categoryAdd);

//Xử lý thêm mới danh mục
router.post('/category-add', controller.postCategoryAdd);

//Xử lý lấy thông tin chi tiết danh mục
router.get('/category-update/:id', controller.categoryUpdate);

//Xử lý cập nhật thông tin chi tiết danh mục
router.post('/category-update-info', controller.postCategoryUpdate);

//Xử lý xóa khách hàng
router.post('/category-delete', controller.postDeleteCategory);

module.exports = router;