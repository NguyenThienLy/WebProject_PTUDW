var objBigImgProduct = document.getElementById("image-product-large");

var objSmallImgProductIndex0 = document.getElementById(
  "image-product-small-index-0"
);
var objSmallImgProductIndex1 = document.getElementById(
  "image-product-small-index-1"
);
var objSmallImgProductIndex2 = document.getElementById(
  "image-product-small-index-2"
);
var objSmallImgProductIndex3 = document.getElementById(
  "image-product-small-index-3"
);
var objSmallImgProductIndex4 = document.getElementById(
  "image-product-small-index-4"
);

objSmallImgProductIndex0.addEventListener(
  "click",
  function() {
    var newimage = new Image();
    compress(newimage, objSmallImgProductIndex0);
    showImage(newimage);
  },
  false
);

objSmallImgProductIndex1.addEventListener(
  "click",
  function() {
    var newimage = new Image();
    compress(newimage, objSmallImgProductIndex1);
    showImage(newimage);
  },
  false
);

objSmallImgProductIndex2.addEventListener(
  "click",
  function() {
    var newimage = new Image();
    compress(newimage, objSmallImgProductIndex2);
    showImage(newimage);
  },
  false
);

objSmallImgProductIndex3.addEventListener(
  "click",
  function() {
    var newimage = new Image();
    compress(newimage, objSmallImgProductIndex3);
    showImage(newimage);
  },
  false
);

objSmallImgProductIndex4.addEventListener(
  "click",
  function() {
    var newimage = new Image();
    compress(newimage, objSmallImgProductIndex4);
    showImage(newimage);
  },
  false
);

function showImage(smallImage) {
  objBigImgProduct.src = smallImage.src;
}

function checkNumber(e, input) {
  let quantity = document.getElementById("quantity").value;
  let code = e.keyCode ? e.keyCode : e.which;
  if (code == 13) {
    //Enter keycode
    if (quantity === "" || quantity == 0) {
      quantity = 1;
      document.getElementById("quantity").value = quantity;
    }
  }

  if (parseInt(quantity) > 99) {
    quantity = parseInt(quantity.slice(0, 2));
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

  if (parseInt(quantity) < 99) {
    quantity = parseInt(quantity) + 1;
    document.getElementById("quantity").value = quantity;
  }
}

function decreaseQuantity() {
  let quantity = document.getElementById("quantity").value;

  if (parseInt(quantity) > 1) {
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

function compress(newimage, oldimage) {
  var dataUrl = oldimage.src;

  console.log("baaaaa");
  var imageType, oldWidth, oldHeight, canvas, newDataUrl, imageArguments;
  var dotIndex = dataUrl.lastIndexOf(".");
  var ext = dataUrl.substring(dotIndex);

  if (ext === ".jpg" || ext === ".jpeg") {
    imageType = "image/jpeg";
  } else {
    imageType = "image/png";
  }

  // Provide default values
  imageArguments = 1;
  // Create a temporary image so that we can compute the height of the downscaled image.
  var image = new Image();
  image.src = dataUrl;

  oldWidth = oldimage.width;
  oldHeight = oldimage.height;

  // Create a temporary canvas to draw the downscaled image on.
  canvas = document.createElement("canvas");
  canvas.width = oldWidth;
  canvas.height = oldHeight;
  var ctx = canvas.getContext("2d");

  // Draw the downscaled image on the canvas and return the new data URL.
  ctx.drawImage(image, 0, 0, newWidth, newHeight);
  newDataUrl = canvas.toDataURL(imageType, imageArguments);
  newimage.src = newDataUrl;
}

window.onload = formatNumber();
