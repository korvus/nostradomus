title = document.createElement('h1');
txt = document.createTextNode(self.options.toDisplay);
nodeWithTxt = title.appendChild(txt);
document.getElementById("content").appendChild(nodeWithTxt);

