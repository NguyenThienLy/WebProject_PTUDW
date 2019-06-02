var my = "";
function compress(e, oldimage) {
  var dataUrl = oldimage.src;
  if (dataUrl !== my) {
      console.log("hiiiii");
    var imageType,
      oldWidth,
      oldHeight,
      newWidth,
      newHeight,
      canvas,
      newDataUrl,
      imageArguments;
    var dotIndex = dataUrl.lastIndexOf(".");
    var ext = dataUrl.substring(dotIndex);

    if (ext === ".jpg" || ext === ".jpeg") {
      imageType = "image/jpeg";
    } else {
      imageType = "image/png";
    }

    // Provide default values
    imageArguments = 0.5;
    // Create a temporary image so that we can compute the height of the downscaled image.
    var image = new Image();
    image.src = dataUrl;

    oldWidth = oldimage.width;
    oldHeight = oldimage.height;
    newWidth = oldWidth;
    newHeight = oldHeight;

    // Create a temporary canvas to draw the downscaled image on.
    canvas = document.createElement("canvas");
    canvas.width = oldWidth;
    canvas.height = oldHeight;
    var ctx = canvas.getContext("2d");

    // Draw the downscaled image on the canvas and return the new data URL.
    ctx.drawImage(image, 0, 0, newWidth, newHeight);
    newDataUrl = canvas.toDataURL(imageType, imageArguments);
    my = newDataUrl;
    oldimage.onload = null;
    oldimage.src = newDataUrl;
  }
}
