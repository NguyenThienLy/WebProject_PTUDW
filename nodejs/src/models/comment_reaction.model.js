var db = require("../utils/db");

// hàm lấy ra danh sách tất cả comments
module.exports.allCommentsReaction = () => {
  return db.load(
    `SELECT COMMENT.ID, COMMENT.CUSTOMERID, COMMENT.PRODUCTID, 
            DATE_FORMAT(COMMENT.CREATED, '%d/%m/%Y') AS CREATED, 
            COMMENT.TITLE, COMMENT.COMMENT, COMMENT.STARS, COMMENT.LIKES, CUSTOMER.FULLNAME, CUSTOMER.IMAGE
    FROM (comment COMMENT JOIN customer CUSTOMER ON COMMENT.CUSTOMERID = CUSTOMER.ID)`
  );
};

module.exports.deleteCommentReactionByCustomerId = customerId => {
  return db.delete("comment_reaction", "CUSTOMERID", customerId);
};

module.exports.deleteCommentReactionByCommentId = commentId => {
  return db.delete("comment_reaction", "COMMENTID", commentId);
};
