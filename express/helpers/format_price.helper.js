var numeral = require('numeral');

// Hiển thị rating theo value
module.exports = function(value) {
    return numeral(value).format('0,0');
};