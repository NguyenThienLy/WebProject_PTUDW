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