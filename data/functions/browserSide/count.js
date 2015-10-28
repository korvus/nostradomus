/* jshint moz: true */

function ct(consolog) {
    let allNodes = document.getElementsByTagName('*').length;

    console.log(allNodes + " " + consolog);
    self.postMessage(allNodes);
    self.port.emit("panelize", allNodes);

}

//From the context-menu
self.on("click", function (node, data) {
    ct(data);
});

//From the shortcut
self.port.on('shortcut', function () {
    ct(self.options.consolog);
});
