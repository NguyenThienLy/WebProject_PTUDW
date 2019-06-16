var db = require("../utils/db");

// hàm lấy ra số lượng customers
module.exports.ordersQuantity = () => {
  return db.load(
    `SELECT COUNT(ID) AS ORDER_QUANTITY FROM order_info WHERE STATUS = 1`
  );
};

module.exports.allOrderInfoByCustomerId = customerId => {
  return db.load(`SELECT * FROM order_info WHERE CUSTOMERID = '${customerId}'`);
};

module.exports.deleteOrderInfo = orderInfo => {
  return db.update("order_info", "CUSTOMERID", orderInfo);
};
