//Lấy database
var db = require('../utils/db');

//Hàm trả về tất cả sản phẩm trong database
module.exports.allProduct = ()=>{
	//Gọi hàm querry từ db
	return db.load(`SELECT product.ID,product.NAME,product.PRICE,product.SALE,product.INVENTORY,product_image.LINK,
	product.STATUS,product.INVENTORY,
	product.CATEGORYID,product.BRANDID,category_level_2.NAME AS CATEGORYNAME, brand.NAME AS BRANDNAME
	FROM ((product 
	INNER JOIN category_level_2 ON product.CATEGORYID = category_level_2.ID)
	INNER JOIN brand ON product.BRANDID = brand.ID) INNER JOIN product_image ON product.ID = product_image.PRODUCTID`);
}

//hàm trả về danh sách tất cả category lv 1
module.exports.allCategory_lv1 = ()=>{
	return db.load(`SELECT * FROM category`);
}

module.exports.allCategory_lv2 = (category_lv1_ID)=>{
	//Hàm này đổi lại sau
	return db.load(`SELECT * FROM category_level_2 WHERE category_level_2.CATEGORYID = ` +category_lv1_ID);
}

//hàm trả về danh sách tất cả nhãn hiệu
module.exports.allBrand = ()=>{
	return db.load(`SELECT * FROM brand`);
}



//Hàm thêm vào sản phẩm mới
module.exports.addProduct = (product)=>{

}