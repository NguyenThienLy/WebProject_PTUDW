module.exports.infoDetail = function(req, res) {
  res.render("customer/info-detail", { layout: "main-customer.hbs" });
};

module.exports.infoShow = function(req, res) {
  res.render("customer/info-show", { layout: "main-customer.hbs" });
};
