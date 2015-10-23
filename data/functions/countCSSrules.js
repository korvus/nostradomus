function countCssIn(obj) {
    let l = obj.cssRules.length;
    let a, selector = 0;
    let rule = "";

    for (a = 0; a < l; a++) {
        rule = obj.cssRules[a];
        if (rule instanceof CSSImportRule) {
            countSheet(rule.styleSheet);
        }
        if (!rule.selectorText){
            continue;
        }
        //console.log(rule.selectorText);
        selector += rule.selectorText.split(',').length;
    }
    coords = [selector, l];
    return coords;
}


self.on("click", function (node, data) {

    let results = "";
    let log = "";
    let listUrlCSS = [];

    if (!document.styleSheets) {
        return false;
    }

    for(var i = 0; i < document.styleSheets.length; i++){

        let dss = document.styleSheets[i];

        //If link tag is linked to an external
        if (dss.href != null && dss.href.indexOf(location.origin) != 0) {
            listUrlCSS.push([0, dss.href]);

        //If style tags online
        } else if (!dss.href) {
            let res = countCssIn(dss);
            listUrlCSS.push([1, res]);

        //If link tag
        } else {
            let res = countCssIn(dss);
            listUrlCSS.push([2, res, dss.href]);
        }

    }

    self.postMessage(listUrlCSS);


});