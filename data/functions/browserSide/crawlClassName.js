/*jshint esnext: true */

(function () {
    "use strict";

    var all = document.querySelectorAll("*");
    var i = 0;
    var className = "";
    var idName = "";
    var arrayOfClass = [];
    var allSelector = [];

    var regex = /[A-Z]/;
    var color = "0f65da";

    function displayClass(nodeDom){
        if(nodeDom.length > 0){
            var display = confirm("Afficher les éléments concernés");
            if(display){
                for (var i = 0; i < nodeDom.length; i++) {
                    nodeDom[i].style.outline = "1px solid #" + color;
                }
            }
        }
    }

    function add(rootClassName,idName) {
        if (rootClassName) {
            arrayOfClass = rootClassName.toString().split(" ");
            arrayOfClass.filter(c=>regex.test(c)).map(a=>allSelector.push({"classValue":a}));
        }
        if(idName) 
            if(regex.test(idName)) allSelector.push({"idValue":a});
        }
    }

    function checkSelectors(){
        allSelector.map(function(c){
            var nodes = document.querySelectorAll("."+c.classValue);
            displayClass(nodes);
        });
    }

    while (all[i]){
        className = all[i].className;
        IdName = all[i].getAttribute("id");
        add(className,idName);
        i++;
    }

    checkSelectors();

})();