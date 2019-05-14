// Lấy database
var db = require("../utils/db");

// Hàm trả về tất cả sản phẩm trong database
module.exports.allProduct = () => {
  // Gọi hàm querry từ db
  return db.load(`SELECT product.ID,product.NAME,product.PRICE,product.SALE,product.INVENTORY,product_image.LINK,
	product.STATUS,product.INVENTORY,
	product.CATEGORYID,product.BRANDID,category_level_2.NAME AS CATEGORYNAME, brand.NAME AS BRANDNAME
	FROM ((product 
	INNER JOIN category_level_2 ON product.CATEGORYID = category_level_2.ID)
	INNER JOIN brand ON product.BRANDID = brand.ID) INNER JOIN product_image ON product.ID = product_image.PRODUCTID`);
};

// Hàm thêm vào sản phẩm mới
module.exports.addProduct = product => {};

// // Hàm trả về 8 sản phẩm sale nhiều nhất trong index customer
// module.exports.top8ProductForIndex = () => {
//   return db.load(`SELECT ID, FORMAT(PRICE, 0) AS PRICE, SALE, NAME, IMAGE,
// 									FORMAT((CASE
// 											WHEN SALE > 0 THEN (PRICE - PRICE * (SALE / 100))
// 											ELSE PRICE
// 									END), 0) AS SALEPRICE
// 									FROM product
// 									ORDER BY SALE DESC;`);
// };

// Hàm trả về 8 sản phẩm sale nhiều nhất trong index customer
module.exports.top8ProductForIndex = () => {
  return db.load(`SELECT ID, FORMAT(PRICE, 0) AS PRICE, SALE, NAME, IMAGE,
									FORMAT((CASE
											WHEN SALE > 0 THEN (PRICE - PRICE * (SALE / 100))
											ELSE PRICE
									END), 0) AS SALEPRICE
									FROM product
									ORDER BY SALE DESC
									LIMIT 8;`);
};
