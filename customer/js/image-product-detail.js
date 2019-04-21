var objBigImgProduct = document.getElementById("img-big-img-product");

var objSmallImgProductIndex0 = document.getElementById("img-small-img-product-index-0");
var objSmallImgProductIndex1 = document.getElementById("img-small-img-product-index-1");
var objSmallImgProductIndex2 = document.getElementById("img-small-img-product-index-2");
var objSmallImgProductIndex3 = document.getElementById("img-small-img-product-index-3");
var objSmallImgProductIndex4 = document.getElementById("img-small-img-product-index-4");

objSmallImgProductIndex0.addEventListener("click", function(){
    showImage(objSmallImgProductIndex0)
}, false);

objSmallImgProductIndex1.addEventListener("click", function(){
    showImage(objSmallImgProductIndex1)
}, false);

objSmallImgProductIndex2.addEventListener("click", function(){
    showImage(objSmallImgProductIndex2)
}, false);

objSmallImgProductIndex3.addEventListener("click", function(){
    showImage(objSmallImgProductIndex3)
}, false);

objSmallImgProductIndex4.addEventListener("click", function(){
    showImage(objSmallImgProductIndex4)
}, false);

function showImage(smallImage) { 
    objBigImgProduct.src = smallImage.src;
}