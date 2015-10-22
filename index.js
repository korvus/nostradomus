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

    var rawCSS = "";

    for(var i = 0; i < feedBack.length; i++) {

      /* If the feedback equal 0, then it mean it is an external stylesheet to get. */
      if (feedBack[i][0] == 0) {
          getFile(feedBack[i][1], callBack, rawCSS);
      }
    }

    var vp = virtualPage.Page({
        contentScriptFile: self.data.url("ghostpage/generateExternalCss.js"),
        contentURL: self.data.url("ghostpage/empty.html")
    });

    console.log(rawCSS);

    vp.port.emit("getCSS", rawCSS);

  }
})


function callBack(result, rawCSS) {
    rawCSS = rawCSS + result;
};

function getFile(url, callBack, rawCSS) {
    /* Request some CSS unable to get on browser side with native js */
    var datCSS = Request({
        url: url,
        onComplete: function (response) {
            // Correct : console.log(response.text);
            callBack(response.text, rawCSS);
        }
    }).get();
}

cm.Menu({
  image: self.data.url("icon-16.png"),
  label: "Nostradomus",
  context: [cm.URLContext(/https?.*/)],
  items: [countDomElements, listEmptyNodes, listSpacer, seeAllElts, EltsNotDisplayed, countCSSrules]
});
