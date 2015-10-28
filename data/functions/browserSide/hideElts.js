/* jshint moz: true */

function hidElts(consolog) {

    var allDomElts = document.body.getElementsByTagName('*');

    var a, b = 0;
    var style = {};
    for (a = 0; a < allDomElts.length; a++) {
        style = window.getComputedStyle(allDomElts[a]);
        if (style.display === 'none') {
            b++;
        }
    }

    self.postMessage(b);
    self.port.emit("panelize", b);
    console.log(b + " " + consolog);

}

//Trigger by context menu
self.on("click", function(node, data){
    hidElts(data);
});

//Trigger by shortcut
self.port.on('shortcut', function(){
    hidElts(self.options.consolog);
});