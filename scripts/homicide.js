var vis;

var margin = {top: 40, right: 20, bottom: 30, left: 50},
    width = 1000 - margin.left - margin.right,
    height = 720 - margin.top - margin.bottom;



function onLoad()
{
var data = detroit;
var city = "Detroit";

vis = d3.select("#map")
  .data(data)
  .append("svg:svg")
  .attr("width", width)
  .attr("height", height + 30);

drawLines(data, city);
};



function drawLines(cityname, cityText)
{
vis.remove();
var q;


if (cityname == detroit) {q = 210}
else {q = 105};


function onElementMouseOver(d){
    document.getElementById('callout').innerHTML = "";
  	document.getElementById('callout').style.display = "block";
  	document.getElementById('callout').innerHTML = "Year: " + d.Year + "<br />" + "Population: " + d.pop + "<br />" + "Homicides: " + d.murders + "<br />" + "Rate (per 100K): " + d.rate;}

function onElementMouseOut(d){
    document.getElementById('callout').innerHTML = "";
  	document.getElementById('callout').style.display = "";}



var data = cityname;

//adding the SVG element to the DOM
vis = d3.select("#map")
  .data(data)
  .append("svg:svg")
  .attr("width", width)
  .attr("height", height + 30);

//setting scales
var x = d3.scale.linear().domain([0, data.length]).range([margin.left, width]);
//constant population scaler, with an exception built in for detroit because it was so much bigger than the second largest city in the dataset
var y = d3.scale.linear().domain([0, q]).rangeRound([0, height]);

//sets a consistent scale for homicide rates, to ensure that they don't look wildly different due to differences in population btwn cities
var y2 = d3.scale.linear().domain([0, 100]).rangeRound([0, height-margin.top]);


//these are the line variables
var popLine = d3.svg.line()
  .x(function(d,index) {return x(index); })
  .y(function(d) {return height - y((d.pop)/10000); });

var murderLine = d3.svg.line()
  .x(function(d,index) {return x(index); })
  .y(function(d) {return height - y2(d.rate); });

//drawing background bars
vis.selectAll("bkgd.bars")
  .data(data)
  .enter()
  .append("svg:rect")
  .attr("x", function(datum, index) {if ((index % 5 === 0) && (index % 2 != 0)) {return x(index)} else {return -100} })
  .attr("y", margin.top)
  .attr("width", 80)
  .attr("height", height - 39)
  .attr("fill", "#B3B4B5")
  .attr("fill-opacity", 0.4);

//adding the city name
vis.selectAll("citytext")
  .data(data)
  .enter()
  .append("svg:text")
  .attr("x", 113)
  .attr("y", 350)
  .attr("text-anchor","middle")
  .attr("style", "font-size: 60pt; font-weight: bold; font-family: Helvetica, sans-serif")
  .attr("fill","#C9C7C8")
  .attr("fill-opacity", 0.2)
  .text(cityText)
  .attr("transform","rotate (270 113 350)");


//drawing the x axis
vis.append("svg:line")
  .attr("class","line")
  .attr("stroke","grey")
  .attr("x1", margin.left-5)
  .attr("x2", width)
  .attr("y1", height + 2)
  .attr("y2", height + 2);


//drawing the lines and adding the circles in front of them 
vis.append("svg:path")
  .attr("d", murderLine(data))
  .attr("class", "line")
  .attr("fill", "none")
  .attr("stroke", "maroon")
  .attr("stroke-width", 3);

vis.selectAll("circle")
  .data(data)
  .enter()
  .append("svg:circle")
  .attr("cx", function(datum, index) {return x(index); })
  .attr("cy", function(datum) { return height - y2((datum.rate)); })
  .attr("height", function(datum) { return y2((datum.rate)); })
  .attr("fill", "maroon")
  .attr("r", 3)
  .on("mouseover", function(d) { return onElementMouseOver(d);})
  .on("mouseout", function(d) { return onElementMouseOut(d);});

vis.append("svg:path")
  .attr("d", popLine(data))
  .attr("class", "line")
  .attr("fill", "none")
  .attr("stroke", "cornflowerblue")
  .attr("stroke-width", 3);


vis.selectAll("circle2")
  .data(data)
  .enter()
  .append("svg:circle")
  .attr("cx", function(datum, index) {return x(index); })
  .attr("cy", function(datum) { return height - y((datum.pop)/10000); })
  .attr("height", function(datum) { return y((datum.pop)/10000); })
  .attr("fill", "cornflowerblue")
  .attr("r", 3)
  .on("mouseover", function(d) { return onElementMouseOver(d);})
  .on("mouseout", function(d) { return onElementMouseOut(d);});



vis.selectAll("text.xAxis")
  .data(data)
  .enter()
  .append("svg:text")
  .attr("x", function(datum, index) {if (index % 5 === 0) {return x(index)} else {return -100} })
  .attr("y", height + 15)
  .attr("text-anchor","middle")
  .attr("style", "font-size: 12; font-family: Helvetica, sans-serif")
  .attr("fill","black")
  .text(function(datum) {return datum.Year;})
  .attr("class", "xAxis");

//drawing index lines
vis.selectAll("indx.lines")
  .data(data)
  .enter()
  .append("svg:line")
  .attr("stroke", "grey")
  .attr("stroke-opacity", 0.2)
  .attr("fill-opacity", 0.2)
  .attr("stroke-dasharray", "-")
  .attr("x1", function(datum, index) {return x(index); })
  .attr("x2", function(datum, index) {return x(index); })
  .attr("y1", height + 2)
  .attr("y2", margin.top)
  .on("mouseover", function(d) {
  	d3.select(this).attr("fill-opacity", 0.7);
  	d3.select(this).attr("stroke-opacity", 0.7);
    return onElementMouseOver(d);})
  .on("mouseout", function(d) { 
  	d3.select(this).attr("fill-opacity", 0.2);
  	d3.select(this).attr("stroke-opacity", 0.2);
  	return onElementMouseOut(d);});

};





