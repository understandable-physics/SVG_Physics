var s = Snap("#svg");
s.attr({ width: "600px", height: "800px" });

var bracketH = s.rect(100, 197, 200, 6).attr({
    fill: "#e9ddaf",
    stroke: "black",
    "stroke-width": "1px"
});

var plumb0_1 = s.rect(105, 190, 20, 20, 5, 5).attr({
    "fill": "#d4ff2a",
    "stroke": "black",
    "stroke-width": "1"
});

var plumb0_2 = plumb0_1.clone().transform('r180,200,200');

var flywheelH = s.group(bracketH, plumb0_1, plumb0_2);
var flywheelV = flywheelH.clone().transform('r90,200,200');

var pendulum = s.group(flywheelH, flywheelV);

/* var pulley2 = s.circle(200, 200, 30).attr({
    "fill": "#6c5d53",
    "stroke": "black",
    "stroke-width": "2"
}); */

var r1 = 30;
var pulley1 = s.circle(200, 200, r1).attr({
    "fill": "#ac9d93",
    "stroke": "black",
    "stroke-width": "2",
});



var dimR1 = s.path("M160 175h 15 l 25,25").attr({
    "fill": "none",
    "stroke": "black",
    "stroke-width": "0.5"
});

//var arrow = s.path("M2 2 l2 3 -4 0 z").transform( 'translate(176 179) rotate(-45 0 0)');

var textr = s.text(163, 170, 'r');
var text1 = s.text(170, 172, "1").attr({ "font-size": "8" });
var textr1 = s.group(textr, text1);

var dy = 0;
var ropeHeight = 100;
var ropeX = 230;
var ropeY = 200;
var rope = s.line(ropeX, ropeY, ropeX, ropeX + ropeHeight + dy).attr({
    "stroke": "black",
    "stroke-width": "2"
});
var plumbHeight = 30;
var plumbWeight = s.rect(220, ropeX + ropeHeight + dy, 20, plumbHeight)
var plumbText = s.text(200, ropeX + ropeHeight + dy + plumbHeight, "M")
var plumb = s.group(rope, plumbWeight, plumbText);

var startButtonRect = s.rect(20, 20, 50, 20, 5, 5)
startButtonRect.attr({
    fill: "red",
    stroke: "black",
    strokeWeight: 2
});
var startButtonText = s.text(30, 35, "Start");
var startButton = s.group(startButtonRect, startButtonText);

var lengthOfRope = ropeX + ropeHeight + dy + (2 * Math.PI * r1);

var anim = function () {
    //plumb.transform('');
    //plumb.animate({ y: 100 }, 2000, mina.bounce);
    pendulum.animate({ transform: 'r360,200,200' }, 2000, mina.bounce);
    rope.animate({ y2: lengthOfRope }, 2000, mina.bounce);
    plumbWeight.animate({y: lengthOfRope}, 2000, mina.bounce);
    plumbText.animate({y: lengthOfRope}, 2000, mina.bounce);
}


startButton.click(anim);
