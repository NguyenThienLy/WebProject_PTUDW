var express = require("express");
var controller = require("../../controllers/customer/order.controller");

var router = express.Router();

router.get("/show-order-info", controller.showOrderInfo);

module.exports = router;