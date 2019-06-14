$(".btn-add-new-tag").click(function(e) {
  var newTagName = $("#inputAddNewTag").val();
  e.preventDefault();

  if (newTagName.trim() !== "") {
    $.ajax({
      type: "POST",
      url: "/admin/info/info-add-tag",
      data: { TagName: newTagName },
      success: function(data) {
        $("#selectTag").append(
          $("<option>", {
            value: data.ID,
            text: data.NAME
          })
        );

        $("#selectTag").trigger("chosen:updated");

        $("#alert-add-tag").remove();
        var alert =
          '<div class="alert alert-success alert-dismissible fade show" id="alert-add-tag" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>Thêm tag mới thành công</div>';
        $("#lblAddNewTag").prepend(alert);
        $('#inputAddNewTag').removeClass('is-invalid');
        $("#inputAddNewTag").val("");
        $("#inputAddNewTag").focus();
      }
    });
  } else {
    $("#alert-add-tag").remove();
    var alert =
      '<div class="alert alert-warning alert-dismissible fade show" id="alert-add-tag" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>Vui lòng nhập tên tag</div>';
    $("#lblAddNewTag").prepend(alert);
    $('#inputAddNewTag').addClass('is-invalid');
    $("#inputAddNewTag").focus();
  }
});
