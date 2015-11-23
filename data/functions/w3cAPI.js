const { Cc, Ci } = require('chrome');
const treatmentInfo = require("./postTreatment");

var xhr = Cc["@mozilla.org/xmlextras/xmlhttprequest;1"].createInstance(Ci.nsIXMLHttpRequest);

function treatJsonBack(jsonFromApi){
  jsonFromApi = JSON.parse(jsonFromApi);
  let listOfMessages = jsonFromApi.messages;
  let iterationOnJson = 0;
  let listWarnings = [];
  
  while (listOfMessages[iterationOnJson]){

      let oneOutputLine = [];
      let lvl = listOfMessages[iterationOnJson].type.toString();
      let mssg = listOfMessages[iterationOnJson].message.toString();
      oneOutputLine.push(["span",{"class":lvl, "title":"type"}, lvl]);
      oneOutputLine.push(["span",{"class":"desc", "title":"description"}, mssg]);
      if(listOfMessages[iterationOnJson].lastLine){
          oneOutputLine.push(["span",{},listOfMessages[iterationOnJson].lastLine]);
      }
      if(listOfMessages[iterationOnJson].lastColumn){
          oneOutputLine.push(["span",{},listOfMessages[iterationOnJson].lastColumn]); 
      }
      if(listOfMessages[iterationOnJson].firstColumn){
          oneOutputLine.push(["span",{},listOfMessages[iterationOnJson].firstColumn]);
      }
      if(listOfMessages[iterationOnJson].extract){
          oneOutputLine.push(["code",{},listOfMessages[iterationOnJson].extract]);
      }

      //Send the whole stuffs
      listWarnings.push(["li",{"class":lvl},oneOutputLine]);
      iterationOnJson++;
  }


  treatmentInfo.forValidate(listWarnings);

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