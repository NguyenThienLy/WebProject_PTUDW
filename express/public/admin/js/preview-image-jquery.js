
document.getElementById('get_image_file_' + 1).onclick = function () {
    document.getElementById('image_file_' + 1).click();
};

//Bắt sự kiện click ở button remove
$("#remove_file_"+1).click(() => {
    removeFile(1);
});

//Bắt sự kiện thay đổi file khi chọn
$("#image_file_"+1).change(function () {
    filePreview(this, 1);
});


document.getElementById('get_image_file_' + 2).onclick = function () {
    document.getElementById('image_file_' + 2).click();
};

//Bắt sự kiện click ở button remove
$("#remove_file_"+2).click(() => {
    removeFile(2);
});

//Bắt sự kiện thay đổi file khi chọn
$("#image_file_"+2).change(function () {
    filePreview(this, 2);
});


document.getElementById('get_image_file_' + 3).onclick = function () {
    document.getElementById('image_file_' + 3).click();
};

//Bắt sự kiện click ở button remove
$("#remove_file_"+3).click(() => {
    removeFile(3);
});

//Bắt sự kiện thay đổi file khi chọn
$("#image_file_"+3).change(function () {
    filePreview(this, 3);
});


document.getElementById('get_image_file_' + 4).onclick = function () {
    document.getElementById('image_file_' + 4).click();
};

//Bắt sự kiện click ở button remove
$("#remove_file_"+4).click(() => {
    removeFile(4);
});

//Bắt sự kiện thay đổi file khi chọn
$("#image_file_"+4).change(function () {
    filePreview(this, 4);
});


document.getElementById('get_image_file_' + 5).onclick = function () {
    document.getElementById('image_file_' + 5).click();
};

//Bắt sự kiện click ở button remove
$("#remove_file_"+5).click(() => {
    removeFile(5);
});

//Bắt sự kiện thay đổi file khi chọn
$("#image_file_"+5).change(function () {
    filePreview(this, 5);
});

//Hàm remove file và đổi lại đường dẫn ảnh
function removeFile(id){
    $('#image_file_'+id).val("");
    //Đổi lại đường dẫn hình
    $('#image_'+id).attr('src', '/uploads/IMG_NOTFOUND.jpg');
}

//Hàm load ảnh lên bằng FilReader
function filePreview(input,id) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            //Thay đổi đường dẫn file
            $('#image_'+id).attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
}

$("#selectProductType").change(()=>{
   // alert($("#selectProductType").val());
    
});

