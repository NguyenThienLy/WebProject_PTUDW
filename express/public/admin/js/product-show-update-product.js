$(".get_update").click(function(){
    var get_id = $(this).attr("get_id");
    var base_url = location.protocol +"//"+document.domain+":"+location.port;

    //Chuyển trang
    window.location = base_url+`/admin/product/product-update/${get_id}`;
});