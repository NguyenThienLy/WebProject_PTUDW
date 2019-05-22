// Gọi sessionCartModel
var sessionCartModel = require("../../models/session_cart.model");

module.exports = function(req, res, next) {
  // Lấy ID của product combo
  var sessionId = req.signedCookies.sessionId;

  Promise.all([
    sessionCartModel.quantityFollowID(sessionId),
    sessionCartModel.allRowDetailFollowID(sessionId)
  ]).then(values => {
    res.locals.quantityProduct = values[0][0].QUANTITY;
    res.locals.cartProducts = values[1];

    next();
  });
};
