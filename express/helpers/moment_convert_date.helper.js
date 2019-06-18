var moment = require("moment");

module.exports.FormatDate = (value)=>{
    if(value){
        return moment(value).format('DD-MM-YYYY');
    }
}

module.exports.FormatDatePicker = (value)=>{
    if(value){
        return moment(value).format('DD/MM/YYYY');
    }
}