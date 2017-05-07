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
var project = "othello";
var path_to_images = "assets/";
// var path_to_images = "images/buttons/";
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
    $("b:not([class])").each(function() {
        var assetName = $.trim($(this).text());
        console.log(assetName);
        var path = 'https://dealien.gitbooks.io/' + project + '/content/' + path_to_images + assetName + '.png';
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
    $("b:not([class])").replaceWith(function() {
        var assetName = $.trim($(this).text());
        console.log(assetName);
        if (assets.indexOf(assetName) != -1) {
            exists = true;
            console.log("Image exists for", assetName);
            return ('<img src="https://dealien.gitbooks.io/' + project + '/content/' + path_to_images + assetName + '.png" id="' + assetName + ' character-image"><b class="have-asset">' + assetName + '</b>');
        } else {
            exists = false;
            console.error("Image does not exist for", assetName);
            return '<b class="missing-asset">' + assetName + '</b>';
        }
        console.log('https://dealien.gitbooks.io/' + project + '/content/' + path_to_images + assetName + '.png');
    });
}
