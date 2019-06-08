module.exports.cartDetail = function(req, res) {
  res.render("customer/cart-detail", { layout: "main-customer.hbs" });
};

module.exports.cartOrder = function(req, res) {
  res.end("thanh toan");
};