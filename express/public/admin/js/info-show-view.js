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
          alert("Không thể xóa bài viết!");
        }
      }
    });
  });