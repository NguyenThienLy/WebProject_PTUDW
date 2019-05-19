var newsModel = require("../../models/news.model");
var tagModel = require("../../models/tag.model");
var newsInfoHistoryModel = require("../../models/news_info_history.model");

module.exports.infoShow = function(req, res) {
  res.locals.sidebar[7].active = true;

  res.render("admin/info-show", { layout: "main-admin.hbs" });
};

module.exports.infoAdd = async function(req, res) {
  res.locals.sidebar[6].active = true;

  //Lấy dữ liệu từ tag
  var dataTags = await tagModel.allTag();

  res.render("admin/info-add", {
    layout: "main-admin.hbs",
    tags: dataTags
  });
};

module.exports.postInfoAdd = async function(req, res) {
  res.locals.sidebar[6].active = true;

  req.body.IMAGE = req.file.path
    .split("\\")
    .slice(1)
    .join("/");

  //Tạo đối tượng để thêm vào cơ sở dữ liệu
  var news = {
    IMAGE: req.body.IMAGE,
    TITLE: req.body.TITLE,
    SHORTCONTENT: req.body.SHORTCONTENT,
    CONTENT: req.body.CONTENT,
  };

  // Thêm vào news 
  var new_news = await newsModel.addNews(news);

  //Thêm vào tag
  await tagModel.addTagForNews(new_news, req.body.TAG);

  //Thêm vào lịch sử
  await newsInfoHistoryModel.addCreatedHistory(new_news, "Thêm", "Thêm mới");

  res.redirect("/admin/info/info-add");
};
