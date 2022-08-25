// Координаты центра
var center = { x: 300, y: 300 },
    vPoint = { x: 50, y: 100, z: 230 };


// Перевод градусов в радианы
function rad(angle) {
    return angle * Math.PI / 180;
}

var s = SVG('#Kinemat_1v_1')
var gAxis = SVG('#gAxis')

var radiusVector = SVG('#radiusVector'),
    gPointA = SVG('#gPointA'),
    pointA = SVG('#pointA'),
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

function calculateСoordinates(point) {
    // Расчет проекций на оси
    vectorX.attr({ y2: center.y - point.x });
    vectorY.attr({ y2: center.y - point.y });
    vectorZ.attr({ y2: center.y - point.z });

    coordinateX_0.attr({ y2: center.y - point.x });
    coordinateX_1.attr({ y2: center.y - point.x });
    coordinateX_2.attr({ y2: center.y - point.x });
    coordinateY_0.attr({ y2: center.y - point.y });
    coordinateY_1.attr({ y2: center.y - point.y });
    coordinateY_2.attr({ y2: center.y - point.y });
    coordinateZ_0.attr({ y2: center.y - point.z });
    coordinateZ_1.attr({ y2: center.y - point.z });
    coordinateZ_2.attr({ y2: center.y - point.z });

    // Вычислить смещение координат 
    var tX = {
        x: Math.cos(rad(30)) * point.x,
        y: Math.sin(rad(30)) * point.x
    };
    console.log()
    var tY = {
        x: Math.cos(rad(0)) * point.y,
        y: Math.sin(rad(0)) * point.y
    };
    var tZ = {
        x: Math.cos(rad(150)) * point.z,
        y: Math.sin(rad(150)) * point.z
    };
    // Перерисовать линии проекций по новым координатам
    coordinateX_0.transform({
        translateX: tZ.x,
        translateY: tZ.y
    }).rotate(120, 300, 300)
    coordinateX_1.transform({
        translateX: tZ.x,
        translateY: tZ.y - point.y
    }).rotate(120, 300, 300);
    coordinateX_2.transform({
        translateX: 0,
        translateY: -point.y
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
        translateY: tX.y - point.y
    }).rotate(240, 300, 300)
    coordinateZ_2.transform({
        translateX: 0,
        translateY: -point.y
    }).rotate(240, 300, 300)

    // Переместить точку А и надпись
    pointA.cx(center.x + tZ.x + tX.x);
    pointA.cy(center.y + tZ.y + tX.y - point.y);

    pointText.x(center.x + tZ.x + tX.x + 5);
    pointText.y(center.y + tZ.y + tX.y - point.y - 30);

    // Провести вектор к новой точке
    radiusVector.attr({
        x2: center.x + tZ.x + tX.x,
        y2: center.y + tZ.y + tX.y - point.y
    });
}

// Функция изменения видимости объектов
function toggle_visibility(el, txtBtn) {
    if (el.visible()) {
        el.hide();
        txtBtn.fill('#c0c0c0');
    } else {
        el.show();
        txtBtn.fill('#000000');
    }
}
// Обработка нажатия кнопок
button1.click(function () { toggle_visibility(radiusVector, textButton1) });
button2.click(function () { toggle_visibility(gCordinates, textButton2) });
button3.click(function () { toggle_visibility(gProjections, textButton3) });

calculateСoordinates(vPoint)

valueX.on('dragmove.namespase', e => {
    const { handler, box } = e.detail
    e.preventDefault()
    let { x, y } = box
    x = Math.round(x)
    y = Math.round(y)
    vPoint.x = x -70;
    if (vPoint.x > 0 && vPoint.x < 240) {
        handler.el.x(x)
        handler.el.plain(vPoint.x)
        calculateСoordinates(vPoint)
    }
    //handler.el.x(x)
    //handler.el.plain(x - (center.x - vPoint.x))

}).draggable()

valueY.on('dragmove.namespase', e => {
    const { handler, box } = e.detail
    e.preventDefault()
    let { x, y } = box
    x = Math.round(x)
    y = Math.round(y)
    vPoint.y = center.y - y - 15
    if (vPoint.y > 0 && vPoint.y < 240) {
        handler.el.y(y)
        handler.el.plain(vPoint.y)
        calculateСoordinates(vPoint)
    }
}).draggable()

valueZ.on('dragstart.namespase', e => {
    console.log(e.detail)
}).on('dragmove.namespase', e => {
    const { handler, box } = e.detail
    e.preventDefault()
    let { x, y } = box
    x = Math.round(x)
    y = Math.round(y)
    console.log(x - 150)
    /* handler.el.x(x)
    handler.el.plain(x - (center.x - vPoint.x)) */
    vPoint.z = 300 - (x - 130)
    if (vPoint.z > 0 && vPoint.z < 240) {
        handler.el.x(x)
        handler.el.plain(vPoint.z)
        calculateСoordinates(vPoint)
    }

}).draggable()