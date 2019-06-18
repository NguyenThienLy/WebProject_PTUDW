// Cập nhật trạng thái đơn hàng khi xác nhận
$(".post_update_order_status_confirm").click(function() {
  var orderInfoID = $("#order_id").text();

  $.ajax({
    type: "POST",
    url: "/admin/order/order-update-status",
    data: { OrderInfoID: orderInfoID, OrderStatusID: 2 },
    success: function(data) {
      if (data) {
        //load lại trang
        window.location.href = location.href;
      }
    }
  });
});

// Cập nhật trạng thái đơn hàng khi bấm đã giao
$(".post_update_order_status_done").click(function() {
  var orderInfoID = $("#order_id").text();

  $.ajax({
    type: "POST",
    url: "/admin/order/order-update-status",
    data: { OrderInfoID: orderInfoID, OrderStatusID: 3 },
    success: function(data) {
      if (data) {
        //load lại trang
        window.location.href = location.href;
      }
    }
  });
});

// Cập nhật trạng thái đơn hàng khi bấm hủy
$(".post_cancel_order").click(function() {
  var orderInfoID = $("#order_id").text();

  $.ajax({
    type: "POST",
    url: "/admin/order/order-update-status",
    data: { OrderInfoID: orderInfoID, OrderStatusID: 4 },
    success: function(data) {
      if (data) {
        //load lại trang
        window.location.href = location.href;
      }
    }
  });
});

// Xóa đơn hàng
$(".post_delete_order").click(function() {
  var deleteOrderInfoID = $("#order_id").text();

  $.ajax({
    type: "POST",
    url: "/admin/order/order-delete",
    data: { OrderInfoID: deleteOrderInfoID },
    success: function(data) {
      if (data) {
        //load lại trang
        window.location.href = "/admin/order/order-show";
      } else {
        $(".alert_modal").click();
      }
    }
  });
});
