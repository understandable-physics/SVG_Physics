var s = SVG('#svg');

function drawSector(x, y, radius, angle) {
    let rad = (90 + angle) * Math.PI / 180,
        rx = radius,
        ry = radius,
        x_axis_rotation = 0,
        large_arc_flag = angle <= 180 ? 0 : 1,
        sweep_flag = 1,
        dx = Math.cos(rad) * radius,
        dy = Math.sin(rad) * radius;

    let sectorString = [
        'm', x, y, 
        'v', -radius, 
        'A', rx, ry, x_axis_rotation, large_arc_flag, sweep_flag, x - dx, y - dy, 
        'z'
    ].join(' ');

    /* let sector = s.path();
    sector.attr({
        d: sectorString,
        fill: color,
        stroke: '#000', 'stroke-width': 1
    });
    return sector; */
    return sectorString;
}

let sector = SVG('#sector');
sector.attr({
    d: drawSector(500, 200, 150, 330),
    fill: '#ff0',
    stroke: '#000',
    'stroke-width': 1
});

let sectorTik = s.path();
let sectorTak = s.path();
let tik = 0, tak = 0;
let clock = setInterval(() => {
    
    if(tik > 359){
        tik = 0;
        tak += 6;
    }
    tak = tak == 360 ? 0 : tak;
    sectorTik.attr({
        d: drawSector(200, 200, 150, tik),
        fill: 'red',
        stroke: '#000',
        'stroke-width': 1
    });
    sectorTak.attr({
        d: drawSector(200, 200, 75, tak),
        fill: '#0f0',
        stroke: '#000',
        'stroke-width': 1
    });
    tik += 6;
    //console.log(tik, tak)
}, 10)