var html = "<!doctype html><html lang='en'>" + $('html').html() + "</html>";
var validatorURL = "http://html5.validator.nu/?out=json";
$.post(
    {
        url: validatorURL,
        headers: {"Content-type": "text/html"}, 
        body: html
    }, 
    function(err, res, body) {
        //alert('response: '+res);
        if(err){ alert(err);}
        var data = JSON.parse(body);
        console.log(data);
});