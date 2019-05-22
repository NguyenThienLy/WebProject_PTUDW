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
// Gọi sessionCartModel
var sessionCartModel = require("../../models/session_cart.model");

// Gọi formatStringHelper
var formatStringHelper = require("../../helpers/format_string_hide.helper");
// Gọi convertToDateHelper
var convertToDateHelper = require("../../helpers/convert_to_date.helper");

module.exports.productDetail = function(req, res) {
  res.render("customer/product-detail", { layout: "main-customer.hbs" });
};

module.exports.productShow = function(req, res) {
  try {
    // Lấy ID của product combo
    var sessionId = req.signedCookies.sessionId;

    Promise.all([
      sessionCartModel.quantityFollowID(sessionId),
      sessionCartModel.allRowDetailFollowID(sessionId)
    ]).then(values => {
      res.render("customer/product-show", {
        quantityProduct: values[4][0].QUANTITY,
        cartProducts: values[5],
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
          formatShortContentInfo: formatStringHelper.formatShortContentInfo
          // Hàm định dạng title của product khi ở fast cart
        }
      });
    });
  } catch (error) {
    next(error);
  }
};

// Hàm hiển thị product theo id category
module.exports.productShowFollowIdCat = function(req, res, next) {
  try {
    var idCat = req.params.idCat;

    Promise.all([productModel.top8ProductFollowIdCat(idCat)]).then(values => {
      res.render("customer/product-show", {
        layout: "main-customer.hbs",
        products: values[0],
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
          formatShortContentInfo: formatStringHelper.formatShortContentInfo
          // Hàm định dạng title của product khi ở fast cart
        }
      });
    });
  } catch (error) {
    next(error);
  }
};

// Hàm hiển thị product theo id sub category
module.exports.productShowFollowIdSub = function(req, res) {
  var idCat = req.params.idCat;
  var idSub = req.params.idSub;

  res.render("customer/product-show", { layout: "main-customer.hbs" });
};

// Hàm thêm sản phẩm simple vào session cart
module.exports.addProductToSession = function(req, res) {
  // Lấy ID của product simple
  var productId = req.params.id;
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
        res.redirect("/customer/product/product-show");
      });
    } else {
      // Tăng quantity lên 1 đơn vị
      session_cart.QUANTITY = ++sessionCarts[index].QUANTITY;

      sessionCartModel.update3PrimaryKey(session_cart).then(result => {
        console.log(result);
        res.redirect("/customer/product/product-show");
      });
    }
  });
};

// Hàm thêm sản phẩm combo vào session cart
module.exports.addProductComboToSession = function(req, res) {
  // Lấy ID của product simple
  var productComboId = req.params.id;
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
        res.redirect("/customer/product/product-show");
      });
    } else {
      // Tăng quantity lên 1 đơn vị
      session_cart.QUANTITY = sessionCarts[index].QUANTITY++;

      sessionCartModel.update3PrimaryKey(session_cart).then(result => {
        console.log(result);
        res.redirect("/customer/product/product-show");
      });
    }
  });
};
