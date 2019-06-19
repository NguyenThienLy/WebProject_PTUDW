var moment = require("moment");

// Gọi newsModel
var newsModel = require("../../models/news.model");
// Gọi tagModel
var tagModel = require("../../models/tag.model");

var newTagModel = require("../../models/news_tag.model");

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


module.exports.showInfoFollowTagPage = function(req, res, next) {
  try {
    // Lấy giá trị của radio hoặc select tùy theo responsive
    var tagId = req.query.idTag||0;

    var page = req.query.page || 1;
    var limit = req.query.limit || 1;
    var offset = page -1;

    var numberPage = newTagModel.quantityNewsTag(tagId);

    Promise.all([
      newsModel.topNNewsFollowTagId(tagId, limit, offset),
      tagModel.allTag(),numberPage
    ]).then(values => {
      if (values[0].length !== 0) {
        for (tag of values[1]) {
          if (tag.ID === +tagId) tag.isSelected = true;
        }
        var total = values[2][0].QUANTITY;
        var nPages = Math.floor(total / limit);
        if (total % limit > 0) nPages++;
        var pages = createArrPage(nPages, page);

        var prePage = {
          value: 0,
          active: false
        };
        if (page > 1) {
          prePage.value = page - 1
          prePage.active = true;
        } else {
          prePage.value = 0
          prePage.active = false;
        }
  
        var nextPage = {
          value: 0,
          active: false
        }
  
        if (page < nPages) {
          nextPage.value = parseInt(page) + 1
          nextPage.active = true;
        } else {
          nextPage.value = 0
          nextPage.active = false;
        }

        getAllTagForNews(values[0]).then(infoShow => {
          res.render("customer/info-show-tag", {
            layout: "main-customer.hbs",
            news: infoShow,
            tags: values[1],
            typeSorts: typeSortArray,
            pages: pages,
            prePage: prePage,
            nextPage: nextPage,
            tagId:tagId,
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

//Hàm tạo mảng trang
function createArrPage(nPages, page) {
  var pages = [];
  //Chỉ hiện tối đa 5 trang
  var start = end = 0;
  if (nPages <= 5) {
    start = 1;
    end = nPages;
  } else {
    if (page == 1) {
      start = 1;
      end = 5;
    }
    else if (page == nPages) {
      start = nPages - 5;
      end = nPages;
    }
    else {
      if (page - 2 >= 1 && parseInt(page) + 2 <= nPages) {
        start = page - 2;
        end = parseInt(page) + 2;
      } else {
        if (page - 2 == 0) {
          start = page - 1;
          end = parseInt(page) + 3;
        } else {
          start = page - 3;
          end = parseInt(page) + 1;
        }
      }
    }
  }
  for (i = start; i <= end; i++) {
    var obj = {
      value: i,
      active: i === +page
    };
    pages.push(obj);
  }

  return pages;
}
