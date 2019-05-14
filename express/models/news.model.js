// Lấy database
var db = require("../utils/db");

// Hàm trả về 8 sản phẩm sale nhiều nhất trong index customer
module.exports.top3PopularNewsIndexForIndex = () => {
  return db.load(`SELECT ID, IMAGE, TITLE, SHORTCONENT, DATE(CREATED) AS CREATED					
									FROM news
                                    ORDER BY CREATED DESC
                                    LIMIT 3;`);
};