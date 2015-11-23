const getPanel = require("./getPanel");
const pie = require("./pie");
const _ = require("sdk/l10n").get;

exports.forNumberElts = function(feedBack){


    /*
     *    [nodetype,{object attribute:value},content]
     */
    const structure = [
        ["output", { "title": feedBack.toString() }, feedBack.toString()],
        ["span", {}, _("result_DomNumber")],
        ["aside", { "class": "small" }, _("result_aside")]
    ]
           
    getPanel.andDisplay(structure);

}


exports.forEmptyElts = function (feedBack) {

    const structure = [
        ["output", { "title": feedBack.toString() }, feedBack.toString()],
        ["span", {}, _("result_EmptyNumber")],
        ["aside", { "class": "small" }, _("result_aside_emtpy")]
    ];

    getPanel.andDisplay(structure);

}


exports.forSpacerElts = function (feedBack) {

    let structure = [];

    if (feedBack[0] + feedBack[1] == 0) {
        structure = [
            ["output", { "title": "0" }, "0"],
            ["span", {}, _("result_noSpacerNumber")],
            ["hr"],
            ["aside", { "class": "small" }, _("result_aside_spacer")]
        ];
    } else {
        let total = (feedBack[0] + feedBack[1]).toString();
        structure = [
            ["output", { "class": total }, total]
            ["hr"],
            ["output", { "class": "size-big", "title": feedBack[1].toString() }, feedBack[1].toString()],
            ["span", {}, _("result_spacerClass")],
            ["hr"],
            ["output", { "class": "size-big", "title": feedBack[0].toString() }, feedBack[0].toString()],
            ["span", {}, _("result_SpacerPic")],
            ["aside", { "class": "small" }, _("result_aside_spacer")]
        ];
    }

    getPanel.andDisplay(structure);

}

exports.forHiddenElts = function (feedBack) {

    const structure = [
        ["output", { "title": feedBack.toString() }, feedBack.toString()],
        ["span", {}, _("result_hideElts")],
        ["aside", { "class": "small" }, _("result_aside_hideElts")]
    ];

    getPanel.andDisplay(structure);

}

exports.forValidate = function (feedBack) {
    const structure = [
        ["ol", {"id":"array"}, feedBack]
    ];
    getPanel.andDisplay(structure);
}


function cookPie(dataPie, widthSVG, heightSVG, cx, cy, rayon, color){

    var SVGcomponents = [];
    var paths = pie.cification(dataPie, widthSVG, heightSVG, cx, cy, rayon, color);
    SVGcomponents.push(["circle", { "cx": cx, "cy": cy, "r": rayon, "fill": "#0f65da"}]);
    paths.map(function(p){
        SVGcomponents.push(["path", { "id": "a1", "d": p[0], "stroke": "black", "fill": p[1]}]);
    })
    var SVG = ["svg", {"class": "fleft", "width": "150px", "height": "150px", "viewBox": "0 0 "+widthSVG+" "+heightSVG},
        SVGcomponents
    ];
    return SVG;
}

exports.countCSS = function (feedBack) {

    /* Work example > https://jsfiddle.net/cuzdv1ts/22 */
    let CSSremote = feedBack[1][0];
    let CSSinline = feedBack[1][1];
    let CSSlocal = feedBack[1][2];

    /*  
    this three arrays give
    this paterns data:[ Selectors / rules / url ]
    Array [[178,173,"http://external.url.com/one.css"],[15,15,"http://external.url.com/two.css"]]
    Array [[3,2],[1,1]]
    Array [[80,66,"http://same.url.com/one.css"],[187,154,"http://same.url.com/two.css"]]
    */

    var colorSet = ["#0f65da","#04DBE7","#1C04E7"];
    var dataPie = [];
    var color = [];
    var iter = 0;
    var SVG;

    if((CSSremote.length + CSSinline.length + CSSlocal.length) < 2){
        toDisplay = ["aside",{},"aside"];
    }else{

        var widthSVG = 300;
        var heightSVG = 300;
        var cx = 150;
        var cy = 150;
        var rayon = 150;
        var styleByType = [];
        var styleByBlock = [];
        var labels = ["External file","Style Inline", "Same domain name"];

        feedBack[1].map(function(differentsKindofCSS){

            styleByBlock = [];

            differentsKindofCSS.filter(moreThanOne=>moreThanOne.length>0).map(

                function(CSSanalysis){
                    // drop previous styleByBlock array
                    dataPie.push(CSSanalysis[1]);
                    color.push(colorSet[iter]);
                    styleByBlock.push(["li",{},[
                        ["a",{"href":CSSanalysis[2],"target":"_blank"},CSSanalysis[2]],
                        ["span",{}," "+CSSanalysis[1]+" rule(s) / "],
                        ["span",{},CSSanalysis[0]+" selectors"]
                    ]]);
                }
            );

            styleByType.push(["li",{"class":"size-min"},[
                    ["h2",{},[
                        ["span",{},labels[iter]],
                        ["span",{}," "+feedBack[2][iter]+" rules / "+feedBack[3][iter]+" selectors"]
                    ]],
                    ["ul",{},styleByBlock]
                ]]);

            iter++;
        });

        SVG = cookPie( dataPie, widthSVG, heightSVG, cx, cy, rayon, color);
        toDisplay = [
            ["div", {"id":"graphicHead"},[
                SVG,
                ["ul",{"class":"fleft"},[
                    ["li",{},[
                        ["span",{"class":"output"},feedBack[0][0]],
                        ["span",{"class":"size-min"},"rules for"],
                        ["span",{"class":"size-big"},feedBack[0][1]],
                        ["span",{"class":"size-min"},"selectors"],
                        ["hr"]
                    ]],
                    ["li",{},[
                        ["span",{"class":"size-min"},"It make a ratio of"],
                        ["span",{"class":"size-plus"},feedBack[0][2]],
                        ["span",{"class":"size-min"},"selector(s) for 1 rule"]
                    ]]
                ]]

            ]],
            ["ul",{"class":"clear","id":"array"},
                styleByType
            ]
        ]

    }

    let sumRulesExternalCSS = feedBack[2][0];
    let sumRulesCSSinline = feedBack[2][1];
    let sumRulesInternalCSS = feedBack[2][2];

    const structure = toDisplay;

    getPanel.andDisplay(structure);

}