$("#from_date").datetimepicker({
  format: "d/m/Y",
  timepicker: false,
  mask: false
});

$("#to_date").datetimepicker({
  format: "d/m/Y",
  timepicker: false,
  mask: false
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

//Tìm kiếm
$("#btn_search").click(function() {
  var inputName = $("#name").val();
  var inputFromDate = $("#from_date").val();
  var inputToDate = $("#to_date").val();
  var selectedOrderStatus = $("#OrderStatus")
    .children("option:selected")
    .val();

  var query = CreateQuery(
    inputName,
    inputFromDate,
    inputToDate,
    selectedOrderStatus
  );
  var base_url =
    location.protocol + "//" + document.domain + ":" + location.port;
  if (query != "") {
    //Chuyển trang
    window.location = base_url + `/admin/order/order-show?${query}`;
  } else {
    window.location = base_url + `/admin/order/order-show`;
  }
});

function CreateQuery(name, fromDate, toDate, orderStatus) {
  var data = {
    name: name,
    fromDate: fromDate,
    toDate: toDate,
    orderStatus: orderStatus
  };

  return encodeQueryData(data);
}

function encodeQueryData(data) {
  const ret = [];
  for (let d in data)
    if (data[d] != 0) {
      ret.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
    }
  return ret.join("&");
}
