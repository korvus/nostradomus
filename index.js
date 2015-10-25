var self = require("sdk/self");
var cm = require("sdk/context-menu");


//if need: https://github.com/tabatkins/parse-css
//Local scripts
var countCSS = require("./data/functions/countCSSdetails");

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
  onMessage: function(feedBack){
    countCSS.treatment(feedBack);
  }
})

cm.Menu({
  image: self.data.url("icon-16.png"),
  label: "Nostradomus",
  context: [cm.URLContext(/https?.*/)],
  items: [countDomElements, listEmptyNodes, listSpacer, seeAllElts, EltsNotDisplayed, countCSSrules]
});

