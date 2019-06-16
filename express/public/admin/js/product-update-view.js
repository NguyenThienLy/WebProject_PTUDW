//Lấy id khi đang load
var productID = 0;

$(document).ready(function() {
  productID = getProductIDFromUrl();

  var base_url =
    location.protocol + "//" + document.domain + ":" + location.port;
  $.post(
    base_url + "/admin/product/product-update/get-images",
    { productID: productID },
    function(data) {
      initInputFile(JSON.parse(data));
    }
  );
});

$("#selectProductType").on("change", function() {
  var base_url =
    location.protocol + "//" + document.domain + ":" + location.port;
  $.post(
    base_url + "/admin/product/load-subcategory",
    { CategoryID: this.value },
    function(data) {
      reloadSubCategory(JSON.parse(data));
    }
  );
});

function reloadSubCategory(data) {
  var option = "";
  for (var i = 0; i < data.length; i++) {
    option += `<option value="${data[i].ID}">${data[i].NAME}</option>`;
  }
  $("#SubCategory").html(option);
}

//Lấy id sản phẩm từ url
function getProductIDFromUrl() {
  var url = window.location.href;
  return url.substring(url.lastIndexOf("/") + 1);
}

//Lấy ra ảnh và thêm vào trong inputfile
function initInputFile(ListUrls) {
  //Khởi tạo mảng hình
  var arrImages = [];
  ListUrls.forEach(image => {
    arrImages.push(image.LINK);
  });

  $("#product-image").fileinput({
    theme: "fa",
    dropZoneEnabled: true,
    allowedFileExtensions: ["png", "jpg", "jpeg", "gif"],
    uploadUrl: "/uploads/input-file-upload",
    uploadAsync: false,
    showUpload: false,
    showRemove: false,
    maxFileCount: 5,
    required: true,
    validateInitialCount: true,
    overwriteInitial: true,
    fileActionSettings: {
      showUpload: false
    },
    browseLabel: "Chọn hình",
    uploadTitle: "Chọn hình",
    dropZoneTitle: "Kéo và thả hình vào đây",
    initialPreview: arrImages,
    initialPreviewFileType: "image",
    initialPreviewAsData: true
  });
}
