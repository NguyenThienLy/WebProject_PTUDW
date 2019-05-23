// Gọi sessionCartModel
var sessionCartModel = require("../../models/session_cart.model");

// Middleware dùng để lấy số lượng và dánh sách sản phẩm được cho vào giỏ hàng
module.exports = function(req, res, next) {
  // Lấy ID của product combo
  var sessionId = req.signedCookies.sessionId;

  Promise.all([
    sessionCartModel.quantityFollowID(sessionId),
    sessionCartModel.allRowDetailFollowID(sessionId)
  ]).then(values => {
    // Nếu giỏ hàng trống gán giỏ hàng bằng 0.
    if (values[0][0].QUANTITY == null) 
      values[0][0].QUANTITY;
      
    res.locals.quantityProduct = values[0][0].QUANTITY;
    res.locals.cartProducts = values[1];

    next();
  });
};
