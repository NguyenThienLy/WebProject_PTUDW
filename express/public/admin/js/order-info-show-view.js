$("#from-date").datetimepicker({
  format: "d/m/Y",
  timepicker: false,
  mask: true
});

$("#to-date").datetimepicker({
  format: "d/m/Y",
  timepicker: false,
  mask: true
});

// Xóa đơn hàng
$(".post_delete_order").click(function() {
  var deleteOrderInfoID = $(this).attr("id");

  $.ajax({
    type: "POST",
    url: "/admin/order/order-delete",
    data: { OrderInfoID: deleteOrderInfoID },
    success: function(data) {
      if (data) {
        //load lại trang
        window.location.href = location.href;
      } else {
        $(".alert_modal").click();
      }
    }
  });
});
