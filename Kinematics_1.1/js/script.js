// Координаты центра
var center = { x: 300, y: 300 },
    point3d = { x: 230, y: 200, z: 100 };

function rad(angle) {
    return angle * Math.PI / 180;
}

// Перевод градусов в радианы rad(45)
var correctionAngle = 90,
    angleX = correctionAngle + 30,
    angleY = 0,
    angleZ = correctionAngle + 150;

var s = Snap.select('#Kinemat_1v_1');

var radiusVector = s.select('#radiusVector'),
    gPointA = s.select('#gPointA'),
    pointA = s.select('#pointA')
pointText = s.select('#pointText');

var vectorX = s.select('#vectorX'),
    markerX = s.select('#markerX'),
    valueX = s.select('#valueX'),
    vectorY = s.select('#vectorY'),
    markerY = s.select('#markerY'),
    valueY = s.select('#valueY'),
    vectorZ = s.select('#vectorZ'),
    markerZ = s.select('#markerZ'),
    valueZ = s.select('#valueZ');

var gProjections = s.select('#gProjections'),
    gProjectionX = s.select('#gProjectionX'),
    gProjectionY = s.select('#gProjectionY'),
    gProjectionZ = s.select('#gProjectionZ'),
    projectionX = s.select('#projectionX'),
    projectionY = s.select('#projectionY'),
    projectionZ = s.select('#projectionZ');

var coordinateX_0 = s.select('#coordinateX_0'),
    coordinateY_0 = s.select('#coordinateY_0'),
    coordinateZ_0 = s.select('#coordinateZ_0');

var gCordinates = s.select('#gCordinates'),
    coordinateX_1 = s.select('#coordinateX_1'),
    coordinateX_2 = s.select('#coordinateX_2'),
    coordinateY_1 = s.select('#coordinateY_1'),
    coordinateY_2 = s.select('#coordinateY_2'),
    coordinateZ_1 = s.select('#coordinateZ_1'),
    coordinateZ_2 = s.select('#coordinateZ_2');

var button1 = s.select('#button1'),
    button2 = s.select('#button2'),
    button3 = s.select('#button3'),
    textButton1 = s.select('#textButton1'),
    textButton2 = s.select('#textButton2'),
    textButton3 = s.select('#textButton3');

var hide_gWhitecoordinates = function () {
    coordinateX_1.attr({ visibility: 'hidden' });
    coordinateX_2.attr({ visibility: 'hidden' });
    coordinateY_1.attr({ visibility: 'hidden' });
    coordinateY_2.attr({ visibility: 'hidden' });
    coordinateZ_1.attr({ visibility: 'hidden' });
    coordinateZ_2.attr({ visibility: 'hidden' });
}
// Функция изменения видимости объектов
function toggle_visibility(el, txtBtn) {
    if (el.attr('visibility') === 'visible') {
        el.attr({ visibility: 'hidden' });
        txtBtn.attr({ fill: '#c0c0c0' });
    } else {
        el.attr({ visibility: 'visible' });
        txtBtn.attr({ fill: '#000000' });
    }
}
// Обработка нажатия кнопок
button1.click(function () { toggle_visibility(radiusVector, textButton1) });
button2.click(function () { toggle_visibility(gCordinates, textButton2) });
button3.click(function () { toggle_visibility(gProjections, textButton3) });

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
// Изменить значения по осям
valueX.node.innerHTML = point3d.x;
valueY.node.innerHTML = point3d.y;
valueZ.node.innerHTML = point3d.z;
// Вычислить смещение координат 
var translateX = {
    x: Math.cos(rad(30)) * point3d.x,
    y: Math.sin(rad(30)) * point3d.x
};
var translateY = {
    x: Math.cos(rad(0)) * point3d.y,
    y: Math.sin(rad(0)) * point3d.y
};
var translateZ = {
    x: Math.cos(rad(150)) * point3d.z,
    y: Math.sin(rad(150)) * point3d.z
};
// Перерисовать линии проекций по новым координатам
coordinateX_0.transform(`tanslate(${translateZ.x}, ${translateZ.y}) rotate(120, 300, 300)`);
coordinateX_1.transform(`translate(${translateZ.x}, ${translateZ.y - point3d.y}) rotate(120, 300, 300)`);
coordinateX_2.transform(`translate(${0}, ${-point3d.y}) rotate(120, 300, 300)`);
coordinateY_0.transform(`tanslate(${coordinateX_0.getBBox().x2 - center.x}, ${coordinateX_0.getBBox().y2 - center.y})`);
coordinateY_1.transform(`translate(${translateZ.x}, ${translateZ.y})`);
coordinateY_2.transform(`translate(${translateX.x}, ${translateX.y})`);
coordinateZ_0.transform(`tanslate(${translateX.x}, ${translateX.y}) rotate(240, 300, 300)`);
coordinateZ_1.transform(`translate(${translateX.x}, ${translateX.y - point3d.y}) rotate(240, 300, 300)`);
coordinateZ_2.transform(`translate(${0}, ${-point3d.y}) rotate(240, 300, 300)`);
// Переместить маркеры в новые координаты
markerX.attr({ y1: center.y - point3d.x, y2: center.y - point3d.x });
markerY.attr({ y1: center.y - point3d.y, y2: center.y - point3d.y });
markerZ.attr({ y1: center.y - point3d.z, y2: center.y - point3d.z });

// Переместить точку А и надпись
pointA.attr({
    'cx': coordinateY_0.getBBox().x,
    'cy': coordinateY_0.getBBox().y
});
pointText.attr({
    x: pointA.getBBox().cx + 5,
    y: pointA.getBBox().cy - 5
})

// Провести вектор к новой точке
radiusVector.attr({
    x2: coordinateY_0.getBBox().x,
    y2: coordinateY_0.getBBox().y
});

// Перемещение значений по осям
valueX.attr({ y: center.x - point3d.x - 10}).transform(`rotate(-90 305 ${center.x - point3d.x})`)
valueY.attr({ y: center.y - point3d.y  })
valueZ.attr({ y: center.y - point3d.z - valueZ.getBBox().height }).transform(`rotate(90 305 ${center.y - point3d.z - valueZ.getBBox().height})`)

var move = function (dx, dy, mx, my, ev) {
    console.log('move ', dx, dy, mx, my, ev)
    if (this.attr('data-orientation') == 'horizontal') {
        //if (center.x < this.getBBox().x && this.getBBox().x < center.x + 250) {
            this.node.innerHTML = this.getBBox().x + dx - this.attr('y');
            this.attr({
                transform: this.data('origTransform') + (this.data('origTransform') ? "T" : "t") + dx
            });
        //}
    } else {
        if (0 < center.y - my && center.y - my < 250) {
            this.node.innerHTML = center.y - my
            this.attr({
                transform: this.data('origTransform') + (this.data('origTransform') ? "T0 " : "t0 ") + dy
                //y: my
            });
        }
    }
}

var start = function (x, y, ev) {
    this.data('origTransform', this.transform().local);
    //console.log('start ', x, y, ev )
}
var stop = function () {
    //console.log('stop');
}

valueX.drag(move, start, stop);
valueY.drag(move, start, stop);
valueZ.drag(move, start, stop);

