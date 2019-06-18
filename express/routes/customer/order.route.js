var express = require("express");
var controller = require("../../controllers/customer/order.controller");

var router = express.Router();

router.get("/order-info-show", controller.orderInfoShow);

router.post("/order-detail-show", controller.orderDetailShow);

module.exports = router;