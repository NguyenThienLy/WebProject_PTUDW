// Lấy database
var db = require("../utils/db");

// Hàm thêm vào sản phẩm combo mới
module.exports.addProductCombo = product => {};

// // Hàm trả về 8 sản phẩm combo sale nhiều nhất trong index customer
// module.exports.top8ProductComboForIndex = () => {
//   return db.load(`SELECT a.ID, FORMAT(a.PRICE, 0) AS PRICE, a.SALE, a.NAME,
//                     b.IMAGE AS IMAGE1 , c.IMAGE AS IMAGE2, d.IMAGE AS IMAGE3, 
//                     FORMAT((CASE WHEN a.SALE > 0 THEN (a.PRICE - a.PRICE * (a.SALE / 100)) ELSE a.PRICE END), 0) AS SALEPRICE
//                     FROM product_combo a INNER JOIN product b INNER JOIN product c INNER JOIN product d 
//                     ON a.PRODUCTID1 = b.ID AND a.PRODUCTID2 = c.ID AND a.PRODUCTID3 = d.ID 
//                     ORDER BY SALE DESC;`);
// };

// Hàm trả về 8 sản phẩm combo sale nhiều nhất trong index customer
module.exports.top6ProductComboForIndex = () => {
    return db.load(`SELECT a.ID, a.PRICE, a.SALE, a.NAME,
                      b.IMAGE AS IMAGE1 , c.IMAGE AS IMAGE2, d.IMAGE AS IMAGE3, 
                      (CASE WHEN a.SALE > 0 THEN (a.PRICE - a.PRICE * (a.SALE / 100)) ELSE a.PRICE END) AS SALEPRICE
                      FROM product_combo a INNER JOIN product b INNER JOIN product c INNER JOIN product d 
                      ON a.PRODUCTID1 = b.ID AND a.PRODUCTID2 = c.ID AND a.PRODUCTID3 = d.ID 
                      ORDER BY SALE DESC
                      LIMIT 6`);
  };
