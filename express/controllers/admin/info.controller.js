var newsModel = require("../../models/news.model");
var tagModel = require("../../models/tag.model");
var newsTagModel = require("../../models/news_tag.model");
var newsInfoHistoryModel = require("../../models/news_info_history.model");

// Gọi selected helper
var selectedHelper = require("../../helpers/selected_selector.helper");

var sharp = require("sharp");
var UUID = require("uuid-v4");

//Private key fireabase
const keyFilename = "./oderfood-cf526-firebase-adminsdk-tfbb1-1117032241.json";
//Id project firebase
const projectId = "oderfood-cf526";
//Nơi lưu trữ hình
const bucketName = `${projectId}.appspot.com`;

//Hỗ trợ upload ảnh lên firebase
const { Storage } = require("@google-cloud/storage");
const gcs = new Storage({
  projectId,
  keyFilename
});
//Đường dẫn đến nơi lưu hình
const bucket = gcs.bucket(bucketName);

module.exports.infoShow = async function(req, res, next) {
  res.locals.sidebar[6].active = true;

  var dataNews = await newsModel.allNews();

  for (news of dataNews) {
    var allNewsTag = await newsTagModel.allTagOfNews(news.ID);
    news.TAGS = allNewsTag;
  }

  res.render("admin/info-show", {
    layout: "main-admin.hbs",
    allNews: dataNews
  });
};

module.exports.infoAdd = function(req, res, next) {
  //Lấy dữ liệu từ tag
  var dataTags = tagModel.allTag();

  dataTags
    .then(tags => {
      res.locals.sidebar[7].active = true;

      res.render("admin/info-add", {
        layout: "main-admin.hbs",
        tags: tags
      });
    })
    .catch(next);
};

module.exports.postInfoAdd = function(req, res, next) {
  res.locals.sidebar[7].active = true;

  //Tạo đối tượng để thêm vào cơ sở dữ liệu
  var news = {
    IMAGE: "/uploads/IMG_NOTFOUND.jpg",
    RESIZEDIMAGE: "/uploads/IMG_NOTFOUND.jpg",
    TITLE: req.body.TITLE,
    SHORTCONTENT: req.body.SHORTCONTENT,
    CONTENT: req.body.CONTENT,
    STATUS: 1
  };

  // Thêm vào news
  var addNews = newsModel.addNews(news);

  addNews
    .then(infoID => {
      //Thêm vào tag
      var addTagForNews = newsTagModel.addTagForNews(infoID, req.body.TAG);
      //Thêm vào lịch sử
      var addCreatedHistory = newsInfoHistoryModel.addCreatedHistory(
        infoID,
        "Thêm",
        "Thêm mới"
      );

      if (req.file) {
        // Upload hình đại diện lên firebase
        var uploadImageToFirebaseStorage = uploadImageToStorage(
          req.file,
          infoID,
          news
        );

        Promise.all([
          addCreatedHistory,
          addTagForNews,
          uploadImageToFirebaseStorage
        ])
          .then(values => {
            res.redirect("/admin/info/info-add");
          })
          .catch(next);
      }
    })
    .catch(next);
};

const uploadImageToStorage = (file, infoID, news) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject("No image file");
    } else {
      //Đổi tên hình
      let gcsname = Date.now() + "-" + file.originalname;
      //Tạo đường dẫn để lưu file
      let fileUpload = bucket.file(`InfoImages/${infoID}/` + gcsname);
      //Upload hình
      let uuid = UUID();
      const metadata = {
        contentType: file.mimetype,
        metadata: {
          firebaseStorageDownloadTokens: uuid
        }
      };
      const blobStream = fileUpload.createWriteStream({
        metadata: metadata,
        resumable: false
      });

      blobStream.on("error", error => {
        reject(error);
      });

      blobStream.on("finish", () => {
        //Lấy ra url ảnh
        var url = getPublicUrl(gcsname, infoID, uuid);

        news.IMAGE = url;
        news.ID = infoID;

        //Cập nhật lại thông tin ảnh đại diện của info
        newsModel.updateNews(news).then(changedRowsNumber => {
          uploadResizedImageToStorage(gcsname, infoID, news, file.mimetype)
            .then(a => {
              resolve(url);
            })
            .catch(err => {
              reject(err);
            });
        });
      });

      blobStream.end(file.buffer);
    }
  });
};

const uploadResizedImageToStorage = (filename, infoID, news, contentType) => {
  return new Promise((resolve, reject) => {
    //Tạo đường dẫn để lưu file
    var resizedFileName = "resized-" + filename;
    let fileUpload = bucket.file(`InfoImages/${infoID}/` + resizedFileName);
    //Upload hình
    let uuid = UUID();
    const metadata = {
      contentType: contentType,
      metadata: {
        firebaseStorageDownloadTokens: uuid
      }
    };
    const blobStream = fileUpload.createWriteStream({
      metadata: metadata,
      resumable: false
    });

    const pipeline = sharp();
    pipeline
      .resize({ width: 200, height: 200, fit: sharp.fit.contain })
      .pipe(blobStream);

    bucket
      .file(`InfoImages/${infoID}/` + filename)
      .createReadStream()
      .pipe(pipeline);

    blobStream.on("error", error => {
      reject(error);
    });

    blobStream.on("finish", () => {
      var url = getPublicUrl(resizedFileName, infoID, uuid);

      news.RESIZEDIMAGE = url;
      news.ID = infoID;
      newsModel
        .updateNews(news)
        .then(changedRowsNumber => {
          resolve(url);
        })
        .catch(err => {
          reject(err);
        });
    });
  });
};

//Lấy ra đường dẫn để lưu vào database
function getPublicUrl(filename, infoID, uuid) {
  //return `https://storage.googleapis.com/${bucketName}/InfoImages/${infoID}/${filename}`;
  return (
    "https://firebasestorage.googleapis.com/v0/b/" +
    bucketName +
    "/o/" +
    encodeURIComponent(`InfoImages/${infoID}/` + filename) +
    "?alt=media&token=" +
    uuid
  );
}

module.exports.infoUpdate = (req, res, next) => {
  var id = +req.params.id;

  // Lấy dữ liệu product combo theo id
  var dataInfo = newsModel.singleByNewsId(id);

  var dataTags = tagModel.allTag();

  var dataNewsTag = newsTagModel.allTagOfNews(id);

  Promise.all([dataInfo, dataTags, dataNewsTag])
    .then(values => {
      res.locals.sidebar[6].active = true;

      //Truyền vào trong UI
      res.render("admin/info-update", {
        layout: "main-admin.hbs",
        info: values[0][0],
        tags: values[1],
        newsTag: values[2],
        helpers: {
          isSelected: selectedHelper.isSelected,
          isSelectedInTag: selectedHelper.isSelectedInTag
        }
      });
    })
    .catch(next);
};

module.exports.postInfoUpdate = (req, res, next) => {
  // Tạo đối tượng để thêm vào cơ sở dữ liệu
  var newsID = req.body.ID;

  var news = {
    ID: newsID,
    TITLE: req.body.TITLE,
    SHORTCONTENT: req.body.SHORTCONTENT,
    CONTENT: req.body.CONTENT
  };

  // Thêm vào news
  var updateNewsImage = newsModel.updateNews(news);

  updateNewsImage
    .then(changedRowsNumber => {
      // Thêm vào lịch sử
      var addCreatedHistory = newsInfoHistoryModel.addCreatedHistory(
        newsID,
        "Cập nhật",
        "Cập nhật thông tin"
      );

      addCreatedHistory
        .then(createdHistoryId => {
          newsTagModel.deleteTagOfNews(newsID).then(affectedRowsNumber => {
            newsTagModel.addTagForNews(newsID, req.body.TAG);

            res.redirect(req.get("referer"));
          });
        })
        .catch(next);
    })
    .catch(next);
};

//Lấy ra hình ảnh của sản phẩm
module.exports.infoImage = (req, res, next) => {
  var dataNews = newsModel.singleByNewsId(req.body.infoID);

  dataNews
    .then(news => {
      res.json(JSON.stringify(news[0].IMAGE));
    })
    .catch(next);
};

//Lấy ra hình ảnh của sản phẩm
module.exports.postInfoImageUpdate = (req, res, next) => {
  //Tạo đối tượng để thêm vào cơ sở dữ liệu
  var news = {
    ID: req.body.ID,
    IMAGE: "/uploads/IMG_NOTFOUND.jpg",
    RESIZEDIMAGE: "/uploads/IMG_NOTFOUND.jpg"
  };

  // Thêm vào news
  var updateNewsImage = newsModel.updateNews(news);

  updateNewsImage
    .then(changedRowsNumber => {
      if (req.file) {
        // Upload hình đại diện lên firebase
        var uploadImageToFirebaseStorage = uploadImageToStorage(
          req.file,
          req.body.ID,
          news
        );

        uploadImageToFirebaseStorage
          .then(values => {
            res.send({ valid: true });
          })
          .catch(next);
      } else {
        res.send({ valid: false });
      }
    })
    .catch(next);
};

module.exports.postInfoAddTag = function(req, res, next) {
  var newTagName = req.body.TagName;

  var newTag = {
    NAME: newTagName
  };

  tagModel
    .addTag(newTag)
    .then(tagID => {
      newTag.ID = tagID;
      res.send(newTag);
    })
    .catch(next);
};

//Xóa sản phẩm, xóa những sản phẩm không có trong combo
module.exports.postDeleteInfo = (req, res, next) => {
  var infoID = req.body.InfoID;

  var deleteTagOfNews = newsTagModel.deleteTagOfNews(infoID);

  deleteTagOfNews.then(affectedRowsNumber => {
    //tạo mới product combo
    var updateNews = {
      ID: infoID,
      STATUS: 0
    };

    //Gọi hàm xóa
    newsModel.deleteNews(updateNews)
      .then(changedRowsNumber => {
        res.send(true);
      })
      .catch(next);
  }).catch(next);
};
