// Lấy database
var db = require("../utils/db");

// Hàm thêm vào sản phẩm combo mới
module.exports.addProductCombo = product => {};

// Hàm lấy số lượng sản phẩm product combo
module.exports.quantityProductCombo = () => {
  // Gọi hàm querry từ db
  return db.load(`SELECT COUNT(*) AS QUANTITY FROM product_combo`);
};

// Hàm trả về 6 sản phẩm combo sale nhiều nhất trong index customer
module.exports.top6ProductComboForIndex = () => {
  return db.load(`SELECT a.ID, a.PRICE, a.SALE, a.NAME,
                      b.IMAGE AS IMAGE1 , c.IMAGE AS IMAGE2, d.IMAGE AS IMAGE3, 
                      (CASE WHEN a.SALE > 0 THEN (a.PRICE - a.PRICE * (a.SALE / 100)) ELSE a.PRICE END) AS SALEPRICE
                      FROM product_combo a INNER JOIN product b INNER JOIN product c INNER JOIN product d 
                      ON a.PRODUCTID1 = b.ID AND a.PRODUCTID2 = c.ID AND a.PRODUCTID3 = d.ID 
                      ORDER BY SALE DESC
                      LIMIT 6`);
};

// Hàm trả về 6 sản phẩm combo sắp xếp theo typeSort
module.exports.topNProductComboAscCreated = (typeSort, N) => {
  switch (typeSort) {
    // Hàng mới nhất
    case 0:
      return db.load(`SELECT pro_cb.ID, pro_cb.PRICE, pro_cb.SALE, pro_cb.NAME, pro_1.IMAGE AS IMAGE1, pro_2.IMAGE AS IMAGE2,
                pro_3.IMAGE AS IMAGE3,
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
      return db.load(`SELECT pro_cb.ID, pro_cb.PRICE, pro_cb.SALE, pro_cb.NAME, pro_1.IMAGE AS IMAGE1, pro_2.IMAGE AS IMAGE2,
                pro_3.IMAGE AS IMAGE3,
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
      return db.load(`SELECT pro_cb.ID, pro_cb.PRICE, pro_cb.SALE, pro_cb.NAME, pro_1.IMAGE AS IMAGE1, pro_2.IMAGE AS IMAGE2,
                pro_3.IMAGE AS IMAGE3,
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
      return db.load(`SELECT pro_cb.ID, pro_cb.PRICE, pro_cb.SALE, pro_cb.NAME, pro_1.IMAGE AS IMAGE1, pro_2.IMAGE AS IMAGE2,
                pro_3.IMAGE AS IMAGE3,
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

// // Hàm trả về 6 sản phẩm sắp xếp theo ngày đăng, theo id cat và id sub
// module.exports.top6ProductComboFollowIdCatAndIdSub = (idCat, idSub) => {
//   return db.load(`SELECT pro_cb.ID, pro_cb.PRICE, pro_cb.SALE, pro_cb.NAME, pro_1.IMAGE AS IMAGE1, pro_2.IMAGE AS IMAGE2,
//                 pro_3.IMAGE AS IMAGE3,
//                 (CASE
//                         WHEN pro_cb.SALE > 0 THEN (pro_cb.PRICE - pro_cb.PRICE * (pro_cb.SALE / 100))
//                         ELSE pro_cb.PRICE
//                 END) AS SALEPRICE
//                 FROM product_combo AS pro_cb INNER JOIN product AS pro_1 INNER JOIN product AS pro_2 INNER JOIN product AS pro_3
//                 ON pro_cb.CATEGORYID = ${idCat} AND pro_cb.SUBCATEGORYID = ${idSub} AND pro_cb.PRODUCTID1 = pro_1.ID  
//                 AND pro_cb.PRODUCTID2 = pro_2.ID AND
//                 pro_cb.PRODUCTID3 = pro_3.ID
//                 ORDER BY pro_cb.CREATED
//                 LIMIT 6;`);
// };
