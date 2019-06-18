var moment = require("moment");

// Gọi sessionCartModel
var sessionCartModel = require("../../models/session_cart.model");
// Gọi productModel
var productModel = require("../../models/product.model");
// Gọi productComboModel
var productComboModel = require("../../models/product_combo.model");
// Gọi orderInfoModel
var orderInfoModel = require("../../models/order_info.model");
// Gọi orderDetailModel
var orderDetailModel = require("../../models/order_detail.model");

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
    // Lấy số lượng sản phẩm
    var currQuantity = req.body.quantityProduct;

    if (isSimple === true) {
      // Đối tượng session cart danh cho product
      var session_cart = {
        ID: sessionId,
        PRODUCT_ID: productId,
        PRODUCT_COMBO_ID: 0,
        QUANTITY: currQuantity,
        IS_LOGIN: 0
      };

      productModel
        .GetInventoryProductFollowId(session_cart.PRODUCT_ID)
        .then(inventory => {
          sessionCartModel
            .allRowFollowID(sessionId)
            .then(sessionCarts => {
              // var isFind = false;
              var index = sessionCarts.findIndex(
                sessionCart =>
                  sessionCart.PRODUCT_COMBO_ID ==
                    session_cart.PRODUCT_COMBO_ID &&
                  sessionCart.PRODUCT_ID == session_cart.PRODUCT_ID &&
                  sessionCart.ID == session_cart.ID
              );

              // Thêm mới sản phẩm trong giỏ hàng
              if (index === -1) {
                if (+inventory[0].INVENTORY < session_cart.QUANTITY) {
                  res.send("notEnough");
                } else
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

                if (+inventory[0].INVENTORY < session_cart.QUANTITY) {
                  res.send("notEnough");
                } else
                  sessionCartModel
                    .update3PrimaryKey(session_cart)
                    .then(result => {
                      res.send("success");
                    })
                    .catch(err => {
                      res.send("fail");
                    });
              }
            })
            .catch(err => {
              res.send("fail");
            });
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

      productComboModel
        .GetInventoryProductComboFollowId(session_cart.PRODUCT_COMBO_ID)
        .then(inventory => {
          sessionCartModel
            .allRowFollowID(sessionId)
            .then(sessionCarts => {
              var index = sessionCarts.findIndex(
                sessionCart =>
                  sessionCart.PRODUCT_COMBO_ID ==
                    session_cart.PRODUCT_COMBO_ID &&
                  sessionCart.PRODUCT_ID == session_cart.PRODUCT_ID &&
                  sessionCart.ID == session_cart.ID
              );

              // Thêm mới sản phẩm vào giỏ hàng
              if (index === -1) {
                if (+inventory[0].INVENTORY < session_cart.QUANTITY) {
                  res.send("notEnough");
                } else
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

                if (+inventory[0].INVENTORY < session_cart.QUANTITY) {
                  res.send("notEnough");
                } else
                  sessionCartModel
                    .update3PrimaryKey(session_cart)
                    .then(result => {
                      res.send("success");
                    })
                    .catch(err => {
                      res.send("fail");
                    });
              }
            })
            .catch(err => {
              res.send("fail");
            });
        })
        .catch(err => {
          res.send("fail");
        });
    }
  } catch (error) {
    next(error);
  }
};

// Kiểm tra xem sản phẩm này có hết hàng chưa
module.exports.checkProductInCart = function(req, res, next) {
  try {
    // Lấy ID của product simple
    var productId = req.body.productId;
    // Kiểm tra xem người dùng thêm simple hay combo
    var isSimple = req.body.isSimple === "true";
    // Lấy ID signed cookies combo
    var sessionId = req.signedCookies.sessionId;
    // Lấy số lượng sản phẩm
    var currQuantity = req.body.quantityProduct;

    if (isSimple === true) {
      // Đối tượng session cart danh cho product
      var session_cart = {
        ID: sessionId,
        PRODUCT_ID: productId,
        PRODUCT_COMBO_ID: 0,
        QUANTITY: currQuantity,
        IS_LOGIN: 0
      };

      productModel
        .GetInventoryProductFollowId(session_cart.PRODUCT_ID)
        .then(inventory => {
          sessionCartModel
            .allRowFollowID(sessionId)
            .then(sessionCarts => {
              // var isFind = false;
              var index = sessionCarts.findIndex(
                sessionCart =>
                  sessionCart.PRODUCT_COMBO_ID ==
                    session_cart.PRODUCT_COMBO_ID &&
                  sessionCart.PRODUCT_ID == session_cart.PRODUCT_ID &&
                  sessionCart.ID == session_cart.ID
              );

              // Thêm mới sản phẩm trong giỏ hàng
              if (index === -1) {
                if (+inventory[0].INVENTORY < currQuantity) {
                  res.send("notEnough");
                } else res.send("enough");
                // Tăng số lượng sản phẩm trong giỏ hàng
              } else {
                // Tăng quantity lên 1 đơn vị

                if (+inventory[0].INVENTORY < ++currQuantity) {
                  res.send("notEnough");
                } else res.send("enough");
              }
            })
            .catch(err => {
              res.send("fail");
            });
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

      productComboModel
        .GetInventoryProductComboFollowId(session_cart.PRODUCT_COMBO_ID)
        .then(inventory => {
          sessionCartModel
            .allRowFollowID(sessionId)
            .then(sessionCarts => {
              var index = sessionCarts.findIndex(
                sessionCart =>
                  sessionCart.PRODUCT_COMBO_ID ==
                    session_cart.PRODUCT_COMBO_ID &&
                  sessionCart.PRODUCT_ID == session_cart.PRODUCT_ID &&
                  sessionCart.ID == session_cart.ID
              );

              // Thêm mới sản phẩm vào giỏ hàng
              if (index === -1) {
                if (+inventory[0].INVENTORY < currQuantity) {
                  res.send("notEnough");
                } else res.send("enough");
                // Tăng số lượng sản phẩm  trong giỏ hàng
              } else {
                // Tăng quantity lên 1 đơn vị
                if (+inventory[0].INVENTORY < ++currQuantity) {
                  res.send("notEnough");
                } else res.send("enough");
              }
            })
            .catch(err => {
              res.send("fail");
            });
        })
        .catch(err => {
          res.send("fail");
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

      productModel
        .GetInventoryProductFollowId(session_cart.PRODUCT_ID)
        .then(inventory => {
          if (+inventory[0].INVENTORY < session_cart.QUANTITY) {
            res.send("notEnough");
          } else
            sessionCartModel
              .update3PrimaryKey(session_cart)
              .then(result => {
                res.send("success");
              })
              .catch(err => {
                res.send("fail");
              });
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

      productComboModel
        .GetInventoryProductComboFollowId(session_cart.PRODUCT_COMBO_ID)
        .then(inventory => {
          if (+inventory[0].INVENTORY < session_cart.QUANTITY) {
            res.send("notEnough");
          } else
            sessionCartModel
              .update3PrimaryKey(session_cart)
              .then(result => {
                res.send("success");
              })
              .catch(err => {
                res.send("fail");
              });
        })
        .catch(err => {
          res.send("fail");
        });
    }
  } catch (error) {
    next(error);
  }
};

async function updateQuantitySessionCartForProductSimple(
  arrSessionCart,
  sessionId
) {
  var isUpdate = false;

  for (sessioncart of arrSessionCart) {
    if (+sessioncart.SESSION_CART_QUANTITY > +sessioncart.PRODUCT_QUANTITY) {
      isUpdate = true;

      var session_cart = {
        ID: sessionId,
        PRODUCT_ID: sessioncart.PRODUCT_ID,
        PRODUCT_COMBO_ID: 0,
        QUANTITY: +sessioncart.PRODUCT_QUANTITY,
        IS_LOGIN: 0
      };

      if (+sessioncart.PRODUCT_QUANTITY === 0)
        await sessionCartModel.deleteFollow3PrimaryKey(session_cart);
      else await sessionCartModel.update3PrimaryKey(session_cart);
    }
  }

  return isUpdate;
}

async function updateQuantitySessionCartForProductCombo(
  arrSessionCart,
  sessionId
) {
  var isUpdate = false;

  for (sessioncart of arrSessionCart) {
    if (+sessioncart.SESSION_CART_QUANTITY > +sessioncart.PRODUCT_QUANTITY) {
      isUpdate = true;

      var session_cart = {
        ID: sessionId,
        PRODUCT_ID: 0,
        PRODUCT_COMBO_ID: sessioncart.PRODUCT_ID,
        QUANTITY: +sessioncart.PRODUCT_QUANTITY,
        IS_LOGIN: 0
      };

      if (+sessioncart.PRODUCT_QUANTITY === 0)
        await sessionCartModel.deleteFollow3PrimaryKey(session_cart);
      else await sessionCartModel.update3PrimaryKey(session_cart);
    }
  }

  return isUpdate;
}

async function addOrderDetailProductSimple(
  arrSessionProductSimple,
  orderInfoId
) {
  for (sessioncart of arrSessionProductSimple) {
    var orderDetail = {
      ORDERINFOID: orderInfoId,
      PRODUCTID: sessioncart.ID,
      QUANTITY: sessioncart.QUANTITY_PRO,
      TOTALMONEY: +sessioncart.QUANTITY_PRO * +sessioncart.SALEPRICE,
      ISSIMPLE: 1
    };
    console.log("TCL: orderDetail", orderDetail);
    await orderDetailModel.addOrderDetail(orderDetail);
  }
}

async function addOrderDetailProductCombo(arrSessionProductCombo, orderInfoId) {
  for (sessioncart of arrSessionProductCombo) {
    var orderDetail = {
      ORDERINFOID: orderInfoId,
      PRODUCTID: sessioncart.ID,
      QUANTITY: sessioncart.QUANTITY_PRO,
      TOTALMONEY: +sessioncart.QUANTITY_PRO * +sessioncart.SALEPRICE,
      ISSIMPLE: 0
    };
    await orderDetailModel.addOrderDetail(orderDetail);
  }
}

// Kiểm tra số lượng sản phẩm
module.exports.checkRealQuantityProduct = function(req, res, next) {
  try {
    // Lấy ID signed cookies combo
    var sessionId = req.signedCookies.sessionId;
    // Lấy user hiện tại
    var customerId = res.locals.authUser.ID;

    sessionCartModel
      .allSessionCartProductSimpleFollowSessionId(sessionId)
      .then(session_product_simple => {
        sessionCartModel
          .allSessionCartProductCompoFollowSessionId(sessionId)
          .then(session_product_combo => {
            updateQuantitySessionCartForProductSimple(
              session_product_simple,
              sessionId
            ).then(resultSimple => {
              updateQuantitySessionCartForProductCombo(
                session_product_combo,
                sessionId
              ).then(resultCombo => {
                // console.log("TCL: module.exports.checkRealQuantityProduct -> resultSimple", resultSimple)

                // console.log("TCL: module.exports.checkRealQuantityProduct -> resultCombo", resultCombo)
                if (resultSimple === true || resultCombo === true) {
                  res.send("isChange");
                } else {
                  Promise.all([
                    sessionCartModel.allRowProductSimpleFollowID(sessionId),
                    sessionCartModel.allRowProductComboFollowID(sessionId)
                  ]).then(values => {
                    var totalMoney = 0;

                    // Tổng tiền simple
                    for (productSimple of values[0]) {
                      totalMoney +=
                        +productSimple.SALEPRICE * +productSimple.QUANTITY_PRO;
                    }

                    // Tổng tiền combo
                    for (productCombo of values[1]) {
                      totalMoney +=
                        +productCombo.SALEPRICE * +productCombo.QUANTITY_PRO;
                    }

                    var created = moment().format("YYYY-MM-DD HH:mm:ss");
                    //console.log("TCL: module.exports.checkRealQuantityProduct -> created", created)

                    var order_info = {
                      ID: null,
                      CUSTOMERID: customerId,
                      CREATED: created,
                      TOTALMONEY: totalMoney,
                      STATUS: 1
                    };

                    orderInfoModel.addOrderInfo(order_info).then(successAdd => {
                      orderInfoModel
                        .getIdFollowObjectOrderInfo(order_info)
                        .then(idOrderInfo => {
                          var id = idOrderInfo[0].ID;
                          //console.log("TCL: module.exports.checkRealQuantityProduct -> id", id)

                          addOrderDetailProductSimple(values[0], id).then(
                            resultSimple => {
                              addOrderDetailProductCombo(values[1], id).then(
                                resultCombo => {
                                  sessionCartModel
                                    .deleteSessionIdFollowId(sessionId)
                                    .then(successDelete => {
                                      res.send("success");
                                    });
                                }
                              );
                            }
                          );
                        });
                    });
                  });
                }
              });
            });
          });
      });
  } catch (error) {
    res.send("fail");
    next(error);
  }
};

module.exports.cartOrder = function(req, res) {
  res.end("thanh toan");
};
