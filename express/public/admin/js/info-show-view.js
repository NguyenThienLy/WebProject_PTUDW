// Xóa sản phẩm combo
$(".post_delete_info").click(function() {
  var deleteInfoID = $(this).attr("id");

  $.ajax({
    type: "POST",
    url: "/admin/info/info-delete",
    data: { InfoID: deleteInfoID },
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

  var query = CreateQuery(inputName);
  var base_url =
    location.protocol + "//" + document.domain + ":" + location.port;
  if (query != "") {
    //Chuyển trang
    window.location = base_url + `/admin/info/info-show?${query}`;
  } else {
    window.location = base_url + `/admin/info/info-show`;
  }
});

function CreateQuery(name) {
  var data = {
    name: name
  };

  return encodeQueryData(data);
}

function encodeQueryData(data) {
    const ret = [];
    for (let d in data)
        if (data[d] != 0) {
            ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
        }
    return ret.join('&');
}
