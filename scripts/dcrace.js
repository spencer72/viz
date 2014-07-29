//see this code running here: http://drawmeamap.com/dcrace.html



var R; 
var circs = {};

var wAttrib = {
	fill: "yellow",
	stroke: "yellow",
	opacity: 0.4
	},

	nwAttrib = {
	fill: "green",
	stroke: "green",
	opacity: 0.4
	},
	
	roadAttrib = {
	fill: "none",
	stroke: "white",
	"stroke-width": 2,
	opacity: 0.8
	},
	
	waterAttrib = {
	fill: "blue",
	stroke: "blue"
	},
	
	dcAttrib = {
	fill: "#806D7E",
	stroke: "none"
	},
	
	vaAttrib = {
	fill: "#778899",
	stroke: "#778899"
	},
	
	lineAttrib = {
	stroke: "white", 
	"stroke-opacity": 0.8,
	"stroke-dasharray":"--"},

	boxAttrib = {
	fill: "#5C5C5C",
	stroke: "#5C5C5C"
	},
	
	wcircAttrib = {
	fill: "yellow",
	stroke: "yellow"
	},
	
	nwcircAttrib = {
	fill: "green",
	stroke: "green"
	},
		
	textAttrib = {
	fill: "white",
	"text-anchor": "start",
	"font-size": "13px"
	},
	
	headAttrib = {
	fill: "white", 
	"font-style":"bold", 
	"font-size": "16px" 
	};
	




function loadGraph(){

R = Raphael("paper", 1100, 650);

var panZoom = R.panzoom({ initialZoom: 0, initialPosition: { x: 550, y: 350} });
    
    panZoom.enable();

makeMap(dem70, '1970');

};


function makeMap(demog, year) {

var attribs;
R.remove();
R = Raphael("paper", 1100, 700);

var keyBox = R.rect(838, 500, 180, 120, 16).attr(boxAttrib);
var keyText1 = R.text(920, 518, "Key").attr(headAttrib);
var wCirc = R.circle(855, 545, 5).attr(wcircAttrib);
var nwBox = R.circle(855, 570, 5).attr(nwcircAttrib);
var keyText2 = R.text(865, 545, "= white population").attr(textAttrib);
var keyText3 = R.text(865, 570, "= nonwhite population").attr(textAttrib);
var keyText4 = R.text(865, 600, "Each dot = 100 people").attr(textAttrib);


var va = R.path(path="M 0,70 L 70,70 L 177,200 L 480,200 L 436,624 L 436,700 L 0,700 z").attr(vaAttrib);
var borderline = R.path(path="M 0,70 L 70,70 L 177,200 M 436,624 L 436,700").attr(lineAttrib);
var dc = R.path(dcString).attr(dcAttrib);

//here's the bit that actually draws the dots from the outside data
for (var dots in demog) {
	if (demog[dots].Group === "w"){attribs = wAttrib;}
	else {attribs = nwAttrib;}
	circs[dots] = R.circle(demog[dots].cx, demog[dots].cy, 2).attr(attribs);
//	circs[dots].animate({opacity: 0.2}, 2000);
	circs[dots].toFront();        
	R.safari();     
}


var waterLayer = R.path(waterString).attr(waterAttrib);
var chesapeake = R.path(path="M 465,608 L 507,608 L 530,700 L 432,700 L 432,666 z").attr(waterAttrib);
var roadLayer = R.path(roadString).attr(roadAttrib);
document.getElementById("top_corner").style.display = "";
document.getElementById("top_corner").innerHTML = year;
document.getElementById("top_corner").style.display = "block";
document.getElementById("valabel").style.display = "block";
document.getElementById("mdlabel").style.display = "block";
};

