//Array of Content
const ac = self.options.toDisplay;
const acl = ac.length;
const wrap = document.getElementById("content");


function deployDom() {
    var domn = [];
    for (var n = 0; n < acl; n++) {
        domn[n] = document.createElement(ac[n][0][0]);
        if (ac[n][1][0].length > 1) domn[n].setAttribute("id", ac[n][1][0]);
        if (ac[n][2][0].length > 1) domn[n].setAttribute("class", ac[n][2][0]);
        if (ac[n][3][0].length > 1) domn[n].setAttribute("title", ac[n][3][0]);
        console.log(ac[n][0][0] + " > " + ac[n][4][0]);
        if (ac[n][4][0].length > 1) {
            let sTxt = document.createTextNode(ac[n][4][0]);
            domn[n].appendChild(sTxt);
        }
        wrap.appendChild(domn[n]);
    }
}

deployDom();





//title = document.createElement('h1');
//txt = document.createTextNode();
//nodeWithTxt = title.appendChild(txt);
//document.getElementById("content").appendChild(nodeWithTxt);

