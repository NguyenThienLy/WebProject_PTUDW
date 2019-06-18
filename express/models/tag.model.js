// Lấy database
var db = require("../utils/db");

module.exports.addTag = tag => {
  return db.add("tag", tag);
};

//Hàm trả về tất cả các tag trên database
module.exports.allTag = () => {
  return db.load(`SELECT * FROM tag ORDER BY ID ASC`);
};

// Hàm trả về sản phẩm lọc theo tiêu chí trong database có phân trang
module.exports.pageAllTagFilter = (limit, offset, objQuery) => {
  // Gọi hàm querry từ db
  var query = "";
  if (objQuery.Name != "") {
    query += ` MATCH (NAME) AGAINST ('${objQuery.Name}' IN NATURAL LANGUAGE MODE) \n`;
    return db.load(`SELECT * FROM tag WHERE ${query} ORDER BY ID ASC limit ${limit} offset ${offset}`);
  } else {
    return db.load(`SELECT * FROM tag ORDER BY ID ASC limit ${limit} offset ${offset}`);
  }
};

// Hàm lấy số lượng sản phẩm product simple có status = 1
module.exports.quantityTagActive = (objQuery) => {
  // Gọi hàm querry từ db
  var query = "";
  if (objQuery.Name != "") {
    query += ` MATCH (NAME) AGAINST ('${objQuery.Name}' IN NATURAL LANGUAGE MODE) \n`;
    return db.load(`SELECT COUNT(*) AS QUANTITY FROM tag WHERE ${query}`);
  } else {
    return db.load(`SELECT COUNT(*) AS QUANTITY FROM tag`);
  }
};

module.exports.singleById = tagId => {
  return db.load(`SELECT * FROM tag WHERE ID = '${tagId}'`);
};

// Linh thêm
module.exports.tagsQuantity = () => {
  return db.load(`SELECT COUNT(ID) AS TAG_QUANTITY FROM tag`);
};

//Hàm cập nhật tag
module.exports.updateTag = tag => {
  return db.update("tag", "ID", tag);
};

//Hàm xóa tag theo id
module.exports.deleteTagById = tagId => {
  return db.delete("tag", "ID", tagId);
};

// Hàm lấy tag cho sảm phẩm hiện tại
module.exports.allTagFollowInfoId = (id) => {
  return db.load(`SELECT TAG.ID, TAG.NAME
                  FROM news NEWS JOIN news_tag NEWS_TAG JOIN tag TAG
                  ON NEWS_TAG.NEWSID = NEWS.ID AND NEWS_TAG.TAGID = TAG.ID
                  WHERE NEWS.ID = ${id} AND NEWS.STATUS = 1`);
}
