// Xóa danh mục
$(".post_delete_category").click(function() {
  var deleteCategoryID = $(this).attr("id");

  $.ajax({
    type: "POST",
    url: "/admin/category/category-delete",
    data: { CategoryID: deleteCategoryID },
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