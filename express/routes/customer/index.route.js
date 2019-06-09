var express = require('express');
// var multer = require('multer');

 var controller = require('../../controllers/customer/index.controller');
// var validate = require('../validate/user.validate');

// var upload = multer({ dest: './public/uploads/' });

var router = express.Router();

router.get('/', controller.indexShow);

router.post('/load-more-product-simple', controller.loadMoreProductSimple);

router.post('/load-more-product-combo', controller.loadMoreProductCombo);

// router.get('/add-product/:idProductSimple', controller.addProductToSession);

// router.get('/add-product-combo/:idProductCombo', controller.addProductComboToSession);

module.exports = router;