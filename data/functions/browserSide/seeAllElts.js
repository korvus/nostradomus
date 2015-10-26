/* jshint moz: true */

var myElements = null;

function hideAllElts(domNode) {
    let i = 0;
    for (i; i < domNode.length; i++) {
        domNode[i].style.outline = "none";
    }

    //giveStatus
    myElements = null;
    self.port.emit("statusDisplay", null);
}

function displayAllElts(domNode) {

    //Based on https://html.spec.whatwg.org/multipage/indices.html#element-content-categories
    let childrenPhrasing = ['abbr', 'b', 'bdi', 'bdo', 'button', 'cite', 'code', 'data', 'dfn', 'em', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'i', 'kbd', 'label', 'legend', 'mark', 'meter', 'output', 'p', 'pre', 'progress', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'small', 'span', 'strong', 'sub', 'summary', 'sup', 'time', 'u', 'var'];
    let tableElts = ['table', 'tr', 'td', 'th', 'thead', 'tbody', 'tfoot', 'caption', 'colgroup'];

    let color = "0f65da";

    for (var i = 0; i < domNode.length; i++) {

        if (childrenPhrasing.indexOf(domNode[i].nodeName.toLowerCase()) != -1) {
            color = "ceda0f";
        } else if (tableElts.indexOf(domNode[i].nodeName.toLowerCase()) > -1) {
            color = "E03926";
        } else {
            color = "0f65da";
        }

        domNode[i].style.outline = "1px solid #" + color;

    }

    //giveStatus
    self.port.emit("statusDisplay", domNode);
    myElements = domNode;
}

function toggleElts(param) {

    let allNodes = document.querySelectorAll("*");
    if (param !== "empty") myElements = param

    if (myElements) {
        hideAllElts(allNodes)
    } else {
        displayAllElts(allNodes)
    }
}

//By contextMenu
self.on("click", function () {
    toggleElts("empty");
});

//From the shortcut
self.port.on('shortcut', function (data) {
    toggleElts(self.options.status);
});
