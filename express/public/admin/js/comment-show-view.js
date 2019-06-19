// Xóa bình luận
$(".post_delete_comment").click(function() {
  var deleteCommentID = $(this).attr("id");

  $.ajax({
    type: "POST",
    url: "/admin/comment/product-comment-delete",
    data: { CommentID: deleteCommentID },
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
$("#btn_search_simple").click(function() {
  var inputName = $("#name").val();
  var product_id = $("#product_id").val();

  var query = CreateQuery(inputName);
  var base_url =
    location.protocol + "//" + document.domain + ":" + location.port;
  if (query != "") {
    //Chuyển trang
    window.location = base_url + `/admin/comment/product-comment-simple/${product_id}?${query}`;
  } else {
    window.location = base_url + `/admin/comment/product-comment-simple/${product_id}`;
  }
});

//Tìm kiếm
$("#btn_search_combo").click(function() {
  var inputName = $("#name").val();
  var productCombo_id = $("#productCombo_id").val();

  var query = CreateQuery(inputName);
  var base_url =
    location.protocol + "//" + document.domain + ":" + location.port;
  if (query != "") {
    //Chuyển trang
    window.location = base_url + `/admin/comment/product-comment-combo/${productCombo_id}?${query}`;
  } else {
    window.location = base_url + `/admin/comment/product-comment-combo/${productCombo_id}`;
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