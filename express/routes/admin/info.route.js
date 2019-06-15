var express = require('express');

var multer = require('multer');

var controller = require('../../controllers/admin/info.controller');

const gcsMulter = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 1 * 1024 * 1024 
    }
});

var router = express.Router();

router.get('/info-show', controller.infoShow);

router.get('/info-add', controller.infoAdd);

router.post('/info-add', gcsMulter.single('INFO_IMAGE'), controller.postInfoAdd);

// Xử lí sửa bài viết
router.get("/info-update/:id", controller.infoUpdate);

// Xử lí post sửa bài viết
router.post("/info-update/:id", controller.postInfoUpdate);

//Lấy hình bài viết
router.post('/info-update/get-image', controller.infoImage);

//Cập nhật hình bài viết
router.post('/info-update-image', gcsMulter.single('INFO_IMAGE'), controller.postInfoImageUpdate);

// Xử lí post thêm tag
router.post('/info-add-tag', controller.postInfoAddTag);

//Xử lý xóa bài viết
router.post('/info-delete', controller.postDeleteInfo);

module.exports = router;