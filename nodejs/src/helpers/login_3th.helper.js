module.exports.IsLogin3Th = function(v1, options) {
    if(v1 == 'google' || v1 == 'facebook') {
        return options.fn(this);
      }
    return options.inverse(this);
};