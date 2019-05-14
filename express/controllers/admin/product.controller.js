// Gọi productmodel
var productModel = require("../../models/product.model");
// Gọi branchModel
var brandModel = require("../../models/brand.model");
// Gọi categoryModel
var categoryModel = require("../../models/category.model");
// Gọi categoryLv2Model
var categoryLv2Model = require("../../models/category_level_2.model");

//Gọi tagmodel
var tagModel = require("../../models/tag.model");

//product imamge model
var productImageModel  = require('../../models/product_image.model');

//product_info_history model
var productInfoHistoryModel = require('../../models/product_info_history');

// Thêm dữ liệu vào trang product
module.exports.productShow = function(req, res) {
  // Lấy dữ liệu sản phẩm
  var dataProducts = productModel.allProduct();

  // Lấy dữ liệu nhãn hiệu
  var dataBrands = brandModel.allBrand();

  // Lấy dữ liệu category1
  var dataCategoryLv1 = categoryModel.allCategory();
  
  // Lấy dữ liệu category2
  var dataCategoryLv2 = categoryLv2Model.allSubCategory(1);


  dataProducts.then(products => {
    dataBrands.then(brands => {
      dataCategoryLv1.then(categorylv1 => {
        dataCategoryLv2.then(categorylv2 => {
          //Truyền vào trong UI
          res.render("admin/product-show", {
            layout: "main-admin.hbs",
            brands: brands,
            products: products,
            categorylv1s: categorylv1,
            categorylv2s: categorylv2
          });
        });
      });
    });
  });
};

//Xử lý post nhận về product-add -- Lưu ý có xử lý cả mảng hình ảnh
module.exports.productAddNew = function (req, res) {

  //Lấy ra đường dẫn của file ảnh up lên
  //var pathImage = '\\'+req.file.path.split('\\').slice(1).join('\\');
  var pathImages = req.files;

  //Tạo mảng lưu link hình sản phẩm nhận về từ post
  var arrImage = [];
  
  pathImages.forEach(element => {
    var pathImages = '\\' + element.path.split('\\').slice(1).join('\\');
    arrImage.push(pathImages);
  });

  //End Tạo mảng lưu link hình sản phẩm nhận về từ post

  //Lấy ra ảnh làm hình đại diện
  var imageAvatar = arrImage[0];

  //Tạo đối tượng để thêm vào cơ sở dữ liệu
  var entity={
    IMAGE: imageAvatar,
    CATEGORYID: req.body.CATEGORYID,
    SUBCATEGORYID: req.body.SUBCATEGORYID,
    NAME: req.body.NAME,
    BRANDID: req.body.BRANDID,
    STATUS: 1,
    RATE: 0,
    PRICE:req.body.PRICE,
    ORIGIN: req.body.ORIGIN,
    KILOGRAM: req.body.KILOGRAM,
    SALE: req.body.SALE,
    VIPSALE: 0,
    DESCRIPTION: req.body.contain,
    INVENTORY: req.body.INVENTORY,
  };

 
  //Gọi hàm thêm vào sản phẩm từ model
  var insertProduct = productModel.addProduct(entity);

  //Gọi hàm thêm vào danh sách hình, tag, product_info_hitory từ model | lưu ý chỉ gọi khi insert thành công
  insertProduct.then(productID => {
    //Thêm hình ảnh
    productImageModel.addImagesForProduct(productID, arrImage);
    //Thêm vào tag
    tagModel.addTagForProduct(productID,req.body.TAG);
    //Thêm vào lịch sử
    productInfoHistoryModel.addCreatedHistory(productID,'Tạo','Tạo mới');
  });
  //Thông báo thêm sản phẩm mới thành công

  //Trả về màn hình tất cả sản phẩm
  res.redirect('product-show');
};



//Thêm dữ liệu vào trang productadd
module.exports.productAdd = function(req, res) {
  //Lấy dữ liệu nhãn hiệu
  var dataBrands = brandModel.allBrand();

  //Lấy dữ liệu category1
  var dataCategoryLv1 = categoryModel.allCategory();
  //Lấy dữ liệu category2
  var dataCategoryLv2 = categoryLv2Model.allSubCategory(1);

  //Lấy dữ liệu từ tag
  var tags = tagModel.allTag();

  dataBrands.then(brands => {
    dataCategoryLv1.then(categorylv1 => {
      dataCategoryLv2.then(categorylv2 => {
        tags.then(tags =>{
            //Truyền vào trong UI
            res.render("admin/product-add", {
              layout: "main-admin.hbs",
              brands: brands,
              categorylv1s: categorylv1,
              categorylv2s: categorylv2,
              tags:tags
            });
        });
      });
    });
  });
};
