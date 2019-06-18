var moment = require('moment');

var orderInfoModel = require("../../models/order_info.model");
var orderDetailModel = require("../../models/order_detail.model");
var productModel = require("../../models/product.model");
var productComboModel = require("../../models/product_combo.model");
var orderStatusModel = require("../../models/order_status.model");

// Gọi formatPrice
var formatPriceHelper = require("../../helpers/format_price.helper");
// Gọi formatStatusOrder
var formatOrderStatusHelper = require("../../helpers/format_order_status.helper");
var formatOrderDetailButtonHelper = require("../../helpers/format_order_detail_button.helper");
// Gọi createquery helper
var createQuery = require("../../helpers/create_query.helper");
// Gọi selected helper
var selectedHelper = require("../../helpers/selected_selector.helper");

module.exports.orderShow = function(req, res, next) {
  var page = req.query.page || 1;
  var limit = req.query.limit || 5;

  var name = req.query.name || "";
  var fromDate = req.query.fromDate || "";
  var toDate = req.query.toDate || "";
  var orderStatus = req.query.orderStatus || 0;
  if (fromDate !== "") {
    fromDate = moment(fromDate, "DD/MM/YYYY").format("YYYY-MM-DD");
  }
  if (toDate !== "") {
    toDate = moment(toDate, "DD/MM/YYYY").format("YYYY-MM-DD");
  }

  console.log(fromDate);
  console.log(toDate);

  var objQuery = {
    Name: name,
    FromDate: fromDate, 
    ToDate: toDate,
    OrderStatus: orderStatus
  };

  if (page < 1) {
    page = 1;
  }

  if (page < 1) {
    limit = 5;
  }

  var offset = (page - 1) * limit;

  var dataOrderStatus = orderStatusModel.allOrderStatus();

  var dataOrderInfos = orderInfoModel.pageAllOrderFilter(limit, offset, objQuery);

  var numberPage = orderInfoModel.quantityOrderActive(objQuery);

  Promise.all([dataOrderStatus, dataOrderInfos, numberPage])
    .then(values => {
      res.locals.sidebar[3].active = true;

      var total = values[2][0].QUANTITY;
      var nPages = Math.floor(total / limit);
      if (total % limit > 0) nPages++;

      var pages = createArrPage(nPages, page);

      var prePage = {
        value: 0,
        active: false
      };
      if (page > 1) {
        prePage.value = page - 1
        prePage.active = true;
      } else {
        prePage.value = 0
        prePage.active = false;
      }

      var nextPage = {
        value: 0,
        active: false
      }

      if (page < nPages) {
        nextPage.value = parseInt(page) + 1
        nextPage.active = true;
      } else {
        nextPage.value = 0
        nextPage.active = false;
      }

      if (fromDate !== "") {
        fromDate = moment(fromDate, "YYYY-MM-DD").format("DD/MM/YYYY");
      }
      if (toDate !== "") {
        toDate = moment(toDate, "YYYY-MM-DD").format("DD/MM/YYYY");
      }

      res.render("admin/order-info-show", {
        layout: "main-admin.hbs",
        orderStatus: values[0],
        orders: values[1],
        pages: pages,
        prePage: prePage,
        nextPage: nextPage,
        name: name,
        fromDate: fromDate,
        toDate: toDate,
        orderStatusID: orderStatus,
        helpers: {
          formatStatus: formatOrderStatusHelper,
          formatPrice: formatPriceHelper,
          createQueryOrder: createQuery.createQueryOrder,
          isSelected: selectedHelper.isSelected
        }
      });
    })
    .catch(next);
};

//Hàm tạo mảng trang
function createArrPage(nPages, page) {
  var pages = [];
  //Chỉ hiện tối đa 5 trang
  var start = end = 0;
  if (nPages <= 5) {
    start = 1;
    end = nPages;
  } else {
    if (page == 1) {
      start = 1;
      end = 5;
    }
    else if (page == nPages) {
      start = nPages - 5;
      end = nPages;
    }
    else {
      if (page - 2 >= 1 && parseInt(page) + 2 <= nPages) {
        start = page - 2;
        end = parseInt(page) + 2;
      } else {
        if (page - 2 == 0) {
          start = page - 1;
          end = parseInt(page) + 3;
        } else {
          start = page - 3;
          end = parseInt(page) + 1;
        }
      }
    }
  }
  for (i = start; i <= end; i++) {
    var obj = {
      value: i,
      active: i === +page
    };
    pages.push(obj);
  }

  return pages;
}

module.exports.orderInfo = function(req, res, next) {
  var orderInfoId = req.params.id;

  orderInfoModel.singleById(orderInfoId).then(orderInfo => {
    orderDetailModel
      .orderDetailByOrderInfoId(orderInfoId)
      .then(orderDetails => {
        res.locals.sidebar[3].active = true;

        for (var orderDetail of orderDetails) {
          if (orderDetail.ISSIMPLE === 1) {
            orderDetail.PRODUCTTYPE = "Sản phẩm thường";
          } else {
            orderDetail.PRODUCTTYPE = "Sản phẩm combo";
          }
        }

        res.render("admin/order-info-update", {
          layout: "main-admin.hbs",
          order: orderInfo[0],
          orderDetails: orderDetails,
          helpers: {
            formatStatus: formatOrderStatusHelper,
            formatPrice: formatPriceHelper,
            formatButton: formatOrderDetailButtonHelper
          }
        });
      });
  });
};

module.exports.postStatusOrderUpdate = async (req, res, next) => {
  var orderInfoID = req.body.OrderInfoID;
  var orderStatusID = req.body.OrderStatusID;

  var updateOrderInfo = {
    ID: orderInfoID,
    ORDERSTATUSID: orderStatusID
  };

  await orderInfoModel.updateOrderInfo(updateOrderInfo);

  if (orderStatusID === '4') {
    var orderDetails = await orderDetailModel.orderDetailByOrderInfoId(orderInfoID);
   
    for (var i = 0; i < orderDetails.length; i++) {
      if (orderDetails[i].ISSIMPLE === 1) {
        var product = await productModel.singleByProductId(orderDetails[i].PRODUCTID);
        console.log("simple");
        console.log(orderDetails[i].QUANTITY);
        console.log(product[0].INVENTORY);
        product[0].INVENTORY += orderDetails[i].QUANTITY;

        var updateProduct = {
            ID: product[0].ID,
            INVENTORY: product[0].INVENTORY
        }

        await productModel.updateProduct(updateProduct);
      } else {
        var productCombo = await productComboModel.singleByProductComboId(orderDetails[i].PRODUCTID);
        console.log("combo");
        console.log(orderDetails[i].QUANTITY);
        console.log(productCombo[0].INVENTORY);
        productCombo[0].INVENTORY += orderDetails[i].QUANTITY;

        var updateProductCombo = {
            ID: productCombo[0].ID,
            INVENTORY: productCombo[0].INVENTORY
        }

        await productComboModel.updateProductCombo(updateProductCombo);
      }
    }
  }

  res.send(true);
};

module.exports.postDeleteOrder = (req, res, next) => {
  var orderId = req.body.OrderInfoID;

  orderInfoModel.singleById(orderId).then(order => {
    if (order[0].ORDERSTATUSID === 3 || order[0].ORDERSTATUSID === 4) {
      var deleteOrder = {
        ID: orderId,
        STATUS: 0
      };

      orderInfoModel
        .deleteOrderInfoById(deleteOrder)
        .then(changedRowsNumber => {
          res.send(true);
        });
    } else {
      res.send(false);
    }
  });
};
