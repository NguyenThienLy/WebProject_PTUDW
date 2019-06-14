// Lấy database
var db = require("../utils/db");

// Hàm trả về tất cả sản phẩm trong database
module.exports.allProductCombos = () => {
  // Gọi hàm querry từ db
  return db.load(`SELECT product_combo.ID, 
            product_combo.PRODUCTID1, product_combo.PRODUCTID2, product_combo.PRODUCTID3, 
            PRO1.NAME AS PRODUCTNAME1, PRO2.NAME AS PRODUCTNAME2, PRO3.NAME AS PRODUCTNAME3,
            PRO1.RESIZEDIMAGE AS PRODUCTIMAGE1, PRO2.RESIZEDIMAGE AS PRODUCTIMAGE2, PRO3.RESIZEDIMAGE AS PRODUCTIMAGE3,
            product_combo.NAME, product_combo.STATUS, product_combo.RATE, product_combo.PRICE, product_combo.KILOGRAM, 
            product_combo.SALE, product_combo.VIPSALE, product_combo.SHORTDESCRIPTION, product_combo.DESCRIPTION, 
            product_combo.INVENTORY, product_combo.CREATED
						FROM ((product_combo
            JOIN product PRO1 ON product_combo.PRODUCTID1 = PRO1.ID)
            JOIN product PRO2 ON product_combo.PRODUCTID2 = PRO2.ID)
						JOIN product PRO3 ON product_combo.PRODUCTID3 = PRO3.ID`);
};


module.exports.singleByProductComboId = productComboId => {
  return db.load(`SELECT product_combo.ID, 
    product_combo.PRODUCTID1, product_combo.PRODUCTID2, product_combo.PRODUCTID3, 
    PRO1.NAME AS PRODUCTNAME1, PRO2.NAME AS PRODUCTNAME2, PRO3.NAME AS PRODUCTNAME3,
    PRO1.RESIZEDIMAGE AS PRODUCTIMAGE1, PRO2.RESIZEDIMAGE AS PRODUCTIMAGE2, PRO3.RESIZEDIMAGE AS PRODUCTIMAGE3,
    PRO1.INVENTORY AS PRODUCTINVENTORY1, PRO2.INVENTORY AS PRODUCTINVENTORY2, PRO3.INVENTORY AS PRODUCTINVENTORY3,
    product_combo.NAME, product_combo.STATUS, product_combo.RATE, product_combo.PRICE, product_combo.KILOGRAM, 
    product_combo.SALE, product_combo.VIPSALE, product_combo.SHORTDESCRIPTION, product_combo.DESCRIPTION, 
    product_combo.INVENTORY, product_combo.CREATED
    FROM ((product_combo
    JOIN product PRO1 ON product_combo.PRODUCTID1 = PRO1.ID)
    JOIN product PRO2 ON product_combo.PRODUCTID2 = PRO2.ID)
    JOIN product PRO3 ON product_combo.PRODUCTID3 = PRO3.ID 
    WHERE product_combo.ID = '${productComboId}'`);
};

// Hàm lấy ra số lượng của sản phẩm có ID
module.exports.inventoryProductCombo = (productComboID) => {
  // Gọi hàm querry từ db
  return db.load(`SELECT product_combo.INVENTORY FROM product_combo WHERE product_combo.ID = ${productComboID}`);
};

// Hàm xóa 1 sản phẩm | cập nhật status về 0
module.exports.deleteProductCombo = (productCombo) => {
  return db.update('product_combo','ID', productCombo);
};

// Hàm thêm vào sản phẩm combo mới
module.exports.addProductCombo = productCombo => {
  productCombo.CREATED = getDateNow();
  return db.add("product_combo", productCombo);
};

//Hàm cập nhật ảnh đại diện cho sản phẩm
module.exports.updateProductCombo = productCombo => {
  return db.update('product_combo', 'ID', productCombo);
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

// Hàm lấy số lượng sản phẩm product combo
module.exports.quantityProductCombo = () => {
  // Gọi hàm querry từ db
  return db.load(`SELECT COUNT(*) AS QUANTITY FROM product_combo`);
};

// Hàm trả về 6 sản phẩm combo sale nhiều nhất trong index customer
module.exports.topNProductComboForIndexFollowOffset = (N, Offset) => {
  return db.load(`SELECT a.ID, a.PRICE, a.SALE, a.NAME, b.ID AS PROID1, c.ID AS PROID2, d.ID AS PROID3, 
                      b.IMAGE AS IMAGE1 , c.IMAGE AS IMAGE2, d.IMAGE AS IMAGE3, 
                      (CASE WHEN a.SALE > 0 THEN (a.PRICE - a.PRICE * (a.SALE / 100)) ELSE a.PRICE END) AS SALEPRICE
                      FROM product_combo a INNER JOIN product b INNER JOIN product c INNER JOIN product d 
                      ON a.PRODUCTID1 = b.ID AND a.PRODUCTID2 = c.ID AND a.PRODUCTID3 = d.ID 
                      ORDER BY SALE DESC
                      LIMIT ${N} OFFSET ${Offset * N}`);
};

// Hàm trả về 6 sản phẩm combo sắp xếp theo typeSort
module.exports.topNProductComboFollowFilter = (
  typeSort,
  catFilter,
  subFilter,
  brandFilter,
  priceFilter,
  N
) => {
  switch (typeSort) {
    // Hàng mới nhất
    case 0:
      return db.load(`SELECT pro_cb.ID, pro_cb.PRICE, pro_cb.SALE, pro_cb.NAME, 
                pro_1.ID AS PROID1, pro_2.ID AS PROID2, pro_3.ID AS PROID3, 
                pro_1.IMAGE AS IMAGE1, pro_2.IMAGE AS IMAGE2, pro_3.IMAGE AS IMAGE3,
                (CASE
                        WHEN pro_cb.SALE > 0 THEN (pro_cb.PRICE - pro_cb.PRICE * (pro_cb.SALE / 100))
                        ELSE pro_cb.PRICE
                END) AS SALEPRICE
                FROM product_combo AS pro_cb INNER JOIN product AS pro_1 INNER JOIN product AS pro_2 INNER JOIN product AS pro_3
                ON pro_cb.PRODUCTID1 = pro_1.ID  AND pro_cb.PRODUCTID2 = pro_2.ID AND
                pro_cb.PRODUCTID3 = pro_3.ID
                ORDER BY pro_cb.CREATED DESC
                LIMIT ${N};`);

    // Hàng cũ nhất
    case 1:
      return db.load(`SELECT pro_cb.ID, pro_cb.PRICE, pro_cb.SALE, pro_cb.NAME, 
                pro_1.ID AS PROID1, pro_2.ID AS PROID2, pro_3.ID AS PROID3, 
                pro_1.IMAGE AS IMAGE1, pro_2.IMAGE AS IMAGE2, pro_3.IMAGE AS IMAGE3,
                (CASE
                        WHEN pro_cb.SALE > 0 THEN (pro_cb.PRICE - pro_cb.PRICE * (pro_cb.SALE / 100))
                        ELSE pro_cb.PRICE
                END) AS SALEPRICE
                FROM product_combo AS pro_cb INNER JOIN product AS pro_1 INNER JOIN product AS pro_2 INNER JOIN product AS pro_3
                ON pro_cb.PRODUCTID1 = pro_1.ID  AND pro_cb.PRODUCTID2 = pro_2.ID AND
                pro_cb.PRODUCTID3 = pro_3.ID
                ORDER BY pro_cb.CREATED ASC
                LIMIT ${N};`);

    // Giá tăng dần
    case 2:
      return db.load(`SELECT pro_cb.ID, pro_cb.PRICE, pro_cb.SALE, pro_cb.NAME, 
                pro_1.ID AS PROID1, pro_2.ID AS PROID2, pro_3.ID AS PROID3, 
                pro_1.IMAGE AS IMAGE1, pro_2.IMAGE AS IMAGE2, pro_3.IMAGE AS IMAGE3,
                (CASE
                        WHEN pro_cb.SALE > 0 THEN (pro_cb.PRICE - pro_cb.PRICE * (pro_cb.SALE / 100))
                        ELSE pro_cb.PRICE
                END) AS SALEPRICE
                FROM product_combo AS pro_cb INNER JOIN product AS pro_1 INNER JOIN product AS pro_2 INNER JOIN product AS pro_3
                ON pro_cb.PRODUCTID1 = pro_1.ID  AND pro_cb.PRODUCTID2 = pro_2.ID AND
                pro_cb.PRODUCTID3 = pro_3.ID
                ORDER BY pro_cb.PRICE ASC
                LIMIT ${N};`);

    // Giá giảm dần
    default:
      return db.load(`SELECT pro_cb.ID, pro_cb.PRICE, pro_cb.SALE, pro_cb.NAME, 
                pro_1.ID AS PROID1, pro_2.ID AS PROID2, pro_3.ID AS PROID3, 
                pro_1.IMAGE AS IMAGE1, pro_2.IMAGE AS IMAGE2, pro_3.IMAGE AS IMAGE3,
                (CASE
                        WHEN pro_cb.SALE > 0 THEN (pro_cb.PRICE - pro_cb.PRICE * (pro_cb.SALE / 100))
                        ELSE pro_cb.PRICE
                END) AS SALEPRICE
                FROM product_combo AS pro_cb INNER JOIN product AS pro_1 INNER JOIN product AS pro_2 INNER JOIN product AS pro_3
                ON pro_cb.PRODUCTID1 = pro_1.ID  AND pro_cb.PRODUCTID2 = pro_2.ID AND
                pro_cb.PRODUCTID3 = pro_3.ID
                ORDER BY pro_cb.PRICE DESC
                LIMIT ${N};`);
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

function returnStringFollowTypeSortAndPrice(
  typeSort,
  priceFilter
) {
  switch (typeSort) {
    // Hàng mới nhất
    case 0:
      if (priceFilter == 0) {
        return `ORDER BY pro_cb.CREATED DESC`;
      } else {
        return `WHERE ${priceFilterArray[priceFilter].minPrice} <= pro_cb.PRICE
        AND pro_cb.PRICE < ${priceFilterArray[priceFilter].maxPrice} 
        ORDER BY pro_cb.CREATED DESC`;
      }

    // Hàng cũ nhất
    case 1:
      if (priceFilter == 0) {
        return `ORDER BY pro_cb.CREATED ASC`;
      } else {
        return `WHERE ${priceFilterArray[priceFilter].minPrice} <= pro_cb.PRICE
        AND pro_cb.PRICE < ${priceFilterArray[priceFilter].maxPrice} 
        ORDER BY pro_cb.CREATED ASC`;
      }

    // Giá tăng dần
    case 2:
      if (priceFilter == 0) {
        return `ORDER BY pro_cb.PRICE ASC`;
      } else {
        return `WHERE ${priceFilterArray[priceFilter].minPrice} <= pro_cb.PRICE
        AND pro_cb.PRICE < ${priceFilterArray[priceFilter].maxPrice} 
        ORDER BY pro_cb.PRICE ASC`;
      }

    // Giá giảm dần
    default:
      if (priceFilter == 0) {
        return `ORDER BY pro_cb.PRICE DESC`;
      } else {
        return `WHERE ${priceFilterArray[priceFilter].minPrice} <= pro_cb.PRICE
        AND pro_cb.PRICE < ${priceFilterArray[priceFilter].maxPrice} 
        ORDER BY pro_cb.PRICE DESC`;
      }
  }
}

// Hàm trả về N sản phẩm sắp xếp theo typeSort, brand và price
module.exports.topNProductComboFollowTypeSortAndPrice = (
  typeSort,
  priceFilter,
  N
) => {
  var stringValues = returnStringFollowTypeSortAndPrice(typeSort, priceFilter);

  return db.load(`SELECT pro_cb.ID, pro_cb.PRICE, pro_cb.SALE, pro_cb.NAME, 
          pro_1.ID AS PROID1, pro_2.ID AS PROID2, pro_3.ID AS PROID3, 
          pro_1.IMAGE AS IMAGE1, pro_2.IMAGE AS IMAGE2, pro_3.IMAGE AS IMAGE3,
          (CASE
                  WHEN pro_cb.SALE > 0 THEN (pro_cb.PRICE - pro_cb.PRICE * (pro_cb.SALE / 100))
                  ELSE pro_cb.PRICE
          END) AS SALEPRICE
          FROM product_combo AS pro_cb INNER JOIN product AS pro_1 INNER JOIN product AS pro_2 INNER JOIN product AS pro_3
          ON pro_cb.PRODUCTID1 = pro_1.ID  AND pro_cb.PRODUCTID2 = pro_2.ID AND
          pro_cb.PRODUCTID3 = pro_3.ID
          ${stringValues}
          LIMIT ${N};`);
};
