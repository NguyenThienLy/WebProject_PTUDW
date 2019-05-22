// Gọi sessionCartModel
var sessionCartModel = require("../../models/session_cart.model");

var shortid = require("shortid");

module.exports = function(req, res, next) {
  if (!req.signedCookies.sessionId) {
    res.cookie("sessionId", shortid.generate(), {
      signed: true
    });
  }

  next();
};
