/* jshint moz: true */

function ct() {
    let allNodes = document.getElementsByTagName('*').length;
    console.log(allNodes);
    self.postMessage(allNodes);
}

//From the context-menu
self.on("click", ct);

//From the shortcut
self.port.on('shortcut', ct);
