// Lấy database
var db = require("../utils/db");

// Hàm trả về 3 thông tin hữu ích mới nhất
module.exports.top3PopularNewsIndexForIndex = () => {
  return db.load(`SELECT ID, IMAGE, TITLE, SHORTCONTENT, CREATED				
									FROM news
                  ORDER BY CREATED DESC
                  LIMIT 3;`);
};

// Hàm trả về 3 thông tin hữu ích mới nhất
module.exports.topNNewsFollowTypeSort = (typeSort, N) => {
  switch (typeSort) {
    // Hàng mới nhất
    case 0:
      return db.load(`SELECT ID, IMAGE, TITLE, SHORTCONTENT, CREATED				
                      FROM news
                      ORDER BY CREATED DESC
                      LIMIT ${N};`);

    // Hàng cũ nhất
    case 1:
      return db.load(`SELECT ID, IMAGE, TITLE, SHORTCONTENT, CREATED				
                      FROM news
                      ORDER BY CREATED ASC
                      LIMIT ${N};`);

    // Giá tăng dần
    case 2:
      return db.load(`SELECT ID, IMAGE, TITLE, SHORTCONTENT, CREATED				
                      FROM news
                      ORDER BY CREATED DESC
                      LIMIT ${N};`);

    // Giá giảm dần
    default:
      return db.load(`SELECT ID, IMAGE, TITLE, SHORTCONTENT, CREATED				
                      FROM news
                      ORDER BY CREATED ASC
                      LIMIT ${N};`);
  }
};

// hàm thêm một info vào csdl
module.exports.addNews = news => {
  news.CREATED = getDateNow();
  return db.add("news", news);
};

//Hàm cập nhật ảnh đại diện cho sản phẩm
module.exports.updateNews = news => {
  return db.update("news", "ID", news);
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
