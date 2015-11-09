/* jshint moz: true */

//if need: https://github.com/tabatkins/parse-css

/* Virtual page */
const virtualPage = require("sdk/page-worker");
const self = require("sdk/self");
const Request = require("sdk/request").Request;
const treatmentInfo = require("./postTreatment");

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

function getFiles(urls, CSSinline, CSSfile, callback) {
    let files = [];
    let i = 0;
    if(urls.length>0){
      let numberExternalUrl = urls.length;
      for (i; i < numberExternalUrl; i++) {
        getFile(urls[i], function (result, url) {
          let urlAndRawContent = [url, result];
          files.push(urlAndRawContent);
          // Everything is here, we can call the callback
          if (files.length === urls.length) {
              callback(files);
          }
        });
      }
    }else{
      formatArray([],CSSinline,CSSfile);
    }

}

function formatArray(cssExternal,CSSinline,CSSfile){

    /*
    console.log(cssExternal);
    console.log(CSSinline);
    console.log(CSSfile);
    */

    let sumRulesExternalCSS = getSum(cssExternal,1);
    let sumRulesCSSinline = getSum(CSSinline, 1);
    let sumRulesInternalCSS = getSum(CSSfile, 1);
    let totalRules = sumRulesExternalCSS + sumRulesCSSinline + sumRulesInternalCSS;

    let sumSelectorExternalCSS = getSum(cssExternal,0);
    let sumSelectorCSSinline = getSum(CSSinline, 0);
    let sumSelectorInternalCSS = getSum(CSSfile, 0);
    let totalSelectors = sumSelectorExternalCSS + sumSelectorCSSinline + sumSelectorInternalCSS;

    
    ratio = Math.round((totalSelectors / totalRules)*100)/100;
    //console.log(ratio + " + " + totalSelectors + " + " + totalRules);

    /* Return all infos needed */
    treatmentInfo.countCSS([
        [totalRules,totalSelectors,ratio],
        [cssExternal,CSSinline,CSSfile],
        [sumRulesExternalCSS, sumRulesCSSinline, sumRulesInternalCSS],
        [sumSelectorExternalCSS,sumSelectorCSSinline,sumSelectorInternalCSS]
      ]
    );
}


function getSum(obj, iter) {
    return obj.map(infos => infos[iter]).reduce((a, b) => a + b, 0);
}

// Treatment of the infos from view
exports.treatment = function(feedBack){

  //order the properties fields
  var urls = feedBack.filter(msg => msg[0] === 0).map(msg => msg[1]);
  var CSSinline = feedBack.filter(msg => msg[0] === 1).map(obj => obj[1]);
  var CSSfile = feedBack.filter(msg => msg[0] === 2).map(obj => [obj[1][0],obj[1][1],obj[2]]);

  var vp = virtualPage.Page({
      contentScriptFile: self.data.url("ghostpage/generateExternalCss.js"),
      contentURL: self.data.url("ghostpage/empty.html")
  });

  getFiles(urls,CSSinline,CSSfile, function(result){
      vp.port.emit("getCSS", result);
  });

  vp.port.on("receiveAnalyze", function (cssExternal) {
    formatArray(cssExternal,CSSinline,CSSfile);
  });

};
