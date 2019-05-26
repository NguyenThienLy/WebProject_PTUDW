// filter product show
$(".component-open-filter").click(function(e) {
  e.stopPropagation();
  $(".side-filter").toggleClass("show-filter");
  $(".bg-over-lay").css("display", "block");
});

$("#mySideFilter").click(function(e) {
  e.stopPropagation();
});

$("body,html").click(function(e) {
  $(".side-filter").removeClass("show-filter");
  $(".bg-over-lay").css("display", "none");
});

// for (var i = 0; i < 10; i++) {
//   $("#filter-category-show-collapse-"+ i.toString()).on("click", function(e) {
//     $("#filter-category-collapse-"+ i.toString()).collapse("toggle");
//   });
// }
$("#filter-category-show-collapse-1").on("click", function(e) {
  $("#filter-category-collapse-1").collapse("toggle");
});

$("#filter-category-show-collapse-2").on("click", function(e) {
  $("#filter-category-collapse-2").collapse("toggle");
});

$("#filter-category-show-collapse-3").on("click", function(e) {
  $("#filter-category-collapse-3").collapse("toggle");
});

$("#filter-category-show-collapse-4").on("click", function(e) {
  $("#filter-category-collapse-4").collapse("toggle");
});

$("#filter-category-show-collapse-5").on("click", function(e) {
  $("#filter-category-collapse-5").collapse("toggle");
});

// var show_collapse = [
//   "#filter-category-show-collapse-1",
//   "#filter-category-show-collapse-2",
//   "#filter-category-show-collapse-3",
//   "#filter-category-show-collapse-4",
//   "#filter-category-show-collapse-5",
//   "#filter-category-show-collapse-6"
// ];

// console.log(show_collapse);

// var collapse = [
//   "#filter-category-collapse-1",
//   "#filter-category-collapse-2",
//   "#filter-category-collapse-3",
//   "#filter-category-collapse-4",
//   "#filter-category-collapse-5",
//   "#filter-category-collapse-6"
// ];

// console.log(collapse);

// for (var i = 0; i < 10; i++) {
//   $(show_collapse[i]).on("click", function(e) {
//     $(collapse[i]).collapse("toggle");
//   });
// }

// filter product show
