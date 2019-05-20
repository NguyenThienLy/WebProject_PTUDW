// Định dạng các option (selected nếu có)
module.exports = function(id, name, selectedOptionId) {
    var selectedProperty = "";
  
    if (selectedOptionId) {
        if (selectedOptionId.indexOf(id.toString()) != -1) {
          selectedProperty = 'selected="selected"';
        }
    }
  
    return (
      '<option value="' + id + '"' + selectedProperty + ">" + name + "</option>"
    );
  };
  