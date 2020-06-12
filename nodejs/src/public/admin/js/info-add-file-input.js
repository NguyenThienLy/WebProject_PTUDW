$(function () {
    $('#info-image').fileinput({
      theme: 'fa',
      dropZoneEnabled: true,
      allowedFileExtensions: ['png', 'jpg', 'jpeg', 'gif'],
      uploadUrl: '/uploads/input-file-upload/', // route điều khiển
      uploadAsync: false,
      showUpload:false,
      showRemove:false,
      maxFileCount:1,
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