function getCSSasAnObject(){
    let selectors = 0;
    let firstSS = document.styleSheets[0];
    var rules = firstSS.cssRules.length;
    for (var i = 0; i < rules; i++) {
        var rule = firstSS.cssRules[i];
        if (rule instanceof CSSImportRule) {
            console.log("there is an import rule");
        }
        if (!rule.selectorText) {
            continue;
        }
        selectors += rule.selectorText.split(',').length;
    }
    var results = [selectors, rules];
    return results;
}


function append(css) {

    style = document.createElement('style');
    style.type = 'text/css';
    style.appendChild(css);
    document.head.appendChild(style);
    return getCSSasAnObject();
}

function init(rawCSS){

    var nodeRawCss = document.createTextNode(rawCSS);
    result = append(nodeRawCss);
    self.port.emit('receiveAnalyze', [result[0],result[1]])

    //console.log(result[0] +" + "+ result[1]);

}

self.port.on('getCSS', function (rawCSS) {
    init(rawCSS);
});



/*

    var r = new XMLHttpRequest();
    r.open("GET", document.styleSheets[i].href, true);
    r.onreadystatechange = function(){
        if(r.readyState != 4 || r.status != 200) return;
        var datCSS[i] = r.responseText;

    };
    r.send();

*/
