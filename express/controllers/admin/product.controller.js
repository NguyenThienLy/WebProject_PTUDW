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

//product image model
var productImageModel = require("../../models/product_image.model");

//product_info_history model
var productInfoHistoryModel = require("../../models/product_info_history");

//product_combo_info_history model
var productComboInfoHistoryModel = require("../../models/product_combo_info_history");

// helper
var selectProductComboEditHelper = require("../../helpers/select_product_combo_update.helper");

// Gọi selected helper
var selectedHelper = require("../../helpers/selected_selector.helper");

// Gọi createquery helper
var createQuery = require("../../helpers/create_query.helper");

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
  var categoryID = req.query.catid || 0;
  var subCategoryID = req.query.subcatid || 0;
  var brandID = req.query.brandid || 0;

  var objQuery = {
    catID: categoryID,
    subCatID: subCategoryID,
    BrandID: brandID
  };

  if (page < 1) {
    page = 1;
  }

  if (page < 1) {
    limit = 4;
  }

  var offset = (page - 1) * limit;

  // Lấy dữ liệu nhãn hiệu
  var dataBrands = brandModel.allBrand();

  // Lấy dữ liệu sản phẩm
  var dataProducts = productModel.pageallProductFilter(limit, offset, objQuery);

  // Lấy dữ liệu sản phẩm combo
  var dataProductCombos = productComboModel.allProductCombos();

  // Lấy dữ liệu category
  var dataCategories = categoryModel.allCategory();

  // Lấy dữ liệu sub category
  var dataSubCategories = subCategoryModel.allSubCategoryByCategoryId(
    categoryID
  );

  var numberPage = productModel.quantityProductActive(objQuery);

  Promise.all([
    dataBrands,
    dataProducts,
    dataProductCombos,
    dataCategories,
    dataSubCategories,
    numberPage
  ])
    .then(values => {
      res.locals.sidebar[4].active = true;

      var total = values[5][0].QUANTITY;
      var nPages = Math.floor(total / limit);
      if (total % limit > 0) nPages++;

      //Chỉ hiện tối đa 5 trang
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

      //Truyền vào trong UI
      res.render("admin/product-show", {
        layout: "main-admin.hbs",
        brands: values[0],
        products: values[1],
        productCombos: values[2],
        categories: values[3],
        subCategories: values[4],
        pages: pages,
        prePage: prePage,
        nextPage: nextPage,
        categoryID: categoryID,
        subCategoryID: subCategoryID,
        brandID: brandID,
        helpers: {
          isSelected: selectedHelper.isSelected,
          createQuery: createQuery.createQuery
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

      var loadProduct1 = productModel.singleByProductId(
        newProductCombo.PRODUCTID1
      );
      var loadProduct2 = productModel.singleByProductId(
        newProductCombo.PRODUCTID2
      );
      var loadProduct3 = productModel.singleByProductId(
        newProductCombo.PRODUCTID3
      );

      Promise.all([addCreatedHistory, loadProduct1, loadProduct2, loadProduct3])
        .then(values => {
          var product1 = values[1][0];
          var product2 = values[2][0];
          var product3 = values[3][0];

          var inventoryCombo = parseInt(newProductCombo.INVENTORY);

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

  // Lấy dữ liệu nhãn hiệu
  var dataBrands = brandModel.allBrand();

  Promise.all([dataCategories, dataSubCategories, dataBrands, dataProducts])
    .then(values => {
      res.locals.sidebar[5].active = true;

      //Truyền vào trong UI
      res.render("admin/product-add", {
        layout: "main-admin.hbs",
        categories: values[0],
        subCategories: values[1],
        brands: values[2],
        products: values[3]
      });
    })
    .catch(next);
};

//Xử lý post nhận về product-add -- Lưu ý có xử lý cả mảng hình ảnh
module.exports.postProductAdd = function (req, res, next) {
  let listFile = req.files;

  // Tạo đối tượng để thêm vào cơ sở dữ liệu
  var newProduct = {
    IMAGE: "/uploads/IMG_NOTFOUND.jpg",
    RESIZEDIMAGE: "/uploads/IMG_NOTFOUND.jpg",
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

  // Gọi hàm thêm vào sản phẩm từ model
  var insertProduct = productModel.addProduct(newProduct);

  // Gọi hàm thêm vào danh sách hình, tag, product_info_hitory từ model | lưu ý chỉ gọi khi insert thành công
  insertProduct
    .then(productID => {
      // Thêm vào lịch sử
      var addCreatedHistory = productInfoHistoryModel.addCreatedHistory(
        productID,
        "Thêm",
        "Thêm mới"
      );

      if (listFile) {
        // Thêm hình ảnh cho sản phẩm
        var uploadImageToFirebaseStorage = uploadImageToStorage(
          listFile,
          productID,
          newProduct
        );

        Promise.all([addCreatedHistory, uploadImageToFirebaseStorage])
          .then(values => {
            res.redirect("/admin/product/product-add");
          })
          .catch(next);
      }
    })
    .catch(next);
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
        let gcsname = Date.now() + "-" + file.originalname;
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
  var dataSubCategories = subCategoryModel.allSubCategoryByCategoryId(
    req.body.CategoryID
  );
  //Lấy dữ liệu từ tag

  dataSubCategories
    .then(subCategories => {
      res.json(JSON.stringify(subCategories));
    })
    .catch(next);
};

module.exports.productIdByCategoryId = function (req, res, next) {
  var catID = req.body.CategoryID;
  var dataProductIds;

  if (catID !== "-1") {
    dataProductIds = productModel.allProductIdByCategoryId(catID);
  } else {
    dataProductIds = productModel.allProductInStock();
  }

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
module.exports.postDeleteProduct = (req, res, next) => {
  var productID = req.body.ProductID;

  //Kiểm tra số lượng của sản phẩm
  var inventoryProduct = productModel.inventoryProduct(productID);

  //Kiểm tra sản phẩm có trong combo ko
  var isInProductCombo = productComboModel.isInProductCombo(productID);

  Promise.all([inventoryProduct, isInProductCombo]).then(values => {
    var inventory = values[0];
    var isInProductCombo = values[1];

    if (inventory[0].INVENTORY > 0) {
      res.send(false);
    } else if (isInProductCombo) {
      res.send(false);
    } else {
      //tạo mới product
      var updateProduct = {
        ID: productID,
        STATUS: 0
      };

      //Gọi hàm xóa
      productModel.deleteProduct(updateProduct).then(changedRowsNumber => {
        res.send(true);
      });
    }
  });
};

//Hiển thị thông tin sản phẩm để update
module.exports.productUpdate = (req, res, next) => {
  //Lấy dữ liệu category
  var dataCategories = categoryModel.allCategory();

  //Lấy dữ liệu sub category
  var dataSubCategories = subCategoryModel.allSubCategoryByProductID(
    req.params.id
  );

  // Lấy dữ liệu nhãn hiệu
  var dataBrands = brandModel.allBrand();

  //Dữ liệu product
  var productInfo = productModel.singleByProductId(req.params.id);

  Promise.all([dataCategories, dataSubCategories, dataBrands, productInfo])
    .then(values => {
      res.locals.sidebar[4].active = true;

      //Truyền vào trong UI
      res.render("admin/product-update", {
        layout: "main-admin.hbs",
        categories: values[0],
        subCategories: values[1],
        brands: values[2],
        productinfo: values[3][0],
        helpers: {
          isSelected: selectedHelper.isSelected,
          isSelectedInTag: selectedHelper.isSelectedInTag
        }
      });
    })
    .catch(next);
};

//Cập nhật thông tin sản phẩm
module.exports.postProductUpdate = (req, res, next) => {
  var productID = req.body.ID;

  //Tạo mới entity
  var product = {
    ID: productID,
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
  productModel
    .updateProduct(product)
    .then(changedRowsNumber => {
      productInfoHistoryModel
        .addCreatedHistory(productID, "Cập nhật", "Cập nhật thông tin")
        .then(createdHistoryId => {
          res.redirect(req.get("referer"));
        })
        .catch(next);
    })
    .catch(next);
};

//Lấy ra hình ảnh của sản phẩm
module.exports.productImages = (req, res, next) => {
  var dataImages = productImageModel.allImageOfProduct(req.body.productID);

  dataImages
    .then(Links => {
      res.json(JSON.stringify(Links));
    })
    .catch(next);
};

//Cập nhật hình ảnh của sản phẩm
module.exports.postProductImagesUpdate = (req, res, next) => {
  let listFile = req.files;
  var productID = req.body.ID;

  var product = {
    ID: productID,
    IMAGE: "/uploads/IMG_NOTFOUND.jpg",
    RESIZEDIMAGE: "/uploads/IMG_NOTFOUND.jpg"
  };

  var updateProduct = productModel.updateProduct(product);
  var deleteProductImages = productImageModel.deleteProductImageByProductID(
    productID
  );

  Promise.all([updateProduct, deleteProductImages])
    .then(values => {
      if (listFile) {
        // Thêm hình ảnh cho sản phẩm
        var uploadImageToFirebaseStorage = uploadImageToStorage(
          listFile,
          productID,
          product
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

module.exports.productComboUpdate = (req, res, next) => {
  var id = +req.params.id;

  // Lấy dữ liệu product
  var dataProducts = productModel.allProductInStock();

  // Lấy dữ liệu product combo theo id
  var dataProductCombo = productComboModel.singleByProductComboId(id);

  //Lấy dữ liệu category
  var dataCategories = categoryModel.allCategory();

  Promise.all([dataProductCombo, dataProducts, dataCategories])
    .then(values => {
      res.locals.sidebar[4].active = true;

      //Truyền vào trong UI
      res.render("admin/product-combo-update", {
        layout: "main-admin.hbs",
        productCombo: values[0][0],
        products: values[1],
        categories: values[2],
        helpers: {
          isSelected: selectProductComboEditHelper.isSelected,
          isExistedInProducts: selectProductComboEditHelper.isExistedInProducts
        }
      });
    })
    .catch(next);
};

module.exports.postProductComboUpdate = async (req, res, next) => {
  // Tạo đối tượng để thêm vào cơ sở dữ liệu
  var oldProId1 = req.body.OLDPRODUCTID1;
  var oldProId2 = req.body.OLDPRODUCTID2;
  var oldProId3 = req.body.OLDPRODUCTID3;
  var listNewProductId = [
    req.body.PRODUCTID1,
    req.body.PRODUCTID2,
    req.body.PRODUCTID3
  ];
  var oldComboInventory = parseInt(req.body.OLDINVENTORY);
  var newComboInventory = parseInt(req.body.INVENTORY);

  var productCombo = {
    ID: req.body.ID,
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
    INVENTORY: req.body.INVENTORY,
    CREATED: req.body.CREATED
  };

  // Cập nhật SL cho những product cũ trong product combo
  // Nếu đã đổi pro1 cũ thì cập nhật lại SL
  if (isChanged(oldProId1, listNewProductId)) {
    var oldProduct1 = await productModel.singleByProductId(oldProId1);
    oldProduct1[0].INVENTORY += oldComboInventory;

    await productModel.updateProduct(oldProduct1[0]);
  } else {
    var oldProduct1 = await productModel.singleByProductId(oldProId1);
    if (newComboInventory > oldComboInventory) {
      oldProduct1[0].INVENTORY -= newComboInventory - oldComboInventory;
    } else {
      oldProduct1[0].INVENTORY += oldComboInventory - newComboInventory;
    }

    await productModel.updateProduct(oldProduct1[0]);
  }

  // Nếu đã đổi pro2 cũ thì cập nhật lại SL
  if (isChanged(oldProId2, listNewProductId)) {
    var oldProduct2 = await productModel.singleByProductId(oldProId2);
    oldProduct2[0].INVENTORY += oldComboInventory;

    await productModel.updateProduct(oldProduct2[0]);
  } else {
    var oldProduct2 = await productModel.singleByProductId(oldProId2);
    if (newComboInventory > oldComboInventory) {
      oldProduct2[0].INVENTORY -= newComboInventory - oldComboInventory;
    } else {
      oldProduct2[0].INVENTORY += oldComboInventory - newComboInventory;
    }

    await productModel.updateProduct(oldProduct2[0]);
  }

  // Nếu đã đổi pro3 cũ thì cập nhật lại SL
  if (isChanged(oldProId3, listNewProductId)) {
    var oldProduct3 = await productModel.singleByProductId(oldProId3);
    oldProduct3[0].INVENTORY += oldComboInventory;

    await productModel.updateProduct(oldProduct3[0]);
  } else {
    var oldProduct3 = await productModel.singleByProductId(oldProId3);
    if (newComboInventory > oldComboInventory) {
      oldProduct3[0].INVENTORY -= newComboInventory - oldComboInventory;
    } else {
      oldProduct3[0].INVENTORY += oldComboInventory - newComboInventory;
    }

    await productModel.updateProduct(oldProduct3[0]);
  }
  // End cập nhật SL cho những product cũ trong product combo

  // Cập nhật SL cho những product mới trong product combo
  var listNewProId = getListNewProductId(
    oldProId1,
    oldProId2,
    oldProId3,
    listNewProductId
  );

  listNewProId.forEach(newProId => {
    productModel
      .singleByProductId(newProId)
      .then(newPro => {
        newPro[0].INVENTORY -= newComboInventory;
        productModel
          .updateProduct(newPro[0])
          .then()
          .catch(next);
      })
      .catch(next);
  });

  // Gọi hàm thêm vào sản phẩm từ model
  var updateProductCombo = productComboModel.updateProductCombo(productCombo);

  // Gọi hàm thêm vào danh sách hình, tag, product_info_hitory từ model | lưu ý chỉ gọi khi insert thành công
  updateProductCombo
    .then(changedRowsNumber => {
      // Thêm vào lịch sử
      var addCreatedHistory = productComboInfoHistoryModel.addCreatedHistory(
        req.body.ID,
        "Cập nhật",
        "Cập nhật thông tin"
      );

      addCreatedHistory
        .then(createdHistoryId => {
          //res.redirect("/admin/product/product-show");
          res.redirect(req.get("referer"));
        })
        .catch(next);
    })
    .catch(next);
};

//Xóa sản phẩm, xóa những sản phẩm không có trong combo
module.exports.postDeleteProductCombo = (req, res, next) => {
  var productComboID = req.body.ProductComboID;

  //Kiểm tra số lượng của sản phẩm
  productComboModel
    .inventoryProductCombo(productComboID)
    .then(inventory => {
      if (inventory[0].INVENTORY > 0) {
        res.send(false);
      } else {
        //tạo mới product combo
        var updateProductCombo = {
          ID: productComboID,
          STATUS: 0
        };

        //Gọi hàm xóa
        productComboModel
          .deleteProductCombo(updateProductCombo)
          .then(values => {
            res.send(true);
          })
          .catch(next);
      }
    })
    .catch(next);
};

function isChanged(oldProductId, listNewProductId) {
  var isTrue = true;
  listNewProductId.forEach(newProductId => {
    if (oldProductId === newProductId) {
      isTrue = false;
    }
  });

  return isTrue;
}

function getListNewProductId(
  oldProId1,
  oldProId2,
  oldProId3,
  listNewProductId
) {
  var listNewProId = [];
  listNewProductId.forEach(newProductId => {
    if (
      newProductId !== oldProId1 &&
      newProductId !== oldProId2 &&
      newProductId !== oldProId3
    ) {
      listNewProId.push(newProductId);
    }
  });

  return listNewProId;
}
