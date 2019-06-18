var db = require("../utils/db");

module.exports.orderDetailByOrderInfoId = orderInfoId => {
  return db.load(`
    SELECT order_detail.ORDERINFOID, order_detail.PRODUCTID, order_detail.QUANTITY, 
    order_detail.TOTALMONEY, order_detail.ISSIMPLE, product.NAME AS PRODUCTNAME
    FROM order_detail JOIN product ON order_detail.PRODUCTID = product.ID
    WHERE order_detail.ORDERINFOID = '${orderInfoId}'`);
};