
var customerModel = require("../../models/customer.model");
var newsModel = require("../../models/news.model");
var productModel = require("../../models/product.model")
var moment = require("moment");

module.exports.reportShow = function (req, res,next) {
    res.locals.sidebar[2].active = true;

    var curentDate = new moment().format('YYYY-MM-DD');
    //Lấy ra tổng lượt xem trong ngày
    var getToltalView = newsModel.sumViewInDate(curentDate);

    Promise.all([
        getToltalView
    ])
        .then(values => {
            var totalView;
            if (values[0].length > 0) {
                totalView = values[0][0].VIEWS;
            } else {
                totalView = 0;
            }
            res.render("admin/report", {
                layout: "main-admin.hbs",
                TotalViews: totalView
            });
        }).catch(next);
};