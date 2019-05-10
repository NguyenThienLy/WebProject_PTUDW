module.exports.indexShow = function(req, res) {
  res.render("customer/index", { layout: "main-customer.hbs" });
};
