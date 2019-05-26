// Lấy database
var db = require("../utils/db");

// //hàm trả về danh sách tất cả category lv 1
// module.exports.allCategory = () => {
//   return db.load(`SELECT * FROM category`);
// };

// Hàm tính số lượng theo id của session table
module.exports.quantityFollowID = sessionID => {
  return db.load(
    `SELECT SUM(QUANTITY) AS QUANTITY FROM session_cart WHERE session_cart.ID = "${sessionID}"`
  );
};

// Hàm lấy ra tất cả các row bảng product simple theo id của session table
module.exports.allRowProductSimpleFollowID = sessionID => {
  return db.load(`SELECT pro.ID AS ID, pro.NAME AS NAME, 
  pro.IMAGE AS IMAGE, session_table.QUANTITY AS QUANTITY_PRO, 
  (CASE WHEN pro.SALE > 0 THEN (pro.PRICE - pro.PRICE * (pro.SALE / 100)) ELSE pro.PRICE END) AS SALEPRICE 
  FROM product pro RIGHT JOIN (SELECT * FROM session_cart WHERE session_cart.PRODUCT_ID > 0 
  AND session_cart.ID = "${sessionID}") AS session_table ON pro.ID = session_table.PRODUCT_ID`);
};

// Hàm lấy ra tất cả các row bảng product simple theo id của session table
module.exports.allRowProductComboFollowID = sessionID => {
  return db.load(`SELECT procombo.ID AS ID, procombo.NAME AS NAME, 
  pro1.IMAGE AS IMAGE1, pro2.IMAGE AS IMAGE2,
  pro3.IMAGE AS IMAGE3, session_table.QUANTITY AS QUANTITY_PRO,
  (CASE WHEN procombo.SALE > 0 THEN (procombo.PRICE - procombo.PRICE * (procombo.SALE / 100)) ELSE procombo.PRICE END) AS SALEPRICE 
  FROM (product_combo procombo JOIN product pro1 JOIN product pro2 JOIN product pro3 ON procombo.PRODUCTID1 = pro1.ID 
  AND procombo.PRODUCTID2 = pro2.ID AND procombo.PRODUCTID3 = pro3.ID) RIGHT JOIN (SELECT * FROM session_cart WHERE session_cart.PRODUCT_COMBO_ID > 0 
  AND session_cart.ID = "${sessionID}") AS session_table 
  ON procombo.ID = session_table.PRODUCT_COMBO_ID`);
};

// Hàm lấy ra tất cả các row theo id của session table
module.exports.allRowFollowID = sessionID => {
    return db.load(`SELECT * FROM session_cart WHERE ID = "${sessionID}"`);
  };

// Hàm thêm sesstion mới
module.exports.addSessionCart = sesstionCart => {
  return db.add("session_cart", sesstionCart);
};

// Hàm update quantity của session theo id, productId, productComboId
module.exports.update3PrimaryKey = sesstionCart => {
  return db.update3Primarykey(
    "session_cart",
    "ID",
    "PRODUCT_ID",
    "PRODUCT_COMBO_ID",
    sesstionCart
  );
};
