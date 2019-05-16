module.exports.orderListShow = function(req, res) {
    res.locals.sidebar[3].active = true;

    res.render("admin/order-list", { layout: "main-admin.hbs" });
};