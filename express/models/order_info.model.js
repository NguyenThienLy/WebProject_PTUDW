var db = require("../utils/db");

// hàm lấy ra danh sách tất cả comments
module.exports.checkVerifyProductFollowProductIdAndCustomerIdAndTypeProduct = (productId, customerId, typeProduct) => {
  return db.load(
    `SELECT COUNT(ORDER_INFO.ID) AS QUANTITY
     FROM order_info ORDER_INFO JOIN order_detail ORDER_DETAIL
     ON ORDER_INFO.ID = ORDER_DETAIL.ORDERINFOID
     WHERE ORDER_INFO.CUSTOMERID = ${customerId} AND ORDER_DETAIL.PRODUCTID = ${productId}
     AND ORDER_DETAIL.ISSIMPLE = ${typeProduct}`
  );
};

// hàm lấy ra số lượng customers
module.exports.ordersQuantity = () => {
  return db.load(
    `SELECT COUNT(ID) AS ORDER_QUANTITY FROM order_info WHERE STATUS = 1`
  );
};

module.exports.singleById = orderInfoId => {
  return db.load(`
  SELECT order_info.ID, order_info.CUSTOMERID, customer.FULLNAME AS CUSTOMERNAME, 
  DATE_FORMAT(order_info.CREATED, '%d-%m-%Y %H:%i:%s') AS CREATED,
  order_info.TOTALMONEY, order_info.ORDERSTATUSID, order_status.NAME AS ORDERSTATUSNAME
  FROM order_info JOIN customer JOIN order_status
  ON order_info.CUSTOMERID = customer.ID AND order_info.ORDERSTATUSID = order_status.ID
  WHERE order_info.ID = '${orderInfoId}'`);
};

module.exports.allOrderInfo = () => {
  return db.load(
    `SELECT order_info.ID, order_info.CUSTOMERID, customer.FULLNAME AS CUSTOMERNAME, 
    DATE_FORMAT(order_info.CREATED, '%d-%m-%Y %H:%i:%s') AS CREATED,
    order_info.TOTALMONEY, order_info.ORDERSTATUSID, order_status.NAME AS ORDERSTATUSNAME
    FROM order_info JOIN customer JOIN order_status 
    ON order_info.CUSTOMERID = customer.ID AND order_info.ORDERSTATUSID = order_status.ID
    WHERE order_info.STATUS = 1
    ORDER BY order_info.CREATED DESC`
  );
};

// Hàm trả về sản phẩm lọc theo tiêu chí trong database có phân trang
module.exports.pageAllOrderFilter = (limit, offset, objQuery) => {
  // Gọi hàm querry từ db
  var query = "";
  if (objQuery.OrderStatus != 0) {
    query += ` AND order_info.ORDERSTATUSID = ${objQuery.OrderStatus}\n`;
  }
  if (objQuery.Name != "") {
    query += ` AND MATCH (customer.FULLNAME) AGAINST ('${objQuery.Name}' IN NATURAL LANGUAGE MODE) \n`;
  }
  if (objQuery.FromDate != "") {
    query += ` AND order_info.CREATED >= '${objQuery.FromDate}' \n`;
  }
  if (objQuery.ToDate != "") {
    query += ` AND order_info.CREATED <= '${objQuery.ToDate}' \n`;
  }

  return db.load(`
  SELECT order_info.ID, order_info.CUSTOMERID, customer.FULLNAME AS CUSTOMERNAME, 
    DATE_FORMAT(order_info.CREATED, '%d-%m-%Y %H:%i:%s') AS CREATED,
    order_info.TOTALMONEY, order_info.ORDERSTATUSID, order_status.NAME AS ORDERSTATUSNAME
    FROM order_info JOIN customer JOIN order_status 
    ON order_info.CUSTOMERID = customer.ID AND order_info.ORDERSTATUSID = order_status.ID
    WHERE order_info.STATUS = 1
    ${query}
    ORDER BY order_info.CREATED DESC
    limit ${limit} offset ${offset}`);
};

// Hàm lấy số lượng sản phẩm product simple có status = 1
module.exports.quantityOrderActive = (objQuery) => {
  // Gọi hàm querry từ db
  var query = "";
  if (objQuery.OrderStatus != 0) {
    query += ` AND order_info.ORDERSTATUSID = ${objQuery.OrderStatus}\n`;
  }
  if (objQuery.Name != "") {
    query += ` AND MATCH (customer.FULLNAME) AGAINST ('${objQuery.Name}' IN NATURAL LANGUAGE MODE) \n`;
  }
  if (objQuery.FromDate != "") {
    query += ` AND order_info.CREATED >= '${objQuery.FromDate}' \n`;
  }
  if (objQuery.ToDate != "") {
    query += ` AND order_info.CREATED <= '${objQuery.ToDate}' \n`;
  }

  return db.load(`SELECT COUNT(*) AS QUANTITY
  FROM order_info JOIN customer JOIN order_status 
  ON order_info.CUSTOMERID = customer.ID AND order_info.ORDERSTATUSID = order_status.ID
  WHERE order_info.STATUS = 1
  ${query}`);
};

module.exports.allOrderInfoByCustomerId = customerId => {
  return db.load(`SELECT * FROM order_info WHERE CUSTOMERID = '${customerId}'`);
};

// // Hàm thêm mới đơn hàng
// module.exports.addOrderInfo = orderInfo => {
//   orderInfo.CREATED = getDateTimeNow();
//   return db.add("order_info", orderInfo);
// };

//Hàm cập nhật đơn hàng
module.exports.updateOrderInfo = orderInfo => {
  return db.update("order_info", "ID", orderInfo);
};

//Hàm xóa đơn hàng theo id
module.exports.deleteOrderInfoById = orderInfo => {
  return db.update("order_info", "ID", orderInfo)
};

// Hàm xóa đơn hàng của customer
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
  `)};

//Hàm trả về thời gian hiện tại
function getDateTimeNow() {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();
  var hh = today.getHours();
  var MM = today.getMinutes();
  var ss = today.getSeconds();

  if (dd < 10) {
    dd = "0" + dd;
  }

  if (mm < 10) {
    mm = "0" + mm;
  }

  if (hh < 10) {
    hh = "0" + hh;
  }

  if (MM < 10) {
    MM = "0" + MM;
  }

  if (ss < 10) {
    ss = "0" + ss;
  }

  today = yyyy + "-" + mm + "-" + dd + " " + hh + ":" + MM + ":" + ss;
  return today;
}
