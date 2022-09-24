var s = Snap("#svg");

var c = s.circle(150,150,100).attr({ stroke: 'red', strokeDasharray: "40 280", fill: 'none', strokeWidth: 20 });

function anim() {
    //c.transform('r0,150,150');
    c.animate({ transform: "r360,150,150" }, 1000, mina.linear, anim);
};

anim();
