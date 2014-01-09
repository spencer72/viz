var vis;

var margin = {top: 40, right: 20, bottom: 30, left: 20},
    width = 900,
    height = 590;

function onLoad()
{

var data = [
{ tract: "6501.01", Isol: 35.71, Foreign: 17.03},
{ tract: "6501.02", Isol: 24.54, Foreign: 20.09},
{ tract: "6502.01", Isol: 39.87, Foreign: 10.58},
{ tract: "6502.02", Isol: 26.43, Foreign: 17.59},
{ tract: "6503", Isol: 14.75, Foreign: 10.44},
{ tract: "6504", Isol: 39.42, Foreign: 30.91},
{ tract: "6505", Isol: 46.66, Foreign: 26.84},
{ tract: "6506", Isol: 39.89, Foreign: 21.58},
{ tract: "6507", Isol: 37.81, Foreign: 34.53},
{ tract: "6508", Isol: 37.88, Foreign: 21.44},
{ tract: "6509", Isol: 47.89, Foreign: 12.49},
{ tract: "6510.01", Isol: 28.13, Foreign: 16.14},
{ tract: "6510.02", Isol: 26.77, Foreign: 16.06},
{ tract: "6511", Isol: 48.80, Foreign: 17.63},
{ tract: "6512", Isol: 57.69, Foreign: 13.22},
{ tract: "6513", Isol: 40.91, Foreign: 17.09},
{ tract: "6514", Isol: 32.25, Foreign: 15.40},
{ tract: "6515", Isol: 17.82, Foreign: 13.61},
{ tract: "6516", Isol: 25.39, Foreign: 22.83},
{ tract: "6517", Isol: 37.85, Foreign: 9.96},
{ tract: "6518", Isol: 63.02, Foreign: 13.55},
{ tract: "6519", Isol: 48.15, Foreign: 27.64},
{ tract: "6520", Isol: 44.95, Foreign: 37.05},
{ tract: "6521", Isol: 30.46, Foreign: 12.42},
{ tract: "6522", Isol: 17.78, Foreign: 16.56},
{ tract: "6523", Isol: 50.24, Foreign: 23.58},
{ tract: "6524", Isol: 49.56, Foreign: 40.69},
{ tract: "6525", Isol: 52.63, Foreign: 34.20},
{ tract: "6526", Isol: 47.51, Foreign: 46.04},
{ tract: "6527", Isol: 51.88, Foreign: 24.68},
{ tract: "6528", Isol: 31.03, Foreign: 30.96}
];

vis = d3.select("#canvas")
  .data(data)
  .append("svg:svg")
  .attr("width", width)
  .attr("height", height + 50);

//setting scales

var x = d3.scale.linear()
	        .domain([0, d3.max(data, function(d) {return Math.ceil(d.Isol);})])
	        .range([margin.left+30, width-25]);
var y = d3.scale.linear()
		.domain([0, d3.max(data, function(d) {return (Math.ceil(d.Foreign)) + 5;})])
		.range([height, margin.top]);


var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .tickValues([10, 20, 30, 40, 50, 60, 70]);

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(5);



vis.selectAll("circle")
  .data(data)
  .enter()
  .append("svg:circle")
  .attr("cx", function(datum, index) {return x(datum.Isol); })
  .attr("cy", function(datum) { return y((datum.Foreign)); })
  .attr("fill", function(d) {
  	var thisColor;
  	var randNum = Math.floor((Math.random()*6)+1);
  	if (randNum === 1) {thisColor = "#F27EAD"}
  	else if (randNum === 2) {thisColor = "#40F585"}
  	else if (randNum === 3) {thisColor = "#78B0FA"}
  	else if (randNum === 4) {thisColor = "#FCF75B"}
  	else if (randNum === 5) {thisColor = "#FCB91C"}
  	else if (randNum === 6) {thisColor = "#DB37ED"};
  	return thisColor;
  	})
  .attr("r", 15)
  .attr("stroke", "#DAD9DB")
  .attr("fill-opacity", 0.7)
  .on("mouseover", function(d) {
  	d3.select(this).attr("fill-opacity", 1);
  	d3.select(this)
  	   .transition()
  		.duration(500)
  		.attr("r", 25)
  	   .transition()
  	   	.duration(500)
  	   	.attr("r", 15);
  	document.getElementById('middle_sidebar').innerHTML = "";
  	document.getElementById('middle_sidebar').style.display = "block";
  	document.getElementById('middle_sidebar').innerHTML = "Tract: " + d.tract + "<br />" + "Foreign-born pct: " + d.Foreign + "<br />" + "Linguistic isolation pct: " + d.Isol;}) 
  .on("mouseout", function(d) {
  	d3.select(this).attr("fill-opacity", 0.7);
    	document.getElementById('middle_sidebar').innerHTML = "";
  	document.getElementById('middle_sidebar').style.display = "";});  


vis.append("g")
  .attr("stroke","white")
  .attr("fill","none")
  .attr("shape-rendering","crispEdges")
  .attr("transform", "translate(0," + height + ")")
  .text("stroke","white")
  .text("font-size", 8) 
  .text("font-family", "sans-serif")
  .call(xAxis);

vis.append("g")
  .attr("stroke","white")
  .attr("fill","none")
  .attr("shape-rendering","crispEdges")
  .attr("transform", "translate(" + (margin.left+30) + ",0)")
  .text("stroke","white")
  .text("font-size", 8) 
  .text("font-family", "sans-serif")
  .call(yAxis);

vis.append("text")
 // .attr("stroke","white")
  .attr("fill","white")
  .attr("text-anchor", "middle")
  .attr("style", "font-size: 14; font-family: Optima, sans-serif")
  .attr("x", 450)
  .attr("y", 630)
  .text("Linguistically-isolated population (pct)");

vis.append("text")
 // .attr("stroke","white")
  .attr("fill","white")
 // .attr("shape-rendering","crispEdges")
  .attr("text-anchor", "middle")
  .attr("style", "font-size: 14; font-family: Optima, sans-serif")
  .attr("x", 10)
  .attr("y", 300)
  .attr("transform", "rotate(270 10 300)")
  .text("Foreign-born population (pct)");


		
};