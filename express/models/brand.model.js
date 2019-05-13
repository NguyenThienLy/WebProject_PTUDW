// lấy database
var db = require("../utils/db");

// hàm trả về danh sách tất cả nhãn hiệu
module.exports.allBrand = () => {
  return db.load(`SELECT * FROM brand`);
};
