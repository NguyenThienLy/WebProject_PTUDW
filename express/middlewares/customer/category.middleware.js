// Gọi categoryModel
var categoryModel = require("../../models/category.model");
// // Gọi subCategoryModel
// var subCategoryModel = require("../../models/sub_category.model");

// Load lên các giá trị của catogory và sub category
module.exports = (req, res, next) => {
  var dataCategories = categoryModel.allWithDetailQuantity();

  dataCategories
    .then(categories => {
      var groups = {};
      for (var i = 0; i < categories.length; i++) {
        var category = {
          IDCAT: categories[i].IDCAT,
          NAMECAT: categories[i].NAMECAT,
          QUANTITYCAT: categories[i].QUANTITYCAT
        };

        var groupName = category.IDCAT;
        if (!groups[groupName]) {
          groups[groupName] = [];
          groups[groupName].push(category);
        }
        
        var subCategory = {
          IDSUB: categories[i].IDSUB,
          NAMESUB: categories[i].NAMESUB,
          QUANTITYSUB: categories[i].QUANTITYSUB
        };

        groups[groupName].push(subCategory);
      }
      var categoriesDetail = [];
      for (var groupName in groups) {
        var category =  groups[groupName][0];
        groups[groupName].shift();

        categoriesDetail.push({ IDCAT: category.IDCAT, NAMECAT: category.NAMECAT, 
                      QUANTITYCAT: category.QUANTITYCAT, SUB: groups[groupName]});
      }

      res.locals.lcCategories = categoriesDetail;

      next();
    })
    .catch(err => {
      console.log(err);
    });
};
