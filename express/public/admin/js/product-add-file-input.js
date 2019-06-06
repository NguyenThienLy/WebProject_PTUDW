$(function () {
    $('#product-image').fileinput({
      theme: 'fa',
      dropZoneEnabled: true,
      allowedFileExtensions: ['png', 'jpg', 'gif'],
      uploadUrl: '/uploads/input-file-upload',
      uploadAsync: false,
    });
  })