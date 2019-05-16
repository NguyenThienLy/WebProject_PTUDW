var customerModel = require("../../../models/customer.model");
var commentModel = require("../../../models/comment.model");

// Đếm số lượng để gán value cho badge ở sidebar
module.exports = async function(req, res, next) {
  var customer_quantity = await customerModel.customersQuantity();
  var comment_quantity = await commentModel.commentsQuantity();

  res.locals.sidebar[1].quantity = customer_quantity[0].CUSTOMER_QUANTITY;
  res.locals.sidebar[8].quantity = comment_quantity[0].COMMENT_QUANTITY;

  next();
};
