// Lấy database
var db = require("../utils/db");

//Hàm trả về danh sách category lv2
module.exports.allSubCategory = (category_lv1_ID)=>{
	//Hàm này đổi lại sau
	return db.load(`SELECT * FROM sub_category WHERE sub_category.CATEGORYID = ` +category_lv1_ID);
}