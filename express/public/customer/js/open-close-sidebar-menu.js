// sidebar menu
$("#dropdown-icon").click(function() {
  $(".transform").toggleClass("transform-active");

  if ($(".transform").hasClass("transform-active")) {
    $("#dropdown-icon").removeClass("transform-left");
    $("#dropdown-icon").addClass("transform-down");
  } else {
    $("#dropdown-icon").removeClass("transform-down");
    $("#dropdown-icon").addClass("transform-left");
  }
});

$("#sub-dropdown-icon").click(function() {
  $(".sub-transform").toggleClass("transform-active");

  if ($(".sub-transform").hasClass("transform-active")) {
    $("#sub-dropdown-icon").removeClass("transform-left");
    $("#sub-dropdown-icon").addClass("transform-down");
  } else {
    $("#sub-dropdown-icon").removeClass("transform-down");
    $("#sub-dropdown-icon").addClass("transform-left");
  }
});

$("#side-bar-open-header-user-modal").on("click",function(e){
  e.preventDefault();
  $('#header-user-modal').modal('show');
});

$(".open-sidebar").click(function(e) {
  e.stopPropagation();
  $(".side-bar").toggleClass("show-menu");
  $(".bg-over-lay").css("display", "block");
});

$("#mySidenav").click(function(e) {
  e.stopPropagation();
});

$("body,html").click(function(e) {
  $(".side-bar").removeClass("show-menu");
  $(".bg-over-lay").css("display", "none");
});

$(window).on('resize', function() {
  var win = $(this);
  if (win.outerWidth() > 992) {
    if($(".side-bar").hasClass("show-menu")) {
     $(".side-bar").removeClass("show-menu");
     $(".bg-over-lay").css("display", "none");
    }
   }
});
// sidebar menu
