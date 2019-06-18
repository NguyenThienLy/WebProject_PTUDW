// Lấy database
var db = require("../utils/db");


//Hàm thêm số lượng view vào bảng news
module.exports.IncreaseView = (newsID) => {
  return db.updateIncrease('news', 'VIEWS', 'ID', newsID);
}

//Hàm thêm số lượng view vào bảng new_views
module.exports.IncreaseNewViews = (newsID, date) => {
  db.load(`SELECT ID FROM news_views WHERE IDNEWS = ${newsID} AND DATE = '${date}'`).then(rows => {
    if (rows.length == 0) {
      var entity = {
        IDNEWS: newsID,
        DATE: date,
        VIEWS: 1
      };
      return db.add('news_views', entity);
    } else {
      return db.updateIncrease('news_views', 'VIEWS', 'IDNEWS', newsID);
    }
  });
}

// Hàm trả về 3 thông tin hữu ích mới nhất
module.exports.topNNewestNews = (N) => {
  return db.load(`SELECT ID, IMAGE, TITLE, SHORTCONTENT,  NEWS.VIEWS, DATE_FORMAT(CREATED, '%d/%m/%Y') AS CREATED				
									FROM news
                  ORDER BY DATE(CREATED) DESC
                  LIMIT ${N};`);
};

// Hàm trả về 3 thông tin hữu ích mới nhất
module.exports.topNNewestNewsDiffNewsId = (N, NewsId) => {
  return db.load(`SELECT ID, IMAGE, TITLE,  NEWS.VIEWS, SHORTCONTENT, DATE_FORMAT(CREATED, '%d/%m/%Y') AS CREATED				
                  FROM news
                  WHERE ID != ${NewsId}
                  ORDER BY DATE(CREATED) DESC
                  LIMIT ${N};`);
};

// Hàm trả về 3 thông tin hữu ích mới nhất
module.exports.topNNewsFollowTypeSort = (typeSort, N) => {
  switch (typeSort) {
    // Tin mới nhất
    case 0:
      return db.load(`SELECT ID, IMAGE, TITLE, SHORTCONTENT, VIEWS, DATE_FORMAT(CREATED, '%d/%m/%Y') AS CREATED	
                      FROM news
                      ORDER BY DATE(CREATED) DESC
                      LIMIT ${N};`);

    // Tin cũ nhất
    case 1:
      return db.load(`SELECT ID, IMAGE, TITLE, SHORTCONTENT, VIEWS, DATE_FORMAT(CREATED, '%d/%m/%Y') AS CREATED				
                      FROM news
                      ORDER BY DATE(CREATED) ASC
                      LIMIT ${N};`);

    // Đọc nhiều nhất
    case 2:
      return db.load(`SELECT ID, IMAGE, TITLE, SHORTCONTENT, VIEWS, DATE_FORMAT(CREATED, '%d/%m/%Y') AS CREATED				
                      FROM news
                      ORDER BY VIEWS DESC
                      LIMIT ${N};`);

    // Đọc ít nhất
    default:
      return db.load(`SELECT ID, IMAGE, TITLE, SHORTCONTENT, VIEWS, DATE_FORMAT(CREATED, '%d/%m/%Y') AS CREATED				
                      FROM news
                      ORDER BY VIEWS ASC
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
                  FROM news WHERE STATUS = 1
                  ORDER BY news.CREATED DESC`);
};

// Hàm trả về sản phẩm lọc theo tiêu chí trong database có phân trang
module.exports.pageAllNewsFilter = (limit, offset, objQuery) => {
  // Gọi hàm querry từ db
  var query = "";
  if (objQuery.Name != "") {
    query += ` AND MATCH (news.TITLE, news.SHORTCONTENT) AGAINST ('${objQuery.Name}' IN NATURAL LANGUAGE MODE) \n`;
  }

  return db.load(`
  SELECT news.ID, news.IMAGE, news.RESIZEDIMAGE, news.TITLE,
  news.SHORTCONTENT, news.CONTENT, DATE_FORMAT(news.CREATED, '%d/%m/%Y %H:%i') AS CREATED 
  FROM news WHERE STATUS = 1
  ${query}
  ORDER BY news.CREATED DESC
  limit ${limit} offset ${offset}`);
};

// Hàm lấy số lượng sản phẩm product simple có status = 1
module.exports.quantityNewsActive = (objQuery) => {
  // Gọi hàm querry từ db
  var query = "";
  if (objQuery.Name != "") {
    query += ` AND MATCH (news.TITLE, news.SHORTCONTENT) AGAINST ('${objQuery.Name}' IN NATURAL LANGUAGE MODE) \n`;
  }
  return db.load(`SELECT COUNT(*) AS QUANTITY FROM news WHERE STATUS = 1
                  ${query}`);
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

// Hàm trả về một thông tin theo id
module.exports.top1NewFollowId = (id) => {
  return db.load(`SELECT ID, TITLE, DATE_FORMAT(CREATED, '%d/%m/%Y') AS CREATED,
                  SHORTCONTENT, CONTENT
                  FROM news
                  WHERE ID = ${id} AND STATUS = 1`);
}


// Hàm lấy các bài báo có cùng tag
module.exports.topNNewsTheSameFollowOffsetFollowIdNews = (IdInfo, N, Offset) => {
  return db.load(`SELECT NEWS.ID, NEWS.IMAGE, NEWS.TITLE, NEWS.VIEWS, NEWS.SHORTCONTENT, DATE_FORMAT(NEWS.CREATED, '%d/%m/%Y') AS CREATED	
                FROM news NEWS JOIN news_tag NEWS_TAG ON NEWS.ID = NEWS_TAG.NEWSID WHERE ID != ${IdInfo} AND
                NEWS_TAG.TAGID IN (SELECT TAG1.ID
                FROM news_tag NEWS_TAG1 JOIN tag TAG1 ON NEWS_TAG1.TAGID = TAG1.ID WHERE NEWS_TAG1.NEWSID = ${IdInfo})
                GROUP BY NEWS.ID
								LIMIT ${N} OFFSET ${Offset * N};`);
};

// Hàm lấy các bài báo được đọc nhiều nhất tuần
module.exports.topNNewsPopularInWeekFollowOffsetFollowIdNews = (IdInfo, N, Offset, startDate, endDate) => {
  return db.load(`SELECT SUM(NEWS_VIEWS.VIEWS) AS QUANTITY_VIEWS, NEWS.ID, NEWS.IMAGE, NEWS.TITLE, NEWS.VIEWS, NEWS.SHORTCONTENT, DATE_FORMAT(NEWS.CREATED, '%d/%m/%Y') AS CREATED	
                  FROM news NEWS JOIN news_views NEWS_VIEWS ON NEWS.ID = NEWS_VIEWS.IDNEWS
                  WHERE '${startDate}' <= NEWS_VIEWS.DATE AND NEWS_VIEWS.DATE <= '${endDate}'
                  GROUP BY  NEWS.ID
                  ORDER BY QUANTITY_VIEWS DESC
								LIMIT ${N} OFFSET ${Offset * N};`);
};

// Hàm lấy các bài báo được đọc nhiều nhất tuần
module.exports.topNNewsFollowTagId = (tagId, N, Offset) => {
  var stringTagId = "";

  if (+tagId !== 0)
    stringTagId = `WHERE NEWS_TAG.TAGID = ${tagId}`;

  return db.load(`SELECT NEWS.ID, NEWS.IMAGE, NEWS.TITLE, NEWS.VIEWS, NEWS.SHORTCONTENT, DATE_FORMAT(NEWS.CREATED, '%d/%m/%Y') AS CREATED	
                FROM news NEWS LEFT JOIN news_tag NEWS_TAG ON NEWS.ID = NEWS_TAG.NEWSID ${stringTagId}
                GROUP BY NEWS_TAG.NEWSID
								LIMIT ${N} OFFSET ${Offset * N};`);
};