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

// Hàm trả về 8 sản phẩm sale nhiều nhất trong index customer
module.exports.top8ProductForIndex = () => {
  return db.load(`SELECT * FROM product INNER JOIN product_image 
					ON product.ID = product_image.PRODUCTID
					ORDER BY SALE DESC
					LIMIT 8`);
};

// Hàm trả về tất cả sản phẩm cùng số lượng bình luận của mỗi sản phẩm
module.exports.allProductWithCommentQuantity = () => {
  return db.load(
    `SELECT PRODUCT.ID, PRODUCT.NAME, PRODUCT.IMAGE, CATEGORY.NAME AS CATNAME, 
						SUB_CATEGORY.NAME AS SUBCATNAME, count(COMMENT.ID) AS COMMENT_QUANTITY
		FROM ((product PRODUCT LEFT JOIN comment COMMENT ON PRODUCT.ID = COMMENT.PRODUCTID) 
					JOIN category CATEGORY ON PRODUCT.CATEGORYID = CATEGORY.ID) 
					JOIN sub_category SUB_CATEGORY ON PRODUCT.SUBCATEGORYID = SUB_CATEGORY.ID
		GROUP BY PRODUCT.ID, PRODUCT.NAME, PRODUCT.IMAGE, CATEGORY.NAME, SUB_CATEGORY.NAME`
  );
};
