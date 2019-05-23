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

module.exports.productShow = function(req, res, next) {
  try {
    // // Lấy id của category
    // var idCat = req.params.idCat;

    Promise.all([productModel.top8ProductAscCreated()]).then(values => {
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

// Hàm hiển thị product theo id category
module.exports.productShowFollowIdCat = function(req, res, next) {
  try {
    // Lấy id của category
    var idCat = req.params.idCat;

    Promise.all([productModel.top8ProductFollowIdCat(idCat)]).then(values => {
      // Gán sub = 0 để hiển thị đang chọn cat
      for (product of values[0]) {
        product.SUBCATEGORYID = 0;
      }

      // id cat đang được chọn
      for (category of res.locals.lcCategories) {
        if (category.IDCAT === +idCat) category.isChoose = true;
      }

      res.render("customer/product-show", {
        layout: "main-customer.hbs",
        products: values[0],
        idCategory: idCat,
        idSubCategory: 0,
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
module.exports.productShowFollowIdCatAndIdSub = function(req, res) {
  try {
    // Lấy id của category
    var idCat = req.params.idCat;
    // Lấy id của sub category
    var idSub = req.params.idSub;

    Promise.all([
      productModel.top8ProductFollowIdCatAndIdSub(idCat, idSub)
    ]).then(values => {

      // console.log(res.locals.lcCategories);
      // id cat và id sub đang được chọn
      for (category of res.locals.lcCategories) {
        // Gán cho id category
        if (category.IDCAT === +idCat) {
          category.isChoose = true;

          // Gán cho id sub category
          for (subCategory of category.SUB)
            if (subCategory.IDSUB === +idSub) subCategory.isChoose = true;
        }
      }

      console.log(res.locals.lcCategories);

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

// Hàm thêm sản phẩm simple vào session cart
module.exports.addProductFollowIdCatToSession = function(req, res, next) {
  try {
    // Lấy ID của category
    var idCat = req.params.idCat;
    // Lấy ID của product simple
    var productId = req.params.idProSimple;
    // Lấy ID signed cookies combo
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
          res.redirect("/customer/product/product-show/" + idCat);
        });
      } else {
        // Tăng quantity lên 1 đơn vị
        session_cart.QUANTITY = ++sessionCarts[index].QUANTITY;

        sessionCartModel.update3PrimaryKey(session_cart).then(result => {
          console.log(result);
          res.redirect("/customer/product/product-show/" + idCat);
        });
      }
    });
  } catch (error) {
    next(error);
  }
};

// Hàm thêm sản phẩm simple vào session cart
module.exports.addProductFollowIdCatAndIdSubToSession = function(
  req,
  res,
  next
) {
  try {
    // Lấy ID của category
    var idCat = req.params.idCat;
    // Lấy ID của sub category
    var idSub = req.params.idSub;
    // Lấy ID của product simple
    var productId = req.params.idProSimple;
    // Lấy ID signed cookies combo
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

      // Thêm mới sản phẩm trong giỏ hàng
      if (index === -1) {
        sessionCartModel.addSessionCart(session_cart).then(result => {
          res.redirect("/customer/product/product-show/" + idCat + "/" + idSub);
        });
        // Tăng số lượng sản phẩm trong giỏ hàng
      } else {
        // Tăng quantity lên 1 đơn vị
        session_cart.QUANTITY = ++sessionCarts[index].QUANTITY;

        sessionCartModel.update3PrimaryKey(session_cart).then(result => {
          console.log(result);
          res.redirect("/customer/product/product-show/" + idCat + "/" + idSub);
        });
      }
    });
  } catch (error) {
    next(error);
  }
};

// Hàm thêm sản phẩm combo vào session cart
module.exports.addProductComboFollowIdCatToSession = function(req, res, next) {
  try {
    // Lấy ID của category
    var idCat = req.params.idCat;
    // Lấy ID của product simple
    var productComboId = req.params.id;
    // Lấy ID signed cookies combo
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

      // Thêm mới sản phẩm vào giỏ hàng
      if (index === -1) {
        sessionCartModel.addSessionCart(session_cart).then(result => {
          res.redirect("/customer/product/product-show/" + idCat);
        });
        // Tăng số lượng sản phẩm  trong giỏ hàng
      } else {
        // Tăng quantity lên 1 đơn vị
        session_cart.QUANTITY = sessionCarts[index].QUANTITY++;

        sessionCartModel.update3PrimaryKey(session_cart).then(result => {
          console.log(result);
          res.redirect("/customer/product/product-show/" + idCat);
        });
      }
    });
  } catch (error) {
    next(error);
  }
};

// Hàm thêm sản phẩm combo vào session cart
module.exports.addProductComboFollowIdCatAndIdSubToSession = function(
  req,
  res,
  next
) {
  try {
    // Lấy ID của category
    var idCat = req.params.idCat;
    // Lấy ID của sub category
    var idSub = req.params.idSub;
    // Lấy ID của product simple
    var productId = req.params.idProSimple;
    // Lấy ID signed cookies combo
    var sessionId = req.signedCookies.sessionId;

    // Đối tượng session cart dành cho product
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

      // Thêm mới sản phẩm trong giỏ hàng
      if (index === -1) {
        sessionCartModel.addSessionCart(session_cart).then(result => {
          res.redirect("/customer/product/product-show/" + idCat + "/" + idSub);
        });
        // Tăng số lượng sản phẩm trong giỏ hàng
      } else {
        // Tăng quantity lên 1 đơn vị
        session_cart.QUANTITY = ++sessionCarts[index].QUANTITY;

        sessionCartModel.update3PrimaryKey(session_cart).then(result => {
          console.log(result);
          res.redirect("/customer/product/product-show/" + idCat + "/" + idSub);
        });
      }
    });
  } catch (error) {
    next(error);
  }
};
