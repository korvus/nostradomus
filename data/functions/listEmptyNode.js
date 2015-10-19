
self.on("click", function (node, data) {

    if (allMyElements) {

        for (var i = 0; i < allMyElements.length; i++) {
            allMyElements[i].style.outline = "none";
        }
        allMyElements = undefined;

    } else {

        //https://html.spec.whatwg.org/multipage/indices.html#element-content-categories
        var emptyChildren = ['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'keygen', 'link', 'menuitem', 'meta', 'param', 'source', 'track', 'wbr'];
        var nbrElts = 0;
        var allMyElements = document.querySelectorAll("*");

        for (var i = 0; i < allMyElements.length; i++) {
            if (emptyChildren.indexOf(allMyElements[i].nodeName.toLowerCase()) == -1) {
                if (allMyElements[i].textContent.length == 0) {
                    nbrElts++;
                    allMyElements[i].style.outline = "1px solid #0f65da";
                }
            }
        }

        alert(nbrElts + " empty elements.");
        console.log(nbrElts + " empty elements.");

    }

});
