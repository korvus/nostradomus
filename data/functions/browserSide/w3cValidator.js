/* jshint moz: true */

function getAllDocument() {

    var dtype = (document.doctype) ? new XMLSerializer().serializeToString(document.doctype) : "";
    var rawHtml = document.documentElement.outerHTML;
    var wholePage = dtype + rawHtml;

    self.postMessage(wholePage);
    self.port.emit("panelize", wholePage);

}

//Trigger by context menu
self.on("click", function (node) {
    getAllDocument();
});

//Trigger by shortcut
self.port.on('shortcut', function () {
    getAllDocument();
});