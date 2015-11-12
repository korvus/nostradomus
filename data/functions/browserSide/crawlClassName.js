/*jshint esnext: true */

(function () {
    "use strict";

    var all = document.querySelectorAll("*");
    var i = 0;
    var rootClassName = "";
    var arrayOfClass = [];
    var allClass = [];

    function add(rootClassName) {
        if (rootClassName) {
            arrayOfClass = rootClassName.split(" ");
            arrayOfClass.map(a=>allClass.push(a));
        }
    }

    while (all[i]) {
        rootClassName = all[i].className;
        add(rootClassName);
        i++;
    }

    allClass.map(c=>console.log(c));
})();