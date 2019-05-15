// Lấy database
var db = require("../utils/db");

//Hàm trả về tất cả các tag trên database
module.exports.allTag = ()=>{
    return db.load(`SELECT * FROM tag`);
}

//Hàm thêm vào danh sách tag cho product | input: ID sản phẩm, mảng tag
module.exports.addTagForProduct = (productID,tags)=>{
    tags.forEach(element => {
        //Tạo entity 
        var entity = {
            PRODUCTID:productID,
            TAGID:element
        };

        //gọi hàm insert
        db.add('product_tag',entity);
    });
}