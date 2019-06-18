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
  return db.load(`SELECT pro.ID AS ID, pro.NAME AS NAME, pro.SALE AS SALE,
  pro.IMAGE AS IMAGE, session_table.QUANTITY AS QUANTITY_PRO, pro.PRICE AS PRICE,
  (CASE WHEN pro.SALE > 0 THEN (pro.PRICE - pro.PRICE * (pro.SALE / 100)) ELSE pro.PRICE END) AS SALEPRICE, 
  (pro.PRICE - pro.PRICE * (pro.SALE / 100)) * session_table.QUANTITY AS SUMPRICE
  FROM product pro RIGHT JOIN (SELECT * FROM session_cart WHERE session_cart.PRODUCT_ID > 0 
  AND session_cart.ID = "${sessionID}") AS session_table ON pro.ID = session_table.PRODUCT_ID
  ORDER BY pro.NAME`);
};

// Hàm lấy ra tất cả các row bảng product simple theo id của session table
module.exports.allRowProductComboFollowID = sessionID => {
  return db.load(`SELECT procombo.ID AS ID, procombo.NAME AS NAME, procombo.SALE AS SALE,
  pro1.IMAGE AS IMAGE1, pro2.IMAGE AS IMAGE2,
  pro3.IMAGE AS IMAGE3, session_table.QUANTITY AS QUANTITY_PRO, procombo.PRICE AS PRICE,
  (CASE WHEN procombo.SALE > 0 THEN (procombo.PRICE - procombo.PRICE * (procombo.SALE / 100)) ELSE procombo.PRICE END) AS SALEPRICE,
  (procombo.PRICE - procombo.PRICE * (procombo.SALE / 100)) * session_table.QUANTITY AS SUMPRICE 
  FROM (product_combo procombo JOIN product pro1 JOIN product pro2 JOIN product pro3 ON procombo.PRODUCTID1 = pro1.ID 
  AND procombo.PRODUCTID2 = pro2.ID AND procombo.PRODUCTID3 = pro3.ID) RIGHT JOIN (SELECT * FROM session_cart WHERE session_cart.PRODUCT_COMBO_ID > 0 
  AND session_cart.ID = "${sessionID}") AS session_table 
  ON procombo.ID = session_table.PRODUCT_COMBO_ID
  ORDER BY procombo.NAME`);
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

// Hàm xóa một dòng trên hàng theo session id, product id
module.exports.deleteFollow3PrimaryKey = sesstionCart => {
  return db.delete3PrimaryKey(
    "session_cart",
    "ID",
    "PRODUCT_ID",
    "PRODUCT_COMBO_ID",
    sesstionCart
  );
};

// Hàm xóa một dòng trên hàng theo session id
module.exports.deleteSessionIdFollowId = id => {
  return db.delete("session_cart","ID", id);
};

// Hàm lấy ra tất cả các session cart của product simple theo session id
module.exports.allSessionCartProductSimpleFollowSessionId = (sessionId) => {
  // console.log(`
  // SELECT SESSION_CART.QUANTITY AS SESSION_CART_QUANTITY,
  //    PRODUCT.ID AS PRODUCT_ID, PRODUCT.INVENTORY AS PRODUCT_QUANTITY
  //    FROM session_cart SESSION_CART JOIN product PRODUCT ON
  //    SESSION_CART.PRODUCT_ID = PRODUCT.ID WHERE SESSION_CART.ID = '${sessionId}'
  // `)
  return db.load(
    `SELECT SESSION_CART.QUANTITY AS SESSION_CART_QUANTITY,
     PRODUCT.ID AS PRODUCT_ID, PRODUCT.INVENTORY AS PRODUCT_QUANTITY
     FROM session_cart SESSION_CART JOIN product PRODUCT ON
     SESSION_CART.PRODUCT_ID = PRODUCT.ID WHERE SESSION_CART.ID = '${sessionId}'`
  );
}

// Hàm lấy ra tất cả các session cart của product simple theo session id
module.exports.allSessionCartProductCompoFollowSessionId = (sessionId) => {
  // console.log(`
  // SELECT SESSION_CART.QUANTITY AS SESSION_CART_QUANTITY,
  //    PRODUCT.ID AS PRODUCT_ID, PRODUCT.INVENTORY AS PRODUCT_QUANTITY
  //    FROM session_cart SESSION_CART JOIN product PRODUCT ON
  //    SESSION_CART.PRODUCT_ID = PRODUCT.ID WHERE SESSION_CART.ID = '${sessionId}'
  // `)
  return db.load(
    `SELECT SESSION_CART.QUANTITY AS SESSION_CART_QUANTITY,
     PRODUCT.ID AS PRODUCT_ID, PRODUCT.INVENTORY AS PRODUCT_QUANTITY
     FROM session_cart SESSION_CART JOIN product_combo PRODUCT ON
     SESSION_CART.PRODUCT_COMBO_ID = PRODUCT.ID WHERE SESSION_CART.ID = '${sessionId}'`
  );
}