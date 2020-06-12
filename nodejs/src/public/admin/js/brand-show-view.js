$(".post_add_brand").click(function() {
  var newBrandName = $("#inputNewBrandName").val();

  if (newBrandName.trim() !== "") {
    $.ajax({
      type: "POST",
      url: "/admin/brand/brand-add",
      data: { BrandName: newBrandName },
      success: function(data) {
        if (data) {
          //load lại trang
          window.location.href = location.href;
        } else {
          $('.cannotRemoveModalMessage').text('Không thể thêm thương hiệu');
          $(".alert_modal").click();
        }
      }
    });
  } else {
    $("#inputNewBrandName").addClass("is-invalid");
    $("#inputNewBrandName").focus();
  }
});

// Xóa thương hiệu
$(".post_delete_brand").click(function() {
  var deleteBrandID = $(this).attr("id");

  $.ajax({
    type: "POST",
    url: "/admin/brand/brand-delete",
    data: { BrandID: deleteBrandID },
    success: function(data) {
      if (data) {
        //load lại trang
        window.location.href = location.href;
      } else {
        $('.cannotRemoveModalMessage').text('Không thể xóa thương hiệu');
        $(".alert_modal").click();
      }
    }
  });
});

// Xóa thương hiệu
$(".post_modal_delete_brand").click(function() {
  var deleteBrandID = $("#modal-brand-id").text();

  $.ajax({
    type: "POST",
    url: "/admin/brand/brand-delete",
    data: { BrandID: deleteBrandID },
    success: function(data) {
      if (data) {
        //load lại trang
        window.location.href = location.href;
      } else {
        $("#alert-delete-brand").remove();
        var alert =
          '<div class="alert alert-warning alert-dismissible fade show" id="alert-delete-brand" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>Không thể xóa thương hiệu</div>';
        $("#modal-id").prepend(alert);
      }
    }
  });
});

// Cập nhật brand name
$(".post_brand_name_update").click(function() {
  var updateBrandName = $("#inputBrandName").val();
  var brandId = $("#modal-brand-id").text();

  $.ajax({
    type: "POST",
    url: "/admin/brand/brand-name-update",
    data: { BrandID: brandId, UpdateBrandName: updateBrandName },
    success: function(data) {
      if (data) {
        $("#inputBrandName").val(updateBrandName);

        $("#alert-update-brand-name").remove();
        var alert =
          '<div class="alert alert-success alert-dismissible fade show" id="alert-update-brand-name" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>Cập nhật tên thương hiệu thành công</div>';
        $("#modal-id").prepend(alert);
      } else {
        $("#alert-update-brand-name").remove();
        var alert =
          '<div class="alert alert-warning alert-dismissible fade show" id="alert-update-brand-name" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>Cập nhật tên thương hiệu thất bại</div>';
        $("#modal-id").prepend(alert);
      }
    }
  });
});

$(".post_modal_get_info").click(function() {
  var brandId = $(this).attr("id");

  $.ajax({
    type: "POST",
    url: "/admin/brand/brand-info",
    data: { BrandID: brandId },
    success: function(data) {
      var brand = data.brand;
      $("#modal-brand-id").text(brand.ID);
      $("#inputBrandName").val(brand.NAME);

      $("#alert-update-brand-name").remove();
      $("#alert-delete-brand").remove();
    }
  });
});

$("#brandDetailModal").on("hidden.bs.modal", function(e) {
  //load lại trang
  window.location.href = location.href;
});

//Tìm kiếm
$("#btn_search").click(function() {
  var inputName = $("#name").val();

  var query = CreateQuery(inputName);
  var base_url =
    location.protocol + "//" + document.domain + ":" + location.port;
  if (query != "") {
    //Chuyển trang
    window.location = base_url + `/admin/brand/brand-show?${query}`;
  } else {
    window.location = base_url + `/admin/brand/brand-show`;
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
