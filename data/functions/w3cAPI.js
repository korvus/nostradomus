const { Cc, Ci } = require('chrome');
var xhr = Cc["@mozilla.org/xmlextras/xmlhttprequest;1"].createInstance(Ci.nsIXMLHttpRequest);


/* 
 * 
 * If request could be functional
 * var Request = require("sdk/request").Request;
 *
 *     var fileParts = encodeURIComponent('<!DOCTYPE html><html><a id="a"><b id="b">hey!</b></a></html>');
 * 
 *     var apiServer = toPost({
 *         url: "https://validator.nu/?out=json",
 *         //headers: "out=json",
 *         overrideMimeType: "text/html; charset=utf-8",
 *         contentType: "multipart/form-data; boundary=----nostradomus-----",
 *         content: fileParts,
 *         onComplete: function (response) {
 *             console.log(response.json);
 *             console.log(response.text);
 *         }
 *     });
 * 
 *     apiServer.post();
*/


function getAPI(rawHTML) {

    var fileParts = encodeURIComponent(rawHTML);

    xhr.open("post", "https://validator.nu/?out=json", true);
    xhr.setRequestHeader("Content-Type", "text/html;charset=UTF-8");

    xhr.onload = function (e) {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          console.log(xhr.responseText);
        } else {
          console.error(xhr.statusText);
        }
      }
    };

    xhr.onerror = function (e) {
      //Get the result
      console.error(xhr.statusText);
    };

    xhr.send(fileParts);

}

// Treatment of the infos from view
exports.andTreat = function (rawHTML) {

    getAPI(rawHTML);
    //console.log(rawHTML);

};