var orderInfoModel = require("../../models/order_info.model");
var orderDetailModel = require("../../models/order_detail.model");
var productModel = require("../../models/product.model");
var productComboModel = require("../../models/product_combo.model");

// Gọi formatPrice
var formatPriceHelper = require("../../helpers/format_price.helper");
// Gọi formatStatusOrder
var formatOrderStatusHelper = require("../../helpers/format_order_status.helper");
var formatOrderDetailButtonHelper = require("../../helpers/format_order_detail_button.helper.js");

module.exports.orderShow = function(req, res, next) {
  orderInfoModel
    .allOrderInfo()
    .then(orders => {
      res.locals.sidebar[3].active = true;

      res.render("admin/order-info-show", {
        layout: "main-admin.hbs",
        orders: orders,
        helpers: {
          formatStatus: formatOrderStatusHelper,
          formatPrice: formatPriceHelper
        }
      });
    })
    .catch(next);
};

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
