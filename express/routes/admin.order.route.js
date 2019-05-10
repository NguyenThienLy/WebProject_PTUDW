var express = require('express');
// var multer = require('multer');

 var controller = require('../controllers/admin.order.controller');
// var validate = require('../validate/user.validate');

// var upload = multer({ dest: './public/uploads/' });

var router = express.Router();

router.get('/', controller.orderListShow);

module.exports = router;