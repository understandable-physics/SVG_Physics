var vcoords = {
	zeroxpoint : 100, 
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
var button1bar = SVG('#button1bar')
var button1text = SVG('#button1text')
var button2 = SVG('#button2')
var button2bar = SVG('#button2bar')
var button2text = SVG('#button2text')
var button3 = SVG('#button3')
var button3bar = SVG('#button3bar')
var button3text = SVG('#button3text')
var button4 = SVG('#button4')
var button4bar = SVG('#button4bar')
var button4text = SVG('#button4text')
var button5 = SVG('#button5')
var button5bar = SVG('#button5bar')
var button5text = SVG('#button5text')
var button6 = SVG('#button6')
var button6bar = SVG('#button6bar')
var button6text = SVG('#button6text')
var draggline1 = SVG('#draggline1')
var draggbar1 = SVG('#draggbar1')
var draggline2 = SVG('#draggline2')
var draggbar2 = SVG('#draggbar2')
var dropdownmenue = SVG('#dropdownmenue')
var dropdownmenuebackground = SVG('#dropdownmenuebackground')
var dropdownmenuebutton1 = SVG('#dropdownmenuebutton1')
var dropdownmenuebutton2 = SVG('#dropdownmenuebutton2')
var dropdownmenuebutton3 = SVG('#dropdownmenuebutton3')
var dropdownmenuebutton4 = SVG('#dropdownmenuebutton4')
var dropdownmenuebutton5 = SVG('#dropdownmenuebutton5')
var dropdownmenuebutton6 = SVG('#dropdownmenuebutton6')
var dropdownmenuebutton7 = SVG('#dropdownmenuebutton7')
var dropdownmenuebutton8 = SVG('#dropdownmenuebutton8')
var dropdownmenuebutton1bar = SVG('#dropdownmenuebutton1bar')
var dropdownmenuebutton2bar = SVG('#dropdownmenuebutton2bar')
var dropdownmenuebutton3bar = SVG('#dropdownmenuebutton3bar')
var dropdownmenuebutton4bar = SVG('#dropdownmenuebutton4bar')
var dropdownmenuebutton5bar = SVG('#dropdownmenuebutton5bar')
var dropdownmenuebutton6bar = SVG('#dropdownmenuebutton6bar')
var dropdownmenuebutton7bar = SVG('#dropdownmenuebutton7bar')
var dropdownmenuebutton8bar = SVG('#dropdownmenuebutton8bar')
var xmarker = SVG('#xmarker')
var xmarkertext = SVG('#xmarkertext')
var ymarker = SVG('#ymarker')
var ymarkertext = SVG('#ymarkertext')
var xvector = SVG('#xvector')
var xvectortext = SVG('#xvectortext')
var yvector = SVG('#yvector')
var yvectortext = SVG('#yvectortext')
var xyvector = SVG('#xyvector')
var xyvectortext = SVG('#xyvectortext')
var acvector = SVG('#acvector')
var acvectortext = SVG('#acvectortext')
var atvector = SVG('#atvector')
var atvectortext = SVG('#atvectortext')
var avector = SVG('#avector')
var avectortext = SVG('#avectortext')
var trajectory = SVG('#trajectory')
var angle = 45;
var maxangle = 90
var minangle = 0
var maxspeed = 75
var minspeed = 30
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

function degToRad (deg)	{
	return (Math.PI * deg) / 180;
}
function radToDeg (rad) {
	return (rad * 180) / Math.PI;
}
function Move () {
	toggleevent = 1
	let x = Math.cos((angle * Math.PI) / 180) * v0 * t;

	let y = Math.sin((angle * Math.PI) / 180) * v0 * t - ((g * (t * t)) / 2);
	let dx = (Math.cos(degToRad(angle)) * (v0 * (t + 0.001))) - x;
	let dy = (Math.sin(degToRad(angle)) * v0) * (t + 0.001) - ((g * ((t + 0.001) * (t + 0.001))) / 2) - y

	let dangle = Math.atan2(dy, dx)
	let acangle = degToRad(radToDeg(dangle)  + 270)

	let ac = Math.cos(dangle) * g * 10;
	let acx = Math.cos(acangle) * ac;
	let acy = Math.sin(acangle) * ac;

	let v1 = Math.sqrt(Math.pow(x / t, 2) + Math.pow(Math.sin(degToRad(angle)) * v0 - (g * t), 2))
	let v2 = Math.sqrt(Math.pow((x + dx) / (t + 0.001), 2) + Math.pow(Math.sin(degToRad(angle)) * v0 - (g * (t + 0.001)), 2))
	
	let atangle = degToRad(radToDeg(dangle))

	let at = ((v2 - v1) / ((t + 0.001) - t)) * 10
	let atx = Math.cos(atangle) * at;
	let aty = Math.sin(atangle) * at;
	if (angle == 90) {
		x = 0
		dx = 0
	}
	if (togglepause == 0) {
		t += 0.05;
	}
	if (y > (projectile.bbox().height / 2)) {
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
			x2: x + vcoords.zeroxpoint + (Math.cos((angle * Math.PI) / 180) * v0),
			y1: vcoords.zeroypoint - y,
			y2: vcoords.zeroypoint - y
		})
		xvectortext.attr({
			x: x + vcoords.zeroxpoint + Math.cos((angle * Math.PI) / 180) * v0 + 5,
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
			x2: x + vcoords.zeroxpoint + Math.cos((angle * Math.PI) / 180) * v0,
			y1: vcoords.zeroypoint - y,
			y2: vcoords.zeroypoint - y - (Math.sin((angle * Math.PI) / 180) * v0) + (g * t)
		})
		xyvectortext.attr({
			x: x + vcoords.zeroxpoint + Math.cos((angle * Math.PI) / 180) * v0 + 10,
			y: vcoords.zeroypoint - y - (Math.sin((angle * Math.PI) / 180) * v0) + (g * t) + 10
		})
		projectile.attr({
			cx: x + vcoords.zeroxpoint,
			cy: vcoords.zeroypoint - y
		})
		acvector.attr({
			x1: x + vcoords.zeroxpoint,
			x2: x + vcoords.zeroxpoint + acx,
			y1: vcoords.zeroypoint - y,
			y2: vcoords.zeroypoint - y - acy
		})
		acvectortext.attr({
			x: x + vcoords.zeroxpoint + acx,
			y: vcoords.zeroypoint - y - acy + 20
		})
		atvector.attr({
			x1: x + vcoords.zeroxpoint,
			x2: x + vcoords.zeroxpoint + atx,
			y1: vcoords.zeroypoint - y,
			y2: vcoords.zeroypoint - y - aty
		})
		atvectortext.attr({
			x: x + vcoords.zeroxpoint + atx,
			y: vcoords.zeroypoint - y - aty + 20
		})
		avector.attr({
			x1: x + vcoords.zeroxpoint,
			x2: x + vcoords.zeroxpoint + atx + acx,
			y1: vcoords.zeroypoint - y,
			y2: vcoords.zeroypoint - y - aty - acy
		})
		avectortext.attr({
			x: x + vcoords.zeroxpoint + atx + acx + 10,
			y: vcoords.zeroypoint - y - aty - acy + 10
		})
	}
	if (y >= 0) {
		setTimeout(Move, 10)
	} else {
		button1text.tspan('Старт')
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
	if (v0 < maxspeed) {
		v0 += 1;
		speedtext.tspan(v0.toString() + ' - Початкова швидкість')
	}
} 
function DecreaseSpeed () {
	if (v0 > minspeed) {
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
	buttonid.removeClass('button_unclick')
	buttonid.addClass('button_click')
	setTimeout(() => {buttonid.removeClass('button_click'),buttonid.addClass('button_unclick')}, 500);
}
function ToggleDropDownMenu () {
	
}
button1.click(function(){
	if (toggleevent == 0) {
		if (togglemarkers != 0) {
			xmarker.show();
			ymarker.show();
			xmarkertext.show()
			ymarkertext.show()
		}
		button1text.tspan('Пауза')
		Move()
		projectile.show()
	} else {
				TogglePause()
		if (togglepause == 1) {
			button1text.tspan('Старт')
		} else {
			button1text.tspan('Пауза')
		}

	}
	ButtonClick(button1bar)
})
button2.click(function(){
	ToggleDropDownMenue ()
	ButtonClick(button2bar)
})

button3.click(function(){
	if (toggleevent == 0) {
		IncreaseAngle()
		Trajectory()
		ButtonClick(button3bar)
	}
})

button4.click(function(){
	if (toggleevent == 0) {
		DecreaseAngle()
		Trajectory()
		ButtonClick(button4bar)
	}
})
button5.click(function(){
	if (toggleevent == 0) {
		IncreaseSpeed()
		Trajectory()
		ButtonClick(button5bar)
	}
})
button6.click(function(){
	if (toggleevent == 0) {	
		DecreaseSpeed()
		Trajectory()
		ButtonClick(button6bar)
	}
})
draggbar1.on('dragmove.namespase', e => {
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
draggbar2.on('dragmove.namespase', e => {
	const { handler, box } = e.detail
	e.preventDefault()
    let { x, y } = box
    x = Math.round(x)
    y = Math.round(y)
	if (x > 400 && x < 490 && toggleevent == 0) {
		while (((x - 400).toFixed(0)) <= v0 - minspeed) {
			DecreaseSpeed()
		}
		while (((x - 400).toFixed(0) * maxspeed / 90) >= v0) {
			IncreaseSpeed()
		}
		Trajectory()
		handler.el.cx(x)
	}

}).draggable()

function ToggleMarker (marker) {
	if (!marker.visible()) {
		marker.show()
	} else {
		marker.hide()
	}
}
function ButtonSwitch (buttonid) {
	if (buttonid.hasClass('button_on')) {
		buttonid.removeClass('button_on')
		buttonid.addClass('button_off')
	} else {
		buttonid.removeClass('button_off')
		buttonid.addClass('button_on')
	}
}
function ToggleDropDownMenue () {
	if (dropdownmenue.visible()) {
		dropdownmenue.hide(	)
	} else {
		dropdownmenue.show()
	}
}

dropdownmenuebutton1.click(function(){
	ToggleMarker (xvector)
	ToggleMarker (xvectortext)
	ButtonSwitch(dropdownmenuebutton1bar)
})
dropdownmenuebutton2.click(function(){
	ToggleMarker (yvector)
	ToggleMarker (yvectortext)
	ButtonSwitch(dropdownmenuebutton2bar)
})
dropdownmenuebutton3.click(function(){
	ToggleMarker (xyvector)
	ToggleMarker (xyvectortext)
	ButtonSwitch(dropdownmenuebutton3bar)
})
dropdownmenuebutton4.click(function(){
	ToggleMarker (xmarker)
	ToggleMarker (xmarkertext)
	ButtonSwitch(dropdownmenuebutton4bar)
})
dropdownmenuebutton5.click(function(){
	ToggleMarker (ymarker)
	ToggleMarker (ymarkertext)
	ButtonSwitch(dropdownmenuebutton5bar)
})
dropdownmenuebutton6.click(function(){
	ToggleMarker (acvector)
	ToggleMarker (acvectortext)
	ButtonSwitch(dropdownmenuebutton6bar)
})
dropdownmenuebutton7.click(function(){
	ToggleMarker (atvector)
	ToggleMarker (atvectortext)
	ButtonSwitch(dropdownmenuebutton7bar)
})
dropdownmenuebutton8.click(function(){
	ToggleMarker (avector)
	ToggleMarker (avectortext)
	ButtonSwitch(dropdownmenuebutton8bar)
})

Trajectory()
ToggleDropDownMenue ()
