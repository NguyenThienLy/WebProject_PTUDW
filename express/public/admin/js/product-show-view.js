$(function() {
  $("#switchType").prop("checked", false);

  $("#labelType").html("Sản phẩm thường");
  $("#product-simple-content").show();
  $("#product-combo-content").hide();
});

$("#switchType").on("change", function() {
  if (this.checked) {
    $("#labelType").html("Sản phẩm combo");
    $("#product-combo-content").show();
    $("#product-simple-content").hide();
  } else {
    $("#labelType").html("Sản phẩm thường");
    $("#product-simple-content").show();
    $("#product-combo-content").hide();
  }
});

$(".post_delete_combo").click(function() {
  var deletedComboID = $(this).attr("id");

  $.ajax({
    type: "POST",
    url: "/admin/product/product-combo-delete",
    data: { ProductComboID: deletedComboID },
    success: function(data) {
      if (data) {
        //load lại trang
        window.location.href = location.href;
      } else {
        alert("Không được xóa sản phẩm!");
      }
    }
  });
});
