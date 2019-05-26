// Gọi productModel
var productModel = require("../../models/product.model");
// Gọi productComboModel
var productComboModel = require("../../models/product_combo.model");
// Gọi categoryModel
var categoryModel = require("../../models/category.model");
// Gọi newsModel
var newsModel = require("../../models/news.model");
// Gọi sessionCartModel
var sessionCartModel = require("../../models/session_cart.model");

// Gọi formatStringHelper
var formatStringHelper = require("../../helpers/format_string_hide.helper");
// Gọi convertToDateHelper
var convertToDateHelper = require("../../helpers/convert_to_date.helper");

module.exports.indexShow = function(req, res, next) {
  try {
    Promise.all([
      productModel.top8ProductForIndex(),
      productComboModel.top6ProductComboForIndex(),
      categoryModel.allCategory(),
      newsModel.top3PopularNewsIndexForIndex(),
    ]).then(values => {
      res.render("customer/index", {
        layout: "main-customer.hbs",
        products: values[0],
        productsCombo: values[1],
        categories: values[2],
        news: values[3],
        helpers: {
          // Hàm chuyển đổi qua kiểu ngày
          convertToDate: convertToDateHelper,
          // Hàm định dạng title của product simple lấy 36 kí tự
          formatTitleProductSimple: formatStringHelper.formatTitleProductSimple,
          // Hàm định dạng title của product combo lấy 52 kí tự
          formatTitleProductCombo: formatStringHelper.formatTitleProductCombo,
          // Hàm định dạng title của info lấy 85 kí tự
          formatTitleInfo: formatStringHelper.formatTitleInfo,
          // Hàm định dạng short content của info lấy 320 kí tự
          formatShortContentInfo: formatStringHelper.formatShortContentInfo,
        }
      });
    });
  } catch (error) {
    next(error);
  }
};

module.exports.addProductToSession = function(req, res, next) {
  try {
    // Lấy ID của product simple
    var productId = req.params.idProductSimple;
    // Lấy ID của product combo
    var sessionId = req.signedCookies.sessionId;

    // Đối tượng session cart danh cho product
    var session_cart = {
      ID: sessionId,
      PRODUCT_ID: productId,
      PRODUCT_COMBO_ID: 0,
      QUANTITY: 1,
      IS_LOGIN: 0
    };

    sessionCartModel.allRowFollowID(sessionId).then(sessionCarts => {
      // var isFind = false;
      var index = sessionCarts.findIndex(
        sessionCart =>
          sessionCart.PRODUCT_COMBO_ID == session_cart.PRODUCT_COMBO_ID &&
          sessionCart.PRODUCT_ID == session_cart.PRODUCT_ID &&
          sessionCart.ID == session_cart.ID
      );

      if (index === -1) {
        sessionCartModel.addSessionCart(session_cart).then(result => {
          res.redirect("/customer/index");
        });
      } else {
        // Tăng quantity lên 1 đơn vị
        session_cart.QUANTITY = ++sessionCarts[index].QUANTITY;

        sessionCartModel.update3PrimaryKey(session_cart).then(result => {
          console.log(result);
          res.redirect("/customer/index");
        });
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports.addProductComboToSession = function(req, res, next) {
  try {
    // Lấy ID của product simple
    var productComboId = req.params.idProductCombo;
    // Lấy ID của product combo
    var sessionId = req.signedCookies.sessionId;

    // Đối tượng session cart danh cho product
    var session_cart = {
      ID: sessionId,
      PRODUCT_ID: 0,
      PRODUCT_COMBO_ID: productComboId,
      QUANTITY: 1,
      IS_LOGIN: 0
    };

    sessionCartModel.allRowFollowID(sessionId).then(sessionCarts => {
      var index = sessionCarts.findIndex(
        sessionCart =>
          sessionCart.PRODUCT_COMBO_ID == session_cart.PRODUCT_COMBO_ID &&
          sessionCart.PRODUCT_ID == session_cart.PRODUCT_ID &&
          sessionCart.ID == session_cart.ID
      );

      if (index === -1) {
        sessionCartModel.addSessionCart(session_cart).then(result => {
          res.redirect("/customer/index");
        });
      } else {
        // Tăng quantity lên 1 đơn vị
        session_cart.QUANTITY = ++sessionCarts[index].QUANTITY;

        sessionCartModel.update3PrimaryKey(session_cart).then(result => {
          console.log(result);
          res.redirect("/customer/index");
        });
      }
    });
  } catch (error) {
    next(error);
  }
};
