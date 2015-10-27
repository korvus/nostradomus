/* jshint moz: true */

const self = require("sdk/self");
const cm = require("sdk/context-menu");

//Init all sub-menu entry of the context-menu and their shortcuts
const cnxtMenu = require("./data/functions/init");


//Init the main context menu.
cm.Menu({
  image: self.data.url("icon-16.png"),
  label: "Nostradomus",
  context: [cm.URLContext(/https?.*/)],
  items: cnxtMenu.menuEntry
});

