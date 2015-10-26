/* jshint moz: true */

const self = require("sdk/self");
const cm = require("sdk/context-menu");

//Local
//Init all the shortcut keys.
const shortKey = require("./data/functions/shortKey");

//Init all sub-menu entry of the context-menu.
const cnxtMenu = require("./data/functions/contextMenu");


//Init the main context menu.
cm.Menu({
  image: self.data.url("icon-16.png"),
  label: "Nostradomus",
  context: [cm.URLContext(/https?.*/)],
  items: cnxtMenu.menuEntry
});

