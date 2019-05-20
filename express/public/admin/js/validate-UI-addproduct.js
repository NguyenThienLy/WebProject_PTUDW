

$("#btn-submit-form").on("click",function(){

    
    
    alert(content);
    
    // if(validateTextArea()==true){
    //     alert('fsfs');
    //     $('#alert-content').alert('close');
    // }else{
    //     $('#alert-content').alert();
    // }
});

//Hàm kiểm tra các trường đã được thêm đầy đủ vào UI hay chưa | Chỉ kiểm tra đối với area và hình ảnh
function validateTextArea() {
    
    var content = $("iframe").contents().find("body").text();
}
