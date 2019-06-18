var tagModel = require("../../models/tag.model");
var newsTagModel = require("../../models/news_tag.model");

// Gọi createquery helper
var createQuery = require("../../helpers/create_query.helper");

module.exports.tagShow = function(req, res, next) {
  var page = req.query.page || 1;
  var limit = req.query.limit || 5;

  var name = req.query.name || "";

  var objQuery = {
    Name: name
  };

  if (isNaN(page)) {
    page = 1;
  }

  if (page < 1) {
    page = 1;
  }

  if (page < 1) {
    limit = 5;
  }

  var offset = (page - 1) * limit;

  var dataTags = tagModel.pageAllTagFilter(limit, offset, objQuery);

  var numberPage = tagModel.quantityTagActive(objQuery);

  Promise.all([dataTags, numberPage])
    .then(values => {
      res.locals.sidebar[11].active = true;

      var total = values[1][0].QUANTITY;
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

      res.render("admin/tag", {
        layout: "main-admin.hbs",
        tags: values[0],
        pages: pages,
        prePage: prePage,
        nextPage: nextPage,
        name: name,
        helpers: {
          createQueryCustomer: createQuery.createQueryCustomer
        }
      });
    })
    .catch(next);
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
    .catch(err => {
      res.send(false);
    });
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
    .catch(err => {
      res.send(false);
    });
};

module.exports.postDeleteTag = (req, res, next) => {
  var tagId = req.body.TagID;

  newsTagModel.deleteByTagId(tagId).then(affectedRowsNumber1 => {
    tagModel.deleteTagById(tagId).then(affectedRowsNumber2 => {
      res.send(true);
    }).catch(err => {
      res.send(false);
    });
  }).catch(err => {
    res.send(false);
  });
};
