var db = require("../utils/db");

// hàm lấy ra danh sách tất cả comments
module.exports.addOrderDetail = (orderDetail) => {
    return db.add("order_detail", orderDetail);
};