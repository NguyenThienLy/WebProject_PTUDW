var db = require("../utils/db");

//Hàm xóa tất cả tag của bài viết
module.exports.deleteTagOfNews = (newsId) => {
  return db.delete("news_tag", "NEWSID", newsId);
};

//Hàm xóa tất cả tag theo id
module.exports.deleteByTagId = (tagId) => {
  return db.delete("news_tag", "TAGID", tagId);
};

module.exports.allTagOfNews = (newsId) => {
  return db.load(`SELECT tag.ID, tag.NAME
                    FROM news_tag JOIN tag ON news_tag.TAGID = tag.ID
                    WHERE news_tag.NEWSID = '${newsId}'`);
};

module.exports.addTagForNews = (newsID, tags) => {
  if (tags.constructor === Array) {
    tags.forEach(tag => {
      var news_tag = {
        NEWSID: newsID,
        TAGID: tag
      };

      //gọi hàm insert
      db.add("news_tag", news_tag);
    });
  } else {
    //Tạo entity
    var news_tag = {
      NEWSID: newsID,
      TAGID: tags
    };

    //gọi hàm insert
    db.add("news_tag", news_tag);
  }
};
