$(".post_delete").click(function(){
    var post_id = $(this).attr("post_id");
    var base_url = location.protocol +"//"+document.domain+":"+location.port;
    $.post(base_url+"/admin/product/product-show/delete", { ProductID: post_id }, function (data) {
        if(data){
            //load lại trang
            location.reload();
        }
        else{
            alert("Sản phẩm này không xóa được!");
        }
    });
});