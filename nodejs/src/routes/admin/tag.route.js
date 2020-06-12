var express = require('express');

 var controller = require('../../controllers/admin/tag.controller');

var router = express.Router();

router.get('/tag-show', controller.tagShow);

//Xử lý lấy thông tin chi tiết tag
router.post('/tag-info', controller.tagInfo);

//Xử lý thêm tag
router.post('/tag-add', controller.postAddTag);

// Xử lí post sửa tên tag
router.post("/tag-name-update", controller.postTagNameUpdate);

//Xử lý xóa tag
router.post('/tag-delete', controller.postDeleteTag);

module.exports = router;