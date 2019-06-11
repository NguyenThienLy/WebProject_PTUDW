var newsModel = require("../../models/news.model");
var tagModel = require("../../models/tag.model");
var newsInfoHistoryModel = require("../../models/news_info_history.model");
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

module.exports.infoShow = function(req, res) {
  res.locals.sidebar[7].active = true;

  res.render("admin/info-show", { layout: "main-admin.hbs" });
};

module.exports.infoAdd = function(req, res, next) {
  //Lấy dữ liệu từ tag
  var dataTags = tagModel.allTag();

  dataTags
    .then(tags => {
      res.locals.sidebar[6].active = true;

      res.render("admin/info-add", {
        layout: "main-admin.hbs",
        tags: tags
      });
    })
    .catch(next);
};

module.exports.postInfoAdd = function(req, res, next) {
  res.locals.sidebar[6].active = true;

  // req.body.IMAGE = "\\" + req.file.path
  //   .split("\\")
  //   .slice(1)
  //   .join("\\");

  //Tạo đối tượng để thêm vào cơ sở dữ liệu
  var news = {
    IMAGE: "/uploads/IMG_NOTFOUND.jpg",
    RESIZEDIMAGE: "/uploads/IMG_NOTFOUND.jpg",
    TITLE: req.body.TITLE,
    SHORTCONTENT: req.body.SHORTCONTENT,
    CONTENT: req.body.CONTENT
  };

  // Thêm vào news
  var addNews = newsModel.addNews(news);

  addNews
    .then(infoID => {
      //Thêm vào tag
      var addTagForNews = tagModel.addTagForNews(infoID, req.body.TAG);
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

        Promise.all([addCreatedHistory, addTagForNews, uploadImageToFirebaseStorage])
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
          uploadResizeImageToStorage(gcsname, infoID, news, file.mimetype)
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

const uploadResizeImageToStorage = (filename, infoID, news, contentType) => {
  return new Promise((resolve, reject) => {
    //Tạo đường dẫn để lưu file
    var fileName = "resized-" + filename;
    let fileUpload = bucket.file(`InfoImages/${infoID}/` + fileName);
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
      var url = getPublicUrl(fileName, infoID, uuid);

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

// function a(filename, infoID) {
//   const contentType = "image/jpeg";
//   const filePath = `InfoImages/${infoID}/` + filename;

//   const destBucket = bucket;
//   console.log("temp file path: " + path.join(os.tmpdir(), filename));
//   const tmpFilePath = path.join(os.tmpdir(), filename);
//   const resizedTmpFilePath = path.join(os.tmpdir(), "resize-" + filename);
//   let uuid = UUID();
//   const metadata = {
//     contentType: contentType,
//     metadata: {
//       firebaseStorageDownloadTokens: uuid
//     }
//   };

//   return destBucket
//     .file(filePath)
//     .download({
//       destination: tmpFilePath
//     })
//     .then(() => {
//       return spawn("convert", [
//         tmpFilePath,
//         "-resize",
//         "200x200",
//         resizedTmpFilePath
//       ]);
//     })
//     .then(() => {
//       return destBucket
//         .upload(resizedTmpFilePath, {
//           destination: `InfoImages/${infoID}/resized-` + filename,
//           metadata: metadata
//         })
//         .then(result => {
//           let file = result[0];
//           return Promise.resolve(
//             "https://firebasestorage.googleapis.com/v0/b/" +
//               bucketName +
//               "/o/" +
//               encodeURIComponent(file.name) +
//               "?alt=media&token=" +
//               uuid
//           );
//         })
//         .then(downloadURL => {
//           var newsObject;
//           newsModel
//             .singleNewsByID(infoID)
//             .then(news => {
//               console.log("news: " + news);
//               console.log("downloadURL: " + downloadURL);
//               newsObject = news;
//               newsObject.RESIZEDIMAGE = downloadURL;

//               newsModel
//                 .updateNews(newsObject)
//                 .then(changedRowsNumber => {
//                   return true;
//                 })
//                 .catch(err => {
//                   console.log(err);
//                 });
//             })
//             .catch(err => {
//               console.log(err);
//             });
//         });
//     });
// }
