var express = require('express');
 var controller = require('../../controllers/admin/order.controller');

var router = express.Router();

router.get('/order-show', controller.orderShow);

//Xử lý lấy thông tin chi tiết đơn hàng
router.get('/order-info/:id', controller.orderInfo);

// Xử lí post cập nhật trạng thái đơn hàng
router.post('/order-update-status', controller.postStatusOrderUpdate);

//Xử lý xóa đơn hàng
router.post('/order-delete', controller.postDeleteOrder);

module.exports = router;