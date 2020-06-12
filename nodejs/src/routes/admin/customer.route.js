var express = require('express');

 var controller = require('../../controllers/admin/customer.controller');

var router = express.Router();

router.get('/customer-show', controller.customerShow);

//Xử lý lấy thông tin chi tiết khách hàng
router.post('/customer-info', controller.customerInfo);

// Xử lí post sửa loại khách hàng
router.post("/customer-type-update", controller.postCustomerTypeUpdate);

//Xử lý xóa khách hàng
router.post('/customer-delete', controller.postDeleteCustomer);

module.exports = router;