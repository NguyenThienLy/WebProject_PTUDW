// Gọi categoryModel
var categoryModel = require("../../models/category.model")

// Load lên các giá trị của catogory và sub category
module.exports = (req, res, next) => {
    var dataCategories = categoryModel.allWithDetailQuantity();
    
    dataCategories.then(rows => {
        res.locals.lcCategories = rows;
        
        console.log("haha", rows);
        next();
    })
}