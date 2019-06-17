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

// hàm lấy ra số lượng bình luận dựa vào product id
module.exports.commentsQuantityFollowIdProductAndTypeProduct = (idProduct, typeProduct) => {
  return db.load(
    `SELECT COUNT(COMMENT.ID) AS COMMENT_QUANTITY
    FROM comment COMMENT
    WHERE PRODUCTID = ${idProduct} AND ISSIMPLE = ${typeProduct}`
  );
};

// hàm lấy ra danh sách tất cả comments của 1 sản phẩm
module.exports.topNCommentsOfProductFollowCreatedAndLimitAndOffsetAndTypeProduct = (productId, N, offset, typeProduct) => {
  return db.load(
    `SELECT COMMENT.ID, COMMENT.CUSTOMERID, COMMENT.PRODUCTID, 
            DATE_FORMAT(COMMENT.CREATED, '%d/%m/%Y') AS CREATED, 
            COMMENT.TITLE, COMMENT.COMMENT, COMMENT.STARS, COMMENT.LIKES, CUSTOMER.FULLNAME, CUSTOMER.IMAGE, COMMENT.VERIFYCATION
    FROM product PRODUCT JOIN (comment COMMENT JOIN customer CUSTOMER ON COMMENT.CUSTOMERID = CUSTOMER.ID)
        ON PRODUCT.ID = COMMENT.PRODUCTID
    WHERE PRODUCT.ID = ${productId} AND COMMENT.ISSIMPLE = ${typeProduct}
    ORDER BY COMMENT.CREATED DESC
    LIMIT ${N} OFFSET ${N * offset}`
  );
};


//Hàm trả về thời gian hiện tại
function getDateNow(){
  var today = new Date();
  var dd = today.getDate();

  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();
  if (dd < 10) {
      dd = '0' + dd;
  }

  if (mm < 10) {
      mm = '0' + mm;
  }
  today = yyyy + '-' + mm + '-' + dd;
  return today;
}

// Hàm thêm mới bình luận trong môt sản phẩm
module.exports.addComment = comment => {
  comment.CREATED = getDateNow();
  return db.add("comment", comment);
};

// Hàm lấy nhóm các đánh giá sao của người dùng theo sản phẩm và loại sản phẩm
module.exports.groupStarQuantityFollowProductIdAndTypeProduct = (productId, typeProduct) => {
  return db.load(
    `SELECT STARS, COUNT(STARS) AS QUANTITY
    FROM comment
    WHERE PRODUCTID = ${productId} AND ISSIMPLE = ${typeProduct}
    GROUP BY STARS
    ORDER BY STARS DESC`);
};

module.exports.deleteCommentByCustomerId = customerId => {
  return db.delete("comment", "CUSTOMERID", customerId);
};

module.exports.deleteCommentByProductId = productId => {
  return db.delete("comment", "PRODUCTID", productId);
};

// Hàm lấy ra comment gần nhất của sản phẩm
module.exports.RecentlyComments = () => {
  return db.load(
    `SELECT COMMENT.PRODUCTID, PRODUCT.NAME AS PRODUCTNAME,
            DATE_FORMAT(COMMENT.CREATED, '%d/%m/%Y') AS CREATED, 
            COMMENT.TITLE, COMMENT.COMMENT, CUSTOMER.FULLNAME
    FROM product PRODUCT JOIN (comment COMMENT JOIN customer CUSTOMER ON COMMENT.CUSTOMERID = CUSTOMER.ID)
        ON PRODUCT.ID = COMMENT.PRODUCTID
        ORDER BY COMMENT.CREATED DESC LIMIT 4`
  );
};
