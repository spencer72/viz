var R;

var j=0;
var t;
var startPoint = 575;

var flAttrib = {
	fill: "green",
	stroke: "silver"	
	};

var years = ['1964', '1967', '1968', '1969', '1970', '1971', '1972', '1973', '1974', '1975', '1976', '1977', '1978', '1979', '1980', '1981', '1982', '1983', '1984', '1985', '1986', '1987', '1988', '1989', '1990', '1991', '1992', '1994', '1995', '1996', '1997', '1998', '1999', '2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2010', '2011', '2012'];


function onLoad() {
R = Raphael("paper", 1000, 660);
var geoString = "path=\'" + countyLines + "\'";
var geography = R.path(geoString).attr(flAttrib);
};

function animate() { 
loopReset();
var geoString = "path=\'" + countyLines + "\'";
var geography = R.path(geoString).attr(flAttrib);
t=setInterval("phaseTime()",1500); 
};

function phaseTime() {
if (j==(years.length)-1) {stopDraw();}
else {
		var circID = "circle" + years[j];
		var dataName = [];
		for (q=0; q<sinkholes.length; q++)
			{
			if (sinkholes[q].year == years[j]) {dataName.push(sinkholes[q]);};	
			};
		drawCircs(circID, dataName);
		j++;
	 };
};



function drawCircs(circID, dataName) {

var yrString = dataName[0].year;
var yrText = R.text(500, startPoint, yrString).attr({fill: "white", "font-size": "48pt", "text-anchor": "start"}).animate({fill: "#7c7273"}, 1500);

for (z=0; z<dataName.length; z++) {
var xcoord = dataName[z].cx;
var ycoord = dataName[z].cy;
var c = R.circle(xcoord, ycoord, 3).attr({fill: "yellow", stroke: "orange", transform: "s2"});
    c.animate({fill: "maroon", transform: "s0.75"}, 750);

};


startPoint = startPoint - 11;
return;

};


function stopDraw(){
	var yrText = R.text(500, startPoint, "2012").attr({fill: "white", "font-size": "48pt", "text-anchor": "start"});
	startPoint = 575;
	clearInterval(t);
	j=0;
	
};


function loopReset(){
R.clear();
j=0;
startPoint = 575;
if (!(t==null)) {clearInterval(t);};
};

