// Lấy database
var db = require("../utils/db");

// Hàm thêm vào sản phẩm combo mới
module.exports.addProductCombo = product => {};

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

// Hàm trả về 6 sản phẩm combo sắp xếp theo ngày đăng, theo id cat
module.exports.top8ProductComboFollowIdCat = idCat => {
  return db.load(`SELECT pro_cb.ID, pro_cb.PRICE, pro_cb.SALE, pro_cb.NAME, pro.IMAGE1 AS IMAGE1, pro_cb.CATEGORYID, pro_cb.SUBCATEGORYID,
                                      (CASE
                                              WHEN pro_cb.SALE > 0 THEN (pro_cb.PRICE - pro_cb.PRICE * (pro_cb.SALE / 100))
                                              ELSE pro_cb.PRICE
                                      END) AS SALEPRICE
                                      FROM product_combo AS pro_cb INNER JOIN 
                                      WHERE pro.CATEGORYID = ${idCat}
                                      ORDER BY CREATED
                                      LIMIT68;`);
};

// Hàm trả về 8 sản phẩm sắp xếp theo ngày đăng, theo id cat và id sub
module.exports.top8ProductFollowIdCatAndIdSub = (idCat, idSub) => {
  return db.load(`SELECT pro.ID, pro.PRICE, pro.SALE, pro.NAME, pro.IMAGE, pro.CATEGORYID, pro.SUBCATEGORYID,
                                      (CASE
                                              WHEN pro.SALE > 0 THEN (pro.PRICE - pro.PRICE * (pro.SALE / 100))
                                              ELSE pro.PRICE
                                      END) AS SALEPRICE
                                      FROM product AS pro
                                      WHERE pro.CATEGORYID = ${idCat} AND pro.SUBCATEGORYID = ${idSub}
                                      ORDER BY CREATED
                                      LIMIT 8;`);
};

// Hàm trả về 8 sản phẩm sắp xếp theo ngày đăng
module.exports.top8ProductAscCreated = () => {
  return db.load(`SELECT pro.ID, pro.PRICE, pro.SALE, pro.NAME, pro.IMAGE,
                                      (CASE
                                              WHEN pro.SALE > 0 THEN (pro.PRICE - pro.PRICE * (pro.SALE / 100))
                                              ELSE pro.PRICE
                                      END) AS SALEPRICE
                                      FROM product AS pro JOIN category cat 
                                      ON pro.CATEGORYID = cat.ID
                                      ORDER BY CREATED
                                      LIMIT 8;`);
};
