//Array of Content
const ac = self.options.toDisplay;
const wrap = document.getElementById("content");
const svg = /svg|circle|path/i;


//ade : Array Dom Elements
function deployDom(ade, container) {
    let adel = ade.length;
    let domn = [];
    for (var n = 0; n < adel; n++) {

        //Create the root node
        let tagName = ade[n][0];
        if (svg.test(tagName)) {
            domn[n] = document.createElementNS("http://www.w3.org/2000/svg", tagName);
        } else {
            domn[n] = document.createElement(tagName);
        }
        
        //set attributes.
        let attributes = ade[n][1];
        if (attributes) {
            Object.getOwnPropertyNames(attributes).forEach(function (val, idx, array) {
                domn[n].setAttribute(val, attributes[val]);
            });
        }

        //Include contents ty
        if (ade[n][2]) {
            //If it is an array, it mean it's an another included domNode
            if (ade[n][2] instanceof Array) {
                deployDom(ade[n][2], domn[n]);
            }else{
                let txt = document.createTextNode(ade[n][2]);
                domn[n].appendChild(txt);
            }
        }
        container.appendChild(domn[n]);
    }
}

deployDom(ac, wrap);

//For debug
//console.log(document.documentElement.outerHTML);


