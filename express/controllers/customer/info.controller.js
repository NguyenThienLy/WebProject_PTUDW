var moment = require("moment");

// Gọi newsModel
var newsModel = require("../../models/news.model");
// Gọi tagModel
var tagModel = require("../../models/tag.model");

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

async function getAllTagForNews(arrNews) {
  for (news of arrNews) {
    var result = await tagModel.allTagFollowInfoId(news.ID);
    news.tags = result;
  }

  return arrNews;
}

module.exports.infoDetail = function(req, res, next) {
  try {
    var isHavePopularInfo = true;
    var isHaveThesameInfo = true;
    var idInfo = req.params.idInfo;

    if (isNaN(idInfo)) {
      idInfo = 0;
    }

    var startDate = moment(
      moment()
        .startOf("week")
        .toDate()
    ).format("YYYY-MM-DD");

    var endDate = moment(
      moment()
        .endOf("week")
        .toDate()
    ).format("YYYY-MM-DD");

    var currentDate = moment().format("YYYY-MM-DD");

    Promise.all([
      newsModel.top1NewFollowId(idInfo),
      newsModel.topNNewestNewsDiffNewsId(3, idInfo),
      tagModel.allTagFollowInfoId(idInfo),
      newsModel.topNNewsTheSameFollowOffsetFollowIdNews(idInfo, 3, 0),
      newsModel.topNNewsPopularInWeekFollowOffsetFollowIdNews(
        idInfo,
        3,
        0,
        startDate,
        endDate
      ),
      newsModel.IncreaseView(idInfo),
      newsModel.IncreaseNewViews(idInfo, currentDate)
    ]).then(values => {
      if (values[3].length === 0) isHaveThesameInfo = false;

      if (values[4].length === 0) isHavePopularInfo = false;

      getAllTagForNews(values[3]).then(infosTheSame => {
        getAllTagForNews(values[4]).then(infosThePopular => {
          res.render("customer/info-detail", {
            layout: "main-customer.hbs",
            infosNewest: values[1],
            tags: values[2],
            isHavePopularInfo: isHavePopularInfo,
            isHaveThesameInfo: isHaveThesameInfo,
            infosTheSame: infosTheSame,
            infosPopular: infosThePopular,
            infoContent: values[0][0].CONTENT,
            infoCreated: values[0][0].CREATED,
            infoTitle: values[0][0].TITLE,
            infoShortContent: values[0][0].SHORTCONTENT,
            helpers: {
              // Hàm định dạng title của info lấy 85 kí tự
              formatTitleInfo: formatStringHelper.formatTitleInfo,
              // Hàm định dạng short content của info lấy 320 kí tự
              formatShortContentInfo: formatStringHelper.formatShortContentInfo,
              // Hàm định dạng trong breadcrumb lấy 30 kí tự
              formatTitleInBreadCrumb:
                formatStringHelper.formatTitleInBreadCrumb
            }
          });
        });
      });
    });
  } catch (error) {
    next(error);
  }
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
        getAllTagForNews(values[0]).then(infoShow => {
          res.render("customer/info-show", {
            layout: "main-customer.hbs",
            news: infoShow,
            typeSorts: typeSortArray,
            helpers: {
              // Hàm định dạng title của info lấy 85 kí tự
              formatTitleInfo: formatStringHelper.formatTitleInfo,
              // Hàm định dạng short content của info lấy 320 kí tự
              formatShortContentInfo: formatStringHelper.formatShortContentInfo
            }
          });
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
        getAllTagForNews(values[0]).then(infoShow => {
          res.render("customer/info-show", {
            layout: "main-customer.hbs",
            news: infoShow,
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
        });
      }
    );
  } catch (error) {
    next(error);
  }
};

module.exports.showInfoFollowTag = function(req, res, next) {
  try {
    // Lấy giá trị của radio hoặc select tùy theo responsive
    var tagId = req.params.idTag;

    if (isNaN(tagId)) {
      tagId = 0;
    }

    console.log(tagId);

    Promise.all([
      newsModel.topNNewsFollowTagId(tagId, 12, 0),
      tagModel.allTag()
    ]).then(values => {
      if (values[0].length !== 0) {
        for (tag of values[1]) {
          if (tag.ID === +tagId) tag.isSelected = true;
        }

        getAllTagForNews(values[0]).then(infoShow => {
          res.render("customer/info-show-tag", {
            layout: "main-customer.hbs",
            news: infoShow,
            tags: values[1],
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
        });
      } else {
        res.redirect("/customer/info/info-show");
      }
    });
  } catch (error) {
    next(error);
  }
};
