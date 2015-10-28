const getPanel = require("./getPanel");
const _ = require("sdk/l10n").get;

exports.forNumberElts = function(feedBack){


    /* [ 
     *    [nodetype],
     *    [id],
     *    [class],
     *    [title],
     *    {content} // ref is a keyword for calling some other DOMcontent
     */
    const structure = [
        [
            ["output"],
            [""],
            [""],
            [feedBack.toString()],
            [feedBack.toString()]
        ], [
            ["span"],
            [""],
            [""],
            [""],
            [_("result_DomNumber")]
        ], [
            ["aside"],
            ["small"],
            [""],
            [""],
            [_("result_aside")]
        ]
    ]
           
    getPanel.andDisplay(structure);

}
