module.exports.infoShow = function(req, res) {
    res.render("admin/info-show", { layout: "main-admin.hbs" });
};

module.exports.infoAdd = function(req, res) {
    res.render("admin/info-add", { layout: "main-admin.hbs" });
};