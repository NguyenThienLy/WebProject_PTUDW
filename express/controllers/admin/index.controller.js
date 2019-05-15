module.exports.indexShow = function(req, res) {
    res.locals.sidebar[0].active = true;
      
    res.render("admin/index", { layout: "main-admin.hbs" });
};