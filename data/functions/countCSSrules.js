var sheet = (function() {
    var style = document.createElement("style");
    document.head.appendChild(style);

    return style.sheet;
})();


function countSheet(sheet) {
    var count = 0;

    //To use!!!
    //self.postMessage("text");

    if (sheet.href != null && sheet.href.indexOf(location.origin) != 0) {

        console.log("CSS file couldn't be analyzed because it is not on the same domain: " + sheet.href);

        //return false;
    }

    console.log(sheet.cssRules);
    //console.log(sheet.cssRules);
    //if (sheet && sheet.cssRules){
        /*alert("ça se passe");

        for (var j = 0, l = sheet.cssRules.length; j < l; j++) {
            var rule = sheet.cssRules[j];
            if (rule instanceof CSSImportRule) {
                countSheet(rule.styleSheet);
            }
            if (!rule.selectorText) {
                continue;
            }
            count += rule.selectorText.split(',').length;
        }

        log += '\nFile: ' + (sheet.href ? sheet.href : 'inline <style> tag');
        log += '\nRules: ' + sheet.cssRules.length;
        log += '\nSelectors: ' + count;
        log += '\n--------------------------';
        if (count >= 4096) {
            results += '\n********************************\nWARNING:\n There are ' + count + ' CSS rules in the stylesheet ' + sheet.href + ' - IE will ignore the last ' + (count - 4096) + ' rules!\n';
        }
        */
    //}
    
}

self.on("click", function (node, data) {

    var results = "";
    var log = "";
    var listUrlCSS = [];

    if (!document.styleSheets) {
        return false;
    }

    for (var i = 0; i < document.styleSheets.length; i++) {

        
        if (document.styleSheets[i].href != null && document.styleSheets[i].href.indexOf(location.origin) != 0) {
            listUrlCSS.push([0,document.styleSheets[i].href]);
/////////////////////////////////////
/*
            var r = new XMLHttpRequest();
            r.open("GET", document.styleSheets[i].href, true);
            r.onreadystatechange = function(){
                if(r.readyState != 4 || r.status != 200) return;
                var datCSS[i] = r.responseText;

            };
            r.send();
*/
/////////////////////////////////////
        }else{
            listUrlCSS.push([1,document.styleSheets[i]]);
        }
        //countSheet(document.styleSheets[i]);

    }

    self.postMessage(listUrlCSS);

    //console.log(log);
    //console.log(results);
    //alert(log + "\n" + results);

});