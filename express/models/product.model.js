// Lấy database
var db = require("../utils/db");

// Hàm lấy số lượng sản phẩm product simple
module.exports.quantityProduct = () => {
  // Gọi hàm querry từ db
  return db.load(`SELECT COUNT(*) AS QUANTITY FROM product`);
};

//Lấy ra cấu trúc sản phẩm của cửa hàng
module.exports.structProduct = () => {
  // Gọi hàm querry từ db
  return db.load(`SELECT category.NAME,SUM(product.INVENTORY) AS SUM
                  FROM product JOIN category ON product.CATEGORYID = category.ID
                  GROUP BY product.CATEGORYID`);
};

// Linh thêm
module.exports.productsQuantity = () => {
  // Gọi hàm querry từ db
  return db.load(`SELECT COUNT(ID) AS PRODUCT_QUANTITY FROM product WHERE STATUS = 1`);
};

// Hàm lấy số lượng sản phẩm product simple có status = 1
module.exports.quantityProductActive = (objQuery) => {
  // Gọi hàm querry từ db
  var query = "";
  if (objQuery.catID != 0) {
    query += ` AND product.CATEGORYID = ${objQuery.catID}\n`;
  }

  if (objQuery.subCatID != 0) {
    query += ` AND product.SUBCATEGORYID = ${objQuery.subCatID}\n`;
  }

  if (objQuery.BrandID != 0) {
    query += ` AND product.BRANDID = ${objQuery.BrandID}\n`;
  }

  if (objQuery.Name != "") {
    query += ` AND MATCH (product.NAME) AGAINST ('${objQuery.Name}' IN NATURAL LANGUAGE MODE) \n`;
  }
  return db.load(`SELECT COUNT(*) AS QUANTITY FROM product WHERE STATUS = 1
                  ${query}`);
};

// Hàm lấy số lượng sản phẩm product simple có status = 1
module.exports.quantityProductCommentSimpleActive = (objQuery) => {
  // Gọi hàm querry từ db
  var query = "";
  if (objQuery.Name != "") {
    query += ` AND MATCH (product.NAME) AGAINST ('${objQuery.Name}' IN NATURAL LANGUAGE MODE) \n`;
  }
  return db.load(`SELECT COUNT(*) AS QUANITTY FROM product WHERE STATUS = 1 ${query}`);
};

// Hàm lấy ra số lượng của sản phẩm có ID
module.exports.inventoryProduct = (productID) => {
  // Gọi hàm querry từ db
  return db.load(`SELECT product.INVENTORY FROM product WHERE product.ID = ${productID}`);
};

// Hàm trả về tất cả sản phẩm trong database
module.exports.allProduct = () => {
  // Gọi hàm querry từ db
  return db.load(`SELECT product.ID, product.IMAGE, product.RESIZEDIMAGE, product.CATEGORYID, 
            product.SUBCATEGORYID, product.NAME, product.BRANDID, product.STATUS, product.RATE, 
            product.PRICE, product.ORIGIN, product.KILOGRAM, product.SALE, product.VIPSALE,
            product.SHORTDESCRIPTION, product.DESCRIPTION, product.INVENTORY, 
            DATE_FORMAT(product.CREATED, '%d/%m/%Y %H:%i') AS CREATED,
            category.NAME AS CATEGORYNAME, sub_category.NAME AS SUBCATEGORYNAME, brand.NAME AS BRANDNAME
						FROM ((product 
            INNER JOIN sub_category ON product.SUBCATEGORYID = sub_category.ID)
            INNER JOIN category ON product.CATEGORYID = category.ID)
            INNER JOIN brand ON product.BRANDID = brand.ID 
            WHERE STATUS = 1
            ORDER BY product.CREATED DESC`);
};

// Hàm trả về tất cả sản phẩm trong database có phân trang
module.exports.pageallProduct = (limit, offset) => {
  // Gọi hàm querry từ db
  return db.load(`SELECT product.ID, product.IMAGE, product.RESIZEDIMAGE, product.CATEGORYID, 
            product.SUBCATEGORYID, product.NAME, product.BRANDID, product.STATUS, product.RATE, 
            product.PRICE, product.ORIGIN, product.KILOGRAM, product.SALE, product.VIPSALE,
            product.SHORTDESCRIPTION, product.DESCRIPTION, product.INVENTORY, product.CREATED,
            category.NAME AS CATEGORYNAME, sub_category.NAME AS SUBCATEGORYNAME, brand.NAME AS BRANDNAME
						FROM ((product 
            INNER JOIN sub_category ON product.SUBCATEGORYID = sub_category.ID)
            INNER JOIN category ON product.CATEGORYID = category.ID)
            INNER JOIN brand ON product.BRANDID = brand.ID WHERE STATUS = 1 
            limit ${limit} offset ${offset}`);
};

// Hàm trả về sản phẩm lọc theo tiêu chí trong database có phân trang
module.exports.pageallProductFilter = (limit, offset, objQuery) => {
  // Gọi hàm querry từ db
  var query = "";
  if (objQuery.catID != 0) {
    query += ` AND product.CATEGORYID = ${objQuery.catID}\n`;
  }

  if (objQuery.subCatID != 0) {
    query += ` AND product.SUBCATEGORYID = ${objQuery.subCatID}\n`;
  }

  if (objQuery.BrandID != 0) {
    query += ` AND product.BRANDID = ${objQuery.BrandID}\n`;
  }

  if (objQuery.Name != "") {
    query += ` AND MATCH (product.NAME) AGAINST ('${objQuery.Name}' IN NATURAL LANGUAGE MODE) \n`;
  }

  return db.load(`SELECT product.ID, product.IMAGE, product.RESIZEDIMAGE, product.CATEGORYID, 
            product.SUBCATEGORYID, product.NAME, product.BRANDID, product.STATUS, product.RATE, 
            product.PRICE, product.ORIGIN, product.KILOGRAM, product.SALE, product.VIPSALE,
            product.SHORTDESCRIPTION, product.DESCRIPTION, product.INVENTORY, product.CREATED,
            category.NAME AS CATEGORYNAME, sub_category.NAME AS SUBCATEGORYNAME, brand.NAME AS BRANDNAME
						FROM ((product 
            INNER JOIN sub_category ON product.SUBCATEGORYID = sub_category.ID)
            INNER JOIN category ON product.CATEGORYID = category.ID)
            INNER JOIN brand ON product.BRANDID = brand.ID WHERE STATUS = 1
            ${query}
            limit ${limit} offset ${offset}`);
};

// Hàm trả về sản phẩm lọc theo tiêu chí trong database có phân trang
module.exports.pageAllProductCommentSimpleFilter = (limit, offset, objQuery) => {
  // Gọi hàm querry từ db
  var query = "";
  if (objQuery.Name != "") {
    query += ` AND MATCH (product.NAME) AGAINST ('${objQuery.Name}' IN NATURAL LANGUAGE MODE) \n`;
  }

  return db.load(`
  SELECT product.ID, product.NAME, product.IMAGE, category.NAME AS CATNAME, 
  sub_category.NAME AS SUBCATNAME, count(COMMENT.ID) AS COMMENT_QUANTITY
  FROM ((product LEFT JOIN (SELECT * FROM comment WHERE comment.ISSIMPLE = 1) AS comment 
  ON product.ID = comment.PRODUCTID) 
  JOIN category ON product.CATEGORYID = category.ID) 
  JOIN sub_category ON product.SUBCATEGORYID = sub_category.ID
  WHERE product.STATUS = 1 ${query}
  GROUP BY product.ID, product.NAME, product.IMAGE, category.NAME, sub_category.NAME
  limit ${limit} offset ${offset}`);
};

// Hàm trả về tất cả sản phẩm còn hàng trong database
module.exports.allProductInStock = () => {
  // Gọi hàm querry từ db
  return db.load(`SELECT product.ID, product.IMAGE, product.RESIZEDIMAGE, product.CATEGORYID, 
            product.SUBCATEGORYID, product.NAME, product.BRANDID, product.STATUS, product.RATE, 
            product.PRICE, product.ORIGIN, product.KILOGRAM, product.SALE, product.VIPSALE,
            product.SHORTDESCRIPTION, product.DESCRIPTION, product.INVENTORY, product.CREATED,
            category.NAME AS CATEGORYNAME, sub_category.NAME AS SUBCATEGORYNAME, brand.NAME AS BRANDNAME
						FROM ((product 
            INNER JOIN sub_category ON product.SUBCATEGORYID = sub_category.ID)
            INNER JOIN category ON product.CATEGORYID = category.ID)
            INNER JOIN brand ON product.BRANDID = brand.ID
            WHERE product.INVENTORY > 0 AND product.STATUS = 1`);
};

// Hàm trả về tất cả sản phẩm id theo category Id trong database
module.exports.allProductIdByCategoryId = (categoryId) => {
  // Gọi hàm querry từ db
  return db.load(`SELECT product.ID
            FROM product
            WHERE product.INVENTORY > 0 AND product.STATUS = 1 
            AND product.CATEGORYID = ${categoryId}`);
};

// Hàm trả về số lượng sản phẩm theo id danh mục để xóa danh mục
module.exports.productQuantityByCategoryId = (categoryId) => {
  return db.load(`SELECT COUNT(*) AS QUANTITY
            FROM product
            WHERE product.CATEGORYID = ${categoryId}`);
};

// Hàm trả về số lượng sản phẩm theo id danh mục để xóa danh mục con
module.exports.productQuantityBySubCategoryId = (subCategoryId) => {
  return db.load(`SELECT COUNT(*) AS QUANTITY
            FROM product
            WHERE product.SUBCATEGORYID = ${subCategoryId}`);
};

// Hàm trả về số lượng sản phẩm theo id thương hiệu để xóa thương hiệu
module.exports.productQuantityByBrandId = (brandId) => {
  return db.load(`SELECT COUNT(*) AS QUANTITY
            FROM product
            WHERE product.BRANDID = ${brandId}`);
};

module.exports.singleByProductId = productId => {
  return db.load(`SELECT * FROM product where ID = '${productId}'`);
};

// Hàm thêm vào sản phẩm mới
module.exports.addProduct = product => {
  product.CREATED = getDateNow();
  return db.add("product", product);
};

//Hàm cập nhật thông tin sản phẩm
module.exports.updateProduct = product=>{
    return db.update('product','ID', product);
};

//Hàm cập nhật categoryId cho sản phẩm
module.exports.updateCategoryIdBySubCategoryIdForProduct = product => {
  return db.update('product', 'SUBCATEGORYID', product);
};

//Hàm cập nhật ảnh đại diện cho sản phẩm
module.exports.updateListProducts = products => {
  if (products.constructor === Array) {
    products.forEach(product => {
      //gọi hàm insert
      db.update("product", 'ID', product);
    });
  } 
};

//Hàm xóa 1 sản phẩm | cập nhật status về 0
module.exports.deleteProduct = (product)=>{
  return db.update('product','ID',product);
};

//Hàm trả về thời gian hiện tại
function getDateNow() {
  var today = new Date();
  var dd = today.getDate();

  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }

  if (mm < 10) {
    mm = "0" + mm;
  }
  today = yyyy + "-" + mm + "-" + dd;
  return today;
}

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
										WHERE pro.CATEGORYID = ${idCat} AND pro.STATUS = 1
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
										WHERE pro.CATEGORYID = ${idCat} AND pro.STATUS = 1
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
										WHERE pro.CATEGORYID = ${idCat} AND pro.STATUS = 1
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
								WHERE pro.CATEGORYID = ${idCat} AND pro.STATUS = 1
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
											WHERE pro.CATEGORYID = ${idCat} AND pro.STATUS = 1
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
											WHERE pro.CATEGORYID = ${idCat} AND pro.STATUS = 1
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
											WHERE pro.CATEGORYID = ${idCat} AND pro.STATUS = 1
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
											WHERE pro.CATEGORYID = ${idCat} AND pro.STATUS = 1
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
												WHERE pro.CATEGORYID = ${idCat} AND pro.SUBCATEGORYID = ${idSub} AND pro.STATUS = 1
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
												WHERE pro.CATEGORYID = ${idCat} AND pro.SUBCATEGORYID = ${idSub} AND pro.STATUS = 1
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
											WHERE pro.CATEGORYID = ${idCat} AND pro.SUBCATEGORYID = ${idSub} AND pro.STATUS = 1
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
											WHERE pro.CATEGORYID = ${idCat} AND pro.SUBCATEGORYID = ${idSub} AND pro.STATUS = 1
											ORDER BY PRICE DESC
											LIMIT ${N};`);
    }
  }
};

// Mảng giá filter của product show
var priceFilterArray = [
  { checked: false, minPrice: 0, maxPrice: 100000000 },
  { checked: false, minPrice: 0, maxPrice: 100000 },
  { checked: false, minPrice: 100000, maxPrice: 200000 },
  { checked: false, minPrice: 200000, maxPrice: 300000 },
  { checked: false, minPrice: 300000, maxPrice: 500000 },
  { checked: false, minPrice: 500000, maxPrice: 1000000 },
  { checked: false, minPrice: 1000000, maxPrice: 100000000 }
];

function returnStringFollowTypeSortAndBrandAndPrice(
  typeSort,
  brandFilter,
  priceFilter
) {
  switch (typeSort) {
    // Hàng mới nhất
    case 0:
      if (brandFilter == 0) {
        if (priceFilter == 0) {
          return `ORDER BY CREATED DESC`;
        } else {
          return `WHERE ${priceFilterArray[priceFilter].minPrice} <= pro.PRICE
					AND pro.PRICE < ${priceFilterArray[priceFilter].maxPrice}
					ORDER BY CREATED DESC`;
        }
      } else {
        if (priceFilter == 0) {
          return `WHERE pro.BRANDID = ${brandFilter} 
					ORDER BY CREATED DESC`;
        } else {
          return `WHERE pro.BRANDID = ${brandFilter} AND
					${priceFilterArray[priceFilter].minPrice} <= pro.PRICE AND
					 pro.PRICE < ${priceFilterArray[priceFilter].maxPrice} 
					ORDER BY CREATED DESC`;
        }
      }

    // Hàng cũ nhất
    case 1:
      if (brandFilter == 0) {
        if (priceFilter == 0) {
          return `ORDER BY CREATED ASC`;
        } else {
          return `WHERE ${priceFilterArray[priceFilter].minPrice} <= pro.PRICE
					AND pro.PRICE < ${priceFilterArray[priceFilter].maxPrice} 
					ORDER BY CREATED ASC`;
        }
      } else {
        if (priceFilter == 0) {
          return `WHERE pro.BRANDID = ${brandFilter}
					ORDER BY CREATED ASC`;
        } else {
          return `WHERE pro.BRANDID = ${brandFilter} AND
					${priceFilterArray[priceFilter].minPrice} <= pro.PRICE AND
					 pro.PRICE < ${priceFilterArray[priceFilter].maxPrice} 
					ORDER BY CREATED ASC`;
        }
      }

    // Giá tăng dần
    case 2:
      if (brandFilter == 0) {
        if (priceFilter == 0) {
          return `ORDER BY PRICE ASC`;
        } else {
          return `WHERE ${priceFilterArray[priceFilter].minPrice} <= pro.PRICE
					AND pro.PRICE < ${priceFilterArray[priceFilter].maxPrice} 
					ORDER BY PRICE ASC`;
        }
      } else {
        if (priceFilter == 0) {
          return `WHERE pro.BRANDID = ${brandFilter}
										ORDER BY PRICE ASC`;
        } else {
          return `	WHERE pro.BRANDID = ${brandFilter} AND
						${priceFilterArray[priceFilter].minPrice} <= pro.PRICE AND
						 pro.PRICE < ${priceFilterArray[priceFilter].maxPrice} 
						ORDER BY PRICE ASC`;
        }
      }

    // Giá giảm dần
    default:
      if (brandFilter == 0) {
        if (priceFilter == 0) {
          return `ORDER BY PRICE DESC`;
        } else {
          return `WHERE ${priceFilterArray[priceFilter].minPrice} <= pro.PRICE
						AND pro.PRICE < ${priceFilterArray[priceFilter].maxPrice}
						ORDER BY PRICE DESC`;
        }
      } else {
        if (priceFilter == 0) {
          return `WHERE pro.BRANDID = ${brandFilter}
						ORDER BY PRICE DESC`;
        } else {
          return `WHERE pro.BRANDID = ${brandFilter} AND
						${priceFilterArray[priceFilter].minPrice} <= pro.PRICE AND
						 pro.PRICE < ${priceFilterArray[priceFilter].maxPrice} 
						ORDER BY PRICE DESC`;
        }
      }
  }
}

// Hàm trả về N sản phẩm sắp xếp theo typeSort, brand và price
module.exports.topNProductFollowTypeSortAndBrandAndPrice = (
  typeSort,
  brandFilter,
  priceFilter,
  N
) => {
  var stringValues = returnStringFollowTypeSortAndBrandAndPrice(
    typeSort,
    brandFilter,
    priceFilter
  );

  return db.load(`SELECT pro.ID, pro.PRICE, pro.SALE, pro.NAME, pro.IMAGE, pro.CATEGORYID, pro.SUBCATEGORYID,
									(CASE
											WHEN pro.SALE > 0 THEN (pro.PRICE - pro.PRICE * (pro.SALE / 100))
											ELSE pro.PRICE
									END) AS SALEPRICE
									FROM product AS pro 
									${stringValues}
									LIMIT ${N};`);
};

function returnStringFollowTypeSortAndIdCatAndIdSubAndBrandAndPrice(
  typeSort,
  idCat,
  idSub,
  brandFilter,
  priceFilter
) {
  if (idSub == 0 && idCat != 0) {
    switch (typeSort) {
      // Hàng mới nhất
      case 0:
        if (brandFilter == 0) {
          if (priceFilter == 0) {
            return `WHERE pro.CATEGORYID = ${idCat}
						ORDER BY CREATED DESC`;
          } else {
            return `WHERE pro.CATEGORYID = ${idCat} AND
						${priceFilterArray[priceFilter].minPrice} <= pro.PRICE AND
						pro.PRICE < ${priceFilterArray[priceFilter].maxPrice}
						ORDER BY CREATED DESC`;
          }
        } else {
          if (priceFilter == 0) {
            return `WHERE pro.BRANDID = ${brandFilter} AND
						pro.CATEGORYID = ${idCat}
						ORDER BY CREATED DESC`;
          } else {
            return `WHERE pro.CATEGORYID = ${idCat} AND
						pro.BRANDID = ${brandFilter} AND
						${priceFilterArray[priceFilter].minPrice} <= pro.PRICE AND
						 pro.PRICE < ${priceFilterArray[priceFilter].maxPrice}
						ORDER BY CREATED DESC`;
          }
        }

      // Hàng cũ nhất
      case 1:
        if (brandFilter == 0) {
          if (priceFilter == 0) {
            return `WHERE pro.CATEGORYID = ${idCat}
						ORDER BY CREATED ASC`;
          } else {
            return `WHERE pro.CATEGORYID = ${idCat} AND 
						${priceFilterArray[priceFilter].minPrice} <= pro.PRICE AND
						pro.PRICE < ${priceFilterArray[priceFilter].maxPrice}
						ORDER BY CREATED ASC`;
          }
        } else {
          if (priceFilter == 0) {
            return `WHERE pro.CATEGORYID = ${idCat} AND
						pro.BRANDID = ${brandFilter}
						ORDER BY CREATED ASC`;
          } else {
            return `WHERE pro.CATEGORYID = ${idCat} AND 
						pro.BRANDID = ${brandFilter} AND
						${priceFilterArray[priceFilter].minPrice} <= pro.PRICE AND
						 pro.PRICE < ${priceFilterArray[priceFilter].maxPrice} 
						ORDER BY CREATED ASC`;
          }
        }

      // Giá tăng dần
      case 2:
        if (brandFilter == 0) {
          if (priceFilter == 0) {
            return `WHERE pro.CATEGORYID = ${idCat} 
						ORDER BY PRICE ASC`;
          } else {
            return `WHERE pro.CATEGORYID = ${idCat} AND 
						${priceFilterArray[priceFilter].minPrice} <= pro.PRICE AND
						pro.PRICE < ${priceFilterArray[priceFilter].maxPrice}
						ORDER BY PRICE ASC`;
          }
        } else {
          if (priceFilter == 0) {
            return `WHERE pro.CATEGORYID = ${idCat} AND  
						pro.BRANDID = ${brandFilter}
						ORDER BY PRICE ASC`;
          } else {
            return `WHERE pro.CATEGORYID = ${idCat} AND 
						pro.BRANDID = ${brandFilter} AND
						${priceFilterArray[priceFilter].minPrice} <= pro.PRICE AND
						pro.PRICE < ${priceFilterArray[priceFilter].maxPrice}
						ORDER BY PRICE ASC`;
          }
        }

      // Giá giảm dần
      default:
        if (brandFilter == 0) {
          if (priceFilter == 0) {
            return `WHERE pro.CATEGORYID = ${idCat}
						ORDER BY PRICE DESC`;
          } else {
            return `WHERE pro.CATEGORYID = ${idCat} AND 
						${priceFilterArray[priceFilter].minPrice} <= pro.PRICE AND
						pro.PRICE < ${priceFilterArray[priceFilter].maxPrice}
						ORDER BY PRICE DESC`;
          }
        } else {
          if (priceFilter == 0) {
            return `WHERE pro.CATEGORYID = ${idCat} AND 
						pro.BRANDID = ${brandFilter} 
						ORDER BY PRICE DESC`;
          } else {
            return `WHERE pro.CATEGORYID = ${idCat} AND
						pro.BRANDID = ${brandFilter} AND
						${priceFilterArray[priceFilter].minPrice} <= pro.PRICE AND
						pro.PRICE < ${priceFilterArray[priceFilter].maxPrice} 
						ORDER BY PRICE DESC`;
          }
        }
    }
  } else if (idSub == 0 && idCat == 0) {
    switch (typeSort) {
      // Hàng mới nhất
      case 0:
        if (brandFilter == 0) {
          if (priceFilter == 0) {
            return `ORDER BY CREATED DESC`;
          } else {
            return `${priceFilterArray[priceFilter].minPrice} <= pro.PRICE AND
                    pro.PRICE < ${priceFilterArray[priceFilter].maxPrice}
                    ORDER BY CREATED DESC`;
          }
        } else {
          if (priceFilter == 0) {
            return `pro.BRANDID = ${brandFilter} 
						        ORDER BY CREATED DESC`;
          } else {
            return `WHERE pro.BRANDID = ${brandFilter} AND
                    ${priceFilterArray[priceFilter].minPrice} <= pro.PRICE AND
                    pro.PRICE < ${priceFilterArray[priceFilter].maxPrice} 
                    ORDER BY CREATED DESC`;
          }
        }

      // Hàng cũ nhất
      case 1:
        if (brandFilter == 0) {
          if (priceFilter == 0) {
            console.log("run");

            return `ORDER BY CREATED ASC`;
          } else {
            return `${priceFilterArray[priceFilter].minPrice} <= pro.PRICE AND
                    pro.PRICE < ${priceFilterArray[priceFilter].maxPrice} 
                    ORDER BY CREATED ASC`;
          }
        } else {
          if (priceFilter == 0) {
            return `WHERE pro.BRANDID = ${brandFilter}
						        ORDER BY CREATED ASC`;
          } else {
            return `WHERE pro.BRANDID = ${brandFilter} AND
						${priceFilterArray[priceFilter].minPrice} <= pro.PRICE AND
						 pro.PRICE < ${priceFilterArray[priceFilter].maxPrice} 
						ORDER BY CREATED ASC`;
          }
        }

      // Giá tăng dần
      case 2:
        if (brandFilter == 0) {
          if (priceFilter == 0) {
            return `ORDER BY PRICE ASC`;
          } else {
            return `WHERE 	${
              priceFilterArray[priceFilter].minPrice
            } <= pro.PRICE AND
						pro.PRICE < ${priceFilterArray[priceFilter].maxPrice} 
						ORDER BY PRICE ASC`;
          }
        } else {
          if (priceFilter == 0) {
            return `WHERE  pro.BRANDID = ${brandFilter}
						ORDER BY PRICE ASC`;
          } else {
            return `WHERE	pro.BRANDID = ${brandFilter} AND
						${priceFilterArray[priceFilter].minPrice} <= pro.PRICE AND
						pro.PRICE < ${priceFilterArray[priceFilter].maxPrice} 
						ORDER BY PRICE ASC`;
          }
        }

      // Giá giảm dần
      default:
        if (brandFilter == 0) {
          if (priceFilter == 0) {
            return `ORDER BY PRICE DESC`;
          } else {
            return `WHERE 	${
              priceFilterArray[priceFilter].minPrice
            } <= pro.PRICE AND
						pro.PRICE < ${priceFilterArray[priceFilter].maxPrice} 
						ORDER BY PRICE DESC`;
          }
        } else {
          if (priceFilter == 0) {
            return `WHERE pro.BRANDID = ${brandFilter}
						ORDER BY PRICE DESC`;
          } else {
            return `WHERE	pro.BRANDID = ${brandFilter} AND
						${priceFilterArray[priceFilter].minPrice} <= pro.PRICE AND
						pro.PRICE < ${priceFilterArray[priceFilter].maxPrice} 
						ORDER BY PRICE DESC`;
          }
        }
    }
  } else if (idSub != 0 && idCat != 0){
    switch (typeSort) {
      // Hàng mới nhất
      case 0:
        if (brandFilter == 0) {
          if (priceFilter == 0) {
            return `WHERE pro.SUBCATEGORYID = ${idSub}
						ORDER BY CREATED DESC`;
          } else {
            return `WHERE pro.SUBCATEGORYID = ${idSub} AND
						${priceFilterArray[priceFilter].minPrice} <= pro.PRICE AND
						pro.PRICE < ${priceFilterArray[priceFilter].maxPrice} 
						ORDER BY CREATED DESC`;
          }
        } else {
          if (priceFilter == 0) {
            return `WHERE pro.SUBCATEGORYID = ${idSub} AND 
						pro.BRANDID = ${brandFilter}
						ORDER BY CREATED DESC`;
          } else {
            return `WHERE pro.SUBCATEGORYID = ${idSub} AND
						pro.BRANDID = ${brandFilter} AND
						${priceFilterArray[priceFilter].minPrice} <= pro.PRICE AND
						 pro.PRICE < ${priceFilterArray[priceFilter].maxPrice} 
						ORDER BY CREATED DESC`;
          }
        }

      // Hàng cũ nhất
      case 1:
        if (brandFilter == 0) {
          if (priceFilter == 0) {
            return `WHERE pro.SUBCATEGORYID = ${idSub}
						ORDER BY CREATED ASC`;
          } else {
            return `WHERE pro.SUBCATEGORYID = ${idSub} AND 
						${priceFilterArray[priceFilter].minPrice} <= pro.PRICE AND
						pro.PRICE < ${priceFilterArray[priceFilter].maxPrice} 
						ORDER BY CREATED ASC`;
          }
        } else {
          if (priceFilter == 0) {
            return `WHERE pro.SUBCATEGORYID = ${idSub} AND
						pro.BRANDID = ${brandFilter}
						ORDER BY CREATED ASC`;
          } else {
            return `WHERE pro.SUBCATEGORYID = ${idSub} AND 
						pro.BRANDID = ${brandFilter} AND
						${priceFilterArray[priceFilter].minPrice} <= pro.PRICE AND
						 pro.PRICE < ${priceFilterArray[priceFilter].maxPrice} 
						ORDER BY CREATED ASC`;
          }
        }

      // Giá tăng dần
      case 2:
        if (brandFilter == 0) {
          if (priceFilter == 0) {
            return `WHERE pro.SUBCATEGORYID = ${idSub}
						ORDER BY PRICE ASC`;
          } else {
            return `WHERE pro.SUBCATEGORYID = ${idSub} AND 
						${priceFilterArray[priceFilter].minPrice} <= pro.PRICE AND
						pro.PRICE < ${priceFilterArray[priceFilter].maxPrice} 
						ORDER BY PRICE ASC`;
          }
        } else {
          if (priceFilter == 0) {
            return `WHERE pro.SUBCATEGORYID = ${idSub} AND  
						pro.BRANDID = ${brandFilter}
						ORDER BY PRICE ASC`;
          } else {
            return `WHERE pro.SUBCATEGORYID = ${idSub} AND 
						pro.BRANDID = ${brandFilter} AND
						${priceFilterArray[priceFilter].minPrice} <= pro.PRICE AND
						pro.PRICE < ${priceFilterArray[priceFilter].maxPrice} 
						ORDER BY PRICE ASC`;
          }
        }

      // Giá giảm dần
      default:
        if (brandFilter == 0) {
          if (priceFilter == 0) {
            return `WHERE pro.SUBCATEGORYID = ${idSub}
						ORDER BY PRICE DESC`;
          } else {
            return `WHERE pro.SUBCATEGORYID = ${idSub} AND 
						${priceFilterArray[priceFilter].minPrice} <= pro.PRICE AND
						pro.PRICE < ${priceFilterArray[priceFilter].maxPrice} 
						ORDER BY PRICE DESC`;
          }
        } else {
          if (priceFilter == 0) {
            return `WHERE pro.SUBCATEGORYID = ${idSub} AND 
						pro.BRANDID = ${brandFilter}
						ORDER BY PRICE DESC`;
          } else {
            return `WHERE pro.SUBCATEGORYID = ${idSub} AND
						pro.BRANDID = ${brandFilter} AND
						${priceFilterArray[priceFilter].minPrice} <= pro.PRICE AND
						pro.PRICE < ${priceFilterArray[priceFilter].maxPrice} 
						ORDER BY PRICE DESC`;
          }
        }
    }
  }
}

// Hàm trả về N sản phẩm sắp xếp theo typeSort, brand và price
module.exports.topNProductFollowTypeSortAndIdCatAndIdSubAndBrandAndPrice = (
  typeSort,
  idCat,
  idSub,
  brandFilter,
  priceFilter,
  N
) => {    
  var stringValues = returnStringFollowTypeSortAndIdCatAndIdSubAndBrandAndPrice(
    typeSort,
    idCat,
    idSub,
    brandFilter,
    priceFilter
  );
  console.log("TCL: stringValues", stringValues)

  return db.load(`SELECT pro.ID, pro.PRICE, pro.SALE, pro.NAME, pro.IMAGE, pro.CATEGORYID, pro.SUBCATEGORYID,
	(CASE
			WHEN pro.SALE > 0 THEN (pro.PRICE - pro.PRICE * (pro.SALE / 100))
			ELSE pro.PRICE
	END) AS SALEPRICE
	FROM product AS pro 
	${stringValues}
	LIMIT ${N};`);
};

// Hàm trả về N sản phẩm cùng loại trong product detail
module.exports.topNProductTheSameFollowOffsetFollowIdPro = (IdPro, N , Offset) => {
  return db.load(`SELECT  ID, PRICE, SALE, NAME, IMAGE,
                  (CASE
                      WHEN SALE > 0 THEN (PRICE - PRICE * (SALE / 100))
                      ELSE PRICE
                  END) AS SALEPRICE
                  FROM product WHERE CATEGORYID In (SELECT CATEGORYID
                  FROM product WHERE ID = ${IdPro}) AND ID != ${IdPro}
									LIMIT ${N} OFFSET ${Offset * N};`);
};

// Hàm trả về N sản phẩm sale nhiều nhất trong index customer
module.exports.topNProductBestSalerFollowOffset = (N, Offset) => {
  return db.load(`SELECT ID, PRICE, SALE, NAME, IMAGE,
									(CASE
											WHEN SALE > 0 THEN (PRICE - PRICE * (SALE / 100))
											ELSE PRICE
									END) AS SALEPRICE
									FROM product
									ORDER BY SALE DESC
									LIMIT ${N} OFFSET ${Offset * N};`);
};

// Hàm trả về tất cả sản phẩm cùng số lượng bình luận của mỗi sản phẩm
module.exports.allProductWithCommentQuantity = () => {
  return db.load(
    `SELECT product.ID, product.NAME, product.IMAGE, category.NAME AS CATNAME, 
    sub_category.NAME AS SUBCATNAME, count(COMMENT.ID) AS COMMENT_QUANTITY
		FROM ((product LEFT JOIN (SELECT * FROM comment WHERE comment.ISSIMPLE = 1) AS comment ON product.ID = comment.PRODUCTID) 
					JOIN category ON product.CATEGORYID = category.ID) 
          JOIN sub_category ON product.SUBCATEGORYID = sub_category.ID
    WHERE product.STATUS = 1
		GROUP BY product.ID, product.NAME, product.IMAGE, category.NAME, sub_category.NAME`
  );
};

// Hàm lấy 1 sản phẩm theo id
module.exports.top1ProductFollowId = id => {
  return db.load(
    `SELECT pro.ID, pro.PRICE, pro.SALE, pro.NAME, pro.IMAGE, pro.CATEGORYID, pro.SUBCATEGORYID,
    bra.NAME AS BRANDNAME, pro.INVENTORY AS INVENTORY, pro.ORIGIN AS ORIGIN, pro.KILOGRAM AS KILOGRAM,
    pro.RATE AS RATE, pro.IMAGE AS IMAGE, pro.DESCRIPTION, cat.NAME AS CATEGORYNAME, sub.NAME AS SUBCATEGORYNAME,
    pro.PRICE, pro.SHORTDESCRIPTION,
    (CASE
        WHEN pro.SALE > 0 THEN (pro.PRICE - pro.PRICE * (pro.SALE / 100))
        ELSE pro.PRICE
    END) AS SALEPRICE FROM product AS pro JOIN brand AS bra
    JOIN category as cat JOIN sub_category as sub 
    ON pro.BRANDID = bra.ID AND pro.CATEGORYID = cat.ID AND pro.SUBCATEGORYID = sub.ID
    AND pro.CATEGORYID = sub.CATEGORYID WHERE pro.ID = ${id} AND pro.STATUS = 1`
  );
};

// Hàm lấy ra số lượng sản phẩm theo id
module.exports.GetInventoryProductFollowId = id => {
  return db.load(
    `SELECT INVENTORY FROM product WHERE ID = ${id}`
  );
};

// Cập nhật rate theo sản phẩm
module.exports.updateRateFollowProductId = id => {
  return db.load(`UPDATE product SET RATE = (SELECT ROUND(AVG(STARS)) FROM comment WHERE PRODUCTID = ${id} AND ISSIMPLE = 1)
  WHERE ID = ${id}`);
}

// Lấy ra đánh giá của theo sản phẩm
module.exports.getRateProductSimpleFollowProductId = id => {
  return db.load(`SELECT RATE FROM product 
  WHERE ID = ${id}`);
}

