var customerModel = require("../../models/customer.model");
var commentModel = require("../../models/comment.model");
var newsModel = require("../../models/news.model");
var productModel = require("../../models/product.model")
var moment = require("moment");

module.exports.indexShow = function (req, res, next) {
    res.locals.sidebar[0].active = true;

    var getTopCustomers = customerModel.Top10Customer();
    var getNewPost = newsModel.Top5News();
    var getRecentlyComments = commentModel.RecentlyComments();

    var curentDate = new moment().format('YYYY-MM-DD');
    //Lấy ra tổng lượt xem trong ngày
    var getToltalView = newsModel.sumViewInDate(curentDate);

    Promise.all([
        getTopCustomers,
        getNewPost,
        getRecentlyComments,
        getToltalView
    ])
        .then(values => {
            var totalView;
            if (values[3].length > 0) {
                totalView = values[3][0].VIEWS;
            } 
            
            if(totalView==null){
                totalView = 0;
            }

            res.render("admin/index", {
                layout: "main-admin.hbs",
                TopCustomer: values[0],
                Newpost: values[1],
                Comment: values[2],
                TotalViews: totalView
            });
        }).catch(next);
};

module.exports.loadChart = function (req, res, next) {

    //Lấy ra cấu trúc của cửa hàng
    var structProduct = productModel.structProduct();
    //Lấy ra ngày hiện tại
    var curentDate = new moment().format('YYYY-MM-DD');
    console.log(curentDate);
    var charView = newsModel.chartViewInMonth(curentDate);
    Promise.all([structProduct, charView]).then(values => {

        var arrViewChart = CreateViewChart(values[1]);
        res.json(JSON.stringify({ arrStruct: values[0],arrView:arrViewChart }));
    }).catch(next);
};

module.exports.loadChartDate = function (req, res, next) {
    var curentDate = moment(req.body.date,'DD/MM/YYYY').format('YYYY-MM-DD');

    var charView = newsModel.chartViewInMonth(curentDate);
    //Lấy ra tổng lượt xem trong ngày
    var getToltalView = newsModel.sumViewInDate(curentDate);

    
    Promise.all([charView,getToltalView]).then(values => {
        console.log(values[1]);
        var totalView;
            if (values[1].length>0) {
                totalView = values[1][0].VIEWS;
            }
            if(totalView==null){
                totalView = 0;
            }
            console.log(totalView);
        var arrViewChart = CreateViewChart(values[0]);

        res.json(JSON.stringify({arrView:arrViewChart,TotalView:totalView }));
    }).catch(next);
};

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