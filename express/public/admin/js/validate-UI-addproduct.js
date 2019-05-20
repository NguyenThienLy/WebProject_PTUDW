

//Đóng thông báo lỗi lần đầu chạy
$('#alert-content').hide("fast");
$('#alert-image').hide("fast");
$('#alert-number').hide("fast");


//Kiểm tra dữ liệu từ ô nhập liệu trước khi submit
$("#add-product-form").on("submit", function () {
    return validateTextArea() && validateNumber();
});


$("#btn-submit-form").on("click", function () {

    if (validateTextArea() == true && validateImages() == true) {

    } else {

    }
});


//Hàm kiểm tra số lượng nhập đúng loại
function validateNumber() {
    if ($('input[name=KILOGRAM]').val() <= 0 || $('input[name=INVENTORY]').val() <= 0 ||
        $('input[name=PRICE]').val() <= 0 || $('input[name=SALE]').val() < 0 || $('input[name=SALE]').val() > 100
        ) {
        $('#alert-number').show("slow");
        // Number.isInteger($('input[name=INVENTORY]').val()) == false
        
        return false;
    } else {
        $('#alert-number').hide("fast");
        return true;
    }
}

//Hàm kiểm tra số lượng hình đã đủ hay chưa
function validateImages() {
    if ($("#image_file_1").val() == '' || $("#image_file_2").val() == '' ||
        $("#image_file_3").val() == '' || $("#image_file_4").val() == '' || $("#image_file_5").val() == '') {
        $('#alert-image').show("slow");
        
        return false;
    }
    else {
        $('#alert-image').hide("fast");
        return true;
    }
}

//Hàm kiểm tra các trường đã được thêm đầy đủ vào UI hay chưa | Chỉ kiểm tra đối với area và hình ảnh
function validateTextArea() {

    //Lấy ra text từ người dùng
    var content = $("iframe").contents().find("body").text();

    if (content == "") {
        //Thông báo lỗi cho người dùng
        $('#alert-content').show("slow");
        
        return false;
    } else {
        //Đóng thông báo lỗi
        $('#alert-content').hide("fast");
        return true;
    }
}
