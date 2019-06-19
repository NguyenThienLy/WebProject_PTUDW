var db = require("../utils/db");

// hàm lấy ra danh sách tất cả customers
module.exports.allCustomers = () => {
  return db.load(
    `SELECT customer.ID, customer.USERNAME, customer.IMAGE, customer.FULLNAME, customer.EMAIL,
            DATE_FORMAT(customer.BIRTHDATE, '%d/%m/%Y') AS BIRTHDATE, customer.CASH, 
            DATE_FORMAT(customer.CREATED, '%d/%m/%Y %H:%i') AS CREATED, 
            customer_type.NAME AS TYPENAME, customer.CUSTOMERTYPEID
    FROM customer JOIN customer_type ON customer.CUSTOMERTYPEID = customer_type.ID
    WHERE customer.STATUS = 1
    ORDER BY customer.CREATED DESC`
  );
};

// Hàm trả về sản phẩm lọc theo tiêu chí trong database có phân trang
module.exports.pageAllCustomerFilter = (limit, offset, objQuery) => {
  // Gọi hàm querry từ db
  var query = "";
  if (objQuery.Name != "") {
    query += ` AND MATCH (customer.FULLNAME) AGAINST ('${objQuery.Name}' IN NATURAL LANGUAGE MODE) \n`;
  }

  return db.load(`
  SELECT customer.ID, customer.USERNAME, customer.IMAGE, customer.FULLNAME, customer.EMAIL,
  DATE_FORMAT(customer.BIRTHDATE, '%d/%m/%Y') AS BIRTHDATE, customer.CASH, 
  DATE_FORMAT(customer.CREATED, '%d/%m/%Y %H:%i') AS CREATED, 
  customer_type.NAME AS TYPENAME, customer.CUSTOMERTYPEID
  FROM customer JOIN customer_type ON customer.CUSTOMERTYPEID = customer_type.ID
  WHERE customer.STATUS = 1
  ${query}
  ORDER BY customer.CREATED DESC
  limit ${limit} offset ${offset}`);
};

// Hàm lấy số lượng sản phẩm product simple có status = 1
module.exports.quantityCustomerActive = (objQuery) => {
  // Gọi hàm querry từ db
  var query = "";
  if (objQuery.Name != "") {
    query += ` AND MATCH (FULLNAME) AGAINST ('${objQuery.Name}' IN NATURAL LANGUAGE MODE) \n`;
  }
  return db.load(`SELECT COUNT(*) AS QUANTITY FROM customer WHERE STATUS = 1
                  ${query}`);
};

//Hàm ra top 10 khách hàng thanh toán nhiều nhất
module.exports.Top10Customer = () => {
  return db.load(
    `SELECT customer.ID, customer.FULLNAME, customer.EMAIL, 
    DATE_FORMAT(customer.CREATED, '%d/%m/%Y %H:%i') AS CREATED,SUM(order_info.TOTALMONEY) AS TOTAL,
    customer_type.NAME AS TYPENAME
    FROM (customer JOIN customer_type ON customer.CUSTOMERTYPEID = customer_type.ID)
    left JOIN order_info ON order_info.CUSTOMERID = customer.ID
    WHERE customer.STATUS = 1 AND order_info.ORDERSTATUSID = 3
    GROUP BY order_info.CUSTOMERID
    ORDER BY SUM(order_info.TOTALMONEY) DESC
    LIMIT 5`
  );
};

// Hàm lấy ra customer có USERNAME = userName
module.exports.singleByUserName = userName => {
  return db.load(`SELECT * FROM customer where USERNAME = '${userName}'`);
};

// Hàm lấy ra customer có EMAIL = email
module.exports.singleByEmail = email => {
  return db.load(`SELECT * FROM customer where EMAIL = '${email}'`);
};

// Hàm lấy ra customer có ID = customerId
module.exports.singleById = customerId => {
  return db.load(
    `SELECT customer.ID, customer.USERNAME, customer.IMAGE, customer.FULLNAME, customer.EMAIL,
    DATE_FORMAT(customer.BIRTHDATE, '%d/%m/%Y') AS BIRTHDATE, customer.CASH, 
    DATE_FORMAT(customer.CREATED, '%d/%m/%Y %H:%i') AS CREATED, 
    customer_type.NAME AS TYPENAME, customer.CUSTOMERTYPEID
    FROM  customer JOIN customer_type ON customer.CUSTOMERTYPEID = customer_type.ID 
    WHERE CUSTOMER.ID = '${customerId}'`);
};

// Hàm lấy ra customer type khác customerTypeId truyền vào
module.exports.customerType = customerTypeId => {
  return db.load(`SELECT * FROM customer_type WHERE ID <> '${customerTypeId}'`);
};

// hàm thêm một customer vào csdl
module.exports.addCustomer = customer => {
  customer.CREATED = getDateNow();
  return db.add("customer", customer);
};

// hàm cập nhật thông tin khách hàng
module.exports.updateInfoCustomer = customer => {
  return db.update("customer", "ID",customer);
};

//Hàm trả về id của nhân viên có email
module.exports.idOfEmailUser = email => {
  return db.load(`SELECT ID FROM customer WHERE EMAIL = '${email}'`);
};

//Hàm trả về id của nhân viên có token
module.exports.idOfToken = token => {
  return db.load(`SELECT ID FROM customer WHERE RESETPASSWORDTOKEN = '${token}' AND RESETPASSWORDEXPIRES > NOW()`);
};

// hàm lấy ra số lượng customers
module.exports.customersQuantity = () => {
  return db.load(
    `SELECT COUNT(ID) AS CUSTOMER_QUANTITY
    FROM customer
    WHERE STATUS = 1`
  );
};

//Hàm cập nhật sản phẩm
module.exports.updateCustomer = customer => {
  return db.update("customer", "ID", customer);
};

// Hàm xóa 1 bài viết | cập nhật status về 0
module.exports.deleteCustomer = customer => {
  return db.update("customer", "ID", customer);
};

//Hàm trả về thời gian hiện tại
function getDateNow() {
  var today = new Date();
  var dd = today.getDate();

  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }

  if (mm < 10) {
    mm = "0" + mm;
  }
  today = yyyy + "-" + mm + "-" + dd;
  return today;
}
