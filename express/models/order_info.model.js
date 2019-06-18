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


//Hàm trả về thời gian hiện tại
function getDateNow(){
  var today = new Date();
  var dd = today.getDate();

  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();
  if (dd < 10) {
      dd = '0' + dd;
  }

  if (mm < 10) {
      mm = '0' + mm;
  }
  today = yyyy + '-' + mm + '-' + dd;
  return today;
}

// Thên một đơn hàng mới
module.exports.addOrderInfo = orderInfo => {
  return db.add("order_info", orderInfo);
}

// Lấy ra id vừa được thêm vào cơ sở dữ liệu
module.exports.getIdFollowObjectOrderInfo = orderInfo => {
  return db.load(`
  SELECT ID 
  FROM order_info
  WHERE CUSTOMERID = ${orderInfo.CUSTOMERID} AND CREATED = '${orderInfo.CREATED}'
  AND TOTALMONEY = ${orderInfo.TOTALMONEY} AND STATUS = ${orderInfo.STATUS}
  LIMIT 1
  `);
}

