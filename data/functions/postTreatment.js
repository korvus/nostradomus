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
    const structure = [
          ["output", {}, feedBack.toString()]
    ];

    getPanel.andDisplay(structure);

}