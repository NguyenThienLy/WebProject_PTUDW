var express = require('express');
// var multer = require('multer');

 var controller = require('../../controllers/customer/index.controller');
// var validate = require('../validate/user.validate');

// var upload = multer({ dest: './public/uploads/' });

var router = express.Router();

router.get('/', controller.indexShow);

module.exports = router;