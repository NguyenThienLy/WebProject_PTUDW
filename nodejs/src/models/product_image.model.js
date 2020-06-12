// Lấy database
var db = require("../utils/db");

//Hàm thêm vào list hình ảnh của sản phẩm vào database | input: ID sản phẩm, mảng link hình
module.exports.addImagesForProduct = (productID, images) => {
    //Duyệt mảng và insert
    images.forEach(link => {
        //tạo entity
        var productImage = {
            LINK: link,
            PRODUCTID: productID
        };
        //Thêm vào database
        db.add('product_image', productImage);
    });
}

// Hàm lấy ra list image product theo id
module.exports.topNProductImageFollowIdPro = (productID, N) =>{
    return db.load(`SELECT * FROM product_image WHERE PRODUCTID = ${productID} LIMIT ${N}`);
}

module.exports.deleteProductImageByProductID = productID => {
    return db.delete('product_image', 'PRODUCTID', productID);
}

//Hàm lấy ra list hình ảnh sản phẩm của product
module.exports.allImageOfProduct= (productID)=>{
    return db.load(`SELECT product_image.LINK
            FROM product_image
            WHERE product_image.PRODUCTID = ${productID}`);
}