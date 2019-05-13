var express = require('express');
// var multer = require('multer');

 var controller = require('../../controllers/customer/info.controller');
// var validate = require('../validate/user.validate');

// var upload = multer({ dest: './public/uploads/' });

var router = express.Router();

router.get('/info-detail', controller.infoDetail);

router.get('/info-show', controller.infoShow);

module.exports = router;