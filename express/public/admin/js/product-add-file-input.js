$(function () {
    $('#product-image').fileinput({
      theme: 'fa',
      dropZoneEnabled: true,
      allowedFileExtensions: ['png', 'jpg', 'gif'],
      uploadUrl: '/uploads/input-file-upload',
      uploadAsync: false,
      showUpload:false,
      showRemove:false,
      maxFileCount:5,
      required: true,
      validateInitialCount: true,
      overwriteInitial:false,
      "fileActionSettings":{
        "showUpload":false
      },
      browseLabel:"Chọn hình",
      uploadTitle:"Chọn hình",
      dropZoneTitle:"Kéo và thả hình vào đây"
    });
  })