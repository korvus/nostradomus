/* jshint moz: true */

const self = require("sdk/self");
const tabs = require('sdk/tabs');
const {Hotkey} = require("sdk/hotkeys");

const pathsFiles = [
      'functions/browserSide/count.js'
    , 'functions/browserSide/listEmptyNode.js'
    , 'functions/browserSide/listSpacer.js'
    , 'functions/browserSide/seeAllElts.js'
    , 'functions/browserSide/hideElts.js'
    , 'functions/browserSide/countCSSrules.js'
];

//Local 
var countCSS = require("./countCSSdetails");

var countElts = Hotkey({
    combo: "accel-alt-W",
    onPress: function(){
        let activeTab = tabs.activeTab.attach({
            contentScriptFile: self.data.url(pathsFiles[0])
        });
        activeTab.port.emit("shortcut", "");
    }
})

var listEmptyNode = Hotkey({
    combo: "accel-alt-X",
    onPress: function(){
        let activeTab = tabs.activeTab.attach({
            contentScriptFile: self.data.url(pathsFiles[1])
        });
        activeTab.port.emit("shortcut", "");
    }
})

var listSpacer = Hotkey({
    combo: "accel-alt-C",
    onPress: function(){
        let activeTab = tabs.activeTab.attach({
            contentScriptFile: self.data.url(pathsFiles[2]),
        });
        activeTab.port.emit("shortcut", "");
    }
})

var status = 0;
var listSpacer = Hotkey({
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

var hideElts = Hotkey({
    combo: "accel-alt-B",
    onPress: function(){
        let activeTab = tabs.activeTab.attach({
            contentScriptFile: self.data.url(pathsFiles[4])
        });
        activeTab.port.emit("shortcut", "");
    }
})

var countCSSrules = Hotkey({
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
