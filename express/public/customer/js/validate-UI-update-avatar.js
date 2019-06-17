
jQuery.validator.addMethod("comparisonIMAGE", function (value, element) {
    var numberFile = $("#user-avatar").get(0).files.length;
    if (numberFile != 1) {
        return false;
    } else {
        return true;
    }
});

$("#frmupdate-avatar").validate({
    ignore: [],
    rules: {
        USER_IMAGE: {
            comparisonIMAGE: true
        }
    },
    messages: {
        USER_IMAGE: {
            comparisonIMAGE: "Vui lòng chọn hình"
        }
    },
    errorElement: "small",
    errorClass: "help-block text-danger is-invalid",
    validClass: "is-valid",
    submitHandler: function (form) {
        var formData = new FormData($(form)[0]);
        $.ajax({
            url: "/customer/auth/update-image",
            type: "POST",
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            enctype: "multipart/form-data",
            processData: false,
            success: function (result) {
                var jsonResult = JSON.parse(result);
                if (jsonResult.valid == true) {
                    //Cập nhật ảnh đại diện
                    updateAvatar(jsonResult.image);
                    //Ẩn modal
                    $("#update-Image-modal").modal('hide');
                }
                else {
                    //Thông báo lỗi
                }
            }
        });
    }
});

//Cập nhật lại các ảnh đại diện
function updateAvatar(image) {
    $('#customer-image_1').attr('src',image);
    $('#customer-image_2').attr('src',image);
    $('#customer-image_3').attr('src',image);
}

//Hiện modal
$("#header-edit-info-modal-avatar").click(function () {

    $('#user-avatar').fileinput({
        theme: 'fa',
        dropZoneEnabled: true,
        allowedFileExtensions: ['png', 'jpg', 'jpeg'],
        uploadUrl: '/uploads/input-file-upload',
        uploadAsync: false,
        showUpload: false,
        showRemove: false,
        maxFileCount: 1,
        required: true,
        validateInitialCount: true,
        overwriteInitial: false,
        "fileActionSettings": {
            "showUpload": false
        },
        browseLabel: "Chọn hình",
        uploadTitle: "Chọn hình",
        dropZoneTitle: "Kéo và thả hình vào đây"
    });

    $("#update-Image-modal").modal();
});
