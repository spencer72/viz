function onLoad()
{


var R = Raphael("paper", 1000, 600);

var lineAttrib = 
	{
	stroke: "#f9f9f9",
	"stroke-width": 2,
	"stroke-linejoin": "round"
        };
        
var divlineAttrib = 
	{
	stroke: "white",
	"stroke-width": 1,
	"stroke-linejoin": "round",
	"stroke-dasharray": "-"
        };
        
var gainAttrib = 
	{
	stroke: "#666",
	"stroke-width": 2,
	"stroke-linejoin": "round",
	fill: "#BDFCC9"
        };
	
var lossAttrib = 
	{
	stroke: "#666",
	"stroke-width": 2,
	"stroke-linejoin": "round",
	fill: "#F08080"
        };

var outAttrib = 
	{
	stroke: "#666",
	"stroke-width": 2,
	"stroke-linejoin": "round",
	fill: "#FFF68F"
        };

var maLineAttrib = 
	{
	stroke: "#0CF",
	"stroke-width": 4,
	"stroke-linejoin": "round"
        };

var moLineAttrib = 
	{
	stroke: "#00F",
	"stroke-width": 4,
	"stroke-linejoin": "round"
        };

var oaLineAttrib = 
	{
	stroke: "#009",
	"stroke-width": 4,
	"stroke-linejoin": "round"
        };

var wsLineAttrib = 
	{
	stroke: "#C6F",
	"stroke-width": 4,
	"stroke-linejoin": "round"
        };
        
var wyLineAttrib = 
	{
	stroke: "#909",
	"stroke-width": 4,
	"stroke-linejoin": "round"
        };
        
var textAttrib = 
	{
	fill: "white",
	};
        
//constructing the graph axes and labels



var axes = R.path("M 100,50 L 100,550 L 800,550").attr(lineAttrib);
var yAxisLabel = R.text(100, 25, "Number\nof tracts").attr(textAttrib);
var yLabel1 = R.text(85, 450, "25").attr(textAttrib);
var yLabel2 = R.text(85, 350, "50").attr(textAttrib);
var yLabel3 = R.text(85, 250, "75").attr(textAttrib);
var yLabel4 = R.text(85, 150, "100").attr(textAttrib);
var xAxisLabel = R.text(500, 590, "Percent change in density").attr(textAttrib);
var originLabel = R.text(98, 560, "-100").attr(textAttrib);
var xLabel1 = R.text(699, 560, "100").attr(textAttrib);
var xLabel2 = R.text(249, 560, "-50").attr(textAttrib);
var xLabel3 = R.text(550, 560, "50").attr(textAttrib);
var xLabel4 = R.text(725, 570, "250").attr(textAttrib);
var xLabel5 = R.text(750, 560, "500").attr(textAttrib);
var xLabel6 = R.text(775, 570, "750").attr(textAttrib);
var xLabel7 = R.text(800, 560, "1000").attr(textAttrib);
var xLabel8 = R.text(825, 570, "5150").attr(textAttrib);
var yTics = R.path("M 95,450 L 105,450 M 95,350 L 105,350 M 95,250 L 105,250 M 95,150 L 105,150 M 95,50 L 105,50").attr(lineAttrib);
var divLine = R.path("M 401,560 L 401,50").attr(divlineAttrib);
var macombLine = R.path("M 825,140 L 840,140").attr(maLineAttrib);
var monroeLine = R.path("M 825,155 L 840,155").attr(moLineAttrib);
var oaklandLine = R.path("M 825,170 L 840,170").attr(oaLineAttrib);
var washtenawLine = R.path("M 825,185 L 840,185").attr(wsLineAttrib);
var wayneLine = R.path("M 825,200 L 840,200").attr(wyLineAttrib);
var macombText = R.text(880, 140, "Macomb").attr(textAttrib);
var monroeText = R.text(880, 155, "Monroe").attr(textAttrib);
var oaklandText = R.text(880, 170, "Oakland").attr(textAttrib);
var washtenawText = R.text(880, 185, "Washtenaw").attr(textAttrib);
var wayneText = R.text(880, 200, "Wayne").attr(textAttrib);

var greenBox = R.rect(825, 15, 15, 12, 2).attr({fill: "#BDFCC9", stroke: "white"});
var redBox = R.rect(825, 43, 15, 12, 2).attr({fill: "#F08080", stroke: "white"});
var yellowBox = R.rect(825, 72, 15, 12, 2).attr({fill: "#FFF68F", stroke: "white"});

var greenText = R.text(868, 22, "Density\nincresed").attr(textAttrib);
var redText = R.text(868, 48, "Density\ndeclined").attr(textAttrib);
var yellowText = R.text(868, 82, "Density\ndoubled\nor more").attr(textAttrib);

var tempPct, tempCounty;
var firstEdge = 101;
var rectEdges = [];
var xPoints = [];

var storArray = [0,0,0,0,0,0];


for (x=0; x<45; x++)  {
 	rectEdges[x] = firstEdge;
 	firstEdge = firstEdge + 15;
 	}

for (t=0; t<45; t++) {
	xPoints[t] = (rectEdges[t])+7;
	if (t>39){
	xPoints[t] = (xPoints[t-1]+24);
	}

	}



for (j=1; j<45; j++) {					//starts at 1 because storArray[0] was initialized and filled when array was created
	storArray[j] = [0,0,0,0,0,0]
	}


for (q=0; q<1298; q++) {
	tempPct, tempCounty = null;
	tempPct = densTable[q][0];			//reads densTable data into temporary variables
	tempCounty = densTable[q][1];
	
	if (tempPct==-100) {tempPct = -99.99};		//sidesteps DivBy0 errors
	
	if ((tempPct > -100) && (100 >= tempPct)) {
	tempPct = tempPct + 100;		//"normalizes" negative numbers
	tempPct = Math.round(tempPct/5);
	}					//divides density change by 5 and rounds to determine its chart position, stores in tempPct
						//It's set to divide by 5 because I want 40 bars between -100 and +100, each covering 5%	
	else
		{
		if ((100 < tempPct) && (tempPct <= 250)) {tempPct = 40;}		//assigns high-end outliers to proper chart slots
		else if ((250 < tempPct) && (tempPct <= 500)) {tempPct = 41;}
		else if ((500 < tempPct) && (tempPct <= 750)) {tempPct = 42;}
		else if ((750 < tempPct) && (tempPct <= 1000)) {tempPct = 43}
		else tempPct = 44;
		}


	if (tempCounty == "Macomb") {tempCounty = 1;}		//changes a string into a number
	else if (tempCounty == "Monroe") {tempCounty = 2;}
	else if (tempCounty == "Oakland") {tempCounty = 3;}
	else if (tempCounty == "Washtenaw") {tempCounty = 4;}
	else tempCounty = 5;
	storArray[tempPct][0]++;		//increments the appropriate item in the appropriate array	
	storArray[tempPct][tempCounty]++;			//increments the appropriate county field
						
	
	}


var rects = {};

rects.t00 = R.rect(rectEdges[0], findCorner(0), 15, findHeight(0), 1).attr(lossAttrib);
rects.t01 = R.rect(rectEdges[1], findCorner(1), 15, findHeight(1), 1).attr(lossAttrib);
rects.t02 = R.rect(rectEdges[2], findCorner(2), 15, findHeight(2), 1).attr(lossAttrib);
rects.t03 = R.rect(rectEdges[3], findCorner(3), 15, findHeight(3), 1).attr(lossAttrib);
rects.t04 = R.rect(rectEdges[4], findCorner(4), 15, findHeight(4), 1).attr(lossAttrib);
rects.t05 = R.rect(rectEdges[5], findCorner(5), 15, findHeight(5), 1).attr(lossAttrib);
rects.t06 = R.rect(rectEdges[6], findCorner(6), 15, findHeight(6), 1).attr(lossAttrib);
rects.t07 = R.rect(rectEdges[7], findCorner(7), 15, findHeight(7), 1).attr(lossAttrib);
rects.t08 = R.rect(rectEdges[8], findCorner(8), 15, findHeight(8), 1).attr(lossAttrib);
rects.t09 = R.rect(rectEdges[9], findCorner(9), 15, findHeight(9), 1).attr(lossAttrib);
rects.t10 = R.rect(rectEdges[10], findCorner(10), 15, findHeight(10), 1).attr(lossAttrib);
rects.t11 = R.rect(rectEdges[11], findCorner(11), 15, findHeight(11), 1).attr(lossAttrib);
rects.t12 = R.rect(rectEdges[12], findCorner(12), 15, findHeight(12), 1).attr(lossAttrib);
rects.t13 = R.rect(rectEdges[13], findCorner(13), 15, findHeight(13), 1).attr(lossAttrib);
rects.t14 = R.rect(rectEdges[14], findCorner(14), 15, findHeight(14), 1).attr(lossAttrib);
rects.t15 = R.rect(rectEdges[15], findCorner(15), 15, findHeight(15), 1).attr(lossAttrib);
rects.t16 = R.rect(rectEdges[16], findCorner(16), 15, findHeight(16), 1).attr(lossAttrib);
rects.t17 = R.rect(rectEdges[17], findCorner(17), 15, findHeight(17), 1).attr(lossAttrib);
rects.t18 = R.rect(rectEdges[18], findCorner(18), 15, findHeight(18), 1).attr(lossAttrib);
rects.t19 = R.rect(rectEdges[19], findCorner(19), 15, findHeight(19), 1).attr(lossAttrib);
rects.t20 = R.rect(rectEdges[20], findCorner(20), 15, findHeight(20), 1).attr(gainAttrib);
rects.t21 = R.rect(rectEdges[21], findCorner(21), 15, findHeight(21), 1).attr(gainAttrib);
rects.t22 = R.rect(rectEdges[22], findCorner(22), 15, findHeight(22), 1).attr(gainAttrib);
rects.t23 = R.rect(rectEdges[23], findCorner(23), 15, findHeight(23), 1).attr(gainAttrib);
rects.t24 = R.rect(rectEdges[24], findCorner(24), 15, findHeight(24), 1).attr(gainAttrib);
rects.t25 = R.rect(rectEdges[25], findCorner(25), 15, findHeight(25), 1).attr(gainAttrib);
rects.t26 = R.rect(rectEdges[26], findCorner(26), 15, findHeight(26), 1).attr(gainAttrib);
rects.t27 = R.rect(rectEdges[27], findCorner(27), 15, findHeight(27), 1).attr(gainAttrib);
rects.t28 = R.rect(rectEdges[28], findCorner(28), 15, findHeight(28), 1).attr(gainAttrib);
rects.t29 = R.rect(rectEdges[29], findCorner(29), 15, findHeight(29), 1).attr(gainAttrib);
rects.t30 = R.rect(rectEdges[30], findCorner(30), 15, findHeight(30), 1).attr(gainAttrib);
rects.t31 = R.rect(rectEdges[31], findCorner(31), 15, findHeight(31), 1).attr(gainAttrib);
rects.t32 = R.rect(rectEdges[32], findCorner(32), 15, findHeight(32), 1).attr(gainAttrib);
rects.t33 = R.rect(rectEdges[33], findCorner(33), 15, findHeight(33), 1).attr(gainAttrib);
rects.t34 = R.rect(rectEdges[34], findCorner(34), 15, findHeight(34), 1).attr(gainAttrib);
rects.t35 = R.rect(rectEdges[35], findCorner(35), 15, findHeight(35), 1).attr(gainAttrib);
rects.t36 = R.rect(rectEdges[36], findCorner(36), 15, findHeight(36), 1).attr(gainAttrib);
rects.t37 = R.rect(rectEdges[37], findCorner(37), 15, findHeight(37), 1).attr(gainAttrib);
rects.t38 = R.rect(rectEdges[38], findCorner(38), 15, findHeight(38), 1).attr(gainAttrib);
rects.t39 = R.rect(rectEdges[39], findCorner(39), 15, findHeight(39), 1).attr(gainAttrib);
rects.t40 = R.rect(rectEdges[40], findCorner(40), 25, findHeight(40), 1).attr(outAttrib);
rects.t41 = R.rect((rectEdges[40]+25), findCorner(41), 25, findHeight(41), 1).attr(outAttrib);
rects.t42 = R.rect((rectEdges[40]+50), findCorner(42), 25, findHeight(42), 1).attr(outAttrib);
rects.t43 = R.rect((rectEdges[40]+75), findCorner(43), 25, findHeight(43), 1).attr(outAttrib);
rects.t44 = R.rect((rectEdges[40]+100), findCorner(44), 25, findHeight(44), 1).attr(outAttrib);


var macombPath = "M " + xPoints[0] + "," + findPoint(0,1) + " L " + xPoints[1] + "," + findPoint(1,1) + " L " + xPoints[2] + "," + findPoint(2,1) + " L " + xPoints[3] + "," + findPoint(3,1) + " L " + xPoints[4] + "," + findPoint(4,1) + " L " + xPoints[5] + "," + findPoint(5,1) + " L " + xPoints[6] + "," + findPoint(6,1) + " L " + xPoints[7] + "," + findPoint(7,1) + " L " + xPoints[8] + "," + findPoint(8,1) + " L " + xPoints[9] + "," + findPoint(9,1) + " L " + xPoints[10] + "," + findPoint(10,1) + " L " + xPoints[11] + "," + findPoint(11,1) + " L " + xPoints[12] + "," + findPoint(12,1) + " L " + xPoints[13] + "," + findPoint(13,1) + " L " + xPoints[14] + "," + findPoint(14,1) + " L " + xPoints[15] + "," + findPoint(15,1) + " L " + xPoints[16] + "," + findPoint(16,1) + " L " + xPoints[17] + "," + findPoint(17,1) + " L " + xPoints[18] + "," + findPoint(18,1) + " L " + xPoints[19] + "," + findPoint(19,1) + " L " + xPoints[20] + "," + findPoint(20,1) + " L " + xPoints[21] + "," + findPoint(21,1) + " L " + xPoints[22] + "," + findPoint(22,1) + " L " + xPoints[23] + "," + findPoint(23,1) + " L " + xPoints[24] + "," + findPoint(24,1) + " L " + xPoints[25] + "," + findPoint(25,1) + " L " + xPoints[26] + "," + findPoint(26,1) + " L " + xPoints[27] + "," + findPoint(27,1) + " L " + xPoints[28] + "," + findPoint(28,1) + " L " + xPoints[29] + "," + findPoint(29,1) + " L " + xPoints[30] + "," + findPoint(30,1) + " L " + xPoints[31] + "," + findPoint(31,1) + " L " + xPoints[32] + "," + findPoint(32,1) + " L " + xPoints[33] + "," + findPoint(33,1) + " L " + xPoints[34] + "," + findPoint(34,1) + " L " + xPoints[35] + "," + findPoint(35,1) + " L " + xPoints[36] + "," + findPoint(36,1) + " L " + xPoints[37] + "," + findPoint(37,1) + " L " + xPoints[38] + "," + findPoint(38,1) + " L " + xPoints[39] + "," + findPoint(39,1) + " L " + xPoints[40] + "," + findPoint(40,1) + " L " + xPoints[41] + "," + findPoint(41,1) + " L " + xPoints[42] + "," + findPoint(42,1) + " L " + xPoints[43] + "," + findPoint(43,1) + " L " + xPoints[44] + "," + findPoint(44,1) + "\"";

var monroePath = "M " + xPoints[0] + "," + findPoint(0,2) + " L " + xPoints[1] + "," + findPoint(1,2) + " L " + xPoints[2] + "," + findPoint(2,2) + " L " + xPoints[3] + "," + findPoint(3,2) + " L " + xPoints[4] + "," + findPoint(4,2) + " L " + xPoints[5] + "," + findPoint(5,2) + " L " + xPoints[6] + "," + findPoint(6,2) + " L " + xPoints[7] + "," + findPoint(7,2) + " L " + xPoints[8] + "," + findPoint(8,2) + " L " + xPoints[9] + "," + findPoint(9,2) + " L " + xPoints[10] + "," + findPoint(10,2) + " L " + xPoints[11] + "," + findPoint(11,2) + " L " + xPoints[12] + "," + findPoint(12,2) + " L " + xPoints[13] + "," + findPoint(13,2) + " L " + xPoints[14] + "," + findPoint(14,2) + " L " + xPoints[15] + "," + findPoint(15,2) + " L " + xPoints[16] + "," + findPoint(16,2) + " L " + xPoints[17] + "," + findPoint(17,2) + " L " + xPoints[18] + "," + findPoint(18,2) + " L " + xPoints[19] + "," + findPoint(19,2) + " L " + xPoints[20] + "," + findPoint(20,2) + " L " + xPoints[21] + "," + findPoint(21,2) + " L " + xPoints[22] + "," + findPoint(22,2) + " L " + xPoints[23] + "," + findPoint(23,2) + " L " + xPoints[24] + "," + findPoint(24,2) + " L " + xPoints[25] + "," + findPoint(25,2) + " L " + xPoints[26] + "," + findPoint(26,2) + " L " + xPoints[27] + "," + findPoint(27,2) + " L " + xPoints[28] + "," + findPoint(28,2) + " L " + xPoints[29] + "," + findPoint(29,2) + " L " + xPoints[30] + "," + findPoint(30,2) + " L " + xPoints[31] + "," + findPoint(31,2) + " L " + xPoints[32] + "," + findPoint(32,2) + " L " + xPoints[33] + "," + findPoint(33,2) + " L " + xPoints[34] + "," + findPoint(34,2) + " L " + xPoints[35] + "," + findPoint(35,2) + " L " + xPoints[36] + "," + findPoint(36,2) + " L " + xPoints[37] + "," + findPoint(37,2) + " L " + xPoints[38] + "," + findPoint(38,2) + " L " + xPoints[39] + "," + findPoint(39,2) + " L " + xPoints[40] + "," + findPoint(40,2) + " L " + xPoints[41] + "," + findPoint(41,2) + " L " + xPoints[42] + "," + findPoint(42,2) + " L " + xPoints[43] + "," + findPoint(43,2) + " L " + xPoints[44] + "," + findPoint(44,2) + "\""; 

var oaklandPath = "M " + xPoints[0] + "," + findPoint(0,3) + " L " + xPoints[1] + "," + findPoint(1,3) + " L " + xPoints[2] + "," + findPoint(2,3) + " L " + xPoints[3] + "," + findPoint(3,3) + " L " + xPoints[4] + "," + findPoint(4,3) + " L " + xPoints[5] + "," + findPoint(5,3) + " L " + xPoints[6] + "," + findPoint(6,3) + " L " + xPoints[7] + "," + findPoint(7,3) + " L " + xPoints[8] + "," + findPoint(8,3) + " L " + xPoints[9] + "," + findPoint(9,3) + " L " + xPoints[10] + "," + findPoint(10,3) + " L " + xPoints[11] + "," + findPoint(11,3) + " L " + xPoints[12] + "," + findPoint(12,3) + " L " + xPoints[13] + "," + findPoint(13,3) + " L " + xPoints[14] + "," + findPoint(14,3) + " L " + xPoints[15] + "," + findPoint(15,3) + " L " + xPoints[16] + "," + findPoint(16,3) + " L " + xPoints[17] + "," + findPoint(17,3) + " L " + xPoints[18] + "," + findPoint(18,3) + " L " + xPoints[19] + "," + findPoint(19,3) + " L " + xPoints[20] + "," + findPoint(20,3) + " L " + xPoints[21] + "," + findPoint(21,3) + " L " + xPoints[22] + "," + findPoint(22,3) + " L " + xPoints[23] + "," + findPoint(23,3) + " L " + xPoints[24] + "," + findPoint(24,3) + " L " + xPoints[25] + "," + findPoint(25,3) + " L " + xPoints[26] + "," + findPoint(26,3) + " L " + xPoints[27] + "," + findPoint(27,3) + " L " + xPoints[28] + "," + findPoint(28,3) + " L " + xPoints[29] + "," + findPoint(29,3) + " L " + xPoints[30] + "," + findPoint(30,3) + " L " + xPoints[31] + "," + findPoint(31,3) + " L " + xPoints[32] + "," + findPoint(32,3) + " L " + xPoints[33] + "," + findPoint(33,3) + " L " + xPoints[34] + "," + findPoint(34,3) + " L " + xPoints[35] + "," + findPoint(35,3) + " L " + xPoints[36] + "," + findPoint(36,3) + " L " + xPoints[37] + "," + findPoint(37,3) + " L " + xPoints[38] + "," + findPoint(38,3) + " L " + xPoints[39] + "," + findPoint(39,3) + " L " + xPoints[40] + "," + findPoint(40,3) + " L " + xPoints[41] + "," + findPoint(41,3) + " L " + xPoints[42] + "," + findPoint(42,3) + " L " + xPoints[43] + "," + findPoint(43,3) + " L " + xPoints[44] + "," + findPoint(44,3) + "\""; 

var washtenawPath = "M " + xPoints[0] + "," + findPoint(0,4) + " L " + xPoints[1] + "," + findPoint(1,4) + " L " + xPoints[2] + "," + findPoint(2,4) + " L " + xPoints[3] + "," + findPoint(3,4) + " L " + xPoints[4] + "," + findPoint(4,4) + " L " + xPoints[5] + "," + findPoint(5,4) + " L " + xPoints[6] + "," + findPoint(6,4) + " L " + xPoints[7] + "," + findPoint(7,4) + " L " + xPoints[8] + "," + findPoint(8,4) + " L " + xPoints[9] + "," + findPoint(9,4) + " L " + xPoints[10] + "," + findPoint(10,4) + " L " + xPoints[11] + "," + findPoint(11,4) + " L " + xPoints[12] + "," + findPoint(12,4) + " L " + xPoints[13] + "," + findPoint(13,4) + " L " + xPoints[14] + "," + findPoint(14,4) + " L " + xPoints[15] + "," + findPoint(15,4) + " L " + xPoints[16] + "," + findPoint(16,4) + " L " + xPoints[17] + "," + findPoint(17,4) + " L " + xPoints[18] + "," + findPoint(18,4) + " L " + xPoints[19] + "," + findPoint(19,4) + " L " + xPoints[20] + "," + findPoint(20,4) + " L " + xPoints[21] + "," + findPoint(21,4) + " L " + xPoints[22] + "," + findPoint(22,4) + " L " + xPoints[23] + "," + findPoint(23,4) + " L " + xPoints[24] + "," + findPoint(24,4) + " L " + xPoints[25] + "," + findPoint(25,4) + " L " + xPoints[26] + "," + findPoint(26,4) + " L " + xPoints[27] + "," + findPoint(27,4) + " L " + xPoints[28] + "," + findPoint(28,4) + " L " + xPoints[29] + "," + findPoint(29,4) + " L " + xPoints[30] + "," + findPoint(30,4) + " L " + xPoints[31] + "," + findPoint(31,4) + " L " + xPoints[32] + "," + findPoint(32,4) + " L " + xPoints[33] + "," + findPoint(33,4) + " L " + xPoints[34] + "," + findPoint(34,4) + " L " + xPoints[35] + "," + findPoint(35,4) + " L " + xPoints[36] + "," + findPoint(36,4) + " L " + xPoints[37] + "," + findPoint(37,4) + " L " + xPoints[38] + "," + findPoint(38,4) + " L " + xPoints[39] + "," + findPoint(39,4) + " L " + xPoints[40] + "," + findPoint(40,4) + " L " + xPoints[41] + "," + findPoint(41,4) + " L " + xPoints[42] + "," + findPoint(42,4) + " L " + xPoints[43] + "," + findPoint(43,4) + " L " + xPoints[44] + "," + findPoint(44,4) + "\""; 

var waynePath = "M " + xPoints[0] + "," + findPoint(0,5) + " L " + xPoints[1] + "," + findPoint(1,5) + " L " + xPoints[2] + "," + findPoint(2,5) + " L " + xPoints[3] + "," + findPoint(3,5) + " L " + xPoints[4] + "," + findPoint(4,5) + " L " + xPoints[5] + "," + findPoint(5,5) + " L " + xPoints[6] + "," + findPoint(6,5) + " L " + xPoints[7] + "," + findPoint(7,5) + " L " + xPoints[8] + "," + findPoint(8,5) + " L " + xPoints[9] + "," + findPoint(9,5) + " L " + xPoints[10] + "," + findPoint(10,5) + " L " + xPoints[11] + "," + findPoint(11,5) + " L " + xPoints[12] + "," + findPoint(12,5) + " L " + xPoints[13] + "," + findPoint(13,5) + " L " + xPoints[14] + "," + findPoint(14,5) + " L " + xPoints[15] + "," + findPoint(15,5) + " L " + xPoints[16] + "," + findPoint(16,5) + " L " + xPoints[17] + "," + findPoint(17,5) + " L " + xPoints[18] + "," + findPoint(18,5) + " L " + xPoints[19] + "," + findPoint(19,5) + " L " + xPoints[20] + "," + findPoint(20,5) + " L " + xPoints[21] + "," + findPoint(21,5) + " L " + xPoints[22] + "," + findPoint(22,5) + " L " + xPoints[23] + "," + findPoint(23,5) + " L " + xPoints[24] + "," + findPoint(24,5) + " L " + xPoints[25] + "," + findPoint(25,5) + " L " + xPoints[26] + "," + findPoint(26,5) + " L " + xPoints[27] + "," + findPoint(27,5) + " L " + xPoints[28] + "," + findPoint(28,5) + " L " + xPoints[29] + "," + findPoint(29,5) + " L " + xPoints[30] + "," + findPoint(30,5) + " L " + xPoints[31] + "," + findPoint(31,5) + " L " + xPoints[32] + "," + findPoint(32,5) + " L " + xPoints[33] + "," + findPoint(33,5) + " L " + xPoints[34] + "," + findPoint(34,5) + " L " + xPoints[35] + "," + findPoint(35,5) + " L " + xPoints[36] + "," + findPoint(36,5) + " L " + xPoints[37] + "," + findPoint(37,5) + " L " + xPoints[38] + "," + findPoint(38,5) + " L " + xPoints[39] + "," + findPoint(39,5) + " L " + xPoints[40] + "," + findPoint(40,5) + " L " + xPoints[41] + "," + findPoint(41,5) + " L " + xPoints[42] + "," + findPoint(42,5) + " L " + xPoints[43] + "," + findPoint(43,5) + " L " + xPoints[44] + "," + findPoint(44,5) + "\""; 


axes.toFront();
var trendlinesMacomb = R.path(macombPath).attr(maLineAttrib); 
var trendlinesMonroe = R.path(monroePath).attr(moLineAttrib);
var trendlinesOakland = R.path(oaklandPath).attr(oaLineAttrib);
var trendlinesWashtenaw = R.path(washtenawPath).attr(wsLineAttrib);
var trendlinesWayne = R.path(waynePath).attr(wyLineAttrib);


 

function findCorner(p) {			//calculates and returns the X value for the corner of each bar
var tempCorner;	
tempCorner = storArray[p][0];
tempCorner = tempCorner * 4;
tempCorner = 550 - tempCorner;
return tempCorner;
}


function findHeight(p)  {			//calculates and returns the height of each bar
var tempHeight;	
tempHeight = storArray[p][0];
tempHeight = tempHeight * 4;
return tempHeight;
}


function findPoint(v,p)  {			//calculates and returns the height of each trendline point
var tempPoint;	
tempPoint = storArray[v][p];
tempPoint = tempPoint * 4;
tempPoint = 550-tempPoint;
if (isNaN(tempPoint)){tempPoint = 550;}
return tempPoint;

}




for (var segments in rects) {
	(function (rc, seg) {
	var tempSeg = seg.substring(1,3);
	tempSeg = parseFloat(tempSeg);	
	var tempTotal = storArray[tempSeg][0];
	var tempMacomb = storArray[tempSeg][1];
	var tempMonroe = storArray[tempSeg][2];
	var tempOakland = storArray[tempSeg][3];
	var tempWash = storArray[tempSeg][4];
	var tempWayne = storArray[tempSeg][5];	
	
	rc[0].onmouseover = function ()
			{

			rc.animate({stroke: "white"}, 50);  
			rc.g = rc.glow({width: 15, fill: true, opacity: 1, offsetx: 2, offsety: 2, color: "white"});
			rc.toFront();
			axes.toFront();   
			trendlinesMacomb.toFront(); 
			trendlinesMonroe.toFront();
			trendlinesOakland.toFront();
			trendlinesWashtenaw.toFront();
			trendlinesWayne.toFront();
			R.safari();     

			document.getElementById("tot_num").innerHTML = "Total number of tracts: " + tempTotal;
			document.getElementById("macomb_tracts").innerHTML = "Macomb: " + tempMacomb;
			document.getElementById("monroe_tracts").innerHTML = "Monroe: " + tempMonroe;
			document.getElementById("oakland_tracts").innerHTML = "Oakland: " + tempOakland;
			document.getElementById("washtenaw_tracts").innerHTML = "Washtenaw: " + tempWash;
			document.getElementById("wayne_tracts").innerHTML = "Wayne: " + tempWayne;
																	
			document.getElementById("middle_sidebar").style.display = "block"; 
			 
			};
	rc[0].onmouseout = function ()    
			{
			document.getElementById("middle_sidebar").style.display = "";
			rc.animate({stroke: "#666"}, 50);
			rc.g.remove();
			rc.toBack();

			};
	}
	)
	(rects[segments], segments);
	}

		
};