var db = require("../utils/db");

// hàm lấy ra danh sách tất cả customers
module.exports.allCustomers = () => {
  return db.load(
    `SELECT CUSTOMER.ID, CUSTOMER.FULLNAME, CUSTOMER.EMAIL, CUSTOMER.PHONE, 
            DATE_FORMAT(CUSTOMER.BIRTHDATE, '%d/%m/%Y') AS BIRTHDATE, CUSTOMER.CASH, 
            DATE_FORMAT(CUSTOMER.CREATED, '%d/%m/%Y %H:%i') AS CREATED, CUSTOMER_TYPE.NAME AS TYPE
    FROM customer CUSTOMER JOIN customer_type CUSTOMER_TYPE ON CUSTOMER.CUSTOMERTYPEID = CUSTOMER_TYPE.ID`
  );
};

// hàm lấy ra số lượng customers
module.exports.customersQuantity = () => {
  return db.load(
    `SELECT COUNT(CUSTOMER.ID) AS CUSTOMER_QUANTITY
    FROM customer CUSTOMER`
  );
};
