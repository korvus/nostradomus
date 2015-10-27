const self = require("sdk/self");
const cm = require("sdk/context-menu");
const opt = require('sdk/simple-prefs').prefs;
const tabs = require("sdk/tabs");
const _ = require("sdk/l10n").get;
const {Hotkey} = require("sdk/hotkeys");

//Local
const countCSS = require("./countCSSdetails");
const treatmentInfo = require("./postTreatment");

const pathsFiles = [
      'functions/browserSide/count.js'
    , 'functions/browserSide/listEmptyNode.js'
    , 'functions/browserSide/listSpacer.js'
    , 'functions/browserSide/seeAllElts.js'
    , 'functions/browserSide/hideElts.js'
    , 'functions/browserSide/countCSSrules.js'
];

let menuEntry = [];

/* Count all */
if (opt.numberDOMelements){
    var countDomElements = cm.Item({
        label: _("numberDOMelements_title"),
        data: "countAll",
        contentScriptFile: self.data.url(pathsFiles[0]),
        onMessage: function (feedBack) {
            treatmentInfo.forNumberElts(feedBack);
        }
    });
    Hotkey({
        combo: "accel-alt-W",
        onPress: function(){
            let activeTab = tabs.activeTab.attach({
                contentScriptFile: self.data.url(pathsFiles[0])
            });
            activeTab.port.emit("shortcut", "");
            activeTab.port.on("panelize", function (feedBack) {
                treatmentInfo.forNumberElts(feedBack);
            });
        }
    })
    menuEntry.push(countDomElements);
}

/* List empty node */
if (opt.listEmpty){
    var listEmptyNodes = cm.Item({
        label: _("listEmpty_title"),
        data: "listEmptyNode",
        contentScriptFile: self.data.url(pathsFiles[1])
    });
    Hotkey({
        combo: "accel-alt-X",
        onPress: function(){
            let activeTab = tabs.activeTab.attach({
                contentScriptFile: self.data.url(pathsFiles[1])
            });
            activeTab.port.emit("shortcut", "");
        }
    })
    menuEntry.push(listEmptyNodes);
}

/* Spacer */
if (opt.listSpacer){
    var listSpacer = cm.Item({
        label: _("listSpacer_title"),
        data: "listSpacer",
        contentScriptFile: self.data.url(pathsFiles[2])
    });
    Hotkey({
        combo: "accel-alt-C",
        onPress: function(){
            let activeTab = tabs.activeTab.attach({
                contentScriptFile: self.data.url(pathsFiles[2]),
            });
            activeTab.port.emit("shortcut", "");
        }
    })
    menuEntry.push(listSpacer);
}

/* See All Elements */
if (opt.sae){
    var status = 0;
    var seeAllElts = cm.Item({
        label: _("sae_title"),
        data: "seeAllElts",
        contentScriptFile: self.data.url(pathsFiles[3])
    });
    Hotkey({
        combo: "accel-alt-V",
        onPress: function(){

            let activeTab = tabs.activeTab.attach({
                contentScriptFile: self.data.url(pathsFiles[3]),
                contentScriptOptions: {status: status}
            });

            activeTab.port.on("statusDisplay", function (fbStatus) {
                status = fbStatus;
            });

            activeTab.port.emit("shortcut", status);
        }
    })
    menuEntry.push(seeAllElts);
}

/* Count all hidden elements */
if (opt.hiddenElts){
    var EltsNotDisplayed = cm.Item({
        label: _("hiddenElts_title"),
        data: "EltsNotDisplayed",
        contentScriptFile: self.data.url(pathsFiles[4])
    })
    Hotkey({
        combo: "accel-alt-B",
        onPress: function(){
            let activeTab = tabs.activeTab.attach({
                contentScriptFile: self.data.url(pathsFiles[4])
            });
            activeTab.port.emit("shortcut", "");
        }
    })
    menuEntry.push(EltsNotDisplayed);
}

/* Count all CSS rules */
if (opt.CSSrules){
    var countCSSrules = cm.Item({
        label: _("CSSrules_title"),
        data: "countcssrules",
        contentScriptFile: self.data.url(pathsFiles[5]),
        onMessage: function(feedBack){
            countCSS.treatment(feedBack);
        }
    })
    Hotkey({
        combo: "accel-alt-D",
        onPress: function(){
            let activeTab = tabs.activeTab.attach({
                contentScriptFile: self.data.url(pathsFiles[5])
            });

            activeTab.port.on("allCSSinfos", function (feedBack) {
                countCSS.treatment(feedBack);
            });

            activeTab.port.emit("shortcut", "");
        }
    })
    menuEntry.push(countCSSrules);
}

exports.menuEntry = menuEntry;