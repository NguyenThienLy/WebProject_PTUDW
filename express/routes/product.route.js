var express = require('express');

var controller = require('../controllers/product.controller');
var validate = require('../validate/product.validate');

var router = express.Router();

router.get('/', controller.index);

router.get('/search', controller.search);

router.get('/create', controller.create);

/*router.get('/:id', controller.get);*/

router.post('/create', validate.postCreate, controller.postCreate);

module.exports = router;