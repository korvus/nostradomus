/* jshint moz: true */

function returnError (){
    self.postMessage("error");
    self.port.emit("panelize", "error");  
}

function getAllDocument() {

  var err = 0;
  var rawHTML = "";
  var getIself = new XMLHttpRequest();
  getIself.open("get", "", true);
  getIself.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
  getIself.onload = function(e){
      if(getIself.readyState === 4){
        if(getIself.status === 200){
          rawHTML = getIself.responseText;
          self.postMessage(rawHTML);
          self.port.emit("panelize", rawHTML);
        }else{
          returnError();
        }
      }else{
        returnError();
      }
  };
  getIself.send(null);


}

//Trigger by context menu
self.on("click", function (node) {
    getAllDocument();
});

//Trigger by shortcut
self.port.on('shortcut', function () {
    getAllDocument();
});