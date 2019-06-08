var express = require("express");
var controller = require("../../controllers/customer/cart.controller");

var router = express.Router();

router.get("/cart-detail", controller.cartDetail);

router.get("/cart-order", controller.cartOrder);

module.exports = router;
