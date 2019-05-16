// Lấy database
var db = require("../utils/db");

//hàm trả về danh sách tất cả category lv 1
module.exports.allCategory = ()=>{
	return db.load(`SELECT * FROM category`);
}

// Hàm trả về danh sách tất cả category và số lượng sản phẩm thuộc category đó
module.exports.allWithDetailQuantity = ()=>{
	return db.load(`SELECT c.ID, c.NAME, COUNT(p.ID) AS QUANTITY 
					FROM category c LEFT JOIN product p ON c.ID = p.CATEGORYID 
					GROUP BY c.ID, c.NAME`);
}

