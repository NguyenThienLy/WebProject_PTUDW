var exphbs = require("express-handlebars");
var express_handlebars_sections = require("express-handlebars-sections");

// Gọi formatStringHelper
var formatStringHelper = require("../../helpers/format_string_hide.helper");
// Gọi formatPrice
var formatPriceHelper = require("../../helpers/format_price.helper");

module.exports = function(app) {
  const hbs = exphbs.create({
    layoutsDir: "views/_layouts",
    // Hàm định dạng title của product khi ở fast cart
    helpers: {
      formatTitleProductForFastCart:
        formatStringHelper.formatTitleProductForFastCart,
      formatPrice: formatPriceHelper
    }
  });
  express_handlebars_sections(hbs);

  app.engine("hbs", hbs.engine);
  app.set("view engine", "hbs");
};
