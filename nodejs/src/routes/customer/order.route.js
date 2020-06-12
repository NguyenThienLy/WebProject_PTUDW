var express = require("express");
var controller = require("../../controllers/customer/order.controller");

var router = express.Router();

router.get("/order-info-show-status-1", controller.orderInfoShowStatus1);

router.get("/order-info-show-status-2", controller.orderInfoShowStatus2);

router.get("/order-info-show-status-3", controller.orderInfoShowStatus3);

router.get("/order-info-show-status-4", controller.orderInfoShowStatus4);

router.post("/order-detail-show", controller.orderDetailShow);

module.exports = router;