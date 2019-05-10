module.exports.customerShow = function(req, res) {
    res.render("admin/customer", { layout: "main-admin.hbs" });
};