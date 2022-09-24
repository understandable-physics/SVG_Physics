var s = SVG('#svg5')
var layer1 = SVG('#layer1')

var g = 10
var t = new Date()
var weight1 = layer1.group()
var bar1 = weight1.rect(50, 100).move(50, 450).stroke('#000').fill('white')
var weight2 = layer1.group()
var bar2 = weight2.rect(50, 100).move(150, 150).stroke('#000').fill('white')
var block = layer1.circle(100).move(75, 50).stroke('#000').fill('white')
var button1 = layer1.group()
var button1bar = button1.rect(100, 50).move(400, 50).addClass('button_unclick')
var event = 0
var m1 = 0.1
var m2 = 0.2
var pause = 0
var timer = layer1.circle(200).move(250, 250).stroke('#000').fill('white')
var timerarrow = layer1.line(350, 350, 350, 250).stroke('#000')

function getSign (x) {
	return x / Math.abs(x)
}

function Move () {
	let dt = new Date()
	console.log(dt.getTime(), t.getTime(), dt.getTime() - t.getTime())
	let y = ((g * Math.pow ((dt.getTime() - t.getTime()) / 100, 2)) / 2)
	let f1 = m1 * g
	let f2 = m2 * g
	if (y * 3.779 < 450 - block.bbox().y - block.bbox().height) {
	bar1.attr({
		y: 450 + (y * getSign(f1 - f2) * 3.779) 
	})
	bar2.attr({
		y: 150 + (y * getSign(f2 - f1) * 3.779) 
	})
	
	console.log(y)
	setTimeout(Move, 1)
	} else {
		event = 0
	}
	if (pause == 0) {
		rotateTimerArrow()
	}

}	
function ButtonClick (buttonid) {
	buttonid.removeClass('button_unclick')
	buttonid.addClass('button_click')
	setTimeout(() => {buttonid.removeClass('button_click'),buttonid.addClass('button_unclick')}, 500);
}
function TogglePause () {
	if (pause == 0) {
		pause = 1;
	} else {
		pause = 0;
	}
}
function degToRad (deg)	{
	return (Math.PI * deg) / 180;
}
function rotateTimerArrow () {
	let dt = new Date()
	angle = degToRad ((dt.getTime() - t.getTime()) / (1000 / 360) - 90) 
	timerarrow.attr({
		x2 : 350 + Math.cos(angle) * 100,
		y2 : 350 + Math.sin(angle) * 100
	})
}
button1.click (function(){
	if (event == 0) {
		event = 1
		ButtonClick(button1bar)
		t = new Date()
		Move ()
	} else {
		TogglePause()
		if (togglepause == 1) {
			button1text.tspan('Старт')
		} else {
			button1text.tspan('Пауза')
		}

	}
})
