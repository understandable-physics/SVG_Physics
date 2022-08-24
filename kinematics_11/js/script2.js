// Координаты центра
var center = { x: 300, y: 300 },
    point3d = { x: 230, y: 200, z: 100 };


// Перевод градусов в радианы
function rad(angle) {
    return angle * Math.PI / 180;
}

var s = SVG('#Kinemat_1v_1')
var gAxis = SVG('#gAxis')

var radiusVector = SVG('#radiusVector'),
    gPointA = SVG('#gPointA'),
    pointA = SVG('#pointA')
pointText = SVG('#pointText');

var vectorX = SVG('#vectorX'),
    valueX = SVG('#valueX'),
    vectorY = SVG('#vectorY'),
    valueY = SVG('#valueY'),
    vectorZ = SVG('#vectorZ'),
    valueZ = SVG('#valueZ');

var gProjections = SVG('#gProjections'),
    gProjectionX = SVG('#gProjectionX'),
    gProjectionY = SVG('#gProjectionY'),
    gProjectionZ = SVG('#gProjectionZ'),
    projectionX = SVG('#projectionX'),
    projectionY = SVG('#projectionY'),
    projectionZ = SVG('#projectionZ');

var gCordinates = SVG('#gCordinates'),
    coordinateX_0 = SVG('#coordinateX_0'),
    coordinateY_0 = SVG('#coordinateY_0'),
    coordinateZ_0 = SVG('#coordinateZ_0'),
    coordinateX_1 = SVG('#coordinateX_1'),
    coordinateX_2 = SVG('#coordinateX_2'),
    coordinateY_1 = SVG('#coordinateY_1'),
    coordinateY_2 = SVG('#coordinateY_2'),
    coordinateZ_1 = SVG('#coordinateZ_1'),
    coordinateZ_2 = SVG('#coordinateZ_2');

var button1 = SVG('#button1'),
    button2 = SVG('#button2'),
    button3 = SVG('#button3'),
    textButton1 = SVG('#textButton1'),
    textButton2 = SVG('#textButton2'),
    textButton3 = SVG('#textButton3');

/* valueX.on('dragmove.namespase', e => {
    const { handler, box } = e.detail
    e.preventDefault()
    let { x, y } = box
    console.log(e.detail)
    //console.log(box)
    //console.log(Math.round(x),y)
    handler.el.x(Math.round(x))
    handler.el.plain(Math.round(x) - (center.x - point3d.x))

}).draggable() */

// Расчет проекций на оси
vectorX.attr({ y2: center.y - point3d.x });
vectorY.attr({ y2: center.y - point3d.y });
vectorZ.attr({ y2: center.y - point3d.z });

coordinateX_0.attr({ y2: center.y - point3d.x });
coordinateX_1.attr({ y2: center.y - point3d.x });
coordinateX_2.attr({ y2: center.y - point3d.x });
coordinateY_0.attr({ y2: center.y - point3d.y });
coordinateY_1.attr({ y2: center.y - point3d.y });
coordinateY_2.attr({ y2: center.y - point3d.y });
coordinateZ_0.attr({ y2: center.y - point3d.z });
coordinateZ_1.attr({ y2: center.y - point3d.z });
coordinateZ_2.attr({ y2: center.y - point3d.z });

// Вычислить смещение координат 
var tX = {
    x: Math.cos(rad(30)) * point3d.x,
    y: Math.sin(rad(30)) * point3d.x
};
console.log()
var tY = {
    x: Math.cos(rad(0)) * point3d.y,
    y: Math.sin(rad(0)) * point3d.y
};
var tZ = {
    x: Math.cos(rad(150)) * point3d.z,
    y: Math.sin(rad(150)) * point3d.z
};
// Перерисовать линии проекций по новым координатам
coordinateX_0.transform({
    translateX: tZ.x,
    translateY: tZ.y
}).rotate(120, 300, 300)
coordinateX_1.transform({
    translateX: tZ.x,
    translateY: tZ.y - point3d.y
}).rotate(120, 300, 300);
coordinateX_2.transform({
    translateX: 0,
    translateY: -point3d.y
}).rotate(120, 300, 300)
coordinateY_0.transform({
    translateX: tZ.x + tX.x,
    translateY: tZ.y + tX.y
})
coordinateY_1.transform({
    translateX: tZ.x,
    translateY: tZ.y
})
coordinateY_2.transform({
    translateX: tX.x,
    translateY: tX.y
})
coordinateZ_0.transform({
    translateX: tX.x,
    translateY: tX.y
}).rotate(240, 300, 300)
coordinateZ_1.transform({
    translateX: tX.x,
    translateY: tX.y - point3d.y
}).rotate(240, 300, 300)
coordinateZ_2.transform({
    translateX: 0,
    translateY: -point3d.y
}).rotate(240, 300, 300)

// Переместить точку А и надпись
/* pointA.attr({
    'cx': coordinateY_0.getBBox().x,
    'cy': coordinateY_0.getBBox().y
}); */
pointA.cx(center.x + tZ.x + tX.x);
pointA.cy(center.y + tZ.y + tX.y - point3d.y);

pointText.x(center.x + tZ.x + tX.x + 5);
pointText.y(center.y + tZ.y + tX.y - point3d.y - 30);

console.log(pointText.bbox())

// Провести вектор к новой точке
radiusVector.attr({
    x2: center.x + tZ.x + tX.x,
    y2: center.y + tZ.y + tX.y - point3d.y
});