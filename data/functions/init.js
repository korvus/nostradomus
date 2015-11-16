/* jshint moz: true */

const self = require("sdk/self");
const cm = require("sdk/context-menu");
const opt = require('sdk/simple-prefs').prefs;
const tabs = require("sdk/tabs");
const _ = require("sdk/l10n").get;
const {Hotkey} = require("sdk/hotkeys");

//Local
const countCSS = require("./countCSSdetails");
const getW3C = require("./w3cAPI");
const treatmentInfo = require("./postTreatment");

const pathsFiles = [
      'functions/browserSide/count.js'
    , 'functions/browserSide/listEmptyNode.js'
    , 'functions/browserSide/listSpacer.js'
    , 'functions/browserSide/seeAllElts.js'
    , 'functions/browserSide/hideElts.js'
    , 'functions/browserSide/countCSSrules.js'
    , 'functions/browserSide/w3cValidator.js'
];

let menuEntry = [];

/* Count all */
if (opt.numberDOMelements){
    var countDomElements = cm.Item({
        label: _("numberDOMelements_title"),
        data: _("result_DomNumber"),
        contentScriptFile: self.data.url(pathsFiles[0]),
        onMessage: function (feedBack) {
            treatmentInfo.forNumberElts(feedBack);
        }
    });
    Hotkey({
        combo: "accel-alt-W",
        onPress: function(){
            let activeTab = tabs.activeTab.attach({
                contentScriptFile: self.data.url(pathsFiles[0]),
                contentScriptOptions: {"consolog" : _("result_DomNumber")}
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
        data: _("result_EmptyNumber"),
        contentScriptFile: self.data.url(pathsFiles[1]),
        onMessage: function (feedBack) {
            treatmentInfo.forEmptyElts(feedBack);
        }
    });
    Hotkey({
        combo: "accel-alt-X",
        onPress: function(){
            let activeTab = tabs.activeTab.attach({
                contentScriptFile: self.data.url(pathsFiles[1]),
                contentScriptOptions: {"consolog" : _("result_EmptyNumber")}
            });
            activeTab.port.emit("shortcut", "");
            activeTab.port.on("panelize", function (feedBack) {
                treatmentInfo.forEmptyElts(feedBack);
            });
        }
    })
    menuEntry.push(listEmptyNodes);
}

/* Spacer */
if (opt.listSpacer){
    var listSpacer = cm.Item({
        label: _("listSpacer_title"),
        data: _("result_SpacerNumber"),
        contentScriptFile: self.data.url(pathsFiles[2]),
        onMessage: function (feedBack) {
            treatmentInfo.forSpacerElts(feedBack);
        }
    });
    Hotkey({
        combo: "accel-alt-C",
        onPress: function(){
            let activeTab = tabs.activeTab.attach({
                contentScriptFile: self.data.url(pathsFiles[2]),
                contentScriptOptions: {"consolog" : _("result_SpacerNumber")}
            });
            activeTab.port.emit("shortcut", "");
            activeTab.port.on("panelize", function (feedBack) {
                treatmentInfo.forSpacerElts(feedBack);
            });
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
        data: _("result_hideElts"),
        contentScriptFile: self.data.url(pathsFiles[4]),
        onMessage: function (feedBack) {
            treatmentInfo.forHiddenElts(feedBack);
        }
    })
    Hotkey({
        combo: "accel-alt-B",
        onPress: function(){
            let activeTab = tabs.activeTab.attach({
                contentScriptFile: self.data.url(pathsFiles[4]),
                contentScriptOptions: {"consolog" : _("result_hideElts")}
            });
            activeTab.port.emit("shortcut", "");
            activeTab.port.on("panelize", function (feedBack) {
                treatmentInfo.forHiddenElts(feedBack);
            });
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
            //Management of panel is inside the file countCSSdetails.js
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
                //Management of panel is inside the file countCSSdetails.js
            });

            activeTab.port.emit("shortcut", "");
        }
    })
    menuEntry.push(countCSSrules);
}


/* w3c Validator */
if (opt.hiddenElts){
    var EltsNotDisplayed = cm.Item({
        label: _("w3cValidator_title"),
        data: _("w3cValidation"),
        contentScriptFile: self.data.url(pathsFiles[6]),
        onMessage: function (feedBack) {
            getW3C.andTreat(feedBack);
        }
    })
    Hotkey({
        combo: "accel-alt-F",
        onPress: function(){
            let activeTab = tabs.activeTab.attach({
                contentScriptFile: self.data.url(pathsFiles[6])
            });
            activeTab.port.emit("shortcut", "");
            activeTab.port.on("panelize", function (feedBack) {
                getW3C.andTreat(feedBack);
            });
        }
    })
    menuEntry.push(EltsNotDisplayed);
}

exports.menuEntry = menuEntry;