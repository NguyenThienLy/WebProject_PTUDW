// Gọi sessionCartModel
var sessionCartModel = require("../../models/session_cart.model");

// Gọi formatStringHelper
var formatStringHelper = require("../../helpers/format_string_hide.helper");

module.exports.cartDetail = function(req, res) {
  res.render("customer/cart-detail", {
    layout: "main-customer.hbs",
    isInCartDetail: true,
    helpers: {
      // Hàm định dạng title của cart detail lấy 30 kí tự
      formatShortTitleCartDetail:
        formatStringHelper.formatTitleProductForCartDetail
    }
  });
};

// Thêm sản phẩm vào giỏ hàng
module.exports.addProductInCart = function(req, res, next) {
  try {
    // Lấy ID của product simple
    var productId = req.body.productId;
    // Kiểm tra xem người dùng thêm simple hay combo
    var isSimple = req.body.isSimple === "true";
    // Lấy ID signed cookies combo
    var sessionId = req.signedCookies.sessionId;

    if (isSimple === true) {
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
          sessionCartModel
            .addSessionCart(session_cart)
            .then(result => {
              res.send("success");
            })
            .catch(err => {
              res.send("fail");
            });
          // Tăng số lượng sản phẩm trong giỏ hàng
        } else {
          // Tăng quantity lên 1 đơn vị
          session_cart.QUANTITY = ++sessionCarts[index].QUANTITY;

          sessionCartModel
            .update3PrimaryKey(session_cart)
            .then(result => {
              res.send("success");
            })
            .catch(err => {
              res.send("fail");
            });
        }
      });
    } else {
      // Đối tượng session cart danh cho product
      var session_cart = {
        ID: sessionId,
        PRODUCT_ID: 0,
        PRODUCT_COMBO_ID: productId,
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
          sessionCartModel
            .addSessionCart(session_cart)
            .then(result => {
              res.send("success");
            })
            .catch(err => {
              res.send("fail");
            });
          // Tăng số lượng sản phẩm  trong giỏ hàng
        } else {
          // Tăng quantity lên 1 đơn vị
          session_cart.QUANTITY = ++sessionCarts[index].QUANTITY;

          sessionCartModel
            .update3PrimaryKey(session_cart)
            .then(result => {
              res.send("success");
            })
            .catch(err => {
              res.send("fail");
            });
        }
      });
    }
  } catch (error) {
    next(error);
  }
};

// Xóa sản phẩm vào giỏ hàng
module.exports.removeProductInCart = function(req, res, next) {
  try {
    // Lấy ID của product simple
    var productId = req.body.productId;
    // Kiểm tra xem người dùng thêm simple hay combo
    var isSimple = req.body.isSimple === "true";
    // Lấy ID signed cookies combo
    var sessionId = req.signedCookies.sessionId;

    if (isSimple === true) {
      // Đối tượng session cart danh cho product
      var session_cart = {
        ID: sessionId,
        PRODUCT_ID: productId,
        PRODUCT_COMBO_ID: 0
      };

      sessionCartModel
        .deleteFollow3PrimaryKey(session_cart)
        .then(result => {
          res.send("success");
        })
        .catch(err => {
          res.send("fail");
        });
    } else {
      // Đối tượng session cart danh cho product
      var session_cart = {
        ID: sessionId,
        PRODUCT_ID: 0,
        PRODUCT_COMBO_ID: productId
      };

      sessionCartModel
        .deleteFollow3PrimaryKey(session_cart)
        .then(result => {
          res.send("success");
        })
        .catch(err => {
          res.send("fail");
        });
    }
  } catch (error) {
    next(error);
  }
};

// Cập nhật số lượng sản phẩm trong giỏ hàng
module.exports.updateQuantityProductInCart = function(req, res, next) {
  try {
    // Lấy ID của product simple
    var productId = req.body.productId;
    // Lấy số lượng sản phẩm 
    var currQuantity = req.body.quantityProduct;
    // Kiểm tra xem người dùng thêm simple hay combo
    var isSimple = req.body.isSimple === "true";
    // Lấy ID signed cookies combo
    var sessionId = req.signedCookies.sessionId;

    if (isSimple === true) {
      // Đối tượng session cart danh cho product
      var session_cart = {
        ID: sessionId,
        PRODUCT_ID: productId,
        PRODUCT_COMBO_ID: 0,
        QUANTITY: currQuantity,
        IS_LOGIN: 0
      };

      sessionCartModel
      .update3PrimaryKey(session_cart)
      .then(result => {
        res.send("success");
      })
      .catch(err => {
        res.send("fail");
      });
    } else {
      // Đối tượng session cart danh cho product
      var session_cart = {
        ID: sessionId,
        PRODUCT_ID: 0,
        PRODUCT_COMBO_ID: productId,
        QUANTITY: currQuantity,
        IS_LOGIN: 0
      };
    
      sessionCartModel
            .update3PrimaryKey(session_cart)
            .then(result => {
              res.send("success");
            })
            .catch(err => {
              res.send("fail");
            });
    }
  } catch (error) {
    next(error);
  }
};

module.exports.cartOrder = function(req, res) {
  res.end("thanh toan");
};
