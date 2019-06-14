// Gọi productmodel
var productModel = require("../../models/product.model");

// Gọi productCombomodel
var productComboModel = require("../../models/product_combo.model");

// Gọi branchModel
var brandModel = require("../../models/brand.model");

// Gọi categoryModel
var categoryModel = require("../../models/category.model");

// Gọi subCategoryModel
var subCategoryModel = require("../../models/sub_category.model");

//Gọi tagmodel
var tagModel = require("../../models/tag.model");

//product image model
var productImageModel = require("../../models/product_image.model");

//product_info_history model
var productInfoHistoryModel = require("../../models/product_info_history");

//product_combo_info_history model
var productComboInfoHistoryModel = require("../../models/product_combo_info_history");

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
const mime = require("mime-types");

//Hỗ trợ upload ảnh lên firebase
const { Storage } = require("@google-cloud/storage");
const gcs = new Storage({
  projectId,
  keyFilename
});
//Đường dẫn đến nơi lưu hình
const bucket = gcs.bucket(bucketName);

// Thêm dữ liệu vào trang product
module.exports.productShow = function (req, res, next) {
  var page = req.query.page || 1;
  var limit = req.query.limit || 4;
  if (page < 1) {
    page = 1;
  }

  if(page <1){
    limit = 4;
  }
  
  var offset = (page - 1) * limit;

  // Lấy dữ liệu nhãn hiệu
  var dataBrands = brandModel.allBrand();

  // Lấy dữ liệu sản phẩm
  var dataProducts = productModel.pageallProduct(limit, offset);

  // Lấy dữ liệu category
  var dataCategories = categoryModel.allCategory();

  // Lấy dữ liệu sub category
  var dataSubCategories = subCategoryModel.allSubCategory(1);

  var numberPage = productModel.quantityProductActive();

  Promise.all([dataBrands, dataProducts, dataCategories, dataSubCategories,numberPage])
    .then(values => {
      res.locals.sidebar[4].active = true;

      var total = values[4][0].QUANTITY;
      var nPages = Math.floor(total/limit);
      if(total % limit >0)nPages++;
      var pages =[];
      for( i = 1;i<nPages;i++){
        var obj = {
          value:i,
          active:i===+page
        };
        pages.push(obj);
      }

      //Truyền vào trong UI
      res.render("admin/product-show", {
        layout: "main-admin.hbs",
        brands: values[0],
        products: values[1],
        categories: values[2],
        subCategories: values[3],
        pages:pages
      });
    })
    .catch(next);
};

//Xử lý post nhận về product-add -- Lưu ý có xử lý cả mảng hình ảnh
module.exports.postProductComboAdd = function (req, res, next) {
  // Tạo đối tượng để thêm vào cơ sở dữ liệu
  var newProductCombo = {
    PRODUCTID1: req.body.PRODUCTID1,
    PRODUCTID2: req.body.PRODUCTID2,
    PRODUCTID3: req.body.PRODUCTID3,
    NAME: req.body.NAME,
    STATUS: 1,
    RATE: 0,
    PRICE: req.body.PRICE,
    KILOGRAM: req.body.KILOGRAM,
    SALE: req.body.SALE,
    VIPSALE: req.body.VIPSALE,
    SHORTDESCRIPTION: req.body.SHORTDESCRIPTION,
    DESCRIPTION: req.body.DESCRIPTION,
    INVENTORY: req.body.INVENTORY
  };

  console.log(newProductCombo);

  // Gọi hàm thêm vào sản phẩm từ model
  var insertProductCombo = productComboModel.addProductCombo(newProductCombo);

  // Gọi hàm thêm vào danh sách hình, tag, product_info_hitory từ model | lưu ý chỉ gọi khi insert thành công
  insertProductCombo
    .then(productComboID => {
      // Thêm vào lịch sử
      var addCreatedHistory = productComboInfoHistoryModel.addCreatedHistory(
        productComboID,
        "Thêm",
        "Thêm mới"
      );

      var loadProduct1 = productModel.singleByProductId(newProductCombo.PRODUCTID1);
      var loadProduct2 = productModel.singleByProductId(newProductCombo.PRODUCTID2);
      var loadProduct3 = productModel.singleByProductId(newProductCombo.PRODUCTID3);

      Promise.all([addCreatedHistory, loadProduct1, loadProduct2, loadProduct3])
        .then(values => {
          var product1 = values[1][0];
          var product2 = values[2][0];
          var product3 = values[3][0];

          var inventoryCombo = parseInt(newProductCombo.INVENTORY)
          product1.INVENTORY -= inventoryCombo;
          product2.INVENTORY -= inventoryCombo;
          product3.INVENTORY -= inventoryCombo;

          var products = [product1, product2, product3];

          productModel.updateProductInventory(products);
          res.redirect("/admin/product/product-add");
        })
        .catch(next);
    })
    .catch(next);
};

//Thêm dữ liệu vào trang productadd
module.exports.productAdd = function (req, res, next) {
  // Lấy dữ liệu product
  var dataProducts = productModel.allProductInStock();
  //Lấy dữ liệu category
  var dataCategories = categoryModel.allCategory();
  //Lấy dữ liệu sub category
  var dataSubCategories = subCategoryModel.allSubCategoryByCategoryId(1);
  //Lấy dữ liệu từ tag
  var dataTags = tagModel.allTag();

  // Lấy dữ liệu nhãn hiệu
  var dataBrands = brandModel.allBrand();

  Promise.all([dataCategories, dataSubCategories, dataTags, dataBrands, dataProducts])
    .then(values => {
      res.locals.sidebar[5].active = true;

      //Truyền vào trong UI
      res.render("admin/product-add", {
        layout: "main-admin.hbs",
        categories: values[0],
        subCategories: values[1],
        tags: values[2],
        brands: values[3],
        products: values[4]
      });
    })
    .catch(next);
};

//Xử lý post nhận về product-add -- Lưu ý có xử lý cả mảng hình ảnh
module.exports.postProductAdd = function (req, res, next) {
  let listFile = req.files;

  console.log(req.body);
  // Tạo đối tượng để thêm vào cơ sở dữ liệu
  var newProduct = {
    IMAGE: "/uploads/IMG_NOTFOUND.jpg",
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
    VIPSALE: req.body.VIPSALE,
    SHORTDESCRIPTION: req.body.SHORTDESCRIPTION,
    DESCRIPTION: req.body.DESCRIPTION,
    INVENTORY: req.body.INVENTORY
  };

  // // Gọi hàm thêm vào sản phẩm từ model
  // var insertProduct = productModel.addProduct(newProduct);

  // // Gọi hàm thêm vào danh sách hình, tag, product_info_hitory từ model | lưu ý chỉ gọi khi insert thành công
  // insertProduct
  //   .then(productID => {
  //     // Thêm vào tag
  //     var addTagForProduct = tagModel.addTagForProduct(productID, req.body.TAG);
  //     // Thêm vào lịch sử
  //     var addCreatedHistory = productInfoHistoryModel.addCreatedHistory(
  //       productID,
  //       "Thêm",
  //       "Thêm mới"
  //     );

  //     if (listFile) {
  //       // Thêm hình ảnh cho sản phẩm
  //       var uploadImageToFirebaseStorage = uploadImageToStorage(
  //         listFile,
  //         productID,
  //         newProduct
  //       );

  //       Promise.all([
  //         addTagForProduct,
  //         addCreatedHistory,
  //         uploadImageToFirebaseStorage
  //       ])
  //         .then(values => {
  //           res.redirect("/admin/product/product-add");
  //         })
  //         .catch(next);
  //     }
  //   })
  //   .catch(next);
};

const uploadImageToStorage = (listFile, productID, productInfo) => {
  return new Promise((resolve, reject) => {
    if (!listFile) {
      reject("No image file");
    } else {
      var arrImage = [];
      var count = 0;
      listFile.forEach(file => {
        //Đổi tên hình
        let gcsname = Date.now() + file.originalname;
        //Tạo đường dẫn để lưu file
        let fileUpload = bucket.file(`/ProductImages/${productID}/` + gcsname);
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
          // fileUpload.cloudStorageObject = gcsname;
          // fileUpload.makePublic().then(() => {
          //Lấy ra url ảnh
          var url = getPublicUrl(gcsname, productID, uuid);
          arrImage.push(url);

          if (count == 0) {
            productInfo.IMAGE = url;
            productInfo.ID = productID;
            //Cập nhật lại thông tin ảnh đại diện của sản phẩm
            productModel.updateProduct(productInfo).then(changedRowsNumber => {
              uploadResizedImageToStorage(
                gcsname,
                productID,
                productInfo,
                file.mimetype
              )
                .then()
                .catch(err => {
                  reject(err);
                });
            });
          }

          count++;

          if (count == listFile.length) {
            productImageModel.addImagesForProduct(productID, arrImage);
            resolve(arrImage);
          }
          //});
        });

        blobStream.end(file.buffer);
      });
    }
  });
};

const uploadResizedImageToStorage = (
  filename,
  productID,
  productInfo,
  contentType
) => {
  return new Promise((resolve, reject) => {
    //Tạo đường dẫn để lưu file
    var resizedFileName = "resized-" + filename;
    let fileUpload = bucket.file(
      `ProductImages/${productID}/` + resizedFileName
    );

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
      .file(`ProductImages/${productID}/` + filename)
      .createReadStream()
      .pipe(pipeline);

    blobStream.on("error", error => {
      reject(error);
    });

    blobStream.on("finish", () => {
      var url = getPublicUrl(resizedFileName, productID, uuid);

      productInfo.RESIZEDIMAGE = url;
      productInfo.ID = productID;
      productModel
        .updateProduct(productInfo)
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
function getPublicUrl(filename, productID, uuid) {
  //return `https://storage.googleapis.com/${bucketName}/ProductImages/${productID}/${filename}`;
  return (
    "https://firebasestorage.googleapis.com/v0/b/" +
    bucketName +
    "/o/" +
    encodeURIComponent(`ProductImages/${productID}/` + filename) +
    "?alt=media&token=" +
    uuid
  );
}

module.exports.SubCategory = function (req, res, next) {
  //Lấy dữ liệu sub category
  var dataSubCategories = subCategoryModel.allSubCategoryByCategoryId(req.body.CategoryID);
  //Lấy dữ liệu từ tag

  dataSubCategories
    .then(subCategories => {
      res.json(JSON.stringify(subCategories));
    })
    .catch(next);
};

module.exports.productIdByCategoryId = function (req, res, next) {
  //Lấy dữ liệu sub category
  var dataProductIds = productModel.allProductIdByCategoryId(req.body.CategoryID);
  //Lấy dữ liệu từ tag

  dataProductIds
    .then(productIds => {
      res.json(JSON.stringify(productIds));
    })
    .catch(next);
};

module.exports.productByProductId = function (req, res, next) {
  //Lấy dữ liệu sub category
  var dataProduct = productModel.singleByProductId(req.body.ProductID);
  //Lấy dữ liệu từ tag

  dataProduct
    .then(product => {
      res.json(JSON.stringify(product));
    })
    .catch(next);
};

//Xóa sản phẩm, xóa những sản phẩm không có trong combo
module.exports.deleteProduct = (req, res, next) => {
  var id = req.body.ProductID;
  //Kiểm tra số lượng của sản phẩm
  productModel.inventoryProduct(id).then(row => {
    if (row[0].INVENTORY > 0) {
      res.send(false);
    } else {
      //tạo mới product
      var updateProduct = {
        ID: id,
        STATUS: 0
      };

      //Gọi hàm xóa
      productModel.deleteProduct(updateProduct).then(values => {
        res.send(true);
      });
    }
  });
};

//Hiển thị thông tin sản phẩm để update
module.exports.infoProduct = (req, res, next) => {

  //Lấy dữ liệu category
  var dataCategories = categoryModel.allCategory();
  //Lấy dữ liệu sub category
  var dataSubCategories = subCategoryModel.allSubCategoryByProductID(req.params.id);
  //Lấy dữ liệu từ tag
  var dataTags = tagModel.allTag();

  // Lấy dữ liệu nhãn hiệu
  var dataBrands = brandModel.allBrand();

  //Dữ liệu product
  var productinfo = productModel.singleByProductId(req.params.id);

  //Lấy ra tag của sản phẩm
  var productTags = tagModel.allTagOfProduct(req.params.id);

  Promise.all([dataCategories, dataSubCategories, dataTags, dataBrands, productinfo, productTags])
    .then(values => {
      res.locals.sidebar[5].active = true;

      //Truyền vào trong UI
      res.render("admin/product-update", {
        layout: "main-admin.hbs",
        categories: values[0],
        subCategories: values[1],
        tags: values[2],
        brands: values[3],
        productinfo: values[4][0],
        productTags: values[5],
        helpers: {
          // Hàm định dạng title của product combo lấy 52 kí tự
          isSelected: selectedHelper.isSelected,
          isSelectedInTag: selectedHelper.isSelectedInTag
        }
      });
    })
    .catch(next);
};

//Lấy ra hình ảnh của sản phẩm
module.exports.imagesOfProduct = (req, res, next) => {
  var dataImages = productImageModel.allImageOfProduct(req.body.productID);

  dataImages
    .then(Links => {
      res.json(JSON.stringify(Links));
    })
    .catch(next);
};

//Cập nhật thông tin sản phẩm
module.exports.updateProductInfo = (req, res, next) => {
  console.log(req.body);

  //Tạo mới entity
  var productInfo = {
    ID: req.body.ID,
    CATEGORYID: req.body.CATEGORYID,
    SUBCATEGORYID: req.body.SUBCATEGORYID,
    NAME: req.body.NAME,
    BRANDID: req.body.BRANDID,
    PRICE: req.body.PRICE,
    ORIGIN: req.body.ORIGIN,
    KILOGRAM: req.body.KILOGRAM,
    SALE: req.body.SALE,
    VIPSALE: req.body.VIPSALE,
    SHORTDESCRIPTION: req.body.SHORTDESCRIPTION,
    DESCRIPTION: req.body.DESCRIPTION,
    INVENTORY: req.body.INVENTORY
  };

  //Gọi hàm update
  productModel.updateProductInfo(productInfo).then(changerows => {
    productInfoHistoryModel.addCreatedHistory(
      req.body.ID,
      "Sửa",
      "Sửa thông tin"
    );
  });
  tagModel.deleteTagOfProduct(req.body.ID).then(value => {
    tagModel.addTagForProduct(req.body.ID, req.body.TAG);
    res.redirect(req.get('referer'));
  })
};
