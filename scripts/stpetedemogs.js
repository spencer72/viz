

var R; 

var obj70 = {},
	obj80 = {},
	obj90 = {},
	obj2K = {},
	obj10 = {};

var maleAttrib = {
	fill: "orange",
	"fill-opacity": 0.5,
	stroke: "#666",
	"stroke-width": 2},

	femaleAttrib = {
	fill: "purple",
	"fill-opacity": 0.5,
	stroke: "#666",
	"stroke-width": 2},
	
	sepAttrib = {
	stroke: "white", 
	"stroke-opacity": 0.6,
	"stroke-dasharray":"--"},

	textAttrib = {
	fill: "white"};



function loadGraph(){

R = Raphael("paper", 1000, 800);
makeBars(dem70, obj70, '1970');

};


function makeBars(demog, yearNS, year) {

var yrText, 
    centerLine,
    xAxis,
    mLabel,
    fLabel,
    creditLabel;

R.remove();
R = Raphael("paper", 1000, 800);

var topLineMale = 170;
var topLineFemale = 170;
var increm = 25;
for (var brackets in demog)
	{
		barLength = demog[brackets].Pct*20;
		if (demog[brackets].Gender === "Male") 
			{
				yearNS[brackets] = R.rect(500 - barLength, topLineMale, barLength, increm, 5).attr(maleAttrib);
				yearNS[brackets]["topline"] = topLineMale + 10;
				yearNS[brackets]["center"] = 500 - barLength - 150;
				topLineMale = topLineMale + increm;
				
			if ((demog[brackets].Age === "10-14") || (demog[brackets].Age === "20-24") || (demog[brackets].Age === "60-64") ||  (demog[brackets].Age === "35-44") || (demog[brackets].Age === "40-44")) 
			{
			var sepHeight = parseFloat(topLineMale);
			var separator = R.path("M 270," + sepHeight + " L 730," + sepHeight + " ").attr(sepAttrib);
			} 
			}
		else
			{
				yearNS[brackets] = R.rect(501, topLineFemale, barLength, increm, 5).attr(femaleAttrib);
				yearNS[brackets]["topline"] = topLineFemale + 10;
				yearNS[brackets]["center"] = 650 + barLength;
				topLineFemale = topLineFemale + increm;
			}
				
		yearNS[brackets]["Pct"] = demog[brackets].Pct;
		yearNS[brackets]["Age"] = demog[brackets].Age;
		yearNS[brackets]["Gender"] = demog[brackets].Gender;

		

	}
	
xAxis = R.path("M 250," + parseFloat(topLineFemale+1) + " L 780," + parseFloat(topLineFemale+1) + " ").attr({stroke: "white"});
mLabel = R.text(465, topLineMale + 15, "Male").attr(textAttrib);
fLabel = R.text(535, topLineFemale + 15, "Female").attr(textAttrib);
creditLabel = R.text(500, topLineFemale + 40, "Data sources: NHGIS @ University of Minnesota; US Census Bureau").attr({fill: "white", "font-style": "italic"});
centerLine = R.path("M 500,170 L 500," + parseFloat(topLineFemale+1) + " ").attr({stroke: "white"});

for (var bars in yearNS){
	(function (yr, bars) {
		yr[0].onmouseover = function ()
			{
			var holdingText = "Age grouping: " + yr.Age + "; Percentage of population: " + yr.Pct;
			yr.animate({"fill-opacity": 1}, 10);	
			yrText = R.text(yr.center, yr.topline, holdingText).attr(textAttrib);
			};
		yr[0].onmouseout = function ()
			{
			yr.animate({"fill-opacity": 0.5}, 10);
			yrText.remove();
			}
		}

	)
	(yearNS[bars], bars);
	}

document.getElementById("top_corner").style.display = "";
document.getElementById("top_corner").innerHTML = year;
document.getElementById("top_corner").style.display = "block";
	
centerLine.toFront();

};