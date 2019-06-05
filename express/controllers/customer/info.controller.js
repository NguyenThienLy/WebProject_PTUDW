//Gọi newsModel
var newsModel = require("../../models/news.model");

// Gọi formatStringHelper
var formatStringHelper = require("../../helpers/format_string_hide.helper");
// Gọi convertToDateHelper
var convertToDateHelper = require("../../helpers/convert_to_date.helper");

// Loại sắp xếp
var typeSort = 0;

// Mảng sort của product show
var typeSortArray = [
  { selected: false, name: "Tin mới nhất", value: 0 },
  { selected: false, name: "Tin cũ nhất", value: 1 },
  { selected: false, name: "Đọc nhiều nhất", value: 2 },
  { selected: false, name: "Đọc ít nhất", value: 3 }
];

function funcTypeSort(req) {
  // Lấy giá trị của radio hoặc select tùy theo responsive
  typeSort = +req.body.radioSortInfoShow;

  // Nếu typeSort là NaN thì gán mặc định bằng 0
  if (isNaN(typeSort) == true) typeSort = 0;

  // Phục hồi checked = false
  for (type of typeSortArray) type.selected = false;
  // Gán radio đó dược checked
  typeSortArray[typeSort].selected = true;
}

module.exports.infoDetail = function(req, res) {
  res.render("customer/info-detail", { layout: "main-customer.hbs" });
};

module.exports.infoShow = function(req, res, next) {
  try {
    // Hàm dùng để xử lí các kiểu sắp xếp thông tin
    typeSort = 0;

    // Phục hồi checked = false
    for (type of typeSortArray) type.selected = false;
    // Gán radio đó dược checked
    typeSortArray[typeSort].selected = true;

    Promise.all([newsModel.topNNewsFollowTypeSort(typeSort, 12)]).then(
      values => {
        res.render("customer/info-show", {
          layout: "main-customer.hbs",
          news: values[0],
          typeSorts: typeSortArray,
          helpers: {
            // Hàm chuyển đổi qua kiểu ngày
            convertToDate: convertToDateHelper,
            // Hàm định dạng title của info lấy 85 kí tự
            formatTitleInfo: formatStringHelper.formatTitleInfo,
            // Hàm định dạng short content của info lấy 320 kí tự
            formatShortContentInfo: formatStringHelper.formatShortContentInfo
          }
        });
      }
    );
  } catch (error) {
    next(error);
  }
};

module.exports.handlePostValueFilter = function(req, res, next) {
  try {
    // Lấy giá trị của radio hoặc select tùy theo responsive
    typeSort = +req.body.radioSortInfoShow;

    // Nếu typeSort là NaN thì gán mặc định bằng 0
    if (isNaN(typeSort) == true) typeSort = 0;

    // Phục hồi checked = false
    for (type of typeSortArray) type.selected = false;
    // Gán radio đó dược checked
    typeSortArray[typeSort].selected = true;

    Promise.all([newsModel.topNNewsFollowTypeSort(typeSort, 12)]).then(
      values => {
        res.render("customer/info-show", {
          layout: "main-customer.hbs",
          news: values[0],
          typeSorts: typeSortArray,
          helpers: {
            // Hàm chuyển đổi qua kiểu ngày
            convertToDate: convertToDateHelper,
            // Hàm định dạng title của info lấy 85 kí tự
            formatTitleInfo: formatStringHelper.formatTitleInfo,
            // Hàm định dạng short content của info lấy 320 kí tự
            formatShortContentInfo: formatStringHelper.formatShortContentInfo
          }
        });
      }
    );
  } catch (error) {
    next(error);
  }
};
