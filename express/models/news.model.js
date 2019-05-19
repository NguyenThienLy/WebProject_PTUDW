// Lấy database
var db = require("../utils/db");

// Hàm trả về 8 sản phẩm sale nhiều nhất trong index customer
module.exports.top3PopularNewsIndexForIndex = () => {
  return db.load(`SELECT ID, IMAGE, TITLE, SHORTCONENT, CREATED				
									FROM news
                  ORDER BY CREATED DESC
                  LIMIT 3;`);
};

// hàm thêm một info vào csdl
module.exports.addNews = news => {
  news.CREATED = getDateNow();
  return db.add("news", news);
};

//Hàm trả về thời gian hiện tại
function getDateNow() {
  var today = new Date();
  var dd = today.getDate();

  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }

  if (mm < 10) {
    mm = "0" + mm;
  }
  today = yyyy + "-" + mm + "-" + dd;
  return today;
}
