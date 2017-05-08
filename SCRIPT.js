/*
Code drafted on CodePen:

https://codepen.io/Vyren/pen/BRdVeM?editors=1010
*/

console.log("");
console.log("");
console.log("");

document.body.onload = start;

var assets = [];
var needed = [];
var exists;
var project = "othello";
var path_to_images = "assets/";
console.log("assets:", assets);

// Set up jQuery function to run the script after switching between GitBook chapters
$("a").on("click", function(e) {
    console.info('Link clicked', this);
    indexAssets();
    return true;
});

$.when($.ajax(indexAssets())).then(function() {
    addImages();
});

function start() {
    testjQuery();
    // // Set up jQuery function to run the script after switching between GitBook chapters
    // $('a').click(function() {
    //     console.info('Link clicked', this);
    //     indexAssets();
    //     return true;
    // });

}

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
                if (assets.indexOf(assetName) == -1) {
                    assets.push(assetName);
                }
                console.log("assets:", assets);
            } else if (exists === false) {
                if (needed.indexOf(assetName) == -1) {
                    needed.push(assetName);
                    console.log("needed:", needed);
                }
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
            return ('<a href="https://dealien.gitbooks.io/' + project + '/content/' + path_to_images + assetName + '.png class="image-url"><img src="https://dealien.gitbooks.io/' + project + '/content/' + path_to_images + assetName + '.png" id="' + assetName + '" class="character-image"></a><b class="have-asset">' + assetName + '</b>');
        } else {
            exists = false;
            console.error("Image does not exist for", assetName);
            return '<b class="missing-asset">' + assetName + '</b>';
        }
        console.log('https://dealien.gitbooks.io/' + project + '/content/' + path_to_images + assetName + '.png');
    });
}
