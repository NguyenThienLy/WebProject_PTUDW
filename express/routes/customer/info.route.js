var express = require('express');
// var multer = require('multer');

 var controller = require('../../controllers/customer/info.controller');
// var validate = require('../validate/user.validate');

// var upload = multer({ dest: './public/uploads/' });

var router = express.Router();

router.get('/info-detail', controller.infoDetail);

// Hiển thị tất cả thông tin
router.get('/info-show', controller.infoShow);

// Đưa thông tin từ sort lên info-show
router.post("/post-value-filter", controller.handlePostValueFilter);

module.exports = router;