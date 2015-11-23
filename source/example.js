
    var dtype = (document.doctype) ? new XMLSerializer().serializeToString(document.doctype) : "";
    var rawHtml = document.documentElement.outerHTML;
    var wholePage = dtype + rawHtml;
    var fileParts = wholePage;
    //var fileParts = encodeURIComponent(wholePage);

    var xhr = new XMLHttpRequest();

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


///
  var rawHTML = new XMLHttpRequest();
  rawHTML.open("get", "", true);
  rawHTML.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
  rawHTML.onload = function (e) {
      if (rawHTML.readyState === 4) {
        if (rawHTML.status === 200) {
          console.log(rawHTML.responseText);
        }
      }
  };
  rawHTML.send(null);