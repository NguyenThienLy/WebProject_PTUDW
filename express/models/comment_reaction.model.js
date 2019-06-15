var db = require("../utils/db");

module.exports.deleteCommentReactionByCustomerId = customerId => {
  return db.delete("comment_reaction", "CUSTOMERID", customerId);
};

module.exports.deleteCommentReactionByCommentId = commentId => {
  return db.delete("comment_reaction", "COMMENTID", commentId);
};
