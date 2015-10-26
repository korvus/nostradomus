const self = require("sdk/self");
const cm = require("sdk/context-menu");
const opt = require('sdk/simple-prefs').prefs;

//Local
const countCSS = require("./countCSSdetails");
const getPanel = require("./getPanel");

const pathsFiles = [
      'functions/browserSide/count.js'
    , 'functions/browserSide/listEmptyNode.js'
    , 'functions/browserSide/listSpacer.js'
    , 'functions/browserSide/seeAllElts.js'
    , 'functions/browserSide/hideElts.js'
    , 'functions/browserSide/countCSSrules.js'
];

let menuEntry = [];

var countDomElements = cm.Item({
    label: "Count all node elements",
    data: "countAll",
    contentScriptFile: self.data.url(pathsFiles[0]),
    onMessage: function (feedBack) {
        getPanel.andDisplay(feedBack);
    }
});

var listEmptyNodes = cm.Item({
    label: "List empty node",
    data: "listEmptyNode",
    contentScriptFile: self.data.url(pathsFiles[1])
});

var listSpacer = cm.Item({
    label: "List spacer",
    data: "listSpacer",
    contentScriptFile: self.data.url(pathsFiles[2])
});

var seeAllElts = cm.Item({
    label: "See all elements",
    data: "seeAllElts",
    contentScriptFile: self.data.url(pathsFiles[3])
});

var EltsNotDisplayed = cm.Item({
    label: "Count hidden elements",
    data: "EltsNotDisplayed",
    contentScriptFile: self.data.url(pathsFiles[4])
})

var countCSSrules = cm.Item({
    label: "Count CSS rules for CSS online and in each remote CSS files",
    data: "countcssrules",
    contentScriptFile: self.data.url(pathsFiles[5]),
    onMessage: function(feedBack){
        countCSS.treatment(feedBack);
    }
})

if(opt.numberDOMelements) menuEntry.push(countDomElements)
if(opt.listEmpty) menuEntry.push(listEmptyNodes)
if(opt.listSpacer) menuEntry.push(listSpacer)
if(opt.sae) menuEntry.push(seeAllElts)
if(opt.hiddenElts) menuEntry.push(EltsNotDisplayed)
if(opt.CSSrules) menuEntry.push(countCSSrules)

exports.menuEntry = menuEntry;