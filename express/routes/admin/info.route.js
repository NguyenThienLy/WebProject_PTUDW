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

router.post('/info-add-tag', controller.postInfoAddTag);

module.exports = router;