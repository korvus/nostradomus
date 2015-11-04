const getPanel = require("./getPanel");
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


exports.countCSS = function (feedBack) {

    /*
    <svg width="12cm" height="5.25cm" viewBox="0 0 1200 400" xmlns="http://www.w3.org/2000/svg" version="1.1">

<circle cx="300" cy="200" r="150" fill="red" stroke="black" stroke-width="1" />

<path id= "a1" d="M300,200 v-150 a150,150 0 0,0 -150,150 z" fill="yellow" stroke="black" stroke-width="1" transform="rotate(180 300 200)"/>
<path id= "a2" d="M300,200 v-150 a150,150 0 0,0 -150,150 z" fill="blue" stroke="black" stroke-width="1" transform="rotate(220 300 200)"/>
<path id= "a3" d="M300,200 v-150 a150,150 0 0,0 -150,150 z" fill="green" stroke="black" stroke-width="1" transform="rotate(237 300 200)"/>
<path id= "a4" d="M300,200 v-150 a150,150 0 0,0 -150,150 z" fill="maroon" stroke="black" stroke-width="1" transform="rotate(320 300 200)"/>
<path id= "a5" d="M300,200 v-150 a150,150 0 0,0 -150,150 z" fill="red" transform="rotate(400 300 200)"/>

    </svg>
    */

    /* > https://jsfiddle.net/cuzdv1ts/7/ */

    const structure = [
          ["output", {}, feedBack.toString()],
          ["svg", { "width": "100px", "height": "100px", "viewBox": "0 0 300 300"},
              [
                  ["circle", { "cx": "150", "cy": "150", "r": "140", "fill": "#0f65da" }],
                  ["path", { "id": "a1", "d": "M160,160 v-150 a140,140 0 0,0 -150,150 z", "fill": "#5f65ff", "stroke": "black" }]
              ]
          ]
    ];

    getPanel.andDisplay(structure);

}