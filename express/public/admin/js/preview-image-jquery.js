
//Cài sự kiện khi bấm vào 
document.getElementById('get_file').onclick = function() {
    document.getElementById('my_file').click();
};

//Bắt sự kiện click ở button remove
$("#remove_file").click(() =>{
    removeFile(); 
});

//Bắt sự kiện thay đổi file khi chọn
$("#my_file").change(function () {
    filePreview(this);
});

//Hàm remove file và đổi lại đường dẫn ảnh
function removeFile(){
    $('#my_file').val("");
    //Đổi lại đường dẫn hình
    $('#avatar_product').attr('src', '/uploads/IMG_NOTFOUND.jpg');
}

//Hàm load ảnh lên bằng FilReader
function filePreview(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            //Thay đổi đường dẫn file
            $('#avatar_product').attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
}