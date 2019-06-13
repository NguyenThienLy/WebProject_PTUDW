
var express = require('express');
//Hỗ trợ nhận về POST kiểu multipart
var multer = require('multer');
var path = require('path');

var controller = require('../../controllers/admin/product.controller');

const gcsMulter = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024 
    }
});

var router = express.Router();

//Xử lý get để render UI
router.get('/product-show', controller.productShow);

router.get('/product-add', controller.productAdd);

//Xử lý post nhận về ảnh và dữ liệu
router.post('/product-add',gcsMulter.array('PRODUCT_IMAGE'),controller.postProductAdd);

//Xử lý post nhận về ảnh và dữ liệu
router.post('/product-combo-add', controller.postProductComboAdd);

//Post trả về subCategory theo id của category
router.post('/load-subcategory', controller.SubCategory);

//Post trả về productId theo categoryId
router.post('/load-productId-by-categoryId', controller.productIdByCategoryId);

//Post trả về product theo productId
router.post('/load-product-by-productId', controller.productByProductId);

//Xử lý xóa sản phẩm
router.post('/product-show/delete',controller.deleteProduct);

router.get('/product-update/:id',controller.infoProduct);

//Lấy danh sách hình sản phẩm
router.post('/product-update/get-images',controller.imagesOfProduct)


module.exports = router;