
var customerModel = require("../../models/customer.model");
var newsModel = require("../../models/news.model");
var productModel = require("../../models/product.model")
var moment = require("moment");

var orderInfoModel = require("../../models/order_info.model");
// Gọi formatPrice
var formatPriceHelper = require("../../helpers/format_price.helper");

module.exports.reportShow = function (req, res,next) {
    res.locals.sidebar[2].active = true;

    var curentDate = new moment().format('YYYY-MM-DD');
    //Lấy ra tổng lượt xem trong ngày
    var getToltalView = newsModel.sumViewInDate(curentDate);
    //Lấy ra tổng số lượt mua trong ngày
    var getToltalOrder = orderInfoModel.orderQuantityInDay(curentDate);
    //Lấy ra tổng doanh thu trong ngày
    var getTolTalMoney = orderInfoModel.TotalMoneyInDay(curentDate);

    Promise.all([
        getToltalView,getToltalOrder,getTolTalMoney
    ])
        .then(values => {
            var totalView;
            if (values[0].length > 0) {
                totalView = values[0][0].VIEWS;
            } 
            
            if(totalView==null){
                totalView = 0;
            }
            var totalMoney;
            if(values[2].length>0){
                totalMoney = values[2][0].TOTALMONEY;
            }

            if(totalMoney==null){
                totalMoney = 0;
            }
            var DisplayDate = moment().format('DD/MM/YYYY');

            res.render("admin/report", {
                layout: "main-admin.hbs",
                TotalViews: totalView,
                ToltalOrders:values[1][0].ORDER_QUANTITY,
                TotalMoney:totalMoney,
                DisplayDate:DisplayDate,
                helpers: {
                    formatPrice: formatPriceHelper
                  }
            });
        }).catch(next);
};