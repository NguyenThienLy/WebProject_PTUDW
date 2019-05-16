module.exports.reportShow = function(req, res) {
    res.locals.sidebar[2].active = true;

    res.render("admin/report", { layout: "main-admin.hbs" });
};