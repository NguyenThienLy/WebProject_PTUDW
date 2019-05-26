// lấy database
var db = require("../utils/db");

// hàm trả về danh sách tất cả nhãn hiệu
module.exports.allBrand = () => {
  return db.load(`SELECT * FROM brand`);
};

// hàm trả về danh sách tất cả nhãn hiệu
module.exports.allBrandWithDetail = () => {
  return db.load(`SELECT br.ID, br.NAME, COUNT(br.ID) AS QUANTITY
                  FROM brand AS br LEFT JOIN product AS pro
                  ON br.ID = pro.BRANDID
                  GROUP BY br.ID, br.NAME`);
};
