// Hàm kiểm tra xem giá id category|subcategory|tag có được selected
module.exports.isSelected = function(v1, v2, options) {
    if(v1 == v2) {
        return options.fn(this);
      }
    return options.inverse(this);
};

//Kiểm tra xem id tag có nằm trong list giá trị hay không
module.exports.isSelectedInTag = function(tagID, ListTags, options) {
    var isTrue = false;
    if(ListTags.constructor === Array){
        ListTags.forEach(tag => {
            if(tag.ID === tagID){
                isTrue=true;
            }
        });
        if(isTrue){
            return options.fn(this);
        }else{
            return options.inverse(this);
        }    
    }
    else{
        if(ListTags.ID == tagID){
            return options.fn(this);
        }else{
            return options.inverse(this);
        }
    }   
};