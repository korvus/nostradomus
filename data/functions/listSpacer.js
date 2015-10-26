function listSpacer() {

    var spacerClass = document.getElementsByClassName("spacer");
    var allPics = document.getElementsByTagName('img');

    var a, b = 0;
    for (a = 0; a < allPics.length; a++) {
        var srcAttr = allPics[a].src;
        if (srcAttr.search(/spacer/gi) != -1) {
            b++;
        }
    }

    alert(spacerClass.length + " .spacer element in this page.\n and " + b + " pictures including 'spacer' in it name.");
    console.log(spacerClass.length + " .spacer element in this page.\n and " + b + " pictures including 'spacer' in it name.");

}


// Context menu
self.on("click",function(){
    listSpacer();
});

//From the shortcut
self.port.on('shortcut', function () {
    listSpacer();
});
