const toPost = require("sdk/request").Request;

function getAPI() {

    //encodeURIComponent
    //application/x-www-form-urlencoded not supported. Please use multipart/form-data.

var fileParts = encodeURIComponent('<!DOCTYPE html><html><a id="a"><b id="b">hey!</b></a></html>');

/*

//https://gist.github.com/jquerygeek/3902461

// easy way to get current pages HTML
$.get('#', function(html) {

    // emulate form post
    var formData = new FormData();
    formData.append('out', 'json');
    formData.append('content', html);

    // make ajax call
    $.ajax({
        url: "http://html5.validator.nu/",
        data: formData,
        dataType: "json",
        type: "POST",
        processData: false,
        contentType: false,
        success: function(data) {
            console.log(data.messages); // data.messages is an array
        },
        error: function() {
           console.warn(arguments);
        }
    });
});

**/

var xhr = new XMLHttpRequest();
xhr.open("GET", "https://validator.nu/?out=json&doc=http%3A%2F%2Fhsivonen.com%2Ftest%2Fmoz%2Fmessages-types%2Finfo.svg", true);

xhr.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");

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
  console.error(xhr.statusText);
};

xhr.send(null);

/*

Content-Type: multipart/form-data; boundary=---------------------------174151374030834 
Content-Length: 346 -----------------------------174151374030834 
Content-Disposition: form-data; name="showsource" yes -----------------------------174151374030834
Content-Disposition: form-data; name="content" <!DOCTYPE html> <html> <head> <title>Test</title> </head> <body> <p></p> </body> </html> -----------------------------174151374030834
-- 
*/


    var apiServer = toPost({
        url: "https://validator.nu/",
        overrideMimeType: "text/plain; charset=utf-8",
        contentType: "multipart/form-data; boundary=]-nostradomusBoundary-[; ",
        headers: {'Content-Disposition':'form-data; name="content" <!DOCTYPE html> <html> <head> <title>Test</title> </head> <body> <p></p> </body> </html>'},
        headers: {'Content-Disposition':'form-data; name="out" json'},
        onComplete: function (response) {
            console.log(response.json);
            console.log(response.text);
            console.log(response.json);
        }
    });

    apiServer.post();


}

// Treatment of the infos from view
exports.andTreat = function (rawHTML) {

    getAPI();
    //console.log(rawHTML);

};