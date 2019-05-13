var db = require("../utils/db");

// hàm lấy ra danh sách tất admin
module.exports.allAdmin = () => {
  return db.load("SELECT * FROM admin");
};

// hàm thêm một admin vào csdl
module.exports.addAdmin = entity => {
  return db.add("admin", entity);
};
