// Lấy database
var db = require("../utils/db");

//Hàm trả về danh sách sub category
module.exports.allSubCategory = () => {
  //Hàm này đổi lại sau
  return db.load(`SELECT sub_category.ID, sub_category.NAME, 
                  sub_category.CATEGORYID, category.NAME AS CATEGORYNAME
                  FROM sub_category JOIN category ON sub_category.CATEGORYID = category.ID
                  ORDER BY sub_category.ID ASC`);
};

// Hàm trả về sản phẩm lọc theo tiêu chí trong database có phân trang
module.exports.pageAllSubCategoryFilter = (limit, offset, objQuery) => {
  // Gọi hàm querry từ db
  var query = "";
  if (objQuery.Name != "") {
    query += ` MATCH (sub_category.NAME) AGAINST ('${objQuery.Name}' IN NATURAL LANGUAGE MODE) \n`;
    return db.load(`
    SELECT sub_category.ID, sub_category.NAME, 
    sub_category.CATEGORYID, category.NAME AS CATEGORYNAME
    FROM sub_category JOIN category ON sub_category.CATEGORYID = category.ID
    WHERE ${query}
    ORDER BY sub_category.ID ASC
    limit ${limit} offset ${offset}`);
  } else {
    return db.load(`
    SELECT sub_category.ID, sub_category.NAME, 
    sub_category.CATEGORYID, category.NAME AS CATEGORYNAME
    FROM sub_category JOIN category ON sub_category.CATEGORYID = category.ID
    ORDER BY sub_category.ID ASC
    limit ${limit} offset ${offset}`);
  }
};

// Hàm lấy số lượng sản phẩm product simple có status = 1
module.exports.quantitySubCategoryActive = (objQuery) => {
  // Gọi hàm querry từ db
  var query = "";
  if (objQuery.Name != "") {
    query += ` MATCH (NAME) AGAINST ('${objQuery.Name}' IN NATURAL LANGUAGE MODE) \n`;
    return db.load(`SELECT COUNT(*) AS QUANTITY FROM sub_category WHERE ${query}`);
  } else {
    return db.load(`SELECT COUNT(*) AS QUANTITY FROM sub_category`);
  }
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

module.exports.singleById = subCategoryId => {
  return db.load(`SELECT * FROM sub_category where ID = '${subCategoryId}'`);
};

module.exports.addSubCategory = subCategory => {
  return db.add("sub_category", subCategory);
};

module.exports.updateSubCategory = subCategory => {
  return db.update("sub_category", "ID", subCategory);
};

// Xóa sub_category theo id
module.exports.deleteSubCategoryById = subCategoryId => {
  return db.delete("sub_category", "ID", subCategoryId);
};

