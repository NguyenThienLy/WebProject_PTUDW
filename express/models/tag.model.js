// Lấy database
var db = require("../utils/db");

module.exports.addTag = tag => {
  return db.add("tag", tag);
};

//Hàm trả về tất cả các tag trên database
module.exports.allTag = () => {
  return db.load(`SELECT * FROM tag ORDER BY ID ASC`);
};

module.exports.singleByTagId = tagId => {
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
