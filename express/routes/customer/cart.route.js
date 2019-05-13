var express = require('express');
// var multer = require('multer');

 var controller = require('../../controllers/customer/cart.controller');
// var validate = require('../validate/user.validate');

// var upload = multer({ dest: './public/uploads/' });

var router = express.Router();

router.get('/cart-detail', controller.cartDetail);

module.exports = router;