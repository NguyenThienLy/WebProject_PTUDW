// Lấy database
var db = require("../utils/db");

//Hàm thêm vào lịch sử lúc tạo mới của sản phẩm | input : ID sản phẩm
module.exports.addCreatedHistory = (productID,ACTION,DETAIL) =>{
    //Tạo  đối tượng
    var entity = {
        PRODUCTID:productID,
        CREATED:getDateNow(),
        ACTION:ACTION,
        DETAIL:DETAIL
    };
    //Thêm
    return db.add('product_info_history',entity);
}

module.exports.deleteProductHistory= productID=>{
    return db.delete('product_info_history','PRODUCTID',productID);
}

//Hàm trả về thời gian hiện tại
function getDateNow(){
    var today = new Date();
    var dd = today.getDate();

    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }

    if (mm < 10) {
        mm = '0' + mm;
    }
    today = yyyy + '-' + mm + '-' + dd;
    return today;
}