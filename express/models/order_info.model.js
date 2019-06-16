var db = require("../utils/db");


// hàm lấy ra danh sách tất cả comments
module.exports.checkVerifyProductFollowProductIdAndCustomerIdAndTypeProduct = (productId, customerId, typeProduct) => {
  return db.load(
    `SELECT COUNT(ORDER_INFO.ID) AS QUANTITY
     FROM order_info ORDER_INFO JOIN order_detail ORDER_DETAIL
     ON ORDER_INFO.ID = ORDER_DETAIL.ORDERINFOID
     WHERE ORDER_INFO.CUSTOMERID = ${customerId} AND ORDER_DETAIL.PRODUCTID = ${productId}
     AND  ORDER_DETAIL.ISSIMPLE = ${typeProduct}`
  );
};

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

