//Array of Content
const ac = self.options.toDisplay;
const wrap = document.getElementById("content");

//ade : Array Dom Elements
function deployDom(ade, container) {
    let adel = ade.length;
    let domn = [];
    for (var n = 0; n < adel; n++) {
        domn[n] = document.createElement(ade[n][0]);
        //If there is some attributes to set.
        if (ade[n][1]) {
            Object.getOwnPropertyNames(ade[n][1]).forEach(function (val, idx, array) {
                domn[n].setAttribute(val, ade[n][1][val]);
            });
        }

        if (ade[n][2]) {
            //If it is an array, it mean it's an another included domNode
            if (ade[n][2] instanceof Array) {
                deployDom(ade[n][2], domn[n]);
            }else{
                let sTxt = document.createTextNode(ade[n][2]);
                domn[n].appendChild(sTxt);
            }
        }
        container.appendChild(domn[n]);
    }
}

deployDom(ac, wrap);





//title = document.createElement('h1');
//txt = document.createTextNode();
//nodeWithTxt = title.appendChild(txt);
//document.getElementById("content").appendChild(nodeWithTxt);

