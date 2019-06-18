var express = require('express');
// var multer = require('multer');

 var controller = require('../../controllers/admin/comment.controller');
// var validate = require('../validate/user.validate');

// var upload = multer({ dest: './public/uploads/' });

var router = express.Router();

router.get('/product-comment-simple/:id', controller.commentOfProductSimpleShow);

router.get('/product-comment-combo/:id', controller.commentOfProductComboShow);

router.get('/product-comment-simple', controller.productCommentShowSimple);

router.get('/product-comment-combo', controller.productCommentShowCombo);

router.post('/product-comment-delete', controller.postDeleteComment);

module.exports = router;