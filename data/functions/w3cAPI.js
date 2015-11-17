const toPost = require("sdk/request").Request;

function getAPI() {

    //encodeURIComponent

    var apiServer = toPost({
        url: "https://validator.w3.org/nu/",
        overrideMimeType: "text/plain; charset=utf-8",
        contentType: "multipart/form-data; boundary=]:split:[",
        content: "out=json&body=helloworld",
        onComplete: function (response) {
            console.log(response.json);
            console.log(response.text);
            console.log(response.json);
            /*
            for (var headerName in response.headers) {
                console.log(headerName + " : " + response.headers[headerName]);
            }
            */
            
        }
    });

    apiServer.post();
}

// Treatment of the infos from view
exports.andTreat = function (rawHTML) {

    getAPI();
    //console.log(rawHTML);

};