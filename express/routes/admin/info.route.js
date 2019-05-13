var express = require('express');
// var multer = require('multer');

 var controller = require('../../controllers/admin/info.controller');
// var validate = require('../validate/user.validate');

// var upload = multer({ dest: './public/uploads/' });

var router = express.Router();

router.get('/info-show', controller.infoShow);

router.get('/info-add', controller.infoAdd);

module.exports = router;