var shortid = require("shortid");

module.exports = function(req, res, next) {
  if (!req.signedCookies.sessionId) {
    res.cookie("sessionId", shortid.generate(), {
      signed: true
    });
  }

  next();
};
