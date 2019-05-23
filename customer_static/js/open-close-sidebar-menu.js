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
  $(".side-bar").removeClass("show-menu");
  $(".bg-over-lay").css("display", "none");
});
// sidebar menu
