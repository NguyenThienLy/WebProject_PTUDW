module.exports.productShow = function(req, res) {
    res.render("admin/product-show", { layout: "main-admin.hbs" });
};

module.exports.productAdd = function(req, res) {
    res.render("admin/product-add", { layout: "main-admin.hbs" });
};