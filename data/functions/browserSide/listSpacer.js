function listSpacer(consolog) {

    var spacerClass = document.getElementsByClassName("spacer");
    var allPics = document.getElementsByTagName('img');

    var a, b = 0;
    for (a = 0; a < allPics.length; a++) {
        var srcAttr = allPics[a].src;
        if (srcAttr.search(/spacer/gi) != -1) {
            b++;
        }
    }
    
    const nbrSpacer = [b, spacerClass.length];

    self.postMessage(nbrSpacer);
    self.port.emit("panelize", nbrSpacer);
    console.log(spacerClass.length+b + " " + consolog);

}


// Context menu
self.on("click", function (node, data) {
    listSpacer(data);
});

//From the shortcut
self.port.on('shortcut', function () {
    listSpacer(self.options.consolog);
});
