const { Cc, Ci } = require('chrome');
const treatmentInfo = require("./postTreatment");

var xhr = Cc["@mozilla.org/xmlextras/xmlhttprequest;1"].createInstance(Ci.nsIXMLHttpRequest);

function treatJsonBack(jsonFromApi){
  jsonFromApi = JSON.parse(jsonFromApi);
  var listOfMessages = jsonFromApi.messages;
  treatmentInfo.forValidate(listOfMessages.length);
}


function getAPI(rawHTML){
    //var fileParts = encodeURIComponent(rawHTML);
    //console.log(rawHTML);

    xhr.open("post", "https://validator.nu/?out=json", true);
    xhr.setRequestHeader("Content-Type", "text/html;charset=UTF-8");

    xhr.onload = function(e){
      if (xhr.readyState === 4){
        if (xhr.status === 200){
          treatJsonBack(xhr.responseText);
        } else {
          console.error(xhr.statusText);
        }
      }
    };

    xhr.onerror = function (e) {
      console.error(xhr.statusText);
    };

    xhr.send(rawHTML);

}

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


// Treatment of the infos from view
exports.andTreat = function (rawHTML) {

    getAPI(rawHTML);
    //console.log(rawHTML);

};