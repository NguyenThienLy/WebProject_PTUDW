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

module.exports.Top5News = () => {
  return db.load(`SELECT ID, TITLE, DATE_FORMAT(news.CREATED, '%d/%m/%Y %H:%i') AS CREATED, VIEWS			
                  FROM news
                  ORDER BY VIEWS DESC
                  LIMIT 5`);
};

//Trả về tổng số view trong ngày
module.exports.sumViewInDate = (date) => {
  return db.load(`SELECT SUM(VIEWS) AS VIEWS FROM news_views WHERE DATE = '${date}'`);
};

//Trả về danh sách view trong tháng và ngày
module.exports.chartViewInMonth = (date) => {
  return db.load(`SELECT DAY(DATE) AS DATE, SUM(VIEWS) AS VIEW FROM news_views
                  WHERE MONTH(DATE) = MONTH('${date}') AND YEAR(DATE) = YEAR('${date}')
                  GROUP BY DATE`);
};

module.exports.singleByNewsId = newsId => {
  return db.load(`SELECT news.ID, news.IMAGE, news.RESIZEDIMAGE, news.TITLE, 
                  news.SHORTCONTENT, news.CONTENT, news.CREATED
                  FROM news
                  WHERE news.ID = '${newsId}'`);
};

// Hàm trả về tất cả sản phẩm trong database
module.exports.allNews = () => {
  // Gọi hàm querry từ db
  return db.load(`SELECT news.ID, news.IMAGE, news.RESIZEDIMAGE, news.TITLE,
                  news.SHORTCONTENT, news.CONTENT, DATE_FORMAT(news.CREATED, '%d/%m/%Y %H:%i') AS CREATED 
                  FROM news WHERE STATUS = 1`);
};

// hàm lấy ra số lượng comments
module.exports.newsQuantity = () => {
  return db.load(
    `SELECT COUNT(ID) AS NEWS_QUANTITY
    FROM news
    WHERE STATUS = 1`
  );
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

// Hàm xóa 1 bài viết | cập nhật status về 0
module.exports.deleteNews = (news) => {
  return db.update('news', 'ID', news);
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
