/* jshint moz: true */

//if need: https://github.com/tabatkins/parse-css

/* Virtual page */
const virtualPage = require("sdk/page-worker");
const self = require("sdk/self");
const Request = require("sdk/request").Request;

//Bunch of functions linked to CSS count
//For the distant CSS
function getFile(url, callBack) {
    Request({
        url: url,
        onComplete: function (response) {
            callBack(response.text, url);
        }
    }).get()
}

function getFiles(urls, callback) {
    let files = [];
    let i = 0;
    for (i; i < urls.length; i++) {
      getFile(urls[i], function (result, url) {
        let urlAndRawContent = [url, result];
        files.push(urlAndRawContent);
        // Everything is here, we can call the callback
        if (files.length === urls.length) {
            callback(files);
        }
      });
    }
}

// Treatment of the infos from view
exports.treatment = function(feedBack){

  // If the feedback equal 0, then it mean it is an external stylesheet to get
  var urls = feedBack.filter(msg => msg[0] === 0).map(msg => msg[1]);

  // If the feedback equal 1, then it mean it is an online stylesheet.
  var CSSinline = feedBack.filter(msg => msg[0] === 1).map(obj => obj[1])

  // If the feedback equal 1, then it mean it is an online stylesheet.
  var CSSfile = feedBack.filter(msg => msg[0] === 2).map(obj => [obj[1][0],obj[1][1],obj[2]])

  var vp = virtualPage.Page({
      contentScriptFile: self.data.url("ghostpage/generateExternalCss.js"),
      contentURL: self.data.url("ghostpage/empty.html")
  });

  getFiles(urls, function (result) {
      vp.port.emit("getCSS", result);
  });

  vp.port.on("receiveAnalyze", function (mssg) {
      console.log(mssg);
      console.log(CSSinline);
      console.log(CSSfile);
  });

};
