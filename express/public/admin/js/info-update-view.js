//Lấy id khi đang load
var infoID = 0;

$(document).ready(function() {
  infoID = getInfoIDFromUrl();

  $.ajax({
    type: "POST",
    url: "/admin/info/info-update/get-image",
    data: { infoID: infoID },
    success: function(data) {
      initInputFile(JSON.parse(data));
    }
  });
});

//Lấy id sản phẩm từ url
function getInfoIDFromUrl() {
  var url = window.location.href;
  return url.substring(url.lastIndexOf("/") + 1);
}

//Lấy ra ảnh và thêm vào trong inputfile
function initInputFile(imageLink) {
  $("#info-image").fileinput({
    theme: "fa",
    dropZoneEnabled: true,
    allowedFileExtensions: ["png", "jpg", "jpeg", "gif"],
    uploadUrl: "/uploads/input-file-upload",
    uploadAsync: false,
    showUpload: false,
    showRemove: false,
    maxFileCount: 1,
    required: true,
    validateInitialCount: true,
    overwriteInitial: true,
    fileActionSettings: {
      showUpload: false
    },
    browseLabel: "Chọn hình",
    uploadTitle: "Chọn hình",
    dropZoneTitle: "Kéo và thả hình vào đây",
    initialPreview: imageLink,
    initialPreviewFileType: "image",
    initialPreviewAsData: true
  });
}


