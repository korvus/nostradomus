
function listEmptyNode(){

  if(allMyElements){

    for (var i = 0; i < allMyElements.length; i++) {
      allMyElements[i].style.outline = "none";
    }
    allMyElements = undefined;

  }else{
    
    //https://html.spec.whatwg.org/multipage/indices.html#element-content-categories
    var emptyChildren = ['area','base','br','col','embed','hr','img','input','keygen','link','menuitem','meta','param','source','track','wbr'];
    var nbrElts = 0;
    var allMyElements = document.querySelectorAll("*");

    for (var i = 0; i < allMyElements.length; i++) {
      if(emptyChildren.indexOf(allMyElements[i].nodeName.toLowerCase()) == -1){
        if(allMyElements[i].textContent.length==0){
          nbrElts++;
          allMyElements[i].style.outline = "1px solid #0f65da";
        }
      }
    }

    alert(nbrElts+" empty elements.");
    console.log(nbrElts+" empty elements.");

  }

}


function listSpacer(){

  var spacerClass = document.getElementsByClassName("spacer");
  var allPics = document.getElementsByTagName('img');

  var a, b = 0;
  for(a=0;a<allPics.length;a++){
    var srcAttr = allPics[a].src;
    if(srcAttr.search(/spacer/gi)!=-1){
      b++;
    }
  }

  alert(spacerClass.length+" .spacer element in this page.\n and "+b+" pictures including 'spacer' in it name.");
  console.log(spacerClass.length+" .spacer element in this page.\n and "+b+" pictures including 'spacer' in it name.");

}



function displayAll(){

  if(myElements){
    
    for (var i = 0; i < myElements.length; i++) {
      myElements[i].style.outline = "none";
    }
    myElements = undefined;

  }else{

    var myElements = document.querySelectorAll("*");

    //https://html.spec.whatwg.org/multipage/indices.html#element-content-categories
    var childrenPhrasing = ['abbr','b','bdi','bdo','button','cite','code','data','dfn','em','h1','h2','h3','h4','h5','h6','i','kbd','label','legend','mark','meter','output','p','pre','progress','q','rp','rt','ruby','s','samp','small','span','strong','sub','summary','sup','time','u','var'];
    var tableElts = ['table','tr','td','th','thead','tbody','tfoot','caption','colgroup'];

    var color = "0f65da";
    for (var i = 0; i < myElements.length; i++) {


      //console.log(myElements[i]+" --> "+myElements[i].nodeName);
      /*
      if(myElements[i].nodeName=="TABLE"){
      }
      */
      if(childrenPhrasing.indexOf(myElements[i].nodeName.toLowerCase()) != -1){
        color = "ceda0f";
      }else if(tableElts.indexOf(myElements[i].nodeName.toLowerCase()) > -1){
        color = "E03926";
      }else{
        color = "0f65da";
      }

      myElements[i].style.outline = "1px solid #"+color;
    }

  }

}


function notDisplayed(){
  var allDomElts = document.body.getElementsByTagName('*');

  var a, b = 0;
  var style = {};
  for(a=0;a<allDomElts.length;a++){
    /* If for check text-indent elts
    if (allDomElts[a].offsetParent === null){
      console.log(allDomElts[a]);
    }
    */
    style = window.getComputedStyle(allDomElts[a]);
    if(style.display === 'none'){
      b++;
      //console.log(allDomElts[a]);
      //If need to display
      //allDomElts[a].style.cssText = "display:block !important";
    }
  }

  alert( b +" elements are with display:none;");
  console.log( b +" elements are with display:none;");
}

function countCSSrules(){
    var results = '',
        log = '';
    if (!document.styleSheets) {
        return;
    }
    for (var i = 0; i < document.styleSheets.length; i++) {
        countSheet(document.styleSheets[i]);
    }
    function countSheet(sheet) {
        var count = 0;
        if (sheet && sheet.cssRules) {
            for (var j = 0, l = sheet.cssRules.length; j < l; j++) {
                var rule = sheet.cssRules[j];
                if (rule instanceof CSSImportRule) {
                    countSheet(rule.styleSheet);
                }
                if( !rule.selectorText ) {
                    continue;
                }
                count += rule.selectorText.split(',').length;
            }

            log += '\nFile: ' + (sheet.href ? sheet.href : 'inline <style> tag');
            log += '\nRules: ' + sheet.cssRules.length;
            log += '\nSelectors: ' + count;
            log += '\n--------------------------';
            if (count >= 4096) {
                results += '\n********************************\nWARNING:\n There are ' + count + ' CSS rules in the stylesheet ' + sheet.href + ' - IE will ignore the last ' + (count - 4096) + ' rules!\n';
            }
        }
    }
    console.log(log);
    console.log(results);
    alert(log+"\n"+results);
};
}




self.on("click",function(node, data){

  if(data == "countAll"){
    console.log(document.getElementsByTagName('*').length);
    alert(document.getElementsByTagName('*').length);
  }

  if(data == "listEmptyNode"){
    listEmptyNode();
  }

  if(data == "listSpacer"){
    listSpacer();
  }

  if(data == "seeAllElts"){
    displayAll();
  }

  if(data == "EltsNotDisplayed"){
    notDisplayed();
  }

  if(data == "countcssrules"){
    countCSSrules();
  }


});