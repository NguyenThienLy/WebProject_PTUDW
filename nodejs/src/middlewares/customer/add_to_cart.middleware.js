// Hàm thêm sản phẩm vào session cart
module.exports = function(req, res, next) {
  try {
    // Lấy ID của product simple
    var productId = +req.params.idProSimple;
    // Lấy ID của product combo
    var productComboId = +req.params.idProCombo;

    if (isNaN(productId) == true && isNaN(productId) == true) next();

    if (isNaN(productId) == true) {
      // Đối tượng session cart danh cho product
      var session_cart = {
        ID: sessionId,
        PRODUCT_ID: 0,
        PRODUCT_COMBO_ID: productComboId,
        QUANTITY: 1,
        IS_LOGIN: 0
      };
    } else {
      // Đối tượng session cart danh cho product
      var session_cart = {
        ID: sessionId,
        PRODUCT_ID: productId,
        PRODUCT_COMBO_ID: 0,
        QUANTITY: 1,
        IS_LOGIN: 0
      };
    }

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
          next();
        });
        // Tăng số lượng sản phẩm  trong giỏ hàng
      } else {
        // Tăng quantity lên 1 đơn vị
        session_cart.QUANTITY = ++sessionCarts[index].QUANTITY;

        sessionCartModel.update3PrimaryKey(session_cart).then(result => {
          next();
        });
      }
    });
  } catch (error) {
    next(error);
  }
};
