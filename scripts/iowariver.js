//see this code run here: http://drawmeamap.com/iowarr.html

var R;

var stateAttrib = 
	{
	fill: "#78AB46",
	stroke: "#666",
	"stroke-width": 2,
	"stroke-linejoin": "round"
        };

var hwyAttrib = 
	{
	stroke: "#474747",
	"stroke-width": 3,
	"stroke-linejoin": "round"
	};

var countyAttrib = 
	{
	stroke: "#E1E3E3",
	"stroke-width": 1,
	"stroke-linejoin": "round"
	};

var cityAttrib = 
	{
	fill: "#FFFFAA",
	"fill-opacity": 0.4
	};

var riverAttrib =
	{
	stroke: "#66CCFF",
	"stroke-width": 3,
	"stroke-linejoin": "round"
	};

/*var canoeAttrib =
	{
	stroke: "#003399",
	"stroke-width": 3.5,
	"stroke-linejoin": "round"
	};*/

var troutAttrib =
	{
	stroke: "#008B8B",
	"stroke-width": 2,
	"stroke-linejoin": "round"
	};

var lakeAttrib = 
	{
	fill: "#0066CC",
	stroke: "#330099",
	"stroke-width": 2,
	"stroke-linejoin": "round"
	};

var accessAttrib =
	{
	fill: "#FFFF33",
	stroke: "gold"
	};
	
var hazardAttrib =
	{
	fill: "#FF0033"	
	};


var watershedAttrib =
	{
	fill: "#CC3399",
	stroke: "#FF00CC",
	"fill-opacity": 0.1	
	};

var outfittersAttrib = 
	{
	fill: "orange",
	stroke: "grey"
	};

var orgAttrib = 
	{
	fill: "brown",
	stroke: "orange",
	"fill-opacity": 0.4
	};

var torgAttrib = 
	{
	fill: "orange",
	stroke: "brown",
	"fill-opacity": 0.4
	};
	
var rorgAttrib = 
	{
	fill: "red",
	stroke: "white",
	"fill-opacity": 0.5
	};

var textAttrib = 
	{
	fill: "white",
//	stroke: "black",
	"font-weight":"light",
	"font-size":"9pt",
	"font-stretch":"expanded"
	};


var cityText;
var layerStatus = [0, 0, 0,/* 0,*/ 0, 0, 0, 0, 0, 0, 0];

var newCircles = {},
    circHazards = {},
    circAccess = {},
    circOutfitters = {},
    circOrgs = {},
    circTOrgs = {},
    circROrgs = {},
    riverPaths = {},
 //   trailPaths = {},
    lakeBlobs = {},
    troutPaths = {},
    watershedAreas = {};
 
var lakesLabels = [["Lake name", "fName"]],
    shedsLabels = [["Name", "fName"],["Acres", "Acres"]],
 //   canoeLabels = [["Trail name","fName"]],
    riverLabels = [["River name","fName"]],
    troutLabels = [["Stream name","fName"],["Camping available","Camping"],["Stream type","Type"],["Access point","AccessPt"]],
    accessLabels = [["Name","fName"],["Water body","waterbody"],["Access type","AccessType"],["Access road","AccessRoad"],["Boat ramp type","BoatRamp"],["Water available?","WaterAvailable"],["Restrooms available?","Restrooms"],["Camping available?","Camping"],["Dam present","Dam"]];
    hazardsLabels = [["Name","fName"],["River","River"],["Nearest City","NearestCity"],["Hazard potential","HazPotential"],["Dam length","DamLength"],["Dam height:","DamHeight"]],
    outfittersLabels = [["Name","fName"],["River","River"],["Street","Address"],["City","City"],["Phone","Phone"],["Email address","Email"],["URL","URL"],["Info","Notes"]],
    orgLabels = [["Name", "fName"],["Contact name", "Contact"],["Street","Street"],["City","City"],["Phone","phone"],["Email address", "email"],["URL", "url"]],
    torgLabels = [["Name", "fName"],["Contact name", "Contact"],["Street","Street"],["City","City"],["Phone","phone"],["Email address", "email"],["URL", "url"]],
    rorgLabels = [["Name", "fName"],["River", "river"],["Contact name", "contact"],["Street","street"],["City","city"],["Phone","phone"],["Email address", "email"],["URL", "url"]];

function loadMap()
{

document.getElementById('ShedsBox').checked = false;
document.getElementById('LakesBox').checked = false;
//document.getElementById('CanoeBox').checked = false;
document.getElementById('RiversBox').checked = false;
document.getElementById('TroutBox').checked = false;
document.getElementById('AccessBox').checked = false;
document.getElementById('HazardsBox').checked = false;
document.getElementById('OutfittersBox').checked = false;
document.getElementById('OrgsBox').checked = false;
document.getElementById('TOrgsBox').checked = false;
document.getElementById('RiverOrgBox').checked = false;

R = Raphael("paper", 1300, 700);

var panZoom = R.panzoom({ initialZoom: 0, initialPosition: { x: 650, y: 350} });
    
    panZoom.enable();

var stateBorder = R.path (geography.iowa.path).attr(stateAttrib),
    countyLines = R.path (geography.counties.path).attr(countyAttrib),
    hwys = R.path (geography.highways.path).attr(hwyAttrib);

for (var townnames in cityPoints) {
	newCircles[townnames] = R.circle(cityPoints[townnames].xcoord, cityPoints[townnames].ycoord, cityPoints[townnames].radius).attr(cityAttrib);
	newCircles[townnames]["text"] = cityPoints[townnames].townname;
	newCircles[townnames]["x"] = cityPoints[townnames].xcoord;
	newCircles[townnames]["y"] = cityPoints[townnames].ycoord - 15;  //offsets the city label, to avoid problems with the 
									 //mouseover and mouseout events
	};


for (var codes in newCircles) {
	(function (co, codes) {
	co[0].onmouseover = function ()
			{
			co.animate({"fill-opacity": 1}, 10); 
			cityText = R.text(newCircles[codes].x, newCircles[codes].y, newCircles[codes].text).attr(textAttrib);
			};
	co[0].onmouseout = function ()    
			{
			co.animate({"fill-opacity": 0.4}, 10);
			cityText.remove();
			}; 
	}
	)
	(newCircles[codes], codes);
	}

};


function toggle(thisBox, newLayer, layerSource, layerLabels, layerAttribs, layerOrder, isCircle){


if (document.getElementById(thisBox).checked)
	{if (layerStatus[layerOrder]===0)
	{layerStatus[layerOrder] = 1;
	if (isCircle===0){makeObject(newLayer, layerSource, layerLabels, layerAttribs);}
	else {makeCircle(newLayer, layerSource, layerLabels, layerAttribs);}
	handleclicks(newLayer, layerLabels, layerAttribs);
	orderlayers();}
	}
else
	{
	if (layerStatus[layerOrder]===1)
	{layerStatus[layerOrder] = 0;
	destroy(newLayer);
	}
	}
};


function handleclicks (layer, featureProps, theseAttribs)
{	
var arrayLength = featureProps.length;
for (var spaces in layer)
	{(function (ly, spaces) 
		{
		ly[0].onclick = function ()
			{
			if (typeof ly.Selected === "undefined")
			{
			ly.animate({stroke: "silver"}, 50);  
			ly.Selected = ly.glow({width: 15, opacity: 1, color: "silver"});
			R.safari();
			document.getElementById('bottom_sidebar').innerHTML = "";
			document.getElementById('bottom_sidebar').style.display = "block";
			for (var j=0; j<arrayLength; j++)
				{
				document.getElementById('bottom_sidebar').innerHTML += "<b>" + featureProps[j][0] + ": </b>" + ly[featureProps[j][1]] + "<br />";		
				}
			}
			else
			{
			document.getElementById('bottom_sidebar').style.display = "";
			document.getElementById('bottom_sidebar').innerHTML = "";
			ly.animate({stroke: theseAttribs.stroke});
			ly.Selected.remove();
			delete ly.Selected;
			R.safari();
			};
			}
		}
	)
	(layer[spaces], spaces)
	};     

};




function makeObject (layer, source, labelArray, attset) {
var labelLength = labelArray.length;
for (var features in source)
	{
	layer[features] = R.path(source[features].path).attr(attset);
	for (var j=0; j<labelLength; j++)
		{var holding = labelArray[j][1];
		layer[features][holding] = source[features][holding];
		};
	layer[features]["Selected"];
	}
};


function makeCircle (layer, source, labelArray, attset) {
var circSize = 2;
var labelLength = labelArray.length;
if (layer === circAccess) {circSize = 0.7}
else if (layer === circOutfitters || layer === circOrgs || layer === circTOrgs || layer === circROrgs) {circSize = 3};

for (var features in source)
	{
	layer[features] = R.circle(source[features].cx, source[features].cy, circSize).attr(attset);
	for (var j=0; j<labelLength; j++)
		{var holding = labelArray[j][1];
		layer[features][holding] = source[features][holding];
		};
	layer[features]["Selected"];
	}
};

function destroy(layer)
{
for (var items in layer) 
	{
	if (layer[items].Selected !== undefined){layer[items].Selected.remove();}
	document.getElementById('bottom_sidebar').style.display = "";
	layer[items].remove();
	}
};

function destroyAll()
{
var ly = [watershedAreas, lakeBlobs, /*trailPaths,*/ riverPaths, troutPaths, circAccess, circHazards, circOutfitters, circOrgs, circTOrgs, circROrgs];
var attribList = [watershedAttrib, lakeAttrib, /*canoeAttrib,*/ riverAttrib, troutAttrib, accessAttrib, hazardAttrib, outfittersAttrib, orgAttrib, torgAttrib, rorgAttrib];
for (var p=0; p<ly.length; p++)
	{var lyAttrib = attribList[p];
	if (layerStatus[p] === 1)
		{for (var items in ly[p]) 
			{
			if (ly[p][items].Selected !== undefined)
				{
				ly[p][items].Selected.remove();
				ly[p][items].Selected = undefined;
				ly[p][items].animate({stroke: lyAttrib.stroke});
				}
			document.getElementById('bottom_sidebar').style.display = "";
			}
		}		
	}

};

function orderlayers()
{
var ly = [watershedAreas, lakeBlobs, /*trailPaths,*/ riverPaths, troutPaths, circAccess, circHazards, circOutfitters, circOrgs, circTOrgs, circROrgs];

for (var p=0; p<ly.length; p++)
	{if (layerStatus[p] === 1)
		{for (var items in ly[p]) {ly[p][items].toFront();}}		
	}
};




function searchbot() {

var counter = 0;
for (var j=0; j<layerStatus.length; j++)
	{if (layerStatus[j]===1){ counter++;}};
if (counter!==1)/*{document.getElementById("searchalert").style.display="";}*/ {alert("You must select one layer only in order for Search to work.");}
else 
	{var ly = scanlayers();
	var successCheck = 0;
	for (var items in ly)
		{
		if (document.getElementById('SearchTextBox').value === ly[items].fName)
			{successCheck = 1;
			
			if (typeof ly[items].Selected === "undefined")
			{
			ly[items].animate({stroke: "silver"}, 50);  
			ly[items].Selected = ly[items].glow({width: 15, opacity: 1, color: "silver"});
			R.safari();
			}
			document.getElementById("SearchTextBox").text="";
			}

		};
	
	if (successCheck === 0) {alert("No match found. Note that searches are case-sensitive and return exact matches only.");} 
	}


};


function scanlayers() {
var active;

if (document.getElementById('ShedsBox').checked===true){active = watershedAreas;}
else if (document.getElementById('LakesBox').checked===true){active = lakeBlobs;}
//else if (document.getElementById('CanoeBox').checked===true){active = trailPaths;}
else if (document.getElementById('RiversBox').checked===true){active = riverPaths;}
else if (document.getElementById('TroutBox').checked===true){active = troutPaths;}
else if (document.getElementById('AccessBox').checked===true){active = circAccess;}
else if (document.getElementById('HazardsBox').checked===true){active = circHazards;}
else if (document.getElementById('OutfittersBox').checked===true){active = circOutfitters;}
else if (document.getElementById('OrgsBox').checked===true){active = circOrgs;}
else if (document.getElementById('TOrgsBox').checked===true){active = circTOrgs;}
else if (document.getElementById('RiverOrgBox').checked===true){active = circROrgs;}

return active;


};

function warningvanish () {
//document.getElementById("searchalert").style.display="";
};
