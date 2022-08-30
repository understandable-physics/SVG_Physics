var vcoords = {
	zeroxpoint : 50, 
	zeroypoint : 500
}
var s = SVG('#svg5')
var layer1 = SVG('#layer1')
var layer2 = SVG('#layer2')
var markers = SVG('#markers')
var buttons = SVG('#buttons')
var text = SVG('#text')
var gun = SVG('#gun')
var projectile = SVG('#projectile').hide();
var XAxis = SVG('#XAxis');
var YAxis = SVG('#YAxis')
var Xvector = SVG ('#Xvector');
var button1 = SVG('#button1')
var button2 = SVG('#button2')
var button3 = SVG('#button3')
var button4 = SVG('#button4')
var button5 = SVG('#button5')
var button6 = SVG('#button6')
var button7 = SVG('#button7')
var draggline1 = SVG('#draggline1')
var draggable1 = SVG('#draggable1')
var draggline2 = SVG('#draggline2')
var draggable2 = SVG('#draggable2')
var xmarker = SVG('#xmarker')
var xmarkertext = SVG('#xmarkertext')
var ymarker = SVG('#ymarker')
var ymarkertext = SVG('#ymarkertext')
var xvector = SVG('#xvector')
var xvectortext = SVG('#yvectortext')
var yvector = SVG('#yvector')
var yvectortext = SVG('#xyvectortext')
var xyvector = SVG('#xyvector')
var xyvectortext = SVG('#xyvectortext')
var trajectory = SVG('#trajectory')
var angle = 45;
var	t = 0.05;
var	v0 = 75;
var	g = 10;
var dx = projectile.bbox().cx;
var dy = projectile.bbox().cy;
var trajectory_coords = "M"+ vcoords.zeroxpoint +"," + vcoords.zeroypoint + " ";		
var togglepause = 0;
var togglemarkers = 1;
var toggleevent = 0;

var angletext = SVG('#angletext')
var speedtext = SVG('#speedtext')
text.font({
  family : 'Helvetica'
})
function Move () {
	toggleevent = 1
	let x = Math.cos((angle * Math.PI) / 180) * v0 * t;
	let y = Math.sin((angle * Math.PI) / 180) * v0 * t - ((g * (t * t)) / 2);
	if (togglepause == 0) {
		t += 0.05;
	}
	if ( y > (projectile.bbox().height / 2)) {
		projectile.attr({
			cx: x + vcoords.zeroxpoint,
			cy: vcoords.zeroypoint - y
		})
		xmarker.attr({
			x: x + vcoords.zeroxpoint,
			y: vcoords.zeroypoint
		})
		xmarkertext.attr({
			x: x + vcoords.zeroxpoint - 15,
			y: vcoords.zeroypoint + 25
		})
		xmarkertext.tspan('X = ' + x.toFixed(0).toString())
		ymarker.attr({
			x: vcoords.zeroxpoint - 10,
			y: vcoords.zeroypoint - y
		})
		ymarkertext.attr({
			x: vcoords.zeroxpoint + 5,
			y: vcoords.zeroypoint - y
		})
		ymarkertext.tspan('Y = ' + y.toFixed(0).toString())
		xvector.attr({
			x1: x + vcoords.zeroxpoint,
			x2: x + vcoords.zeroxpoint + Math.sin((angle * Math.PI) / 180) * v0,
			y1: vcoords.zeroypoint - y,
			y2: vcoords.zeroypoint - y
		})
		xvectortext.attr({
			x: x + vcoords.zeroxpoint + Math.sin((angle * Math.PI) / 180) * v0 + 5,
			y: vcoords.zeroypoint - y - 5
		})
		yvector.attr({
			x1: x + vcoords.zeroxpoint,
			x2: x + vcoords.zeroxpoint,
			y1: vcoords.zeroypoint - y,
			y2: vcoords.zeroypoint - y - (Math.sin((angle * Math.PI) / 180) * v0) + (g * t)
		})
		yvectortext.attr({
			x: x + vcoords.zeroxpoint - 20,
			y: vcoords.zeroypoint - y - (Math.sin((angle * Math.PI) / 180) * v0) + (g * t) + 20
		})
		xyvector.attr({
			x1: x + vcoords.zeroxpoint,
			x2: x + vcoords.zeroxpoint + Math.sin((angle * Math.PI) / 180) * v0,
			y1: vcoords.zeroypoint - y,
			y2: vcoords.zeroypoint - y - (Math.sin((angle * Math.PI) / 180) * v0) + (g * t)
		})
		xyvectortext.attr({
			x: x + vcoords.zeroxpoint + Math.sin((angle * Math.PI) / 180) * v0 + 10,
			y: vcoords.zeroypoint - y - (Math.sin((angle * Math.PI) / 180) * v0) + (g * t) + 10
		})
	}
	if (y >= 0) {
		setTimeout(Move, 10)
	} else {
		xmarker.hide();
		ymarker.hide();
		xmarkertext.hide()
		ymarkertext.hide()
		t = 0.05
		toggleevent = 0
	}
}
function Trajectory () {
	toggleevent = 1
	let x = Math.cos((angle * Math.PI) / 180) * v0 * t;
	let y = Math.sin((angle * Math.PI) / 180) * v0 * t - ((g * (t * t)) / 2);
	t += 0.05;
	if (Math.sqrt(Math.pow(x + vcoords.zeroxpoint - dx, 2) + Math.pow(vcoords.zeroypoint - y - dy, 2) >= 5)) {
		trajectory_coords += ((x + vcoords.zeroxpoint).toFixed(2) +','+ (vcoords.zeroypoint - y).toFixed(2) +' ')
		dx = x + vcoords.zeroxpoint;
		dy = vcoords.zeroypoint - y; 
	}
	if (y > 0) {
		Trajectory()
	} else {
		trajectory_coords += ((x + vcoords.zeroxpoint).toFixed(1) +','+ (vcoords.zeroypoint - 2).toFixed(1) +' ')
		trajectory.attr({
			d: trajectory_coords
		})
		toggleevent = 0
		t = 0.05
		dx = vcoords.zeroxpoint
		dy = vcoords.zeroypoint
		trajectory_coords = "M"+ vcoords.zeroxpoint +"," + vcoords.zeroypoint + " ";		
	}
}
function IncreaseAngle () {
	if (angle < 90) {
		angle += 1;
		angletext.tspan(angle.toString() + ' - Кут пострілу'	)
		gun.rotate(-1, vcoords.zeroxpoint, vcoords.zeroypoint)
	}
} 
function DecreaseAngle () {
	if (angle > 0) {
		angle -= 1;
		angletext.tspan(angle.toString() + ' - Кут пострілу')
		gun.rotate(1, vcoords.zeroxpoint, vcoords.zeroypoint)
	}
} 
function IncreaseSpeed () {
	if (v0 < 80) {
		v0 += 1;
		speedtext.tspan(v0.toString() + ' - Початкова швидкість')
	}
} 
function DecreaseSpeed () {
	if (v0 > 0) {
		v0 -= 1;
		speedtext.tspan(v0.toString() + ' - Початкова швидкість')
	}
} 
function ToggleMarkers () {
	if (togglemarkers == 0) {
		markers.show()
		togglemarkers = 1;
	} else {
		markers.hide()
		togglemarkers = 0;
	}
}
function TogglePause () {
	if (togglepause == 0) {
		togglepause = 1;
	} else {
		togglepause = 0;
	}
}
function ButtonClick (buttonid) {
	buttonid.attr({
			stroke : '#ccc',
			fill : '#ddd'
		})
		setTimeout(() => buttonid.attr({
			stroke : '#000',
			fill : '#ccc'
		}), 500);
}
button1.click(function(){
	if (toggleevent == 0) {
		if (togglemarkers != 0) {
			xmarker.show();
			ymarker.show();
			xmarkertext.show()
			ymarkertext.show()
		}
		ButtonClick(button1)
		
		Move()
		projectile.show()
	}
	togglepause = 0;
})
button2.click(function(){ 
	TogglePause()
	ButtonClick(button2)
})
button3.click(function(){
	ToggleMarkers ()
	ButtonClick(button3)
})
button4.click(function(){
	if (toggleevent == 0) {
		IncreaseAngle()
		Trajectory()
		ButtonClick(button4)
	}
})
button5.click(function(){
	if (toggleevent == 0) {
		DecreaseAngle()
		Trajectory()
		ButtonClick(button5)
	}
})
button6.click(function(){
	if (toggleevent == 0) {
		IncreaseSpeed()
		Trajectory()
		ButtonClick(button6)
	}
})
button7.click(function(){
	if (toggleevent == 0) {	
		DecreaseSpeed()
		Trajectory()
		ButtonClick(button7)
	}
})
draggable1.on('dragmove.namespase', e => {
	const { handler, box } = e.detail
	e.preventDefault()
    let { x, y } = box
    x = Math.round(x)
    y = Math.round(y)
	if (x > 399 && x < 491 && toggleevent == 0) {
		while (((x - 400).toFixed(0)) < angle) {
			DecreaseAngle()
		}
		while (((x - 400).toFixed(0)) > angle) {
			IncreaseAngle()
		}
		Trajectory()
		handler.el.cx(x)
	}

}).draggable()
draggable2.on('dragmove.namespase', e => {
	const { handler, box } = e.detail
	e.preventDefault()
    let { x, y } = box
    x = Math.round(x)
    y = Math.round(y)
	if (x > 399 && x < 491 && toggleevent == 0) {
		while (((x - 400).toFixed(0)) < v0) {
			DecreaseSpeed()
		}
		while (((x - 400).toFixed(0) * 0.8888888888888889) > v0 ) {
			IncreaseSpeed()
		}
		Trajectory()
		handler.el.cx(x)
	}

}).draggable()

ToggleMarkers ()
Trajectory()
	
	
	