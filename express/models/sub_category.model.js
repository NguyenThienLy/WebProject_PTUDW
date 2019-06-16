// Lấy database
var db = require("../utils/db");

//Hàm trả về danh sách sub category
module.exports.allSubCategory = () => {
  //Hàm này đổi lại sau
  return db.load(`SELECT * FROM sub_category`);
};

//Hàm trả về danh sách sub category của product
module.exports.allSubCategoryByProductID = product_ID => {
  //Hàm này đổi lại sau
  return db.load(`SELECT * FROM sub_category
	WHERE CATEGORYID IN (SELECT CATEGORYID FROM product WHERE ID = ${product_ID})`);
};

//Hàm trả về danh sách sub category theo id của category
module.exports.allSubCategoryByCategoryId = category_ID => {
  //Hàm này đổi lại sau
  return db.load(`SELECT * FROM sub_category WHERE sub_category.CATEGORYID = ${category_ID}`);
};

//Hàm trả về danh sách sub category theo ID category
module.exports.allSubCategoryWithDetailQuantity = category_ID => {
  //Hàm này đổi lại sau
  return db.load(
    `SELECT c.ID, c.NAME, COUNT(p.ID) AS QUANTITY 
					FROM sub_category c JOIN product p ON c.ID = p.CATEGORYID 
					AND c.CATEGORYID = ` +
      category_ID +
      `
					GROUP BY  c.ID, c.NAME`
  );
};

// Lấy số lượng
module.exports.subCategoriesQuantity = () => {
  return db.load(`SELECT COUNT(ID) AS SUBCATEGORY_QUANTITY FROM sub_category`);
};

// Xóa sub category của category 
module.exports.deleteSubCategoriesByCategoryId = (categoryId) => {
  return db.delete("sub_category", "CATEGORYID", categoryId);
};

module.exports.addSubCategoriesForCategory = (categoryId, subCategories) => {
  if (subCategories.constructor === Array) {
    subCategories.forEach(subCategory => {
      var sub_category = {
        CATEGORYID: categoryId,
        NAME: subCategory
      };

      //gọi hàm insert
      db.add("sub_category", sub_category);
    });
  } else {
    //Tạo entity
    var sub_category = {
      CATEGORYID: categoryId,
      NAME: subCategories
    };

    //gọi hàm insert
    db.add("sub_category", sub_category);
  }
};

module.exports.deleteSubCategories = (subCategories) => {
  if (subCategories.constructor === Array) {
    subCategories.forEach(subCategoryId => {
      db.delete("sub_category", "ID", subCategoryId);
    });
  } else {
    db.delete("sub_category", "ID", subCategories);
  }
};
