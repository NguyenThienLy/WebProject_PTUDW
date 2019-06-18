// Xóa danh mục con
$(".post_delete_subCategory").click(function() {
    var deleteSubCategoryID = $(this).attr("id");
  
    $.ajax({
      type: "POST",
      url: "/admin/subCategory/subCategory-delete",
      data: { SubCategoryID: deleteSubCategoryID },
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
    window.location = base_url + `/admin/subCategory/subCategory-show?${query}`;
  } else {
    window.location = base_url + `/admin/subCategory/subCategory-show`;
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
