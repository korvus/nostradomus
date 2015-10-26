var myElements = undefined;

function hideAllElts() {
    for (var i = 0; i < myElements.length; i++) {
        myElements[i].style.outline = "none";
    }
}

function displayAllElts() {
    myElements = document.querySelectorAll("*");

    //Based on https://html.spec.whatwg.org/multipage/indices.html#element-content-categories
    let childrenPhrasing = ['abbr', 'b', 'bdi', 'bdo', 'button', 'cite', 'code', 'data', 'dfn', 'em', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'i', 'kbd', 'label', 'legend', 'mark', 'meter', 'output', 'p', 'pre', 'progress', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'small', 'span', 'strong', 'sub', 'summary', 'sup', 'time', 'u', 'var'];
    let tableElts = ['table', 'tr', 'td', 'th', 'thead', 'tbody', 'tfoot', 'caption', 'colgroup'];

    var color = "0f65da";

    for (var i = 0; i < myElements.length; i++) {

        if (childrenPhrasing.indexOf(myElements[i].nodeName.toLowerCase()) != -1) {
            color = "ceda0f";
        } else if (tableElts.indexOf(myElements[i].nodeName.toLowerCase()) > -1) {
            color = "E03926";
        } else {
            color = "0f65da";
        }

        myElements[i].style.outline = "1px solid #" + color;
    }
}

function toggleElts() {

    if (myElements) {

        hideAllElts(myElements);

    } else {

        displayAllElts();

    }
}

//By contextMenu
self.on("click", toggleElts);

//From the shortcut
self.port.on('shortcut', toggleElts);
