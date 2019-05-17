// Lấy database
var db = require("../utils/db");

//Hàm trả về danh sách sub category 
module.exports.allSubCategory = (category_ID)=>{
	//Hàm này đổi lại sau
	return db.load(`SELECT * FROM sub_category WHERE sub_category.CATEGORYID = ` + category_ID);
}

//Hàm trả về danh sách sub category theo ID category
module.exports.allSubCategoryWithDetailQuantity = (category_ID)=>{
	//Hàm này đổi lại sau
	return db.load(`SELECT c.ID, c.NAME, COUNT(p.ID) AS QUANTITY 
					FROM sub_category c JOIN product p ON c.ID = p.CATEGORYID 
					AND c.CATEGORYID = ` + category_ID + `
					GROUP BY  c.ID, c.NAME`);
}