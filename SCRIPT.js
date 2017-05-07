/*
Code drafted on CodePen:

https://codepen.io/Vyren/pen/BRdVeM?editors=1010
*/

console.log("");
console.log("");
console.log("");

document.body.onload = start;

var assets = [];
var exists;
var path_to_images = "images/";
var path_to_button_images = "images/buttons/";

console.log("assets:", assets);

function start() {
testjQuery();
// indexAssets();
}

$.when($.ajax(indexAssets())).then(function() {
addImages();
});

function testjQuery() {
if (!window.jQuery) {
console.error("jQuery is not loaded");
} else {
console.info("jQuery is loaded");
}
}

// The "callback" argument is called with either true or false
// depending on whether the image at "url" exists or not.
function imageExists(url, callback) {
var img = new Image();
img.onload = function() {
callback(true);
};
img.onerror = function() {
callback(false);
};
img.src = url;
}

function indexAssets() {
console.info("Running function indexAssets()");
$("span:not([class])").each(function() {
var assetName = $.trim($(this).text());
console.log(assetName);
var path =
"https://dealien.gitbooks.io/vr-camera-handbook/content/" +
path_to_button_images +
assetName +
".png";
console.log(path);
console.count("items tested for index");
imageExists(path, function(exists) {
console.log("RESULT: url=" + path + ", exists = " + exists);
if (exists === true) {
assets.push(assetName);
console.log("assets:", assets);
}
});
});
}

function addImages() {
console.info("Running function addImages()");
$("span:not([class])").replaceWith(function() {
var assetName = $.trim($(this).text());
console.log(assetName);
if (assets.indexOf(assetName) != -1) {
exists = true;
console.log("Image exists for", assetName);
return (
'<img src="https://dealien.gitbooks.io/vr-camera-handbook/content/' +
path_to_button_images +
assetName +
'.png" width=24 height=24 align="middle" id="' +
assetName +
'">'
);
} else {
exists = false;
console.error("Image does not exist for", assetName);
return '<span class="missing-asset">' + assetName + "</span>";
}
console.log(
"https://dealien.gitbooks.io/vr-camera-handbook/content/" +
path_to_button_images +
assetName +
".png"
);
});

// Add all other images
$("span.img").each(function() {
var assetName = $.trim($(this).text());
console.log(assetName);
var path =
"https://dealien.gitbooks.io/vr-camera-handbook/content/" +
path_to_images +
assetName +
".JPG";
console.log(path);
var addedImage = {
name: assetName,
location: path_to_images,
path: path,
exists: imageExists(path, function(exists) {
return exists;
})
};
console.log("Added image", addedImage);
var content =
'<a href="' +
path +
'"><figure><img src="' +
path +
'" alt=""></figure></a>';
$(this).replaceWith(content);
});
}


