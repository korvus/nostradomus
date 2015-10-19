self.on("click",function(node, data){

    var allDomElts = document.body.getElementsByTagName('*');

    var a, b = 0;
    var style = {};
    for (a = 0; a < allDomElts.length; a++) {
        /* If for check text-indent elts
        if (allDomElts[a].offsetParent === null){
          console.log(allDomElts[a]);
        }
        */
        style = window.getComputedStyle(allDomElts[a]);
        if (style.display === 'none') {
            b++;
            //console.log(allDomElts[a]);
            //If need to display
            //allDomElts[a].style.cssText = "display:block !important";
        }
    }

    alert(b + " elements are with display:none;");
    console.log(b + " elements are with display:none;");

});