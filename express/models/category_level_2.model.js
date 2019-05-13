// Lấy database
var db = require("../utils/db");

module.exports.allCategory_lv2 = category_lv1_ID => {
    // Hàm này đổi lại sau
    return db.load(
      `SELECT * FROM category_level_2 WHERE category_level_2.CATEGORYID = ` +
        category_lv1_ID
    );
  };