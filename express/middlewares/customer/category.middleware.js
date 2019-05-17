// Gọi categoryModel
var categoryModel = require("../../models/category.model");
// Gọi subCategoryModel
var subCategoryModel = require("../../models/sub_category.model");

// Load lên các giá trị của catogory và sub category
module.exports = (req, res, next) => {
  var dataCategories = categoryModel.allWithDetailQuantity();
  var dataSubCategories = subCategoryModel.allSubCategoryWithDetailQuantity(5);

  //   subCategoryModel.allSubCategoryWithDetailQuantity(5).then(subCategories => {
  //     console.log(subCategories);
  //   });

  //   dataCategories.then(categories => {
  //     //   console.log("categories",categories[]);
  //     //   console.log("categories",categories);
  //     subCategoryModel.allSubCategoryWithDetailQuantity(5).then(subCategories => {
  //       res.locals.lcCategories = categories;
  //       res.locals.lcSubCategories = subCategories;

  //       console.log(categories);
  //       console.log(subCategories);

  //       next();
  //     });
  //   });

  dataCategories.then(categories => {
    //   console.log("categories",categories[]);
    //   console.log("categories",categories);
    res.locals.lcCategories = categories;

    next();
  });
};

// Handlebars.registerHelper("ifIsNthItem", function() {
//     //  var subCategories =;

//     return  `<a class="dropdown-item" href="product-show.html">Rau cu 1</a>`;
// });
