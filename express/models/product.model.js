// Lấy database
var db = require("../utils/db");

// Hàm trả về tất cả sản phẩm trong database
module.exports.allProduct = () => {
  // Gọi hàm querry từ db
	return db.load(`SELECT product.ID,product.NAME,product.PRICE,product.SALE,product.INVENTORY,product.IMAGE,
						product.STATUS,product.INVENTORY,
						product.CATEGORYID,product.BRANDID,sub_category.NAME AS CATEGORYNAME, brand.NAME AS BRANDNAME
						FROM (product 
						INNER JOIN sub_category ON product.CATEGORYID = sub_category.ID)
						INNER JOIN brand ON product.BRANDID = brand.ID`);
};

// Hàm thêm vào sản phẩm mới
module.exports.addProduct = product => {
	 return db.add('product',product);
};

// Hàm trả về 8 sản phẩm sale nhiều nhất trong index customer
module.exports.top8ProductForIndex = () => {
  return db.load(`SELECT * FROM product INNER JOIN product_image 
					ON product.ID = product_image.PRODUCTID
					ORDER BY SALE DESC
					LIMIT 8`);
};
