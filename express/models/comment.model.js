var db = require("../utils/db");

// hàm lấy ra danh sách tất cả comments
module.exports.allComments = () => {
  return db.load(
    `SELECT COMMENT.ID, COMMENT.CUSTOMERID, COMMENT.PRODUCTID, 
            DATE_FORMAT(COMMENT.CREATED, '%d/%m/%Y') AS CREATED, 
            COMMENT.TITLE, COMMENT.COMMENT, COMMENT.STARS, COMMENT.LIKES, CUSTOMER.FULLNAME, CUSTOMER.IMAGE
    FROM (comment COMMENT JOIN customer CUSTOMER ON COMMENT.CUSTOMERID = CUSTOMER.ID)`
  );
};

// hàm lấy ra danh sách tất cả comments của 1 sản phẩm
module.exports.allCommentsOfProduct = productId => {
  return db.load(
    `SELECT COMMENT.ID, COMMENT.CUSTOMERID, COMMENT.PRODUCTID, 
            DATE_FORMAT(COMMENT.CREATED, '%d/%m/%Y') AS CREATED, 
            COMMENT.TITLE, COMMENT.COMMENT, COMMENT.STARS, COMMENT.LIKES, CUSTOMER.FULLNAME, CUSTOMER.IMAGE
    FROM product PRODUCT JOIN (comment COMMENT JOIN customer CUSTOMER ON COMMENT.CUSTOMERID = CUSTOMER.ID)
        ON PRODUCT.ID = COMMENT.PRODUCTID
    WHERE PRODUCT.ID = ${productId}`
  );
};

// hàm lấy ra số lượng comments
module.exports.commentsQuantity = () => {
  return db.load(
    `SELECT COUNT(COMMENT.ID) AS COMMENT_QUANTITY
    FROM comment COMMENT`
  );
};

// hàm lấy ra customer bình luận có mua product
module.exports.commentsCustomerBuyProduct = () => {
  return db.load(
    `SELECT COMMENT.CUSTOMERID, COMMENT.PRODUCTID
    FROM comment COMMENT JOIN order_info ORDER_INFO JOIN order_detail ORDER_DETAIL
    ON COMMENT.CUSTOMERID = ORDER_INFO.CUSTOMERID AND ORDER_INFO.ID = ORDER_DETAIL.ORDERINFOID 
    AND COMMENT.PRODUCTID = ORDER_DETAIL.PRODUCTID`
  );
};
