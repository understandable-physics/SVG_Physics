var s = SVG('#svg');

function drawSector(x, y, radius, angle, color){
    let rad = (90+angle) * Math.PI / 180,
        rx = radius,
        ry = radius,
        x_axis_rotation = 0,
        large_arc_flag = angle <= 180 ? 0 : 1,
        sweep_flag = 1,
        dx = Math.cos(rad) * radius,
        dy = Math.sin(rad) * radius;

    let sectorString = ['M', x, y, 'v', -radius, 'A', rx, ry, x_axis_rotation, large_arc_flag, sweep_flag, x-dx,  y-dy, 'z'].join(' ');

    let sector = s.path();
    sector.attr({
        d: sectorString,
        fill: color,
        stroke: '#000', 'stroke-width': 1
    });
    return sector;
}
//         x, y, radius, angle
drawSector(200, 200, 100, 75, 'red');

drawSector(200, 200, 75, 75, 'green')
