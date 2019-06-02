var newsModel = require("../../models/news.model");
var tagModel = require("../../models/tag.model");
var newsInfoHistoryModel = require("../../models/news_info_history.model");

var selectSelectedHelper = require("../../helpers/select_selected.helper");

module.exports.infoShow = function(req, res) {
  res.locals.sidebar[7].active = true;

  res.render("admin/info-show", { layout: "main-admin.hbs" });
};

module.exports.infoAdd = function(req, res) {
  //Lấy dữ liệu từ tag
  var dataTags = tagModel.allTag();

  dataTags
    .then(tags => {
      res.locals.sidebar[6].active = true;

      res.render("admin/info-add", {
        layout: "main-admin.hbs",
        tags: tags,
        helpers: {
          selectSelected: selectSelectedHelper
        }
      });
    })
    .catch(err => {
      next(err);
    });
};

module.exports.postInfoAdd = function(req, res) {
  res.locals.sidebar[6].active = true;

  req.body.IMAGE = "\\" + req.file.path
    .split("\\")
    .slice(1)
    .join("\\");

  //Tạo đối tượng để thêm vào cơ sở dữ liệu
  var news = {
    IMAGE: req.body.IMAGE,
    TITLE: req.body.TITLE,
    SHORTCONTENT: req.body.SHORTCONTENT,
    CONTENT: req.body.CONTENT
  };

  // Thêm vào news
  var addNews = newsModel.addNews(news);

  addNews
    .then(newNews => {
      //Thêm vào tag
      var addTagForNews = tagModel.addTagForNews(newNews, req.body.TAG);
      //Thêm vào lịch sử
      var addCreatedHistory = newsInfoHistoryModel.addCreatedHistory(
        newNews,
        "Thêm",
        "Thêm mới"
      );

      Promise.all([addTagForNews, addCreatedHistory])
        .then(values => {
          res.redirect("/admin/info/info-add");
        })
        .catch(err => {
          next(err);
        });
    })
    .catch(err => {
      next(err);
    });
};
