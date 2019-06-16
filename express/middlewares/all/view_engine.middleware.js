var exphbs = require("express-handlebars");
var express_handlebars_sections = require("express-handlebars-sections");

// Gọi formatStringHelper
var formatStringHelper = require("../../helpers/format_string_hide.helper");
// Gọi formatPrice
var formatPriceHelper = require("../../helpers/format_price.helper");
//Gọi helper so sánh
var selectedHelper = require("../../helpers/selected_selector.helper");
var loginHelper = require("../../helpers/login_3th.helper");
module.exports = function (app) {
  const hbs = exphbs.create({
    layoutsDir: "views/_layouts",
    // Hàm định dạng title của product khi ở fast cart
    helpers: {
      formatTitleProductForFastCart:
        formatStringHelper.formatTitleProductForFastCart,
      formatPrice: formatPriceHelper,
      isEqual: selectedHelper.isSelected,
      is3ThLogin: loginHelper.IsLogin3Th
    }
  });
  express_handlebars_sections(hbs);

  app.engine("hbs", hbs.engine);
  app.set("view engine", "hbs");
};
