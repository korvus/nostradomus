var self = require("sdk/self");
var cm = require("sdk/context-menu");
var Request = require("sdk/request").Request;
var virtualPage = require("sdk/page-worker");


//https://github.com/tabatkins/parse-css
//var parserCSS = require("./data/functions/parse-css.js");

var countDomElements = cm.Item({
  label: "Count all node elements",
  data: "countAll",
  contentScriptFile: self.data.url('functions/count.js')
});

var listEmptyNodes = cm.Item({
  label: "List empty node",
  data: "listEmptyNode",
  contentScriptFile: self.data.url('functions/listEmptyNode.js')
});

var listSpacer = cm.Item({
  label: "List spacer",
  data: "listSpacer",
  contentScriptFile: self.data.url('functions/listSpacer.js')
});

var seeAllElts = cm.Item({
  label: "See all elements",
  data: "seeAllElts",
  contentScriptFile: self.data.url('functions/seeAllElts.js')
});

var EltsNotDisplayed = cm.Item({
  label: "Count hidden elements",
  data: "EltsNotDisplayed",
  contentScriptFile: self.data.url('functions/hideElts.js')
})

var countCSSrules = cm.Item({
  label: "Count CSS rules for CSS online and in each remote CSS files",
  data: "countcssrules",
  contentScriptFile: self.data.url('functions/countCSSrules.js'),
  onMessage: function (feedBack) {

    // If the feedback equal 0, then it mean it is an external stylesheet to get
    var urls = feedBack.filter(msg => msg[0] === 0).map(msg => msg[1]);

    // If the feedback equal 1, then it mean it is an online stylesheet.
    var CSSinline = feedBack.filter(msg => msg[0] === 1).map(obj => obj[1])

    var vp = virtualPage.Page({
        contentScriptFile: self.data.url("ghostpage/generateExternalCss.js"),
        contentURL: self.data.url("ghostpage/empty.html")
    });

    getFiles(urls, function (result) {
        vp.port.emit("getCSS", result.join('\n'));
    });

    vp.port.on("receiveAnalyze", function (mssg) {
        console.log(mssg);
        console.log(CSSinline);
    });

  }
})

cm.Menu({
  image: self.data.url("icon-16.png"),
  label: "Nostradomus",
  context: [cm.URLContext(/https?.*/)],
  items: [countDomElements, listEmptyNodes, listSpacer, seeAllElts, EltsNotDisplayed, countCSSrules]
});


//Bunch of functions linked to CSS count

    //For the distant CSS
function getFile(url, callBack) {
    Request({
        url: url,
        onComplete: function (response) {
            callBack(response.text);
        }
    }).get()
}

function getFiles(urls, callback) {
    var files = [];
    for (var i = 0; i < urls.length; i++) {
        getFile(urls[i], function (result) {
            files.push(result)
            // Everything is here, we can call the callback
            if (files.length === urls.length) {
                callback(files);
            }
        });
    }
}


/*

var neoRay = [1,2,3,4].map(n => a(n));
console.log(neoRay);

*/