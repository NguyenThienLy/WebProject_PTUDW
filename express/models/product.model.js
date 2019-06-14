// Lấy database
var db = require("../utils/db");

// Hàm lấy số lượng sản phẩm product simple
module.exports.quantityProduct = () => {
  // Gọi hàm querry từ db
  return db.load(`SELECT COUNT(*) AS QUANTITY FROM product`);
};

// Hàm lấy số lượng sản phẩm product simple có status = 1
module.exports.quantityProductActive = () => {
  // Gọi hàm querry từ db
  return db.load(`SELECT COUNT(*) AS QUANTITY FROM product WHERE STATUS = 1`);
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
            product.SHORTDESCRIPTION, product.DESCRIPTION, product.INVENTORY, product.CREATED,
            category.NAME AS CATEGORYNAME, sub_category.NAME AS SUBCATEGORYNAME, brand.NAME AS BRANDNAME
						FROM ((product 
            INNER JOIN sub_category ON product.SUBCATEGORYID = sub_category.ID)
            INNER JOIN category ON product.CATEGORYID = category.ID)
						INNER JOIN brand ON product.BRANDID = brand.ID WHERE STATUS = 1`);
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
            WHERE product.INVENTORY > 0`);
};

// Hàm trả về tất cả sản phẩm id theo category Id trong database
module.exports.allProductIdByCategoryId = (categoryId) => {
  // Gọi hàm querry từ db
  return db.load(`SELECT product.ID
            FROM product
            WHERE product.INVENTORY > 0 AND product.CATEGORYID = ${categoryId}`);
};

module.exports.singleByProductId = productId => {
  return db.load(`SELECT * FROM product where ID = '${productId}'`);
};

// Hàm thêm vào sản phẩm mới
module.exports.addProduct = product => {
  product.CREATED = getDateNow();
  return db.add("product", product);
};

//Hàm cập nhật ảnh đại diện cho sản phẩm
module.exports.updateProduct = product=>{
    return db.update('product','ID',product);
};

//Hàm cập nhật ảnh đại diện cho sản phẩm
module.exports.updateProductInventory = products => {
  if (products.constructor === Array) {
    products.forEach(product => {
      //gọi hàm insert
      db.update("product", 'ID', product);
    });
  } else {
    //gọi hàm insert
    db.update("product", 'ID', product);
  }
};

//Hàm xóa 1 sản phẩm | cập nhật status về 0
module.exports.deleteProduct = (product)=>{
  return db.update('product','ID',product);
};

//Hàm cập nhật thông tin cho sản phẩm
module.exports.updateProductInfo = (product)=>{
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
	
  if (idSub == 0) {
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
  } else {
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

  return db.load(`SELECT pro.ID, pro.PRICE, pro.SALE, pro.NAME, pro.IMAGE, pro.CATEGORYID, pro.SUBCATEGORYID,
	(CASE
			WHEN pro.SALE > 0 THEN (pro.PRICE - pro.PRICE * (pro.SALE / 100))
			ELSE pro.PRICE
	END) AS SALEPRICE
	FROM product AS pro 
	${stringValues}
	LIMIT ${N};`);
};

// Hàm trả về 8 sản phẩm sale nhiều nhất trong index customer
module.exports.topNProductForIndexFollowOffset = (N, Offset) => {

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
    `SELECT PRODUCT.ID, PRODUCT.NAME, PRODUCT.IMAGE, CATEGORY.NAME AS CATNAME, 
						SUB_CATEGORY.NAME AS SUBCATNAME, count(COMMENT.ID) AS COMMENT_QUANTITY
		FROM ((product PRODUCT LEFT JOIN comment COMMENT ON PRODUCT.ID = COMMENT.PRODUCTID) 
					JOIN category CATEGORY ON PRODUCT.CATEGORYID = CATEGORY.ID) 
					JOIN sub_category SUB_CATEGORY ON PRODUCT.SUBCATEGORYID = SUB_CATEGORY.ID
		GROUP BY PRODUCT.ID, PRODUCT.NAME, PRODUCT.IMAGE, CATEGORY.NAME, SUB_CATEGORY.NAME`
  );
};
