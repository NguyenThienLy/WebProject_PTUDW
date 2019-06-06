$(function () {
    $('#list-image').fileinput({
      theme: 'fa',
      dropZoneEnabled: false,
      allowedFileExtensions: ['png', 'jpg', 'gif'],
      uploadUrl: '/uploads/input-file-upload',
      uploadAsync: false,
    });
  })