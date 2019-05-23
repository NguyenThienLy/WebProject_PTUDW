// Gọi sessionCartModel
var sessionCartModel = require("../../models/session_cart.model");

// Middle ware dùng để lấy id category hoặc id sub category
module.exports = function(req, res, next) {
  // Lấy id của category lưu vào local
  res.locals.idCategory = req.params.idCat;

  // Lấy id của sub category lưu vào local, nếu không có thì bỏ gán bằng 0
  if (req.params.idSub == null) res.locals.iDSubCategory = 0;
  else res.locals.idSubCategory = req.params.idSub;

  next();
};
