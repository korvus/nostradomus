const getPanel = require("./getPanel");
const _ = require("sdk/l10n").get;

exports.forNumberElts = function(feedBack){


    /*
     *    [nodetype,id,class,title,content]
     */
    const structure = [
        ["output", "", "", feedBack.toString(), feedBack.toString()],
        ["span", "", "", "", _("result_DomNumber")],
        ["aside", "", "small", "", _("result_aside")]
    ]
           
    getPanel.andDisplay(structure);

}


exports.forEmptyElts = function (feedBack) {

    const structure = [
        ["output", "", "", feedBack.toString(), feedBack.toString()],
        ["span", "", "", "", _("result_EmptyNumber")],
        ["aside", "", "small", "", _("result_aside_emtpy")]
    ];

    getPanel.andDisplay(structure);

}


exports.forSpacerElts = function (feedBack) {

    let structure = [];

    if (feedBack[0] + feedBack[1] == 0) {
        structure = [
            ["output", "", "", "0", "0"],
            ["span", "", "", "", _("result_noSpacerNumber")],
            ["hr"],
            ["aside", "", "small", "", _("result_aside_spacer")]
        ];
    } else {
        let total = (feedBack[0] + feedBack[1]).toString();
        structure = [
            ["output", "", "", total, total]
            ["hr"],
            ["output", "", "size-big", feedBack[1].toString(), feedBack[1].toString()],
            ["span", "", "", "", _("result_spacerClass")],
            ["hr"],
            ["output", "", "size-big", feedBack[0].toString(), feedBack[0].toString()],
            ["span", "", "", "", _("result_SpacerPic")],
            ["aside", "", "small", "", _("result_aside_spacer")]
        ];
    }

    getPanel.andDisplay(structure);

}

exports.forHiddenElts = function (feedBack) {

    const structure = [
        ["output", "", "", feedBack.toString(), feedBack.toString()],
        ["span", "", "", "", _("result_hideElts")],
        ["aside", "", "small", "", _("result_aside_hideElts")]
    ];

    getPanel.andDisplay(structure);

}