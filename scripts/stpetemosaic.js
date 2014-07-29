//see this code run at http://drawmeamap.com/stpeteboxes.html

var R;

var boxHeight,
	boxWidth,
	xMargin = 175,
	xAxis = 220;

var obj70 = {},
	obj80 = {},
	obj90 = {},
	obj2K = {},
	obj10 = {};

var labelArray = ["Age", "MPop", "MPct", "FPop", "FPct", "boxcolor"];




function loadGraph(){

R = Raphael("paper", 1200, 600);
makeSquares(dem70, obj70, '1970');

};

function makeSquares(source, yearNS, year){

R.remove();
R = Raphael("paper", 1200, 600);
var labelLength = labelArray.length;
var totalWidth = 1100,
    	availableWidth = totalWidth,   //to include the xMargin and the width of the boxes themselves
	totPct,
	boxColor,
	pctCheck = 0;

var topLine = 0,
	leftSide = 0;
	sizeIndex = 0;


//first step: sort through boxes and determine largest-to-smallest order

var 	sizeArray = [];
	tempSizeArray = [],
	holdingArray = [];

for (var groups in source)	//this loop adds together the male and female pcts for each age bracket
			     			//and pairs them with the respective age bracket ID
	{
		totPct = source[groups].MPct + source[groups].FPct;
		holdingArray = [groups, totPct];
		tempSizeArray.push(holdingArray);
	}

for (var q=0; q<tempSizeArray.length; q++)		//cycles through the tempSizeArray of age bracket code / pop percentages pairings
	{	var counter = 0;
		holdingArray = null;
		var tempGroup = tempSizeArray[q][0];	//sets the tempGroup var to the age bracket code
		pctCheck = tempSizeArray[q][1];			//sets the pctCheck var to the combined percentage
		for (var qq=0; qq<tempSizeArray.length; qq++)
			{
				if (pctCheck > tempSizeArray[qq][1]) {counter++;}
			}
		holdingArray = [tempGroup, counter];	//places each age bracket group in order by pairing it with its placecounter variable
		sizeArray.push(holdingArray);			//affixes them to the bottom of sizeArray
	} 

//second step: pull data from source variable and populate yearNS

for (var countIndex=0; countIndex<sizeArray.length; countIndex++)     //starts with countIndex === 0 and increments
		{
	
			sizeIndex = findIndexOf(countIndex, sizeArray);	
				//calls findIndexOf to match countIndex with the appropriate bracket code 
				//(i.e, that is in the countIndex-th place in the order)
			var workingObject = sizeArray[sizeIndex][0];   
				//assigns that bracket code to workingObject
			boxColor = source[workingObject].boxcolor;

			boxWidth = (source[workingObject].MPct + source[workingObject].FPct)*10;
			boxHeight = boxWidth;
			topLine = (xAxis - (boxHeight/2));
		
			yearNS[workingObject] = R.rect(leftSide+xMargin, topLine, boxWidth, boxHeight, 5).attr({stroke: "white", fill: boxColor, "fill-opacity": 0.7  });
	 		for (var j=0; j<labelLength; j++)
				{var holding = labelArray[j];		
				yearNS[workingObject][holding] = source[workingObject][holding];  
					//assigns all data from the external data file to the yearNS namespace
				yearNS[workingObject]["topline"] = topLine;
				yearNS[workingObject]["bottomline"] = (xAxis + (boxHeight/2));
				yearNS[workingObject]["center"] = ((leftSide + xMargin) + (boxWidth/2));
				yearNS[workingObject]["ls"] = ((leftSide + xMargin) - 3);
				};
			var leftTextMarg = (leftSide + xMargin) + 3;
			var yTextPos = (xAxis + (boxHeight/2)) - 10;
			var boxText = R.text(leftTextMarg, yTextPos, yearNS[workingObject].Age).attr({"text-anchor": "start", fill:"black"});
 	 		leftSide = leftSide + boxWidth - 10;			
 	 				//modifies dimensions for the next box
	//left over from earlier iterations, in case the boxes spilled over the allocated width of the canvas
 	/* 		availableWidth = totalWidth - leftSide;
 	 		if (availableWidth < boxWidth)
 	 			{
 	 			topLine = topLine + boxHeight;
 	 			leftSide = 0;
 	 			}   */
		}	

//giving mouseover funcitonality to the boxes

for (var boxes in yearNS){
	(function (yr) {
		yr[0].onmouseover = function ()
			{
			var pctText = yr.MPct + yr.FPct;
			var holdingText0 = pctText.toFixed(2) + "%";
			var holdingText1 = "Age bracket: " + yr.Age; 
			var holdingText2 = "Female population: " + yr.FPop;
			var holdingText3 = "Male population: " + yr.MPop;
			
			yr.animate({"fill-opacity": 1}, 100);	
			yrText0 = R.text(yr.center, yr.bottomline + 25, holdingText0).attr({stroke: "silver", fill: "silver", "text-anchor":"middle", "font-size":"30pt"});
			yrText1 = R.text(yr.ls, yr.topline - 41, holdingText1).attr({fill: "silver", "text-anchor":"start"});
			yrText2 = R.text(yr.ls, yr.topline - 29, holdingText2).attr({fill: "silver", "text-anchor":"start"});
			yrText3 = R.text(yr.ls, yr.topline - 17, holdingText3).attr({fill: "silver", "text-anchor":"start"});
			yrText4 = R.text(yr.center, yr.bottomline + 55, "of the city's population\nis in this age group.").attr({fill: "silver", "text-anchor":"middle", "font-size":"12pt"});
			 };
		yr[0].onmouseout = function ()
			{
			yr.animate({"fill-opacity": 0.7}, 1000);
			yrText0.remove();
			yrText1.remove();
			yrText2.remove();
			yrText3.remove();
			yrText4.remove();
			}
		}

	)
	(yearNS[boxes]);
	}

//drawing the key at the bottom
var keyLS = 442,   	//key Left Side
    keyTE = 400;	//key Top Edge etc

var keyText1 = R.text(keyLS, keyTE - 10, "Youngest").attr({fill: "silver"});

for (var items in source)
	{
	thisBoxColor = source[items].boxcolor;
	var thisKeyBox = R.rect(keyLS, keyTE, 30, 15).attr({stroke:"silver", fill:thisBoxColor});
	keyLS = keyLS + 30;
	}

var keyText2 = R.text(keyLS, keyTE - 10, "Oldest").attr({fill: "silver"});

document.getElementById("top_corner").style.display = "";
document.getElementById("top_corner").innerHTML = year;
document.getElementById("top_corner").style.display = "block";

};



function findIndexOf(num, arr) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i][1] === num) {
            return i;
        }
    }

};
