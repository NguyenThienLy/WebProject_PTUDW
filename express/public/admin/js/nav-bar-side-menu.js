
var isHidden = true;

$(document).ready(function(){
    $('[data-toggle="offcanvas"]').click(function(){
        if(isHidden==true){
            //Đổi thuộc tính của menu
            $('#side-menu').removeClass("d-none d-sm-none").addClass("d-block d-sm-block");
            $('#side-menu-temp').removeClass("d-none d-sm-none").addClass("d-block d-sm-block");

            //Đổi thuộc tính của cột còn lại
            $('#col-content').removeClass("col-12 col-sm-12").addClass("col-10 col-sm-11");
            isHidden=false;
        }
        else{
            $('#side-menu').removeClass("d-block d-sm-block").addClass("d-none d-sm-none");
            $('#side-menu-temp').removeClass("d-block d-sm-block").addClass("d-none d-sm-none");

            //Đổi thuộc tính của cột còn lại
            $('#col-content').removeClass("col-10 col-sm-11").addClass("col-12 col-sm-12");
            isHidden=true;
        }       
    });
});

