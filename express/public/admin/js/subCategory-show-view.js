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