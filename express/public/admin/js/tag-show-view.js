$(".post_add_tag").click(function() {
  var newTagName = $("#inputNewTagName").val();

  if (newTagName.trim() !== "") {
    $.ajax({
      type: "POST",
      url: "/admin/tag/tag-add",
      data: { TagName: newTagName },
      success: function(data) {
        if (data) {
          //load lại trang
          window.location.href = location.href;
        } else {
          $('.cannotRemoveModalMessage').text('Không thể thêm tag');
          $(".alert_modal").click();
        }
      }
    });
  } else {
    $("#inputNewTagName").addClass("is-invalid");
    $("#inputNewTagName").focus();
  }
});

// Xóa sản phẩm simple
$(".post_delete_tag").click(function() {
  var deleteTagID = $(this).attr("id");

  $.ajax({
    type: "POST",
    url: "/admin/tag/tag-delete",
    data: { TagID: deleteTagID },
    success: function(data) {
      if (data) {
        //load lại trang
        window.location.href = location.href;
      } else {
        $('.cannotRemoveModalMessage').text('Không thể xóa tag');
        $(".alert_modal").click();
      }
    }
  });
});

// Xóa sản phẩm simple
$(".post_modal_delete_tag").click(function() {
  var deleteTagID = $("#modal-tag-id").text();

  $.ajax({
    type: "POST",
    url: "/admin/tag/tag-delete",
    data: { TagID: deleteTagID },
    success: function(data) {
      if (data) {
        //load lại trang
        window.location.href = location.href;
      } else {
        $("#alert-delete-tag").remove();
        var alert =
          '<div class="alert alert-warning alert-dismissible fade show" id="alert-delete-tag" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>Không thể xóa tag</div>';
        $("#modal-id").prepend(alert);
      }
    }
  });
});

// Cập nhật tag name
$(".post_tag_name_update").click(function() {
  var updateTagName = $("#inputTagName").val();
  var tagId = $("#modal-tag-id").text();

  $.ajax({
    type: "POST",
    url: "/admin/tag/tag-name-update",
    data: { TagID: tagId, UpdateTagName: updateTagName },
    success: function(data) {
      if (data) {
        $("#inputTagName").val(updateTagName);

        $("#alert-update-tag-name").remove();
        var alert =
          '<div class="alert alert-success alert-dismissible fade show" id="alert-update-tag-name" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>Cập nhật tên tag thành công</div>';
        $("#modal-id").prepend(alert);
      } else {
        $("#alert-update-tag-name").remove();
        var alert =
          '<div class="alert alert-warning alert-dismissible fade show" id="alert-update-tag-name" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>Cập nhật tên tag thất bại</div>';
        $("#modal-id").prepend(alert);
      }
    }
  });
});

$(".post_modal_get_info").click(function() {
  var tagId = $(this).attr("id");

  $.ajax({
    type: "POST",
    url: "/admin/tag/tag-info",
    data: { TagID: tagId },
    success: function(data) {
      var tag = data.tag;
      $("#modal-tag-id").text(tag.ID);
      $("#inputTagName").val(tag.NAME);

      $("#alert-update-tag-name").remove();
      $("#alert-delete-tag").remove();
    }
  });
});

$("#tagDetailModal").on("hidden.bs.modal", function(e) {
  //load lại trang
  window.location.href = location.href;
});
