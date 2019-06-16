
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
router.post('/product-add', gcsMulter.array('PRODUCT_IMAGE'), controller.postProductAdd);

//Xử lý post nhận về ảnh và dữ liệu
router.post('/product-combo-add', controller.postProductComboAdd);

//Post trả về subCategory theo id của category
router.post('/load-subcategory', controller.SubCategory);

//Post trả về productId theo categoryId
router.post('/load-productId-by-categoryId', controller.productIdByCategoryId);

//Post trả về product theo productId
router.post('/load-product-by-productId', controller.productByProductId);

//Xử lý xóa sản phẩm
router.post('/product-delete', controller.postDeleteProduct);

// Xử lí xóa sản phẩm combo
router.post("/product-combo-delete", controller.postDeleteProductCombo);

// Xử lí sửa sản phẩm combo
router.get("/product-combo-update/:id", controller.productComboUpdate);

// Xử lí post sửa sản phẩm combo
router.post("/product-combo-update/:id", controller.postProductComboUpdate);

// Xử lí sửa sản phẩm
router.get('/product-update/:id', controller.productUpdate);

//Lấy danh sách hình sản phẩm
router.post('/product-update/get-images', controller.productImages);

// Xử lí post sửa sản phẩm
router.post('/product-update-info', controller.postProductUpdate);

//Update danh sách hình sản phẩm
router.post('/product-update-images', gcsMulter.array('PRODUCT_IMAGE'), controller.postProductImagesUpdate);



module.exports = router;