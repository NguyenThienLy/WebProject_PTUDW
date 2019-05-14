// Lấy database
var db = require("../utils/db");

//hàm trả về danh sách tất cả category lv 1
module.exports.allCategory = ()=>{
	return db.load(`SELECT * FROM category`);
}

