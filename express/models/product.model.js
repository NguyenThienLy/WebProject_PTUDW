// Lấy database
var db = require("../utils/db");

// Hàm lấy số lượng sản phẩm product simple
module.exports.quantityProduct = () => {
  // Gọi hàm querry từ db
  return db.load(`SELECT COUNT(*) AS QUANTITY FROM product`);
};

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
  return db.add("product", product);
};

// Hàm trả về 8 sản phẩm sắp xếp theo typeSort, theo id cat
module.exports.top8ProductFollowIdCatAndTypeSort = (idCat, typeSort) => {
  switch (typeSort) {
    // Hàng mới nhất
    case 0:
      return db.load(`SELECT pro.ID, pro.PRICE, pro.SALE, pro.NAME, pro.IMAGE, pro.CATEGORYID, pro.SUBCATEGORYID,
										(CASE
												WHEN pro.SALE > 0 THEN (pro.PRICE - pro.PRICE * (pro.SALE / 100))
												ELSE pro.PRICE
										END) AS SALEPRICE
										FROM product AS pro 
										WHERE pro.CATEGORYID = ${idCat}
										ORDER BY CREATED DESC
										LIMIT 8;`);

    // Hàng cũ nhất
    case 1:
      return db.load(`SELECT pro.ID, pro.PRICE, pro.SALE, pro.NAME, pro.IMAGE, pro.CATEGORYID, pro.SUBCATEGORYID,
										(CASE
												WHEN pro.SALE > 0 THEN (pro.PRICE - pro.PRICE * (pro.SALE / 100))
												ELSE pro.PRICE
										END) AS SALEPRICE
										FROM product AS pro 
										WHERE pro.CATEGORYID = ${idCat}
										ORDER BY CREATED ASC
										LIMIT 8;`);

    // Giá tăng dần
    case 2:
      return db.load(`SELECT pro.ID, pro.PRICE, pro.SALE, pro.NAME, pro.IMAGE, pro.CATEGORYID, pro.SUBCATEGORYID,
										(CASE
												WHEN pro.SALE > 0 THEN (pro.PRICE - pro.PRICE * (pro.SALE / 100))
												ELSE pro.PRICE
										END) AS SALEPRICE
										FROM product AS pro 
										WHERE pro.CATEGORYID = ${idCat}
										ORDER BY PRICE ASC
										LIMIT 8;`);

    // Giá giảm dần
    default:
      return db.load(`SELECT pro.ID, pro.PRICE, pro.SALE, pro.NAME, pro.IMAGE, pro.CATEGORYID, pro.SUBCATEGORYID,
								(CASE
										WHEN pro.SALE > 0 THEN (pro.PRICE - pro.PRICE * (pro.SALE / 100))
										ELSE pro.PRICE
								END) AS SALEPRICE
								FROM product AS pro 
								WHERE pro.CATEGORYID = ${idCat}
								ORDER BY PRICE DESC
								LIMIT 8;`);
  }
};

// Hàm trả về 8 sản phẩm sắp xếp theo typeSort, theo id cat và id sub
module.exports.topNProductFollowIdCatAndIdSub = (idCat, idSub, typeSort, N) => {
  // Nếu chỉ có có idcat
  if (idSub === 0) {
    switch (typeSort) {
      // Hàng mới nhất
      case 0:
        return db.load(`SELECT pro.ID, pro.PRICE, pro.SALE, pro.NAME, pro.IMAGE, pro.CATEGORYID, pro.SUBCATEGORYID,
											(CASE
													WHEN pro.SALE > 0 THEN (pro.PRICE - pro.PRICE * (pro.SALE / 100))
													ELSE pro.PRICE
											END) AS SALEPRICE
											FROM product AS pro 
											WHERE pro.CATEGORYID = ${idCat}
											ORDER BY CREATED DESC
											LIMIT ${N};`);

      // Hàng cũ nhất
      case 1:
        return db.load(`SELECT pro.ID, pro.PRICE, pro.SALE, pro.NAME, pro.IMAGE, pro.CATEGORYID, pro.SUBCATEGORYID,
											(CASE
													WHEN pro.SALE > 0 THEN (pro.PRICE - pro.PRICE * (pro.SALE / 100))
													ELSE pro.PRICE
											END) AS SALEPRICE
											FROM product AS pro 
											WHERE pro.CATEGORYID = ${idCat}
											ORDER BY CREATED ASC
											LIMIT ${N};`);

      // Giá tăng dần
      case 2:
        return db.load(`SELECT pro.ID, pro.PRICE, pro.SALE, pro.NAME, pro.IMAGE, pro.CATEGORYID, pro.SUBCATEGORYID,
											(CASE
													WHEN pro.SALE > 0 THEN (pro.PRICE - pro.PRICE * (pro.SALE / 100))
													ELSE pro.PRICE
											END) AS SALEPRICE
											FROM product AS pro 
											WHERE pro.CATEGORYID = ${idCat}
											ORDER BY PRICE ASC
											LIMIT ${N};`);

      // Giá giảm dần
      default:
        return db.load(`SELECT pro.ID, pro.PRICE, pro.SALE, pro.NAME, pro.IMAGE, pro.CATEGORYID, pro.SUBCATEGORYID,
											(CASE
													WHEN pro.SALE > 0 THEN (pro.PRICE - pro.PRICE * (pro.SALE / 100))
													ELSE pro.PRICE
											END) AS SALEPRICE
											FROM product AS pro 
											WHERE pro.CATEGORYID = ${idCat}
											ORDER BY PRICE DESC
											LIMIT ${N};`);
    }
    // Nếu có cả idcat và idsub
  } else {
    switch (typeSort) {
      // Hàng mới nhất
      case 0:
        return db.load(`SELECT pro.ID, pro.PRICE, pro.SALE, pro.NAME, pro.IMAGE, pro.CATEGORYID, pro.SUBCATEGORYID,
												(CASE
														WHEN pro.SALE > 0 THEN (pro.PRICE - pro.PRICE * (pro.SALE / 100))
														ELSE pro.PRICE
												END) AS SALEPRICE
												FROM product AS pro
												WHERE pro.CATEGORYID = ${idCat} AND pro.SUBCATEGORYID = ${idSub}
												ORDER BY CREATED DESC
												LIMIT ${N};`);

      // Hàng cũ nhất
      case 1:
        return db.load(`SELECT pro.ID, pro.PRICE, pro.SALE, pro.NAME, pro.IMAGE, pro.CATEGORYID, pro.SUBCATEGORYID,
												(CASE
														WHEN pro.SALE > 0 THEN (pro.PRICE - pro.PRICE * (pro.SALE / 100))
														ELSE pro.PRICE
												END) AS SALEPRICE
												FROM product AS pro
												WHERE pro.CATEGORYID = ${idCat} AND pro.SUBCATEGORYID = ${idSub}
												ORDER BY CREATED ASC
												LIMIT ${N};`);

      // Giá tăng dần
      case 2:
        return db.load(`SELECT pro.ID, pro.PRICE, pro.SALE, pro.NAME, pro.IMAGE, pro.CATEGORYID, pro.SUBCATEGORYID,
											(CASE
													WHEN pro.SALE > 0 THEN (pro.PRICE - pro.PRICE * (pro.SALE / 100))
													ELSE pro.PRICE
											END) AS SALEPRICE
											FROM product AS pro
											WHERE pro.CATEGORYID = ${idCat} AND pro.SUBCATEGORYID = ${idSub}
											ORDER BY PRICE ASC
											LIMIT ${N};`);

      // Giá giảm dần
      default:
        return db.load(`SELECT pro.ID, pro.PRICE, pro.SALE, pro.NAME, pro.IMAGE, pro.CATEGORYID, pro.SUBCATEGORYID,
											(CASE
													WHEN pro.SALE > 0 THEN (pro.PRICE - pro.PRICE * (pro.SALE / 100))
													ELSE pro.PRICE
											END) AS SALEPRICE
											FROM product AS pro
											WHERE pro.CATEGORYID = ${idCat} AND pro.SUBCATEGORYID = ${idSub}
											ORDER BY PRICE DESC
											LIMIT ${N};`);
    }
  }
};

// Hàm trả về 8 sản phẩm sắp xếp theo typeSort
module.exports.topNProductAscCreated = (typeSort, N) => {
  switch (typeSort) {
    // Hàng mới nhất
    case 0:
      return db.load(`SELECT pro.ID, pro.PRICE, pro.SALE, pro.NAME, pro.IMAGE, pro.CATEGORYID, pro.SUBCATEGORYID,
											(CASE
													WHEN pro.SALE > 0 THEN (pro.PRICE - pro.PRICE * (pro.SALE / 100))
													ELSE pro.PRICE
											END) AS SALEPRICE
											FROM product AS pro 
											ORDER BY CREATED DESC
											LIMIT ${N};`);

    // Hàng cũ nhất
    case 1:
      return db.load(`SELECT pro.ID, pro.PRICE, pro.SALE, pro.NAME, pro.IMAGE, pro.CATEGORYID, pro.SUBCATEGORYID,
											(CASE
													WHEN pro.SALE > 0 THEN (pro.PRICE - pro.PRICE * (pro.SALE / 100))
													ELSE pro.PRICE
											END) AS SALEPRICE
											FROM product AS pro 
											ORDER BY CREATED ASC
											LIMIT ${N};`);

    // Giá tăng dần
    case 2:
      return db.load(`SELECT pro.ID, pro.PRICE, pro.SALE, pro.NAME, pro.IMAGE, pro.CATEGORYID, pro.SUBCATEGORYID,
											(CASE
													WHEN pro.SALE > 0 THEN (pro.PRICE - pro.PRICE * (pro.SALE / 100))
													ELSE pro.PRICE
											END) AS SALEPRICE
											FROM product AS pro 
						
											ORDER BY PRICE ASC
											LIMIT ${N};`);

    // Giá giảm dần
    default:
      return db.load(`SELECT pro.ID, pro.PRICE, pro.SALE, pro.NAME, pro.IMAGE, pro.CATEGORYID, pro.SUBCATEGORYID,
											(CASE
													WHEN pro.SALE > 0 THEN (pro.PRICE - pro.PRICE * (pro.SALE / 100))
													ELSE pro.PRICE
											END) AS SALEPRICE
											FROM product AS pro 
										
											ORDER BY PRICE DESC
											LIMIT ${N};`);
  }
};

// Hàm trả về 8 sản phẩm sale nhiều nhất trong index customer
module.exports.top8ProductForIndex = () => {
  return db.load(`SELECT ID, PRICE, SALE, NAME, IMAGE,
									(CASE
											WHEN SALE > 0 THEN (PRICE - PRICE * (SALE / 100))
											ELSE PRICE
									END) AS SALEPRICE
									FROM product
									ORDER BY SALE DESC
									LIMIT 8;`);
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
