// Gọi sessionCartModel
var sessionCartModel = require("../../models/session_cart.model");

// Middleware dùng để lấy số lượng và dánh sách sản phẩm được cho vào giỏ hàng
module.exports = function(req, res, next) {
  // Lấy ID của product combo
  var sessionId = req.signedCookies.sessionId;

  Promise.all([
    sessionCartModel.quantityFollowID(sessionId),
    sessionCartModel.allRowProductSimpleFollowID(sessionId),
    sessionCartModel.allRowProductComboFollowID(sessionId)
  ]).then(values => {
    // Nếu giỏ hàng trống gán giỏ hàng bằng 0.
    if (values[0][0].QUANTITY == null) {
      res.locals.quantityProduct = 0;
    }
    else {
      res.locals.quantityProduct = values[0][0].QUANTITY;
      // Gán các mặt hàng của sản phâm simple
      res.locals.cartProducts = values[1];
      // Gán các mặt hàng của sản phẩm combo
      res.locals.cartProductsCombo = values[2];
    }  

    next();
  });
};
