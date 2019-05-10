//var User = require("../models/user.model");

module.exports.productDetail = function(req, res) {
  res.render("customer/product-detail", { layout: "main-customer.hbs" });
};

module.exports.productShow = function(req, res) {
  res.render("customer/product-show", { layout: "main-customer.hbs" });
};
