// Gọi categoryModel
var categoryModel = require("../../models/category.model");
// // Gọi subCategoryModel
// var subCategoryModel = require("../../models/sub_category.model");

// Load lên các giá trị của catogory và sub category
module.exports = (req, res, next) => {
  var dataCategories = categoryModel.allWithDetailQuantity();

  dataCategories
    .then(categories => {

     
      //category.SUB = subCategories;
      //res.locals.lcCategories = categories;

      console.log(categories);
      // console.log(subCategories);
     // console.log(myArray);

      next();
    })
    .catch(err => {
      console.log(err);
    });
};
