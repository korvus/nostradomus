var self = require("sdk/self");
var tabs = require('sdk/tabs');
var {Hotkey} = require("sdk/hotkeys");

var countElts = Hotkey({
    combo: "alt-W",
    onPress: function(){
        let activeTab = tabs.activeTab.attach({
            contentScriptFile: self.data.url('functions/count.js')
        });
        activeTab.port.emit("shortcut", "");
    }
})

var listEmptyNode = Hotkey({
    combo: "alt-X",
    onPress: function(){
        let activeTab = tabs.activeTab.attach({
            contentScriptFile: self.data.url('functions/listEmptyNode.js')
        });
        activeTab.port.emit("shortcut", "");
    }
})

var listSpacer = Hotkey({
    combo: "alt-C",
    onPress: function(){
        let activeTab = tabs.activeTab.attach({
            contentScriptFile: self.data.url('functions/listSpacer.js')
        });
        activeTab.port.emit("shortcut", "");
    }
})

var listSpacer = Hotkey({
    combo: "alt-V",
    onPress: function(){
        let activeTab = tabs.activeTab.attach({
            contentScriptFile: self.data.url('functions/seeAllElts.js')
        });
        activeTab.port.emit("shortcut", "");
    }
})
