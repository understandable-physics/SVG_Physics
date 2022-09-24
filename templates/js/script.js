var mySVG = document.getElementById("svg");
var svgDoc;
mySVG.addEventListener("load",function() {
	 svgDoc = mySVG.contentDocument;
	 alert("SVG contentDocument Loaded!");
}, false);