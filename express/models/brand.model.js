// lấy database
var db = require("../utils/db");

// hàm trả về danh sách tất cả nhãn hiệu
module.exports.allBrand = () => {
  return db.load(`SELECT * FROM brand ORDER BY ID ASC`);
};

// hàm trả về danh sách tất cả nhãn hiệu
module.exports.allBrandWithDetail = () => {
  return db.load(`SELECT br.ID, br.NAME, COUNT(br.ID) AS QUANTITY
                  FROM brand AS br LEFT JOIN product AS pro
                  ON br.ID = pro.BRANDID
                  GROUP BY br.ID, br.NAME`);
};

// Linh thêm
module.exports.brandsQuantity = () => {
  // Gọi hàm querry từ db
  return db.load(`SELECT COUNT(ID) AS BRAND_QUANTITY FROM brand`);
};

module.exports.addBrand = brand => {
  return db.add("brand", brand);
};

module.exports.singleByBrandId = brandId => {
  return db.load(`SELECT * FROM brand where ID = '${brandId}'`);
};

//Hàm cập nhật brand
module.exports.updateBrand = brand => {
  return db.update("brand", "ID", brand);
};

//Hàm xóa brand theo id
module.exports.deleteBrandById = brandId => {
  return db.delete("brand", "ID", brandId);
};
