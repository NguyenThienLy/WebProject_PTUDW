var tagModel = require("../../models/tag.model");
var newsTagModel = require("../../models/news_tag.model");

module.exports.tagShow = function(req, res, next) {
  var getAllTags = tagModel.allTag();

  getAllTags
    .then(tags => {
      res.locals.sidebar[11].active = true;

      res.render("admin/tag", {
        layout: "main-admin.hbs",
        tags: tags
      });
    })
    .catch(next);
};

module.exports.tagInfo = function(req, res, next) {
  var dataTag = tagModel.singleById(req.body.TagID);
  dataTag
    .then(tag => {
      res.send({ tag: tag[0] });
    })
    .catch(next);
};

module.exports.postAddTag = (req, res, next) => {
  var newTagName = req.body.TagName;
  
  var newTag = {
    NAME: newTagName
  };

  tagModel
    .addTag(newTag)
    .then(tagID => {
      res.send(true);
    })
    .catch(next);
};

module.exports.postTagNameUpdate = (req, res, next) => {
  var tagId = req.body.TagID;
  var tagName = req.body.UpdateTagName;

  var updateTag = {
    ID: tagId,
    NAME: tagName
  };

  tagModel
    .updateTag(updateTag)
    .then(changedRowsNumber => {
      res.send(true);
    })
    .catch(next);
};

module.exports.postDeleteTag = (req, res, next) => {
  var tagId = req.body.TagID;

  newsTagModel.deleteByTagId(tagId).then(affectedRowsNumber1 => {
    tagModel.deleteTagById(tagId).then(affectedRowsNumber2 => {
      res.send(true);
    });
  });
};
