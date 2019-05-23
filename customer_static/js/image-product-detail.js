var objBigImgProduct = document.getElementById("image-product-large");

var objSmallImgProductIndex0 = document.getElementById("image-product-small-index-0");
var objSmallImgProductIndex1 = document.getElementById("image-product-small-index-1");
var objSmallImgProductIndex2 = document.getElementById("image-product-small-index-2");
var objSmallImgProductIndex3 = document.getElementById("image-product-small-index-3");
var objSmallImgProductIndex4 = document.getElementById("image-product-small-index-4");

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

function checkNumber(e, input) {
    let quantity = document.getElementById("quantity").value;
    let code = (e.keyCode ? e.keyCode : e.which);
    if(code == 13) { //Enter keycode
        if (quantity === "" || quantity == 0) {
            quantity = 1;
            document.getElementById("quantity").value = quantity;
        }
    }

    if (parseInt(quantity) > 99) {
        quantity = parseInt(quantity.slice(0,2));
        document.getElementById("quantity").value = quantity;
    }
    
}

function setNumber() {
    let quantity = document.getElementById("quantity").value;
    if (quantity === "") {
        quantity = 1;
        document.getElementById("quantity").value = quantity;
    }
}

function increaseQuantity() {
    let quantity = document.getElementById("quantity").value;

    if(parseInt(quantity) < 99) {
        quantity = parseInt(quantity) + 1;
        document.getElementById("quantity").value = quantity;
    }
}

function decreaseQuantity() {
    let quantity = document.getElementById("quantity").value;

    if(parseInt(quantity) > 1) {
        quantity = parseInt(quantity) - 1;
        document.getElementById("quantity").value = quantity;
    }
}

function formatNumber() {
    let quantity = document.getElementById("quantity").value;
    if (quantity === "") {
        quantity = 1;
        document.getElementById("quantity").value = quantity;
    }
}

window.onload = formatNumber();