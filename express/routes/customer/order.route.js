var express = require("express");
var controller = require("../../controllers/customer/order.controller");

var router = express.Router();

router.get("/order-info-show", controller.showOrderInfo);

module.exports = router;