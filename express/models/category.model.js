// Lấy database
var db = require("../utils/db");

// Hàm trả về danh sách tất cả category lv 1
module.exports.allCategory_lv1 = () => {
  return db.load(`SELECT * FROM category`);
};

