//Get the stylesheet matching the iteration loop.
function getCSSasAnObject(cssID){
    let selectors = 0;
    let SS = document.styleSheets[cssID];
    var rules = SS.cssRules.length;
    for (var i = 0; i < rules; i++) {
        var rule = SS.cssRules[i];
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

//Just create a styleSheet and get its value.
function append(css,cssID) {
    style = document.createElement('style');
    style.type = 'text/css';
    style.appendChild(css);
    document.head.appendChild(style);
    return getCSSasAnObject(cssID);
}

function init(rawCSS){

    let allExternalCss = [];
    let j = 0;
    for(j;j<rawCSS.length;j++){
        let nodeRawCss = document.createTextNode(rawCSS[j][1]);
        result = append(nodeRawCss,j);
        let infos = [result[0],result[1],rawCSS[j][0]];
        allExternalCss.push(infos);
    }
    self.port.emit('receiveAnalyze', allExternalCss);

}

self.port.on('getCSS', function (rawCSS) {
    init(rawCSS);
});

