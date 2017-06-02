/*
Code drafted on CodePen:

https://codepen.io/Vyren/pen/BRdVeM?editors=1010
*/

var assets = [];
var needed = [];
var exists;
var project = "othello";
var path_to_images = "assets/";

// console.log("assets:", assets);

$.when($.ajax(indexAssets())).then(function() {
    addImages();
});

// Run indexAssets() when clicking on a character's name
$("b").click(function() {
    var assets = [];
    var needed = [];
    console.info("object clicked", this);
    indexAssets();
    addImages();
});

// The "callback" argument is called with either true or false
// depending on whether the image at "url" exists or not.
function imageExists(url, callback) {
    var img = new Image();
    img.onload = function() {
        callback(true);
    };
    img.onerror = function() {
        $("#closeLink").click(function() {
            closeIt(1, false);
        });

        callback(false);
    };
    img.src = url;
}

function indexAssets() {
    console.info("Running function indexAssets()");
    $("b:not([class])").each(function() {
        var assetName = $.trim($(this).text());
        // console.log(assetName);
        var path = 'https://dealien.gitbooks.io/' + project + '/content/' + path_to_images + assetName + '.png';
        // console.log(path);
        console.count("items tested for index");
        imageExists(path, function(exists) {
            console.log("RESULT: url=" + path + ", exists = " + exists);
            if (exists === true) {
                if (assets.indexOf(assetName) == -1) {
                    assets.push(assetName);
                }
                // console.log("assets:", assets);
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
        // console.log(assetName);
        if (assets.indexOf(assetName) != -1) {
            exists = true;
            // console.log("Image exists for", assetName);
            return ('<a href="https://dealien.gitbooks.io/' + project + '/content/' + path_to_images + assetName + '.png class="image-url"><img src="https://dealien.gitbooks.io/' + project + '/content/' + path_to_images + assetName + '.png" id="' + assetName + '" class="character-image"></a><b class="has-asset">' + assetName + '</b>');
        } else {
            exists = false;
            // console.error("Image does not exist for", assetName);
            return '<b id="missing-asset">' + assetName + '</b>';
        }
        // console.log('https://dealien.gitbooks.io/' + project + '/content/' + path_to_images + assetName + '.png');
    });
}

$("span").click(function() {
    copyRef(this);
});

// Automatically copy the "act.scene.line" reference of a line to the clipboard when clicked
function copyRef(line) {
    var reference = $(line).attr("name");
    $(line).append('<textarea id="copy-box">' + reference + '</textarea>');
    document.getElementById('copy-box').select();
    document.execCommand('copy');
    $("#copy-box").remove();

    console.info("Reference copied to clipboard", reference);
}
