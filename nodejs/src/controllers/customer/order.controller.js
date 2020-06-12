// Gọi productModel
var productModel = require("../../models/product.model");
// Gọi productComboModel
var productComboModel = require("../../models/product_combo.model");
// Gọi orderInfoModel
var orderInfoModel = require("../../models/order_info.model");
// Gọi productModel
var productModel = require("../../models/product.model");
// Gọi productComboModel
var productComboModel = require("../../models/product_combo.model");

// Gọi formatStringHelper
var formatStringHelper = require("../../helpers/format_string_hide.helper");
// Gọi formatPrice
var formatPriceHelper = require("../../helpers/format_price.helper");

module.exports.orderInfoShowStatus1 = function(req, res, next) {
  try {
    // Lấy user hiện tại
    var customerId = res.locals.authUser.ID;

    // status 1
    var pageStatus1 = req.query.page || 1;
    var limitStatus1 = req.query.limit || 1;

    if (isNaN(pageStatus1)) {
      pageStatus1 = 1;
    }

    if (pageStatus1 < 1) {
      pageStatus1 = 1;
    }

    if (pageStatus1 < 1) {
      limitStatus1 = 1;
    }

    var offsetStatus1 = (pageStatus1 - 1) * limitStatus1;

    // status 2
    var pageStatus2 = 1;
    var limitStatus2 = 3;
    var offsetStatus2 = 0;

    // status 3
    var pageStatus3 = 1;
    var limitStatus3 = 3;
    var offsetStatus3 = 0;

    // status 4
    var pageStatus4 = 1;
    var limitStatus4 = 3;
    var offsetStatus4 = 0;

    var isHaveType1 = true;
    var isHaveType2 = true;
    var isHaveType3 = true;
    var isHaveType4 = true;

    var quantityHaveType1 = 0;
    var quantityHaveType2 = 0;
    var quantityHaveType3 = 0;
    var quantityHaveType4 = 0;

    Promise.all([
      orderInfoModel.topNOrderInfoFollowIdCustomerAndOrderStatusIdAndOffset(
        customerId,
        1,
        limitStatus1,
        offsetStatus1
      ),
      orderInfoModel.topNOrderInfoFollowIdCustomerAndOrderStatusIdAndOffset(
        customerId,
        2,
        limitStatus2,
        offsetStatus2
      ),
      orderInfoModel.topNOrderInfoFollowIdCustomerAndOrderStatusIdAndOffset(
        customerId,
        3,
        limitStatus3,
        offsetStatus3
      ),
      orderInfoModel.topNOrderInfoFollowIdCustomerAndOrderStatusIdAndOffset(
        customerId,
        4,
        limitStatus4,
        offsetStatus4
      ),
      orderInfoModel.quantityOrderInfoFollowIdCustomerAndOrderStatusId(
        customerId,
        1
      ),
      orderInfoModel.quantityOrderInfoFollowIdCustomerAndOrderStatusId(
        customerId,
        2
      ),
      orderInfoModel.quantityOrderInfoFollowIdCustomerAndOrderStatusId(
        customerId,
        3
      ),
      orderInfoModel.quantityOrderInfoFollowIdCustomerAndOrderStatusId(
        customerId,
        4
      ),
      productModel.topNProductBestSalerFollowOffset(4, 0),
      productComboModel.topNProductComboBestSalerFollowOffset(3, 0)
    ]).then(values => {
      // status 1
      var totalStatus1 = values[4][0].QUANTITY;
      var nPagesStatus1 = Math.floor(totalStatus1 / limitStatus1);
      if (totalStatus1 % limitStatus1 > 0) nPagesStatus1++;

      var pagesStatus1 = createArrPage(nPagesStatus1, pageStatus1);

      var prePageStatus1 = {
        value: 0,
        active: false
      };
      if (pageStatus1 > 1) {
        prePageStatus1.value = pageStatus1 - 1;
        prePageStatus1.active = true;
      } else {
        prePageStatus1.value = 0;
        prePageStatus1.active = false;
      }

      var nextPageStatus1 = {
        value: 0,
        active: false
      };

      if (pageStatus1 < nPagesStatus1) {
        nextPageStatus1.value = parseInt(pageStatus1) + 1;
        nextPageStatus1.active = true;
      } else {
        nextPageStatus1.value = 0;
        nextPageStatus1.active = false;
      }

      // status 2
      var totalStatus2 = values[5][0].QUANTITY;
      var nPagesStatus2 = Math.floor(totalStatus2 / limitStatus2);
      if (totalStatus2 % limitStatus2 > 0) nPagesStatus2++;

      var pagesStatus2 = createArrPage(nPagesStatus2, pageStatus2);

      var prePageStatus2 = {
        value: 0,
        active: false
      };
      if (pageStatus2 > 1) {
        prePageStatus2.value = pageStatus2 - 1;
        prePageStatus2.active = true;
      } else {
        prePageStatus2.value = 0;
        prePageStatus2.active = false;
      }

      var nextPageStatus2 = {
        value: 0,
        active: false
      };

      if (pageStatus2 < nPagesStatus2) {
        nextPageStatus2.value = parseInt(pageStatus2) + 1;
        nextPageStatus2.active = true;
      } else {
        nextPageStatus2.value = 0;
        nextPageStatus2.active = false;
      }

      // status 3
      var totalStatus3 = values[6][0].QUANTITY;
      var nPagesStatus3 = Math.floor(totalStatus3 / limitStatus3);
      if (totalStatus3 % limitStatus3 > 0) nPagesStatus3++;

      var pagesStatus3 = createArrPage(nPagesStatus3, pageStatus3);

      var prePageStatus3 = {
        value: 0,
        active: false
      };
      if (pageStatus3 > 1) {
        prePageStatus3.value = pageStatus3 - 1;
        prePageStatus3.active = true;
      } else {
        prePageStatus3.value = 0;
        prePageStatus3.active = false;
      }

      var nextPageStatus3 = {
        value: 0,
        active: false
      };

      if (pageStatus3 < nPagesStatus3) {
        nextPageStatus3.value = parseInt(pageStatus3) + 1;
        nextPageStatus3.active = true;
      } else {
        nextPageStatus3.value = 0;
        nextPageStatus3.active = false;
      }

      // status 4
      var totalStatus4 = values[7][0].QUANTITY;
      var nPagesStatus4 = Math.floor(totalStatus4 / limitStatus4);
      if (totalStatus4 % limitStatus4 > 0) nPagesStatus4++;

      var pagesStatus4 = createArrPage(nPagesStatus4, pageStatus4);

      var prePageStatus4 = {
        value: 0,
        active: false
      };
      if (pageStatus4 > 1) {
        prePageStatus4.value = pageStatus4 - 1;
        prePageStatus4.active = true;
      } else {
        prePageStatus4.value = 0;
        prePageStatus4.active = false;
      }

      var nextPageStatus4 = {
        value: 0,
        active: false
      };

      if (pageStatus4 < nPagesStatus4) {
        nextPageStatus4.value = parseInt(pageStatus4) + 1;
        nextPageStatus4.active = true;
      } else {
        nextPageStatus4.value = 0;
        nextPageStatus4.active = false;
      }

      // console.log("TCL: module.exports.showOrderInfo -> values", values)
      if (values[0].length === 0) isHaveType1 = false;

      if (values[1].length === 0) isHaveType2 = false;

      if (values[2].length === 0) isHaveType3 = false;

      if (values[3].length === 0) isHaveType4 = false;

      quantityHaveType1 = +values[4][0].QUANTITY;
      //console.log("TCL: module.exports.orderInfoShow -> values[4][0].QUANTITY", values[4][0].QUANTITY)
      quantityHaveType2 = +values[5][0].QUANTITY;
      quantityHaveType3 = +values[6][0].QUANTITY;
      quantityHaveType4 = +values[7][0].QUANTITY;

      res.render("customer/order-info-show", {
        layout: "main-customer.hbs",
        orderInfoType1: values[0],
        orderInfoType2: values[1],
        orderInfoType3: values[2],
        orderInfoType4: values[3],
        products: values[8],
        productsCombo: values[9],
        isHaveType1: isHaveType1,
        isHaveType2: isHaveType2,
        isHaveType3: isHaveType3,
        isHaveType4: isHaveType4,
        quantityHaveType1: quantityHaveType1,
        quantityHaveType2: quantityHaveType2,
        quantityHaveType3: quantityHaveType3,
        quantityHaveType4: quantityHaveType4,
        pagesStatus1: pagesStatus1,
        pagesStatus2: pagesStatus2,
        pagesStatus3: pagesStatus3,
        pagesStatus4: pagesStatus4,
        prePageStatus1: prePageStatus1,
        prePageStatus2: prePageStatus2,
        prePageStatus3: prePageStatus3,
        prePageStatus4: prePageStatus4,
        nextPageStatus1: nextPageStatus1,
        nextPageStatus2: nextPageStatus2,
        nextPageStatus3: nextPageStatus3,
        nextPageStatus4: nextPageStatus4,
        helpers: {
          // Hàm định dạng title của product simple lấy 36 kí tự
          formatTitleProductSimple: formatStringHelper.formatTitleProductSimple,
          // Hàm định dạng title của product combo lấy 52 kí tự
          formatTitleProductCombo: formatStringHelper.formatTitleProductCombo
        }
      });
    });
  } catch (error) {
    next(error);
  }
};

module.exports.orderInfoShowStatus2 = function(req, res, next) {
  try {
    // Lấy user hiện tại
    var customerId = res.locals.authUser.ID;

    // status 2
    var pageStatus2 = req.query.page || 1;
    var limitStatus2 = req.query.limit || 3;

    if (isNaN(pageStatus2)) {
      pageStatus2 = 1;
    }

    if (pageStatus2 < 1) {
      pageStatus2 = 1;
    }

    if (pageStatus2 < 1) {
      limitStatus2 = 3;
    }

    var offsetStatus2 = (pageStatus2 - 1) * limitStatus2;

    // status 1
    var pageStatus1 = 1;
    var limitStatus1 = 3;
    var offsetStatus1 = 0;

    // status 3
    var pageStatus3 = 1;
    var limitStatus3 = 3;
    var offsetStatus3 = 0;

    // status 4
    var pageStatus4 = 1;
    var limitStatus4 = 3;
    var offsetStatus4 = 0;

    var isHaveType1 = true;
    var isHaveType2 = true;
    var isHaveType3 = true;
    var isHaveType4 = true;

    var quantityHaveType1 = 0;
    var quantityHaveType2 = 0;
    var quantityHaveType3 = 0;
    var quantityHaveType4 = 0;

    Promise.all([
      orderInfoModel.topNOrderInfoFollowIdCustomerAndOrderStatusIdAndOffset(
        customerId,
        1,
        limitStatus1,
        offsetStatus1
      ),
      orderInfoModel.topNOrderInfoFollowIdCustomerAndOrderStatusIdAndOffset(
        customerId,
        2,
        limitStatus2,
        offsetStatus2
      ),
      orderInfoModel.topNOrderInfoFollowIdCustomerAndOrderStatusIdAndOffset(
        customerId,
        3,
        limitStatus3,
        offsetStatus3
      ),
      orderInfoModel.topNOrderInfoFollowIdCustomerAndOrderStatusIdAndOffset(
        customerId,
        4,
        limitStatus4,
        offsetStatus4
      ),
      orderInfoModel.quantityOrderInfoFollowIdCustomerAndOrderStatusId(
        customerId,
        1
      ),
      orderInfoModel.quantityOrderInfoFollowIdCustomerAndOrderStatusId(
        customerId,
        2
      ),
      orderInfoModel.quantityOrderInfoFollowIdCustomerAndOrderStatusId(
        customerId,
        3
      ),
      orderInfoModel.quantityOrderInfoFollowIdCustomerAndOrderStatusId(
        customerId,
        4
      ),
      productModel.topNProductBestSalerFollowOffset(4, 0),
      productComboModel.topNProductComboBestSalerFollowOffset(3, 0)
    ]).then(values => {
      // status 1
      var totalStatus1 = values[4][0].QUANTITY;
      var nPagesStatus1 = Math.floor(totalStatus1 / limitStatus1);
      if (totalStatus1 % limitStatus1 > 0) nPagesStatus1++;

      var pagesStatus1 = createArrPage(nPagesStatus1, pageStatus1);

      var prePageStatus1 = {
        value: 0,
        active: false
      };
      if (pageStatus1 > 1) {
        prePageStatus1.value = pageStatus1 - 1;
        prePageStatus1.active = true;
      } else {
        prePageStatus1.value = 0;
        prePageStatus1.active = false;
      }

      var nextPageStatus1 = {
        value: 0,
        active: false
      };

      if (pageStatus1 < nPagesStatus1) {
        nextPageStatus1.value = parseInt(pageStatus1) + 1;
        nextPageStatus1.active = true;
      } else {
        nextPageStatus1.value = 0;
        nextPageStatus1.active = false;
      }

      // status 2
      var totalStatus2 = values[5][0].QUANTITY;
      var nPagesStatus2 = Math.floor(totalStatus2 / limitStatus2);
      if (totalStatus2 % limitStatus2 > 0) nPagesStatus2++;

      var pagesStatus2 = createArrPage(nPagesStatus2, pageStatus2);

      var prePageStatus2 = {
        value: 0,
        active: false
      };
      if (pageStatus2 > 1) {
        prePageStatus2.value = pageStatus2 - 1;
        prePageStatus2.active = true;
      } else {
        prePageStatus2.value = 0;
        prePageStatus2.active = false;
      }

      var nextPageStatus2 = {
        value: 0,
        active: false
      };

      if (pageStatus2 < nPagesStatus2) {
        nextPageStatus2.value = parseInt(pageStatus2) + 1;
        nextPageStatus2.active = true;
      } else {
        nextPageStatus2.value = 0;
        nextPageStatus2.active = false;
      }

      // status 3
      var totalStatus3 = values[6][0].QUANTITY;
      var nPagesStatus3 = Math.floor(totalStatus3 / limitStatus3);
      if (totalStatus3 % limitStatus3 > 0) nPagesStatus3++;

      var pagesStatus3 = createArrPage(nPagesStatus3, pageStatus3);

      var prePageStatus3 = {
        value: 0,
        active: false
      };
      if (pageStatus3 > 1) {
        prePageStatus3.value = pageStatus3 - 1;
        prePageStatus3.active = true;
      } else {
        prePageStatus3.value = 0;
        prePageStatus3.active = false;
      }

      var nextPageStatus3 = {
        value: 0,
        active: false
      };

      if (pageStatus3 < nPagesStatus3) {
        nextPageStatus3.value = parseInt(pageStatus3) + 1;
        nextPageStatus3.active = true;
      } else {
        nextPageStatus3.value = 0;
        nextPageStatus3.active = false;
      }

      // status 4
      var totalStatus4 = values[7][0].QUANTITY;
      var nPagesStatus4 = Math.floor(totalStatus4 / limitStatus4);
      if (totalStatus4 % limitStatus4 > 0) nPagesStatus4++;

      var pagesStatus4 = createArrPage(nPagesStatus4, pageStatus4);

      var prePageStatus4 = {
        value: 0,
        active: false
      };
      if (pageStatus4 > 1) {
        prePageStatus4.value = pageStatus4 - 1;
        prePageStatus4.active = true;
      } else {
        prePageStatus4.value = 0;
        prePageStatus4.active = false;
      }

      var nextPageStatus4 = {
        value: 0,
        active: false
      };

      if (pageStatus4 < nPagesStatus4) {
        nextPageStatus4.value = parseInt(pageStatus4) + 1;
        nextPageStatus4.active = true;
      } else {
        nextPageStatus4.value = 0;
        nextPageStatus4.active = false;
      }

      // console.log("TCL: module.exports.showOrderInfo -> values", values)
      if (values[0].length === 0) isHaveType1 = false;

      if (values[1].length === 0) isHaveType2 = false;

      if (values[2].length === 0) isHaveType3 = false;

      if (values[3].length === 0) isHaveType4 = false;

      quantityHaveType1 = +values[4][0].QUANTITY;
      //console.log("TCL: module.exports.orderInfoShow -> values[4][0].QUANTITY", values[4][0].QUANTITY)
      quantityHaveType2 = +values[5][0].QUANTITY;
      quantityHaveType3 = +values[6][0].QUANTITY;
      quantityHaveType4 = +values[7][0].QUANTITY;

      res.render("customer/order-info-show", {
        layout: "main-customer.hbs",
        orderInfoType1: values[0],
        orderInfoType2: values[1],
        orderInfoType3: values[2],
        orderInfoType4: values[3],
        products: values[8],
        productsCombo: values[9],
        isHaveType1: isHaveType1,
        isHaveType2: isHaveType2,
        isHaveType3: isHaveType3,
        isHaveType4: isHaveType4,
        quantityHaveType1: quantityHaveType1,
        quantityHaveType2: quantityHaveType2,
        quantityHaveType3: quantityHaveType3,
        quantityHaveType4: quantityHaveType4,
        pagesStatus1: pagesStatus1,
        pagesStatus2: pagesStatus2,
        pagesStatus3: pagesStatus3,
        pagesStatus4: pagesStatus4,
        prePageStatus1: prePageStatus1,
        prePageStatus2: prePageStatus2,
        prePageStatus3: prePageStatus3,
        prePageStatus4: prePageStatus4,
        nextPageStatus1: nextPageStatus1,
        nextPageStatus2: nextPageStatus2,
        nextPageStatus3: nextPageStatus3,
        nextPageStatus4: nextPageStatus4,
        helpers: {
          // Hàm định dạng title của product simple lấy 36 kí tự
          formatTitleProductSimple: formatStringHelper.formatTitleProductSimple,
          // Hàm định dạng title của product combo lấy 52 kí tự
          formatTitleProductCombo: formatStringHelper.formatTitleProductCombo
        }
      });
    });
  } catch (error) {
    next(error);
  }
};

module.exports.orderInfoShowStatus3 = function(req, res, next) {
  try {
    // Lấy user hiện tại
    var customerId = res.locals.authUser.ID;

    // status 3
    var pageStatus3 = req.query.page || 1;
    var limitStatus3 = req.query.limit || 3;

    if (isNaN(pageStatus3)) {
      pageStatus3 = 1;
    }

    if (pageStatus3 < 1) {
      pageStatus3 = 1;
    }

    if (pageStatus3 < 1) {
      limitStatus3 = 3;
    }

    var offsetStatus3 = (pageStatus3 - 1) * limitStatus3;

    // status 2
    var pageStatus2 = 1;
    var limitStatus2 = 3;
    var offsetStatus2 = 0;

    // status 1
    var pageStatus1 = 1;
    var limitStatus1 = 3;
    var offsetStatus1 = 0;

    // status 4
    var pageStatus4 = 1;
    var limitStatus4 = 3;
    var offsetStatus4 = 0;

    var isHaveType1 = true;
    var isHaveType2 = true;
    var isHaveType3 = true;
    var isHaveType4 = true;

    var quantityHaveType1 = 0;
    var quantityHaveType2 = 0;
    var quantityHaveType3 = 0;
    var quantityHaveType4 = 0;

    Promise.all([
      orderInfoModel.topNOrderInfoFollowIdCustomerAndOrderStatusIdAndOffset(
        customerId,
        1,
        limitStatus1,
        offsetStatus1
      ),
      orderInfoModel.topNOrderInfoFollowIdCustomerAndOrderStatusIdAndOffset(
        customerId,
        2,
        limitStatus2,
        offsetStatus2
      ),
      orderInfoModel.topNOrderInfoFollowIdCustomerAndOrderStatusIdAndOffset(
        customerId,
        3,
        limitStatus3,
        offsetStatus3
      ),
      orderInfoModel.topNOrderInfoFollowIdCustomerAndOrderStatusIdAndOffset(
        customerId,
        4,
        limitStatus4,
        offsetStatus4
      ),
      orderInfoModel.quantityOrderInfoFollowIdCustomerAndOrderStatusId(
        customerId,
        1
      ),
      orderInfoModel.quantityOrderInfoFollowIdCustomerAndOrderStatusId(
        customerId,
        2
      ),
      orderInfoModel.quantityOrderInfoFollowIdCustomerAndOrderStatusId(
        customerId,
        3
      ),
      orderInfoModel.quantityOrderInfoFollowIdCustomerAndOrderStatusId(
        customerId,
        4
      ),
      productModel.topNProductBestSalerFollowOffset(4, 0),
      productComboModel.topNProductComboBestSalerFollowOffset(3, 0)
    ]).then(values => {
      // status 1
      var totalStatus1 = values[4][0].QUANTITY;
      var nPagesStatus1 = Math.floor(totalStatus1 / limitStatus1);
      if (totalStatus1 % limitStatus1 > 0) nPagesStatus1++;

      var pagesStatus1 = createArrPage(nPagesStatus1, pageStatus1);

      var prePageStatus1 = {
        value: 0,
        active: false
      };
      if (pageStatus1 > 1) {
        prePageStatus1.value = pageStatus1 - 1;
        prePageStatus1.active = true;
      } else {
        prePageStatus1.value = 0;
        prePageStatus1.active = false;
      }

      var nextPageStatus1 = {
        value: 0,
        active: false
      };

      if (pageStatus1 < nPagesStatus1) {
        nextPageStatus1.value = parseInt(pageStatus1) + 1;
        nextPageStatus1.active = true;
      } else {
        nextPageStatus1.value = 0;
        nextPageStatus1.active = false;
      }

      // status 2
      var totalStatus2 = values[5][0].QUANTITY;
      var nPagesStatus2 = Math.floor(totalStatus2 / limitStatus2);
      if (totalStatus2 % limitStatus2 > 0) nPagesStatus2++;

      var pagesStatus2 = createArrPage(nPagesStatus2, pageStatus2);

      var prePageStatus2 = {
        value: 0,
        active: false
      };
      if (pageStatus2 > 1) {
        prePageStatus2.value = pageStatus2 - 1;
        prePageStatus2.active = true;
      } else {
        prePageStatus2.value = 0;
        prePageStatus2.active = false;
      }

      var nextPageStatus2 = {
        value: 0,
        active: false
      };

      if (pageStatus2 < nPagesStatus2) {
        nextPageStatus2.value = parseInt(pageStatus2) + 1;
        nextPageStatus2.active = true;
      } else {
        nextPageStatus2.value = 0;
        nextPageStatus2.active = false;
      }

      // status 3
      var totalStatus3 = values[6][0].QUANTITY;
      var nPagesStatus3 = Math.floor(totalStatus3 / limitStatus3);
      if (totalStatus3 % limitStatus3 > 0) nPagesStatus3++;

      var pagesStatus3 = createArrPage(nPagesStatus3, pageStatus3);

      var prePageStatus3 = {
        value: 0,
        active: false
      };
      if (pageStatus3 > 1) {
        prePageStatus3.value = pageStatus3 - 1;
        prePageStatus3.active = true;
      } else {
        prePageStatus3.value = 0;
        prePageStatus3.active = false;
      }

      var nextPageStatus3 = {
        value: 0,
        active: false
      };

      if (pageStatus3 < nPagesStatus3) {
        nextPageStatus3.value = parseInt(pageStatus3) + 1;
        nextPageStatus3.active = true;
      } else {
        nextPageStatus3.value = 0;
        nextPageStatus3.active = false;
      }

      // status 4
      var totalStatus4 = values[7][0].QUANTITY;
      var nPagesStatus4 = Math.floor(totalStatus4 / limitStatus4);
      if (totalStatus4 % limitStatus4 > 0) nPagesStatus4++;

      var pagesStatus4 = createArrPage(nPagesStatus4, pageStatus4);

      var prePageStatus4 = {
        value: 0,
        active: false
      };
      if (pageStatus4 > 1) {
        prePageStatus4.value = pageStatus4 - 1;
        prePageStatus4.active = true;
      } else {
        prePageStatus4.value = 0;
        prePageStatus4.active = false;
      }

      var nextPageStatus4 = {
        value: 0,
        active: false
      };

      if (pageStatus4 < nPagesStatus4) {
        nextPageStatus4.value = parseInt(pageStatus4) + 1;
        nextPageStatus4.active = true;
      } else {
        nextPageStatus4.value = 0;
        nextPageStatus4.active = false;
      }

      // console.log("TCL: module.exports.showOrderInfo -> values", values)
      if (values[0].length === 0) isHaveType1 = false;

      if (values[1].length === 0) isHaveType2 = false;

      if (values[2].length === 0) isHaveType3 = false;

      if (values[3].length === 0) isHaveType4 = false;

      quantityHaveType1 = +values[4][0].QUANTITY;
      //console.log("TCL: module.exports.orderInfoShow -> values[4][0].QUANTITY", values[4][0].QUANTITY)
      quantityHaveType2 = +values[5][0].QUANTITY;
      quantityHaveType3 = +values[6][0].QUANTITY;
      quantityHaveType4 = +values[7][0].QUANTITY;

      res.render("customer/order-info-show", {
        layout: "main-customer.hbs",
        orderInfoType1: values[0],
        orderInfoType2: values[1],
        orderInfoType3: values[2],
        orderInfoType4: values[3],
        products: values[8],
        productsCombo: values[9],
        isHaveType1: isHaveType1,
        isHaveType2: isHaveType2,
        isHaveType3: isHaveType3,
        isHaveType4: isHaveType4,
        quantityHaveType1: quantityHaveType1,
        quantityHaveType2: quantityHaveType2,
        quantityHaveType3: quantityHaveType3,
        quantityHaveType4: quantityHaveType4,
        pagesStatus1: pagesStatus1,
        pagesStatus2: pagesStatus2,
        pagesStatus3: pagesStatus3,
        pagesStatus4: pagesStatus4,
        prePageStatus1: prePageStatus1,
        prePageStatus2: prePageStatus2,
        prePageStatus3: prePageStatus3,
        prePageStatus4: prePageStatus4,
        nextPageStatus1: nextPageStatus1,
        nextPageStatus2: nextPageStatus2,
        nextPageStatus3: nextPageStatus3,
        nextPageStatus4: nextPageStatus4,
        helpers: {
          // Hàm định dạng title của product simple lấy 36 kí tự
          formatTitleProductSimple: formatStringHelper.formatTitleProductSimple,
          // Hàm định dạng title của product combo lấy 52 kí tự
          formatTitleProductCombo: formatStringHelper.formatTitleProductCombo
        }
      });
    });
  } catch (error) {
    next(error);
  }
};

module.exports.orderInfoShowStatus4 = function(req, res, next) {
  try {
    // Lấy user hiện tại
    var customerId = res.locals.authUser.ID;

    // status 4
    var pageStatus4 = req.query.page || 1;
    var limitStatus4 = req.query.limit || 3;

    if (isNaN(pageStatus4)) {
      pageStatus4 = 1;
    }

    if (pageStatus4 < 1) {
      pageStatus4 = 1;
    }

    if (pageStatus4 < 1) {
      limitStatus4 = 3;
    }

    var offsetStatus4 = (pageStatus4 - 1) * limitStatus4;

    // status 2
    var pageStatus2 = 1;
    var limitStatus2 = 3;
    var offsetStatus2 = 0;

    // status 3
    var pageStatus3 = 1;
    var limitStatus3 = 3;
    var offsetStatus3 = 0;

    // status 1
    var pageStatus1 = 1;
    var limitStatus1 = 3;
    var offsetStatus1 = 0;

    var isHaveType1 = true;
    var isHaveType2 = true;
    var isHaveType3 = true;
    var isHaveType4 = true;

    var quantityHaveType1 = 0;
    var quantityHaveType2 = 0;
    var quantityHaveType3 = 0;
    var quantityHaveType4 = 0;

    Promise.all([
      orderInfoModel.topNOrderInfoFollowIdCustomerAndOrderStatusIdAndOffset(
        customerId,
        1,
        limitStatus1,
        offsetStatus1
      ),
      orderInfoModel.topNOrderInfoFollowIdCustomerAndOrderStatusIdAndOffset(
        customerId,
        2,
        limitStatus2,
        offsetStatus2
      ),
      orderInfoModel.topNOrderInfoFollowIdCustomerAndOrderStatusIdAndOffset(
        customerId,
        3,
        limitStatus3,
        offsetStatus3
      ),
      orderInfoModel.topNOrderInfoFollowIdCustomerAndOrderStatusIdAndOffset(
        customerId,
        4,
        limitStatus4,
        offsetStatus4
      ),
      orderInfoModel.quantityOrderInfoFollowIdCustomerAndOrderStatusId(
        customerId,
        1
      ),
      orderInfoModel.quantityOrderInfoFollowIdCustomerAndOrderStatusId(
        customerId,
        2
      ),
      orderInfoModel.quantityOrderInfoFollowIdCustomerAndOrderStatusId(
        customerId,
        3
      ),
      orderInfoModel.quantityOrderInfoFollowIdCustomerAndOrderStatusId(
        customerId,
        4
      ),
      productModel.topNProductBestSalerFollowOffset(4, 0),
      productComboModel.topNProductComboBestSalerFollowOffset(3, 0)
    ]).then(values => {
      // status 1
      var totalStatus1 = values[4][0].QUANTITY;
      var nPagesStatus1 = Math.floor(totalStatus1 / limitStatus1);
      if (totalStatus1 % limitStatus1 > 0) nPagesStatus1++;

      var pagesStatus1 = createArrPage(nPagesStatus1, pageStatus1);

      var prePageStatus1 = {
        value: 0,
        active: false
      };
      if (pageStatus1 > 1) {
        prePageStatus1.value = pageStatus1 - 1;
        prePageStatus1.active = true;
      } else {
        prePageStatus1.value = 0;
        prePageStatus1.active = false;
      }

      var nextPageStatus1 = {
        value: 0,
        active: false
      };

      if (pageStatus1 < nPagesStatus1) {
        nextPageStatus1.value = parseInt(pageStatus1) + 1;
        nextPageStatus1.active = true;
      } else {
        nextPageStatus1.value = 0;
        nextPageStatus1.active = false;
      }

      // status 2
      var totalStatus2 = values[5][0].QUANTITY;
      var nPagesStatus2 = Math.floor(totalStatus2 / limitStatus2);
      if (totalStatus2 % limitStatus2 > 0) nPagesStatus2++;

      var pagesStatus2 = createArrPage(nPagesStatus2, pageStatus2);

      var prePageStatus2 = {
        value: 0,
        active: false
      };
      if (pageStatus2 > 1) {
        prePageStatus2.value = pageStatus2 - 1;
        prePageStatus2.active = true;
      } else {
        prePageStatus2.value = 0;
        prePageStatus2.active = false;
      }

      var nextPageStatus2 = {
        value: 0,
        active: false
      };

      if (pageStatus2 < nPagesStatus2) {
        nextPageStatus2.value = parseInt(pageStatus2) + 1;
        nextPageStatus2.active = true;
      } else {
        nextPageStatus2.value = 0;
        nextPageStatus2.active = false;
      }

      // status 3
      var totalStatus3 = values[6][0].QUANTITY;
      var nPagesStatus3 = Math.floor(totalStatus3 / limitStatus3);
      if (totalStatus3 % limitStatus3 > 0) nPagesStatus3++;

      var pagesStatus3 = createArrPage(nPagesStatus3, pageStatus3);

      var prePageStatus3 = {
        value: 0,
        active: false
      };
      if (pageStatus3 > 1) {
        prePageStatus3.value = pageStatus3 - 1;
        prePageStatus3.active = true;
      } else {
        prePageStatus3.value = 0;
        prePageStatus3.active = false;
      }

      var nextPageStatus3 = {
        value: 0,
        active: false
      };

      if (pageStatus3 < nPagesStatus3) {
        nextPageStatus3.value = parseInt(pageStatus3) + 1;
        nextPageStatus3.active = true;
      } else {
        nextPageStatus3.value = 0;
        nextPageStatus3.active = false;
      }

      // status 4
      var totalStatus4 = values[7][0].QUANTITY;
      var nPagesStatus4 = Math.floor(totalStatus4 / limitStatus4);
      if (totalStatus4 % limitStatus4 > 0) nPagesStatus4++;

      var pagesStatus4 = createArrPage(nPagesStatus4, pageStatus4);

      var prePageStatus4 = {
        value: 0,
        active: false
      };
      if (pageStatus4 > 1) {
        prePageStatus4.value = pageStatus4 - 1;
        prePageStatus4.active = true;
      } else {
        prePageStatus4.value = 0;
        prePageStatus4.active = false;
      }

      var nextPageStatus4 = {
        value: 0,
        active: false
      };

      if (pageStatus4 < nPagesStatus4) {
        nextPageStatus4.value = parseInt(pageStatus4) + 1;
        nextPageStatus4.active = true;
      } else {
        nextPageStatus4.value = 0;
        nextPageStatus4.active = false;
      }

      // console.log("TCL: module.exports.showOrderInfo -> values", values)
      if (values[0].length === 0) isHaveType1 = false;

      if (values[1].length === 0) isHaveType2 = false;

      if (values[2].length === 0) isHaveType3 = false;

      if (values[3].length === 0) isHaveType4 = false;

      quantityHaveType1 = +values[4][0].QUANTITY;
      //console.log("TCL: module.exports.orderInfoShow -> values[4][0].QUANTITY", values[4][0].QUANTITY)
      quantityHaveType2 = +values[5][0].QUANTITY;
      quantityHaveType3 = +values[6][0].QUANTITY;
      quantityHaveType4 = +values[7][0].QUANTITY;

      res.render("customer/order-info-show", {
        layout: "main-customer.hbs",
        orderInfoType1: values[0],
        orderInfoType2: values[1],
        orderInfoType3: values[2],
        orderInfoType4: values[3],
        products: values[8],
        productsCombo: values[9],
        isHaveType1: isHaveType1,
        isHaveType2: isHaveType2,
        isHaveType3: isHaveType3,
        isHaveType4: isHaveType4,
        quantityHaveType1: quantityHaveType1,
        quantityHaveType2: quantityHaveType2,
        quantityHaveType3: quantityHaveType3,
        quantityHaveType4: quantityHaveType4,
        pagesStatus1: pagesStatus1,
        pagesStatus2: pagesStatus2,
        pagesStatus3: pagesStatus3,
        pagesStatus4: pagesStatus4,
        prePageStatus1: prePageStatus1,
        prePageStatus2: prePageStatus2,
        prePageStatus3: prePageStatus3,
        prePageStatus4: prePageStatus4,
        nextPageStatus1: nextPageStatus1,
        nextPageStatus2: nextPageStatus2,
        nextPageStatus3: nextPageStatus3,
        nextPageStatus4: nextPageStatus4,
        helpers: {
          // Hàm định dạng title của product simple lấy 36 kí tự
          formatTitleProductSimple: formatStringHelper.formatTitleProductSimple,
          // Hàm định dạng title của product combo lấy 52 kí tự
          formatTitleProductCombo: formatStringHelper.formatTitleProductCombo
        }
      });
    });
  } catch (error) {
    next(error);
  }
};

module.exports.orderDetailShow = function(req, res, next) {
  try {
    var orderInfoId = req.body.orderInfoId;

    Promise.all([
      orderInfoModel.allRowProductSimpleFollowID(orderInfoId),
      orderInfoModel.allRowProductComboFollowID(orderInfoId)
    ]).then(values => {
      for (productSimple of values[0]) {
        productSimple.TOTALMONEY = formatPriceHelper(productSimple.TOTALMONEY);

        // Tên của sản phẩm
        productSimple.FORMATNAME = formatStringHelper.formatTitleProductForCartDetail(
          productSimple.NAME
        );
      }

      for (productCombo of values[1]) {
        productCombo.TOTALMONEY = formatPriceHelper(productCombo.TOTALMONEY);

        // Tên của sản phẩm
        productCombo.FORMATNAME = formatStringHelper.formatTitleProductForCartDetail(
          productCombo.NAME
        );
      }

      res.json({
        productsSimple: JSON.stringify(values[0]),
        productsCombo: JSON.stringify(values[1])
      });
    });
  } catch (error) {
    next(error);
  }
};

//Hàm tạo mảng trang
function createArrPage(nPages, page) {
  var pages = [];
  //Chỉ hiện tối đa 5 trang
  var start = (end = 0);
  if (nPages <= 5) {
    start = 1;
    end = nPages;
  } else {
    if (page == 1) {
      start = 1;
      end = 5;
    } else if (page == nPages) {
      start = nPages - 5;
      end = nPages;
    } else {
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
