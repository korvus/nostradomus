const self = require("sdk/self");
const tabs = require('sdk/tabs');
const objPanel = require("sdk/panel");


exports.andDisplay = function (param) {

    var test = objPanel.Panel({
        contentURL: self.data.url('panel/template.html'),
        contentScriptFile: self.data.url('panel/script.js'),
        contentScriptOptions: { "toDisplay": param }
    });

    test.show();

}

/*
    let activeTab = tabs.activeTab.attach({

    });
*/

    //activeTab.port.emit("shortcut", "");