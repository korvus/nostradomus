var buttons = require('sdk/ui/button/action');
var tabs = require("sdk/tabs");
var {ToggleButton} = require('sdk/ui/button/toggle');
var panels = require("sdk/panel");
var self = require("sdk/self");
var cm = require("sdk/context-menu");
var { MatchPattern } = require("sdk/util/match-pattern");

var script = "self.on('click', function (node, data) {" +
             "  console.log('clicked: ' + node.nodeName);" +
             "});";

var countDomElements = cm.Item({
  label: "Count all DOM elements",
  data: "countAll"
});

var listEmptyNodes = cm.Item({
  label: "List empty node",
  data: "listEmptyNode"
});

var listSpacer = cm.Item({
  label: "List spacer",
  data: "listSpacer"
});

var seeAllElts = cm.Item({
  label: "See all elements",
  data: "seeAllElts"
});

var EltsNotDisplayed = cm.Item({
  label: "Count hidden elements",
  data: "EltsNotDisplayed"
})

var countCSSrules = cm.Item({
  label: "Count CSS rules for CSS online and in each remote CSS files",
  data: "countcssrules"
})

cm.Menu({
  image: self.data.url("icon-16.png"),
  context: [
    cm.URLContext(/https?.*/)
  ],
  label: "NostraDOMus",
  contentScriptFile: [self.data.url('menu.js')],
  items: [countDomElements, listEmptyNodes, listSpacer, seeAllElts, EltsNotDisplayed, countCSSrules]
});


var button = ToggleButton({
  id: "menu",
  label: "Display menu",
  icon: {
    "16": "./icon-16.png",
    "32": "./icon-32.png",
    "64": "./icon-64.png"
  },
  onChange: handleChange
});

function handleClick(state) {
  tabs.open("http://www.mozilla.org/");
}

var panel = panels.Panel({
  width: 120,
  contentURL: self.data.url("panel.html"),
  onHide: handleHide
});

function handleChange(state){
  if(state.checked) {
    panel.show({
      position: button
    });
  }
}

function handleHide() {
  button.state('window', {checked: false});
}
