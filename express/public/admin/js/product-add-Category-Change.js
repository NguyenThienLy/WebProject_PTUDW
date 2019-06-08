$('#selectProductType').on('change', function () {
    var base_url = location.protocol +"//"+document.domain+":"+location.port;
    $.post(base_url+"/admin/product/load-subcategory", { CategoryID: this.value }, function (data) {
        reloadSubCategory(JSON.parse(data));
    });
})

function reloadSubCategory(data){
    var option="";
    for(var i = 0;i<data.length;i++){
        option += `<option value="${data[i].ID}">${data[i].NAME}</option>`;
    }
    $('#SubCategory').html(option);
}
