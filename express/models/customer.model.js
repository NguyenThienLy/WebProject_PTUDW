var db = require("../utils/db");

// hàm lấy ra danh sách tất cả customers
module.exports.allCustomers = () => {
  return db.load(
    `SELECT CUSTOMER.ID, CUSTOMER.USERNAME, CUSTOMER.IMAGE, CUSTOMER.FULLNAME, CUSTOMER.EMAIL,
            DATE_FORMAT(CUSTOMER.BIRTHDATE, '%d/%m/%Y') AS BIRTHDATE, CUSTOMER.CASH, 
            DATE_FORMAT(CUSTOMER.CREATED, '%d/%m/%Y %H:%i') AS CREATED, CUSTOMER_TYPE.NAME AS TYPE
    FROM customer CUSTOMER JOIN customer_type CUSTOMER_TYPE ON CUSTOMER.CUSTOMERTYPEID = CUSTOMER_TYPE.ID`
  );
};

// Hàm lấy ra customer có USERNAME = userName
module.exports.singleByUserName = userName => {
  return db.load(`SELECT * FROM customer where USERNAME = '${userName}'`);
};

// hàm thêm một customer vào csdl
module.exports.addCustomer = customer => {
  customer.CREATED = getDateNow();
  return db.add("customer", customer);
};

// hàm lấy ra số lượng customers
module.exports.customersQuantity = () => {
  return db.load(
    `SELECT COUNT(CUSTOMER.ID) AS CUSTOMER_QUANTITY
    FROM customer CUSTOMER`
  );
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
