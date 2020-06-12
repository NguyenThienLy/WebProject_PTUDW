// Định dạng các trạng thái của đơn hàng
module.exports = function(statusId) {
    var button = "";

    if (statusId === 1) {
        button += "<button type='button' class='btn btn-warning pl-3 pr-3 mr-3 post_update_order_status_confirm'>Xác nhận</button>";
        button += "<button type='button' class='btn btn-danger pl-3 pr-3 mr-3 post_cancel_order'>Hủy đơn</button>";
    } else if (statusId === 2) {
        button += "<button type='button' class='btn btn-success pl-3 pr-3 mr-3 post_update_order_status_done'>Đã giao</button>";
        button += "<button type='button' class='btn btn-danger pl-3 pr-3 mr-3 post_cancel_order'>Hủy đơn</button>";
    } else if (statusId === 3) {
        button += "<button type='button' class='btn btn-danger pl-3 pr-3 mr-3 post_delete_order'>Xóa</button>";
    } else {
        button += "<button type='button' class='btn btn-danger pl-3 pr-3 mr-3 post_delete_order'>Xóa</button>";
    }
  
    return (button);
  };