// Gọi productmodel
var productModel = require("../../models/product.model");

// Gọi branchModel
var brandModel = require("../../models/brand.model");

// Gọi categoryModel
var categoryModel = require("../../models/category.model");

// Gọi subCategoryModel
var subCategoryModel = require("../../models/sub_category.model");

//Gọi tagmodel
var tagModel = require("../../models/tag.model");

//product imamge model
var productImageModel = require("../../models/product_image.model");

//product_info_history model
var productInfoHistoryModel = require("../../models/product_info_history");

//Private key fireabase
const keyFilename = "./oderfood-cf526-firebase-adminsdk-tfbb1-1117032241.json";
//Id project firebase
const projectId = "oderfood-cf526";
//Nơi lưu trữ hình
const bucketName = `${projectId}.appspot.com`;
const mime = require('mime-types');

//Hỗ trợ upload ảnh lên firebase
const { Storage } = require('@google-cloud/storage');
const gcs = new Storage({
  projectId,
  keyFilename
});
//Đường dẫn đến nơi lưu hình
const bucket = gcs.bucket(bucketName);

// Thêm dữ liệu vào trang product
module.exports.productShow = function (req, res, next) {
  // Lấy dữ liệu nhãn hiệu
  var dataBrands = brandModel.allBrand();

  // Lấy dữ liệu sản phẩm
  var dataProducts = productModel.allProduct();

  // Lấy dữ liệu category
  var dataCategories = categoryModel.allCategory();

  // Lấy dữ liệu sub category
  var dataSubCategories = subCategoryModel.allSubCategory(1);

  Promise.all([
    dataBrands,
    dataProducts,
    dataCategories,
    dataSubCategories
  ]).then(values => {
    res.locals.sidebar[4].active = true;
    //Truyền vào trong UI
    res.render("admin/product-show", {
      layout: "main-admin.hbs",
      brands: values[0],
      products: values[1],
      categories: values[2],
      subCategories: values[3]
    });
  }).catch(next);
};

//Xử lý post nhận về product-add -- Lưu ý có xử lý cả mảng hình ảnh
module.exports.productAddNew = function (req, res, next) {
  pathImages = req.files;

  let listFile = req.files;

  // if (listFile) {
  //   uploadImageToStorage(listFile, 12).then((success) => {
  //     res.status(200).send({
  //       status: 'success'
  //     });
  //   }).catch((error) => {
  //     console.error(error);
  //   });
  // }

  // //Tạo đối tượng để thêm vào cơ sở dữ liệu
  var entity = {
    IMAGE: '/uploads/IMG_NOTFOUND.jpg',
    CATEGORYID: req.body.CATEGORYID,
    SUBCATEGORYID: req.body.SUBCATEGORYID,
    NAME: req.body.NAME,
    BRANDID: req.body.BRANDID,
    STATUS: 1,
    RATE: 0,
    PRICE: req.body.PRICE,
    ORIGIN: req.body.ORIGIN,
    KILOGRAM: req.body.KILOGRAM,
    SALE: req.body.SALE,
    VIPSALE: 0,
    DESCRIPTION: req.body.contain,
    INVENTORY: req.body.INVENTORY,
    CREATED:'2019-05-21'
  };

  // // //Gọi hàm thêm vào sản phẩm từ model
  var insertProduct = productModel.addProduct(entity);

  // //Gọi hàm thêm vào danh sách hình, tag, product_info_hitory từ model | lưu ý chỉ gọi khi insert thành công
  insertProduct.then(productID => {
    //Thêm hình ảnh
    // productImageModel.addImagesForProduct(productID, arrImage);
    // //Thêm vào tag
    // tagModel.addTagForProduct(productID, req.body.TAG);
    // //Thêm vào lịch sử
    // productInfoHistoryModel.addCreatedHistory(productID, "Tạo", "Tạo mới");
  }).catch(next);
  // //Thông báo thêm sản phẩm mới thành công

  // //Trả về màn hình tất cả sản phẩm
  res.redirect("product-show");

};

const uploadImageToStorage = (listFile, ProductID) => {
  return new Promise((resolve, reject) => {
    if (!listFile) {
      reject('No image file');
    }
    else {
      listFile.forEach(file => {
        //Đổi tên hình
        let gcsname = Date.now() + file.originalname;
        //Tạo đường dẫn để lưu file
        let fileUpload = bucket.file(`/ProductImages/${ProductID}/` + gcsname);
        //Upload hình
        const blobStream = fileUpload.createWriteStream({
          metadata: {
            contentType: file.mimetype
          },
          resumable: false
        });

        blobStream.on('error', (error) => {
          reject(error);
        });

        blobStream.on('finish', () => {
          fileUpload.cloudStorageObject = gcsname;
          fileUpload.makePublic().then(() => {
            var url = getPublicUrl(gcsname, ProductID);
            //Cập nhật lại ảnh đại diện
            console.log(getPublicUrl(gcsname, ProductID));
          });
        });

        blobStream.end(file.buffer);
      });
    }
  });
}

//Lấy ra đường dẫn để lưu vào database
function getPublicUrl(filename, productID) {
  return `https://storage.googleapis.com/${bucketName}/ProductImages/${productID}/${filename}`;
}

//Thêm dữ liệu vào trang productadd
module.exports.productAdd = function (req, res, next) {
  //Lấy dữ liệu category
  var dataCategories = categoryModel.allCategory();
  //Lấy dữ liệu sub category
  var dataSubCategories = subCategoryModel.allSubCategory(1);
  //Lấy dữ liệu từ tag
  var dataTags = tagModel.allTag();

  // Lấy dữ liệu nhãn hiệu
  var dataBrands = brandModel.allBrand();

  Promise.all([dataCategories, dataSubCategories, dataTags, dataBrands]).then(values => {
    res.locals.sidebar[5].active = true;

    //Truyền vào trong UI
    res.render("admin/product-add", {
      layout: "main-admin.hbs",
      categories: values[0],
      subCategories: values[1],
      tags: values[2],
      brands: values[3]
    });
  }).catch(next);
};

module.exports.SubCategory = function (req, res, next) {

  //Lấy dữ liệu sub category
  var dataSubCategories = subCategoryModel.allSubCategory(req.body.CategoryID);
  //Lấy dữ liệu từ tag

  Promise.all([dataSubCategories]).then(values => {
    res.json(JSON.stringify(values[0]));
  }).catch(next);
};
