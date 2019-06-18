var db = require("../utils/db");

// hàm lấy ra danh sách tất cả comments
module.exports.allComments = () => {
  return db.load(
    `SELECT COMMENT.ID, COMMENT.CUSTOMERID, COMMENT.PRODUCTID, 
            DATE_FORMAT(COMMENT.CREATED, '%d/%m/%Y') AS CREATED, 
            COMMENT.TITLE, COMMENT.COMMENT, COMMENT.STARS, COMMENT.LIKES, CUSTOMER.FULLNAME, CUSTOMER.IMAGE
    FROM (comment COMMENT JOIN customer CUSTOMER ON COMMENT.CUSTOMERID = CUSTOMER.ID)
    ORDER BY COMMENT.CREATED DESC`
  );
};

// hàm lấy ra danh sách tất cả comments của 1 sản phẩm
module.exports.allCommentsOfProductSimple = productId => {
  return db.load(
    `SELECT COMMENT.ID, COMMENT.CUSTOMERID, COMMENT.PRODUCTID, 
            DATE_FORMAT(COMMENT.CREATED, '%d/%m/%Y') AS CREATED, 
            COMMENT.TITLE, COMMENT.COMMENT, COMMENT.STARS, COMMENT.LIKES, CUSTOMER.FULLNAME, CUSTOMER.IMAGE
    FROM product PRODUCT JOIN (comment COMMENT JOIN customer CUSTOMER ON COMMENT.CUSTOMERID = CUSTOMER.ID)
        ON PRODUCT.ID = COMMENT.PRODUCTID
    WHERE PRODUCT.ID = ${productId}
    ORDER BY COMMENT.CREATED DESC`
  );
};

// hàm lấy ra danh sách tất cả comments của 1 sản phẩm
module.exports.allCommentsOfProductCombo = productComboId => {
  return db.load(
    `SELECT COMMENT.ID, COMMENT.CUSTOMERID, COMMENT.PRODUCTID, 
            DATE_FORMAT(COMMENT.CREATED, '%d/%m/%Y') AS CREATED, 
            COMMENT.TITLE, COMMENT.COMMENT, COMMENT.STARS, COMMENT.LIKES, CUSTOMER.FULLNAME, CUSTOMER.IMAGE
    FROM product_combo PRODUCTCOMBO JOIN (comment COMMENT JOIN customer CUSTOMER ON COMMENT.CUSTOMERID = CUSTOMER.ID)
        ON PRODUCTCOMBO.ID = COMMENT.PRODUCTID
    WHERE PRODUCTCOMBO.ID = ${productComboId}
    ORDER BY COMMENT.CREATED DESC`
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
module.exports.commentsCustomerBuyProductSimple = () => {
  return db.load(
    `SELECT comment.CUSTOMERID, comment.PRODUCTID
    FROM comment JOIN order_info JOIN order_detail
    ON comment.CUSTOMERID = order_info.CUSTOMERID AND order_info.ID = order_detail.ORDERINFOID AND order_detail.PRODUCTID = comment.PRODUCTID
    	WHERE comment.ISSIMPLE = 1 AND order_detail.ISSIMPLE = 1`
  );
};

// hàm lấy ra customer bình luận có mua product
module.exports.commentsCustomerBuyProductCombo = () => {
  return db.load(
    `SELECT comment.CUSTOMERID, comment.PRODUCTID
    FROM comment JOIN order_info JOIN order_detail
    ON comment.CUSTOMERID = order_info.CUSTOMERID AND order_info.ID = order_detail.ORDERINFOID AND order_detail.PRODUCTID = comment.PRODUCTID
    	WHERE comment.ISSIMPLE = 0 AND order_detail.ISSIMPLE = 0`
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

module.exports.deleteCommentById = commentId => {
  return db.delete("comment", "ID", commentId);
};

module.exports.deleteCommentByCustomerId = customerId => {
  return db.delete("comment", "CUSTOMERID", customerId);
};

module.exports.deleteCommentByProductIdAndProductType = (comment) => {
  return db.delete2PrimaryKey("comment", "PRODUCTID", "ISSIMPLE", comment);
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
