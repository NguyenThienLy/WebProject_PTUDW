var db = require("../utils/db");

// hàm lấy ra số lượng customers
module.exports.allOrderStatus = () => {
  return db.load(
    `SELECT * FROM order_status`
  );
};