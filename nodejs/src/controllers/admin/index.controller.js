var customerModel = require("../../models/customer.model");
var commentModel = require("../../models/comment.model");
var newsModel = require("../../models/news.model");
var productModel = require("../../models/product.model")
var moment = require("moment");
var orderInfoModel = require("../../models/order_info.model");

// Gọi formatPrice
var formatPriceHelper = require("../../helpers/format_price.helper");
// Gọi formatStatusOrder
var formatOrderStatusHelper = require("../../helpers/format_order_status.helper");

module.exports.indexShow = function (req, res, next) {
    res.locals.sidebar[0].active = true;

    var getTopCustomers = customerModel.Top10Customer();
    var getNewPost = newsModel.Top5News();
    var getRecentlyComments = commentModel.RecentlyComments();
    var getNearestOrderInfo = orderInfoModel.Nearest5OrderInfo();

    var curentDate = new moment().format('YYYY-MM-DD');
    //Lấy ra tổng lượt xem trong ngày
    var getToltalView = newsModel.sumViewInDate(curentDate);
    //Lấy ra tổng số lượt mua trong ngày
    var getToltalOrder = orderInfoModel.orderQuantityInDay(curentDate);
    //Lấy ra tổng doanh thu trong ngày
    var getTolTalMoney = orderInfoModel.TotalMoneyInDay(curentDate);

    Promise.all([
        getTopCustomers,
        getNewPost,
        getRecentlyComments,
        getToltalView,
        getNearestOrderInfo,
        getToltalOrder,
        getTolTalMoney
    ])
        .then(values => {
            var totalView;
            if (values[3].length > 0) {
                totalView = values[3][0].VIEWS;
            } 
            
            if(totalView==null){
                totalView = 0;
            }

            var totalMoney;
            if(values[6].length>0){
                totalMoney = values[6][0].TOTALMONEY;
            }

            if(totalMoney==null){
                totalMoney = 0;
            }

            res.render("admin/index", {
                layout: "main-admin.hbs",
                TopCustomer: values[0],
                Newpost: values[1],
                Comment: values[2],
                TotalViews: totalView,
                orders:values[4],
                ToltalOrders:values[5][0].ORDER_QUANTITY,
                TotalMoney:totalMoney,
                helpers: {
                    formatStatus: formatOrderStatusHelper,
                    formatPrice: formatPriceHelper
                  }
            });
        }).catch(next);
};

module.exports.loadChart = function (req, res, next) {

    //Lấy ra top 4 loại sản phẩm bán chạy nhất
    var topCategory = productModel.TopCategorySell(4);
    //Lấy ra cấu trúc của cửa hàng
    var structProduct = productModel.structProduct();
    //Lấy ra ngày hiện tại
    var curentDate = new moment().format('YYYY-MM-DD');
    
    var charView = newsModel.chartViewInMonth(curentDate);
    var charMoney = orderInfoModel.ChartMoneyInMonth(curentDate);
    Promise.all([structProduct, charView,charMoney,topCategory]).then(values => {
        var arrMoneyChart =CreateMoneyChart(values[2]);
        
        var arrViewChart = CreateViewChart(values[1]);
        res.json(JSON.stringify({ arrStruct: values[0],arrView:arrViewChart,arrMoney:arrMoneyChart,arrTop:values[3] }));
    }).catch(next);
};

module.exports.loadChartDate = function (req, res, next) {
    var curentDate = moment(req.body.date,'DD/MM/YYYY').format('YYYY-MM-DD');


    var charMoney = orderInfoModel.ChartMoneyInMonth(curentDate);
    var charView = newsModel.chartViewInMonth(curentDate);
    //Lấy ra tổng lượt xem trong ngày
    var getToltalView = newsModel.sumViewInDate(curentDate);
    //Lấy ra tổng doanh thu trong ngày
    //Lấy ra tổng số lượt mua trong ngày
    var getToltalOrder = orderInfoModel.orderQuantityInDay(curentDate);
    //Lấy ra tổng doanh thu trong ngày
    var getTolTalMoney = orderInfoModel.TotalMoneyInDay(curentDate);
    
    Promise.all([charView,getToltalView,charMoney,getToltalOrder,getTolTalMoney]).then(values => {
        console.log(values[1]);
        var totalView;
            if (values[1].length>0) {
                totalView = values[1][0].VIEWS;
            }
            if(totalView==null){
                totalView = 0;
            }

            var totalMoney;
            if(values[4].length>0){
                totalMoney = values[4][0].TOTALMONEY;
            }

            if(totalMoney==null){
                totalMoney = 0;
            }
            
        var arrViewChart = CreateViewChart(values[0]);
        var arrMoneyChart =CreateMoneyChart(values[2]);

        res.json(JSON.stringify({arrView:arrViewChart,
            TotalView:totalView,
            arrMoney:arrMoneyChart,
            TotalMoney:totalMoney,
            ToltalOrder:values[3][0].ORDER_QUANTITY
         }));
    }).catch(next);
};

function CreateMoneyChart(arrDate) {
    var numberDay = moment().daysInMonth();
    var createChar = []
    if (arrDate.length > 0) {

        for(var i=0;i<arrDate.length;i++){ 
            createChar.push({
                DATE:arrDate[i].DATE,
                TOTALMONEY:arrDate[i].TOTALMONEY
            });
        }

        for (var i = 1; i <= numberDay; i++) {
            if (isInArr(arrDate, i) == false) {
                createChar.push(
                    {
                        DATE: i,
                        TOTALMONEY: 0
                    });
            }
        }
    } else {
        for (var i = 1; i <= numberDay; i++) {
            createChar.push(
                {
                    DATE: i,
                    TOTALMONEY: 0
                });
        }
    }

    return createChar.sort(function(a,b){return a.DATE -b.DATE});
}

function CreateViewChart(arrDate) {
    var numberDay = moment().daysInMonth();
    var createChar = []
    if (arrDate.length > 0) {

        for(var i=0;i<arrDate.length;i++){ 
            createChar.push({
                DATE:arrDate[i].DATE,
                VIEW:arrDate[i].VIEW
            });
        }

        for (var i = 1; i <= numberDay; i++) {
            if (isInArr(arrDate, i) == false) {
                createChar.push(
                    {
                        DATE: i,
                        VIEW: 0
                    });
            }
        }
    } else {
        for (var i = 1; i <= numberDay; i++) {
            createChar.push(
                {
                    DATE: i,
                    VIEW: 0
                });
        }
    }

    return createChar.sort(function(a,b){return a.DATE -b.DATE});
}

//Kiểm tra ngày có tồn tại trong mảng hay không
function isInArr(arrDate, value) {
    for (var i; i < arrDate.length; i++) {
        if (arrDate[i].DATE == value)
            return true;
    }
    return false;
}