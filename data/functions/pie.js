exports.cification = function (data, width, height, cx, cy, r, colors){

    let total = 0;
    let angles = [];
    let cBack = [];
    let startAngle = 0;
    let i = 0;
  
    // Add all data values so we know how big the whole pie is
    for (i = 0; i < data.length; i++) {
        total += data[i];
    };

    // Now figure out how big each slice of the pie is. Angles in radians.
    for (i = 0; i < data.length; i++) {
        angles[i] = data[i] / total * Math.PI * 2;
    };

    // Loop through each slice of pie.
    for (i = 0; i < data.length; i++) {
        var endAngle = startAngle + angles[i];
        var x1 = cx + r * Math.sin(startAngle);
        var y1 = cy - r * Math.cos(startAngle);
        var x2 = cx + r * Math.sin(endAngle);
        var y2 = cy - r * Math.cos(endAngle);
        var big = 0;
        var d;
        var percent = Math.round(((data[i] / total) * 100)) + '%: ';

        if (endAngle - startAngle > Math.PI) {
            big = 1;
        }

        d = 'M ' + cx + ',' + cy + // Start at circle center
        ' L ' + x1 + ',' + y1 + // Draw line to (x1,y1)
        ' A ' + r + ',' + r + // Draw an arc of radius r
        ' 0 ' + big + ' 1 ' + // Arc details...
        x2 + ',' + y2 + // Arc goes to to (x2,y2)
        ' Z'; // Close path back to (cx,cy)

        cBack.push([d, colors[i], percent]);

        //init for next loop
        startAngle = endAngle;

    }

    return cBack;
    
};