var express = require('express');
var multer = require('multer');

var controller = require('../controllers/cart.controller');

var router = express.Router();

router.get('/add/:productId', controller.addToCart);

module.exports = router;