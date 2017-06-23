/*Naam: Sanne Berendschot
Studentnummer: 10269290
Minor Programmeren, Programmeerproject*/

// make global variables for the data
var dataTotal = [];
var dataTotalAbs = [];
var dataTotalPop = [];
var dataTotalPerc = [];
var svgTotal;
var svgTooltipTimelineCountry;
var svgTooltipTimelineTotal;
var absPercTotal = "absolute values"

var currentYear = 2015;

var dataTotalAmount;
var maxDataTotalAmount;
var minDataTotalAmount;

var svgGraph;
var map;
var dataColorsFrom  = {};
var dataColorsTo = {};
var dataColorsFromLog = {};
var dataColorsToLog = {};
var dataColorsFromLogPerc = {};
var dataColorsToLogPerc = {};
var dataOriginAsylum;
var toFrom;
var newCountry = "SYR";
var nameCountry = "Syria";
var dataCountry = [];
var dataCountryAmount;
var maxDataCountryAmount;
var minDataCountryAmount;
var dataOrigin;
var dataAsylum;
var minY;
var maxY;
var maxDataYear = 0;
var minDataYear = 0;
var maxDataYearPerc = 0;
var minDataYearPerc = 0;
var svgChangeTimeline;
var yearSlider;
var color;
var countryStar = "SYR";
var countryStarName = "Syria";
var dataColorsFromPerc = {};
var dataColorsToPerc = {};
var absPerc;
var svgTooltipTimeline;
var linLog = "lin";

var minLog = 0;
var maxLog = 0;

var minLogPerc = 0;
var maxLogPerc = 0;

var xScale;
var xAxisLegend;

var dataBarchart;
var newDataBarchart;
var dataBarchartTotal;
var chart;
var svgChangeChart;
var amountOfRefugees;
var tooltip;

var colorLeft = "#FFB266"
colorLeft = "#FCF5DD"
colorLeft = "#FFE5CC"
colorLeft = "#FFF0E1"
colorLeft = "#FFF6EC"
var colorRight = "#660000"
//colorRight = "#440000"
var colorBorder = "#331900"
colorBorder = "#330000"
colorBorder = "black"
var colorDefault = "#F5F5F5";

var svgTwoSided;
var countryTwoSided = "Syria";
var female;
var male;
var ageGroups;
var dataTwoSidedLeft;
var dataTwoSidedRight;
var xL;
var xR;
var yT;
var yD;
var yPosByIndex;
var totalFemale;
var totalMale;
var svgChangeLeftTwoSided;
var svgChangeRightTwoSided;
var svgChangeTwoSided;
var youngTotal;
var totalMax;
var totalMaxYoung;

var marginT = {top: 50, right: 40, bottom: 120, left: 40},
    widthT = 900 - marginT.left - marginT.right,
    heightT = 500 - marginT.top - marginT.bottom;

var labelArea;
var width2;
var widthT2;

// parse the date
var parseTime = d3.time.format("%Y").parse;
var bisectDate = d3.bisector(function(d) { return d.year; }).left;

// set outlines for graphs
var margin = {top: 100, right: 40, bottom: 120, left: 150},
    width = 800 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

var marginG = {top: 150, right: 40, bottom: 120, left: 150},
    widthG = 800 - marginG.left - marginG.right,
    heightG = 600 - marginG.top - marginG.bottom;

// set the ranges for graph
var xG = d3.time.scale()
    .rangeRound([0, widthG]);

var yG = d3.scale.linear()
    .rangeRound([heightG, 0]);

// make array for the years as a string and in time
var yearsTime = []
var yearsString = []
j = 0
for (i = 1990; i < 2016; i++) {
    yearsTime[j] = parseTime(i.toString())
    yearsString[j] = i.toString();
    j++
};

// make function to draw the line for graph
var lineCountry = d3.svg.line()
    .x(function(d) { return xG(d.year); })
    .y(function(d) { return yG(d.amount); });

// initialize x axis for graph
var xAxisG = d3.svg.axis()
    .scale(xG)
    .orient("bottom");

// initialize y axis for graph
var yAxisG = d3.svg.axis()
    .scale(yG)
    .orient("left");

// make scale for barchart
var xB = d3.scale.ordinal()
    .rangeRoundBands([0, width], .4);

var yB = d3.scale.linear()
    .range([height, 0]);

// initialize x axis for barchart
var xAxisB = d3.svg.axis()
    .scale(xB)
    .orient("bottom");

// initialize y axis for barchart
var yAxisB = d3.svg.axis()
    .scale(yB)
    .orient("left");

// load data
queue()
    .defer(d3.tsv, "Dataset Origin goed.tsv")
    .defer(d3.tsv, "Dataset Origin goed 23 juni.tsv")   
    .defer(d3.tsv, "Dataset Asylum goed.tsv")
    .defer(d3.tsv, "Dataset Asylum goed 23 juni.tsv")
    .defer(d3.tsv, "Data Population Worldbank.tsv")    
    .defer(d3.json, "dataBarchart.json")    
    .await(makeVisualisations)

// make the two data visualisations
function makeVisualisations(error, datasetOrigin, datasetOrigin2, datasetAsylum, datasetAsylum2, datasetPopulation, datasetBarchart) {

    // check for error
    if (error) throw error;

    // save the data
    dataOrigin = datasetOrigin;
    dataOrigin = datasetOrigin2;
    dataAsylum = datasetAsylum;
    dataAsylum = datasetAsylum2;
    dataPopulation = datasetPopulation;
    dataBarchart = datasetBarchart;

    // make world map

    // find min and max for every dataset
    findMinMax();

    // make function to scale values to a color for map
    color = d3.scale.linear()
        .domain([minDataYear, maxDataYear])
        .range([colorLeft,colorRight]);

    colorLog = d3.scale.linear()
        .domain([minLog, maxLog])
        .range([colorLeft,colorRight]);

    colorLogPerc = d3.scale.linear()
        .domain([minLogPerc, maxLogPerc])
        .range([colorLeft,colorRight]);

    colorPerc = d3.scale.linear()
        .domain([minDataYearPerc, maxDataYearPerc])
        .range([colorLeft,colorRight]);

    // put data in dataset in correct format
    dataOrigin.forEach(function(d) {
        var country = d.Country,
            valueLin = +d[2015];
            valueLog = Math.log(valueLin)
        if (!isNaN(valueLin)) {
            dataColorsFrom[country] = { amount: valueLin, fillColor: color(valueLin) };
            dataColorsFromLog[country] = { amount: valueLog, fillColor: colorLog(valueLog) };
        }
        else {
            dataColorsFrom[country] = { amount: "not available", fillColor: colorDefault };
            dataColorsFromLog[country] = { amount: "not available", fillColor: colorDefault };
        }
    });

    dataAsylum.forEach(function(d) {
        var country = d.Country,
            valueLin = +d[2015];
            valueLog = Math.log(valueLin)
        if (!isNaN(valueLin)) {
            dataColorsTo[country] = { amount: valueLin, fillColor: color(valueLin) };
            dataColorsToLog[country] = { amount: valueLog, fillColor: colorLog(valueLog) };
        }
        else {
            dataColorsTo[country] = { amount: "not available", colorDefault };
            dataColorsToLog[country] = { amount: "not available", colorDefault };    
        }
    });

    dataOrigin.forEach(function(d) {
        dataPopulation.forEach(function(e) {
            if (d.Country == e.countrycode) {
                var country = d.Country,
                    refugees = +d[2015],
                    population = +e[2015],
                    value = refugees/population*100;
                    valueLog = Math.log(value)
                if (!isNaN(value)) {
                    dataColorsFromPerc[country] = { amount: value, fillColor: colorPerc(value) };
                    dataColorsFromLogPerc[country] = { amount: valueLog, fillColor: colorLogPerc(valueLog) };
                }
                else {
                    dataColorsFromPerc[country] = { amount: "not available", fillColor: colorDefault };   
                    dataColorsFromLogPerc[country] = { amount: "not available", fillColor: colorDefault };   
                }
            };
        });
    });

    dataAsylum.forEach(function(d){
        dataPopulation.forEach(function(e){
            if (d.Country == e.countrycode) {
                var country = d.Country,
                    refugees = +d[2015],
                    population = +e[2015],
                    value = refugees/population*100;
                    valueLog = Math.log(value);
                if (!isNaN(value)) {
                    dataColorsToPerc[country] = { amount: value, fillColor: colorPerc(value) };               
                    dataColorsToLogPerc[country] = { amount: valueLog, fillColor: colorLogPerc(valueLog) };               
                }
                else {
                    dataColorsToPerc[country] = { amount: "not available", fillColor: colorDefault };  
                    dataColorsToLogPerc[country] = { amount: "not available", fillColor: colorDefault };   
                }
            };
        });
    });

    // set default datasets
    dataset = dataColorsFrom
    dataOriginAsylum = dataOrigin
    toFrom = "from"
    absPerc = "absolute values"
    youngTotal = "total"

    // make the map
    makeMap();

    // make slider
    makeSlider();

    // make legend for world map
    makeLegendMap();

    // make graph for refugees over time

    // initialize svg
    svgGraph = d3.select("#container2").append("svg")
        .attr("width", widthG + marginG.left + marginG.right)
        .attr("height", heightG + marginG.top + marginG.bottom)
        .attr("id", "graph")
        .append("g")
            .attr("transform", "translate(" + marginG.left + "," + marginG.top + ")");

    // save data in correct format
    correctDataFormatTimeline();
    
    // set y-axis for default settings
    setYaxisTimeline();

    // make title
    svgGraph.append("g")
        .attr("transform", "translate(0," + heightG + ")")
        .append("text")
            .attr("class", "graphTitle")
            .attr("x", widthG / 2)
            .attr("y", - heightG - marginG.top / 2)
            .style("text-anchor", "middle")
            .text("Amount of refugees " + toFrom + " " + nameCountry + " per year in " + absPerc);

    makeAxisTimeline();

    // add line
    svgGraph.append("path")
        .attr("class", "line")
        .datum(dataCountry)
        .attr("fill", "none")
        .attr("stroke", colorRight)
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", 1.5)
        .attr("d", lineCountry);

    // add tooltip
    addTooltipTimelineCountry();

    // make barchart
    makeBarchart();

    // make two-sided barchart
    makeTwoSidedBarchart();

    // make total graph
    makeTotalGraph();

    // add tooltip
    addTooltipTimelineTotal();
};

function findMinMax() {

    dataOrigin.forEach(function(d) {
        for (each in d) {
            if (!isNaN(d[each])) {
                if (+d[each] < minDataYear) {
                    minDataYear = +d[each]
                }
                if (+d[each] > maxDataYear) {
                    maxDataYear = +d[each]
                }
                if (d[each] != 0) {
                    if (Math.log(d[each]) < minLog) {
                        minLog = Math.log(d[each])
                    }
                    if (Math.log(d[each]) > maxLog) {
                        maxLog = Math.log(d[each])
                    }
                }
            }
        }
    })
    dataAsylum.forEach(function(d) {
        for (each in d) {
            if (!isNaN(d[each])) {
                if (+d[each] < minDataYear) {
                    minDataYear = +d[each]
                }
                if (+d[each] > maxDataYear) {
                    maxDataYear = +d[each]
                }
                if (d[each] != 0) {
                    if (Math.log(d[each]) < minLog) {
                        minLog = Math.log(d[each])
                    }
                    if (Math.log(d[each]) > maxLog) {
                        maxLog = Math.log(d[each])
                    } 
                }
            }
        }
    })

    dataOrigin.forEach(function(d) {
        dataPopulation.forEach(function(e){
            if (d.Country == e.countrycode) {
                for (i = 0; i < 26; i++) {
                    value = d[yearsString[i]]/e[yearsString[i]]*100
                    if (!isNaN(value)) {
                        if (value < minDataYearPerc) {
                            minDataYearPerc = value    
                        }
                        if (value > maxDataYearPerc) {
                            maxDataYearPerc = value
                        }
                        if (value != 0) {
                            if (Math.log(value) < minLogPerc) {
                                minLogPerc = Math.log(value)
                            }
                            if (Math.log(value) > maxLogPerc) {
                                maxLogPerc = Math.log(value)
                            }
                        }
                     }
                }
            }
        })
    })
};

function addTooltipTimelineCountry() {

    svgTooltipTimelineCountry = svgGraph.append("g")
        .style("display", "none");

    svgTooltipTimelineCountry.append("line")
        .attr("class", "xTooltip")
        .style("stroke", "black")
        .style("stroke-dasharray", "3,3")
        .style("opacity", 0.5)
        .attr("y1", 0)
        .attr("y2", heightG);

    svgTooltipTimelineCountry.append("line")
        .attr("class", "yTooltip")
        .style("stroke", "black")
        .style("stroke-dasharray", "3,3")
        .style("opacity", 0.5)
        .attr("x1", widthG)
        .attr("x2", widthG);

    svgTooltipTimelineCountry.append("circle")
        .attr("class", "yTooltip")
        .style("fill", "none")
        .style("stroke", "black")
        .attr("r", 4);

    svgTooltipTimelineCountry.append("text")
        .attr("class", "y1Timeline")
        .style("stroke", "white")
        .style("stroke-width", "3.5px")
        .style("opacity", 0.8)
        .attr("dx", 8)
        .attr("dy", "-.3em");
    svgTooltipTimelineCountry.append("text")
        .attr("class", "y2")
        .attr("dx", 8)
        .attr("dy", "-.3em");

    svgTooltipTimelineCountry.append("text")
        .attr("class", "y3")
        .style("stroke", "white")
        .style("stroke-width", "3.5px")
        .style("opacity", 0.8)
        .attr("dx", 8)
        .attr("dy", "1em");
    svgTooltipTimelineCountry.append("text")
        .attr("class", "y4")
        .attr("dx", 8)
        .attr("dy", "1em");

    svgGraph.append("rect")
        .attr("class", "tooltipTimeline")
        .attr("width", widthG)
        .attr("height", heightG)
        .style("fill", "none")
        .style("pointer-events", "all")
        .on("mouseover", function() { svgTooltipTimelineCountry.style("display", null); })
        .on("mousemove", mousemoveCountry)
        .on("mouseout", function() { svgTooltipTimelineCountry.style("display", "none"); });
};

function mousemoveCountry() {

    var xTooltipTimeline = 0
    var yTooltipTimeline = -35

    yG.domain([minDataYear, maxDataCountryAmount]); 

    var x0 = xG.invert(d3.mouse(this)[0]),
    i = bisectDate(dataCountry, x0, 1),
    d0 = dataCountry[i - 1],
    d1 = dataCountry[i],
    d = x0 - d0.year > d1.year - x0 ? d1 : d0;

    var amount = +d.amount

    svgTooltipTimelineCountry.select("circle.yTooltip")
        .attr("transform", "translate(" + xG(d.year) + "," + yG(d.amount) + ")");

    if (absPerc == "absolute values") {
        svgTooltipTimelineCountry.select("text.y1Timeline")
            .attr("transform", "translate(" + xTooltipTimeline + "," + yTooltipTimeline + ")")
            .text("Amount of refugees: " + amount.toLocaleString());

        svgTooltipTimelineCountry.select("text.y2")
            .attr("transform", "translate(" + xTooltipTimeline + "," + yTooltipTimeline + ")")
            .text("Amount of refugees: " + amount.toLocaleString());
    } 
    else if (absPerc == "percentage of inhabitants") {
        svgTooltipTimelineCountry.select("text.y1Timeline")
            .attr("transform", "translate(" + xTooltipTimeline + "," + yTooltipTimeline + ")")
            .text("Percentage of inhabitants: " + amount.toLocaleString());

        svgTooltipTimelineCountry.select("text.y2")
            .attr("transform", "translate(" + xTooltipTimeline + "," + yTooltipTimeline + ")")
            .text("Percentage of inhabitants: " + amount.toLocaleString());
    }

    svgTooltipTimelineCountry.select("text.y3")
        .attr("transform", "translate(" + xTooltipTimeline + "," + yTooltipTimeline + ")")
        .text("Year: " + d.yearx);

    svgTooltipTimelineCountry.select("text.y4")
        .attr("transform", "translate(" + xTooltipTimeline + "," + yTooltipTimeline + ")")
        .text("Year: " + d.yearx);

    svgTooltipTimelineCountry.select(".xTooltip")
        .attr("transform", "translate(" + xG(d.year) + "," + yG(d.amount) + ")")
        .attr("y2", heightG - yG(d.amount));

    svgTooltipTimelineCountry.select(".yTooltip")
        .attr("transform", "translate(" + widthG * -1 + "," + yG(d.amount) + ")")
        .attr("x2", widthG + widthG);
}

function addTooltipTimelineTotal() {
   
    svgTooltipTimelineTotal = svgTotal.append("g")
        .style("display", "none");

    svgTooltipTimelineTotal.append("line")
        .attr("class", "xTooltip")
        .style("stroke", "black")
        .style("stroke-dasharray", "3,3")
        .style("opacity", 0.5)
        .attr("y1", 0)
        .attr("y2", heightG);

    svgTooltipTimelineTotal.append("line")
        .attr("class", "yTooltip")
        .style("stroke", "black")
        .style("stroke-dasharray", "3,3")
        .style("opacity", 0.5)
        .attr("x1", widthG)
        .attr("x2", widthG);

    svgTooltipTimelineTotal.append("circle")
        .attr("class", "yTooltip")
        .style("fill", "none")
        .style("stroke", "black")
        .attr("r", 4);

    svgTooltipTimelineTotal.append("text")
        .attr("class", "y1Timeline")
        .style("stroke", "white")
        .style("stroke-width", "3.5px")
        .style("opacity", 0.8)
        .attr("dx", 8)
        .attr("dy", "-.3em");
    svgTooltipTimelineTotal.append("text")
        .attr("class", "y2")
        .attr("dx", 8)
        .attr("dy", "-.3em");

    svgTooltipTimelineTotal.append("text")
        .attr("class", "y3")
        .style("stroke", "white")
        .style("stroke-width", "3.5px")
        .style("opacity", 0.8)
        .attr("dx", 8)
        .attr("dy", "1em");
    svgTooltipTimelineTotal.append("text")
        .attr("class", "y4")
        .attr("dx", 8)
        .attr("dy", "1em");

    svgTotal.append("rect")
        .attr("width", widthG)
        .attr("height", heightG)
        .style("fill", "none")
        .style("pointer-events", "all")
        .on("mouseover", function() { svgTooltipTimelineTotal.style("display", null); })
        .on("mousemove", mousemoveTotal)
        .on("mouseout", function() { svgTooltipTimelineTotal.style("display", "none"); });
    
    function mousemoveTotal() {

        var xTooltipTimeline = 0
        var yTooltipTimeline = - 35

        yG.domain([0, maxDataTotalAmount]); 

        var x0 = xG.invert(d3.mouse(this)[0]),
        i = bisectDate(dataTotal, x0, 1),
        d0 = dataTotal[i - 1],
        d1 = dataTotal[i],
        d = x0 - d0.year > d1.year - x0 ? d1 : d0;  

        var amount = +d.amount

        svgTooltipTimelineTotal.select("circle.yTooltip")
            .attr("transform", "translate(" + xG(d.year) + "," + yG(d.amount) + ")");

        svgTooltipTimelineTotal.select("text.y1Timeline")
            .attr("transform", "translate(" + xTooltipTimeline + "," + yTooltipTimeline + ")")
            .text("Amount of refugees: " + amount.toLocaleString());

        svgTooltipTimelineTotal.select("text.y2")
            .attr("transform", "translate(" + xTooltipTimeline + "," + yTooltipTimeline + ")")
            .text("Amount of refugees: " + amount.toLocaleString());

        svgTooltipTimelineTotal.select("text.y3")
            .attr("transform", "translate(" + xTooltipTimeline + "," + yTooltipTimeline + ")")
            .text("Year: " + d.yearx);

        svgTooltipTimelineTotal.select("text.y4")
            .attr("transform", "translate(" + xTooltipTimeline + "," + yTooltipTimeline + ")")
            .text("Year: " + d.yearx);

        svgTooltipTimelineTotal.select(".xTooltip")
            .attr("transform", "translate(" + xG(d.year) + "," + yG(d.amount) + ")")
            .attr("y2", heightG - yG(d.amount));

        svgTooltipTimelineTotal.select(".yTooltip")
            .attr("transform", "translate(" + widthG * -1 + "," + yG(d.amount) + ")")
            .attr("x2", widthG + widthG);
    }
};

function makeAxisTimeline() {

    // make x axis
    svgGraph.append("g")
        .attr("class", "x axis")
        .attr("id", "axisTitleX")
        .attr("transform", "translate(0," + heightG + ")")
        .call(xAxisG)
        .append("text")
            .attr("class", "axisTitle")
            //.attr("id", "axisTitleX")
            .attr("x", widthG)
            .attr("y", 50)
            .style("text-anchor", "end")
            .text("Time");

    // make y axis
    svgGraph.append("g")
        .attr("class", "y axis")
        .attr("id", "axisYTimeline")
        .call(yAxisG)
        .append("text")
            .attr("class", "axisTitle")
            .attr("id", "axisTitleY")
            .attr("transform", "rotate(-90)")
            .attr("y", - 90)
            .attr("dy", ".71em")
            .style("text-anchor", "end");

    // decide on title y axis
    if (absPerc == "percentage of inhabitants") {
        svgGraph.select("#axisTitleY")
            .text("Percentage of inhabitants");
    } 
    else if (absPerc == "absolute values") {
        svgGraph.select("#axisTitleY")
            .text("Amount of refugees");
    };

    /*// add comment
    svgGraph.append("g")
        .attr("transform", "translate(0," + height + ")")
        .append("text")
            .attr("id", "comment1")
            .attr("x", 0)
            .attr("y", margin.bottom)
            .style("text-anchor", "begin")
            .text("Hover over the line for exact data");*/
};

// save data in correct format for timeline
function correctDataFormatTimeline() {
    dataCountry = []
    j = 0
    if (absPerc == "absolute values") {
        dataOriginAsylum.forEach(function(d) {
            if (d.Country == newCountry) {
                for (i = 0; i < 26; i++) {
                    if (!isNaN(d[yearsString[i]])) {
                        object = {amount : d[yearsString[i]], year: yearsTime[i], yearx: yearsString[i]}
                        dataCountry[j] = object;
                        j++;
                    }
                }
            }
        });
    }
    else if (absPerc == "percentage of inhabitants") {
        dataOriginAsylum.forEach(function(d) {
            dataPopulation.forEach(function(e) {
                if (d.Country == newCountry && e.countrycode == newCountry) {
                    for (i = 0; i < 26; i++) {
                        value = d[yearsString[i]]/e[yearsString[i]]*100
                        if (!isNaN(value)) {
                            object = {amount : value, year: yearsTime[i], yearx: yearsString[i]}
                            dataCountry[j] = object;
                            j++;
                        }
                    }
                }
            });
        });
    };
};

// set y-axis of timeline
function setYaxisTimeline() {
    
    // define min and max for y-axis
    dataCountryAmount = dataCountry.map(function(obj){ return obj.amount; });
    maxDataCountryAmount = Math.max.apply(null, dataCountryAmount);
    minDataCountryAmount = Math.min.apply(null, dataCountryAmount);
    minY = Math.floor(minDataCountryAmount / 10) * 10;
    maxY = Math.ceil(maxDataCountryAmount / 10) * 10;

    // set domain for timeline
    xG.domain(d3.extent(yearsTime));
    yG.domain([minDataYear, maxDataCountryAmount]); 
};

function removeGraph() {
    svgGraph.selectAll("#axisYTimeline").remove();
    svgGraph.selectAll("#axisTitleX").remove();
    svgGraph.selectAll("#comment1").remove();
}

// change the graph of the timeline
function changeGraphTimeline() {

    // select the section for applying changes
    svgChangeTimeline = d3.select("#container2").transition();
    
    if (dataCountry.length == 0) {
        // change the title
        svgChangeTimeline.select(".graphTitle")
            .text("Data is not available for refugees " + toFrom + " " + nameCountry + " per year in " + absPerc);

        // remove graph
        removeGraph();

        // disable tooltip
        svgGraph.select(".tooltipTimeline")
            .on("mouseover", function() { svgTooltipTimelineCountry.style("display", "none"); })
            .on("mousemove", null)
    }
    else {
        // change title
        svgChangeTimeline.select(".graphTitle")
            .text("Amount of refugees " + toFrom + " " + nameCountry + " per year in " + absPerc);

        removeGraph();

        // add axis of timeline
        makeAxisTimeline();

        // enable tooltip again
        svgGraph.select(".tooltipTimeline")
            .on("mouseover", function() { svgTooltipTimelineCountry.style("display", null); })
            .on("mousemove", mousemoveCountry)
    }

    // change the line
    svgChangeTimeline.select(".line")
        .duration(750)
        .attr("d", lineCountry(dataCountry));    
};

// make slider for world map
function makeSlider() {

    // update map when slider is used
    d3.select("#YearSlider").on("input", function() {
        currentYear = +this.value
        update(currentYear);
    });

    // initialize with year 2015
    update(2015);

    // update when slider is used
    function update() {

        correctDataFormatMap();

        // update colors of world map
        map.updateChoropleth(dataset)
        
        // adjust the text on the range slider
        d3.select("#YearSlider-value").text(currentYear);
        d3.select("#YearSlider").property("value", currentYear);
    };
};

function correctDataFormatMap() {
    // put data in dataset in correct format
    dataColorsFrom = {};
    dataColorsFromLog = {};
    dataColorsFromPerc = {};
    dataColorsFromLogPerc = {};
    dataColorsTo = {};
    dataColorsToLog = {};
    dataColorsToPerc = {};
    dataColorsToLogPerc = {};
    dataOriginAsylum.forEach(function(d){
        var country = d.Country,
            refugees = +d[currentYear];
            refugeesLog = Math.log(refugees)
        if (toFrom == "from" && absPerc == "absolute values") {
            if (linLog == "lin") {
                if (!isNaN(refugees)) {
                    dataColorsFrom[country] = { amount: refugees, fillColor: color(refugees), country: country };
                }
                else {
                    dataColorsFrom[country] = { amount: "not available", fillColor: colorDefault, country: country };    
                }
                dataset = dataColorsFrom;
            }
            else if (linLog == "log") {
                if (!isNaN(refugees)) {
                    if (refugees != 0) {
                        dataColorsFromLog[country] = { amount: refugeesLog, fillColor: colorLog(refugeesLog), country: country };
                    }
                    else {
                        dataColorsFromLog[country] = { amount: refugeesLog, fillColor: colorLeft, country: country };   
                    }
                }
                else {
                    dataColorsFromLog[country] = { amount: "not available", fillColor: colorDefault, country: country };   
                }
                dataset = dataColorsFromLog;    
            }
        } else if (toFrom == "to" && absPerc == "absolute values") {
            if (linLog == "lin") {
                if (!isNaN(refugees)) {
                    dataColorsTo[country] = { amount: refugees, fillColor: color(refugees), country: country };
                }
                else {
                    dataColorsTo[country] = { amount: "not available", fillColor: colorDefault, country: country };    
                }
                dataset = dataColorsTo;
            }
            else if (linLog == "log"){
                if (!isNaN(refugees)) {
                    if (refugees != 0) {
                        dataColorsToLog[country] = { amount: refugeesLog, fillColor: colorLog(refugeesLog), country: country };
                    }
                    else {
                        dataColorsToLog[country] = { amount: refugeesLog, fillColor: colorLeft, country: country };   
                    }
                }
                else {
                    dataColorsToLog[country] = { amount: "not available", fillColor: colorDefault, country: country };    
                }
                dataset = dataColorsToLog;   
            }
        } else if (toFrom == "from" && absPerc == "percentage of inhabitants") {
            dataPopulation.forEach(function(e) {
                if (d.Country == e.countrycode) {
                    population = +e[currentYear];
                    if (linLog == "lin") {
                        value = refugees/population*100;
                        if (!isNaN(value)) {
                            dataColorsFromPerc[country] = { amount: value, fillColor: colorPerc(value), country: country };
                        }
                        else {
                            dataColorsFromPerc[country] = { amount: "not available", fillColor: colorDefault, country: country };   
                        }
                        dataset = dataColorsFromPerc;
                    }
                    else if (linLog == "log") {
                        value = Math.log(refugees/population*100);
                        if (!isNaN(value)) {
                            if (value != 0) {
                                dataColorsFromLogPerc[country] = { amount: value, fillColor: colorLogPerc(value), country: country };
                            }
                            else {
                                dataColorsFromLogPerc[country] = { amount: value, fillColor: colorLeft, country: country };   
                            }
                        }
                        else {
                            dataColorsFromLogPerc[country] = { amount: "not available", fillColor: colorDefault, country: country };   
                        }
                        dataset = dataColorsFromLogPerc;    
                    }
                }
            })
        } else if (toFrom == "to" && absPerc == "percentage of inhabitants") {
            dataPopulation.forEach(function(e) {
                if (d.Country == e.countrycode) {
                    population = +e[currentYear];
                    if (linLog == "lin") {
                        value = refugees/population*100;
                        if (!isNaN(value)) {
                            dataColorsToPerc[country] = { amount: value, fillColor: colorPerc(value), country: country };
                        }
                        else {
                            dataColorsToPerc[country] = { amount: "not available", fillColor: colorDefault, country: country, country: country };   
                        }
                        dataset = dataColorsToPerc;
                    }
                    else if (linLog == "log") {
                        value = Math.log(refugees/population*100);
                        if (!isNaN(value)) {
                            if (value != 0) {
                                dataColorsToLogPerc[country] = { amount: value, fillColor: colorLogPerc(value), country: country };
                            }
                            else {
                                dataColorsToLogPerc[country] = { amount: value, fillColor: colorLeft, country: country };   
                            }
                        }
                        else {
                            dataColorsToLogPerc[country] = { amount: "not available", fillColor: colorDefault, country: country };   
                        }
                        dataset = dataColorsToLogPerc;
                    }
                }
            })
        } else {
            console.log('No To or From was given')
        }
    });
}

// make legend for world map
function makeLegendMap() {
    // select the correct section
    var svgMap = d3.select(".datamap")
    
    // make horizontal gradient
    var linearGradient = svgMap.append("defs").append("linearGradient")
        .attr("id", "linear-gradient")
        .attr("x1", "0%")
        .attr("y1", "0%")
        .attr("x2", "100%")
        .attr("y2", "0%");
    
    // set brightest color
    linearGradient.append("stop") 
        .attr("offset", "0%")   
        .attr("stop-color", colorLeft);

    // set the darkest color
    linearGradient.append("stop") 
        .attr("offset", "100%")   
        .attr("stop-color", colorRight);

    // set width, height and place for legend
    legendWidth = 240
    legendHeight = 10
    xCo = 20
    yCo = 460

    // append a title
    svgMap.append("text")
        .attr("id", "legendTitle")
        .attr("x", xCo)
        .attr("y", yCo - 10)
        .text("Amount of refugees (in millions)");

    // draw the rectangle and fill with gradient
    svgMap.append("rect")
        .attr("width", legendWidth)
        .attr("height", legendHeight)
        .style("fill", "url(#linear-gradient)")
        .style("x", xCo)
        .style("y", yCo);

    // make legend in millions
    maxDataYearMillion = maxDataYear / 1000000
    minDataYearMillion = minDataYear / 1000000
    
    // set scale for x-axis
    xScale = d3.scale.linear()
        .range([0, legendWidth])
        .domain([minDataYearMillion, maxDataYearMillion]);

    // define x axis
    xAxisLegend = d3.svg.axis()
          .orient("bottom")
          .ticks(10)
          .scale(xScale);

    // place x axis
    svgMap.append("g")
        .attr("transform", "translate(" + xCo + "," + (yCo + legendHeight) + ")")
        .attr("id", "legendX")
        .call(xAxisLegend)
        .selectAll("text")
                .style("text-anchor", "end")
                .attr("dx", "-.8em")
                .attr("dy", ".15em")
                .attr("transform", "rotate(-90)");
};

function changeLegendMap() {

    // select the section for applying changes
    var svgChangeLegend = d3.select(".datamap").transition();

    if (absPerc == "absolute values") {
        if (linLog == "lin") {
            // change the title
            svgChangeLegend.select("#legendTitle")
                .text("Amount of refugees (in millions)");

            // change axis
            xScale = d3.scale.linear()
                .range([0, legendWidth])
                .domain([minDataYear, maxDataYear/1000000]);
        }
        else if (linLog == "log") {

            // change the title
            svgChangeLegend.select("#legendTitle")
                .text("Amount of refugees (in logarithm)");

            // change axis
            xScale = d3.scale.linear()
                .range([0, legendWidth])
                .domain([minLog, maxLog]);
        }
    }
    else if (absPerc == "percentage of inhabitants") {
        if (linLog == "lin") {
            // change the title
            svgChangeLegend.select("#legendTitle")
                .text("Percentage refugees of inhabitants")

            // change axis
            xScale = d3.scale.linear()
                .range([0, legendWidth])
                .domain([minDataYearPerc, maxDataYearPerc]);
        }
        else if (linLog == "log") {
        // change the title
            svgChangeLegend.select("#legendTitle")
                .text("Percentage refugees of inhabitants (in logarithm)")

            // change axis
            xScale = d3.scale.linear()
                .range([0, legendWidth])
                .domain([minLogPerc, maxLogPerc]);    
        }
    };

    xAxisLegend = d3.svg.axis()
          .orient("bottom")
          .ticks(10)
          .scale(xScale);

    svgChangeLegend.select("#legendX")
        //.duration(750)
        .call(xAxisLegend)
        .selectAll("text")
                .style("text-anchor", "end")
                .attr("dx", "-.8em")
                .attr("dy", ".15em")
                .attr("transform", "rotate(-90)");


    /*// define min and max for y-axis
    dataCountryAmount = dataCountry.map(function(obj){ return obj.amount; });
    maxDataCountryAmount = Math.max.apply(null, dataCountryAmount);
    minDataCountryAmount = Math.min.apply(null, dataCountryAmount);
    minY = Math.floor(minDataCountryAmount / 10) * 10;
    maxY = Math.ceil(maxDataCountryAmount / 10) * 10;

    // set domain for timeline
    xG.domain(d3.extent(yearsTime));
    yG.domain([minDataYear, maxDataCountryAmount]); */
};

// update the data when origin or asylumm is clicked
function updateDataToFrom(input) {

    // use correct data
    if (linLog == "lin" && input != 5 || input == 4) {
        if (input == 0 && absPerc == "absolute values" || input == 2 && toFrom == "from" || absPerc == "absolute values" && toFrom == "from" && input == 4) {
            dataOriginAsylum = dataOrigin;
            toFrom = "from";
            absPerc = "absolute values";
            linLog = "lin";
        }
        else if (input == 0 && absPerc == "percentage of inhabitants" || input == 3 && toFrom == "from" || absPerc == "percentage of inhabitants" && toFrom == "from" && input == 4) {
            dataOriginAsylum = dataOrigin;
            toFrom = "from";
            absPerc = "percentage of inhabitants";
            linLog = "lin";
        }
        else if (input == 1 && absPerc == "absolute values" || input == 2 && toFrom == "to" || absPerc == "absolute values" && toFrom == "to" && input == 4) {
            dataOriginAsylum = dataAsylum;
            toFrom = "to";
            absPerc = "absolute values";   
            linLog = "lin";
        }
        else if (input == 1 && absPerc == "percentage of inhabitants" || input == 3 && toFrom == "to" || absPerc == "percentage of inhabitants" && toFrom == "to" && input == 4) {
            dataOriginAsylum = dataAsylum;
            toFrom = "to";
            absPerc = "percentage of inhabitants"; 
            linLog = "lin";
        }
    }
    else if (linLog == "log" && input != 4 || input == 5) {
        if (input == 0 && absPerc == "absolute values" || input == 2 && toFrom == "from" || absPerc == "absolute values" && toFrom == "from" && input == 5) {
            dataOriginAsylum = dataOrigin;
            toFrom = "from";
            absPerc = "absolute values";
            linLog = "log";
        }
        else if (input == 0 && absPerc == "percentage of inhabitants" || input == 3 && toFrom == "from" || absPerc == "percentage of inhabitants" && toFrom == "from" && input == 5) {
            dataOriginAsylum = dataOrigin;
            toFrom = "from";
            absPerc = "percentage of inhabitants";
            linLog = "log";
        }
        else if (input == 1 && absPerc == "absolute values" || input == 2 && toFrom == "to" || absPerc == "absolute values" && toFrom == "to" && input == 5) {
            dataOriginAsylum = dataAsylum;
            toFrom = "to";
            absPerc = "absolute values";   
            linLog = "log";
        }
        else if (input == 1 && absPerc == "percentage of inhabitants" || input == 3 && toFrom == "to" || absPerc == "percentage of inhabitants" && toFrom == "to" && input == 5) {
            dataOriginAsylum = dataAsylum;
            toFrom = "to";
            absPerc = "percentage of inhabitants"; 
            linLog = "log";
        }
    };


/*    if (input == 4 && toFrom == "from" || linLog == "lin" && input == 0) {
        dataset = dataColorsFrom;
        map.options.data = dataColorsFrom;
        dataOriginAsylum = dataOrigin;
        toFrom = "from"
        linLog = "lin"
    }
    else if (input == 4 & toFrom == "to" || linLog == "lin" && input == 1) {
        dataset = dataColorsTo;
        map.options.data = dataColorsTo;
        dataOriginAsylum = dataAsylum;
        toFrom = "to"
        linLog = "lin"
    }
    else if (input == 5 && toFrom == "from" || linLog == "log" && input == 0) {
        dataset = dataColorsFromLog;
        map.options.data = dataColorsFromLog;
        dataOriginAsylum = dataOrigin;
        toFrom = "from"
        linLog = "log"
    }
    else if (input == 5 && toFrom == "to" || linLog == "log" && input == 1) {
        dataset = dataColorsToLog;
        map.options.data = dataColorsToLog;
        dataOriginAsylum = dataAsylum;
        toFrom = "to"
        linLog = "log"
    }*/

    correctDataFormatMap();

    console.log(dataset)
    i = 0
    for (each in dataset){
        i++
    }
    console.log(i)
    
    // update colors in map
    map.updateChoropleth(dataset)

    // update legend
    changeLegendMap();

    // save new data
    correctDataFormatTimeline();

    // set y-axis again
    setYaxisTimeline();

    // change the graph of the timeline
    changeGraphTimeline();
};

// make the map
function makeMap() {
    map = new Datamap({
        element: document.getElementById("container1"),
        /*scope: "world",
        
        // zoom in on South-America
        setProjection: function(element) {
            var projection = d3.geo.equirectangular()
                .center([0, 0])
                .rotate([0, 0])
                .scale(100)
                .translate([element.offsetWidth / 2, element.offsetHeight / 2]);
            var path = d3.geo.path()
                .projection(projection);

        return {path: path, projection: projection};
        },*/

        // set default settings
        fills: { defaultFill: colorDefault },
        data: dataset,    
        geographyConfig: {
            borderColor: function(d) {
                if (d.id == "COD" || d.id == "CAF"|| d.id == "SOM" || d.id == "SSD" || d.id == "SYR") {
                    return "gold";    
                }
                else {
                    return colorBorder;
                }
            },
            borderWidth: function(d) {
                if (d.id == "COD" || d.id == "CAF"|| d.id == "SOM" || d.id == "SSD" || d.id == "SYR") {
                    return 3;    
                }
                else {
                    return 1;
                }
            },

            // settings for mouse hover
            highlightBorderWidth: function(d) {
                if (d.country == "COD" || d.country == "CAF"|| d.country == "SOM" || d.country == "SSD" || d.country == "SYR") {
                    return 4;    
                }
                else {
                    return 2;
                }
            },

            highlightFillColor: function(geo) {
                return geo["fillColor"] || colorDefault;

            },
            highlightBorderColor: function(d) {
                if (d.country == "COD" || d.country == "CAF"|| d.country == "SOM" || d.country == "SSD" || d.country == "SYR") {
                    return "gold";    
                }
                else {
                    return colorBorder;
                }
            },
            
            // make tooltip
            popupTemplate: function(geo, data) {
                
                // only show information when data is present
                if (!dataset) { return ; }
                if (isNaN(dataset[geo.id].amount)) { return ;}
                
                // show country and life expectancy in information box
                if (absPerc == "absolute values" && linLog == "lin") { 
                        var amount = Math.round(dataset[geo.id].amount * 10) / 10;
                        return ["<div class=hoverinfo>",
                        "<strong>", geo.properties.name, "</strong>",
                        "<br>Amount of refugees: <strong>", amount.toLocaleString(), "</strong>",
                        "</div>"].join('');
                } 
                else if (absPerc == "percentage of inhabitants" && linLog == "lin") {
                    return ["<div class=hoverinfo>",
                        "<strong>", geo.properties.name, "</strong>",
                        "<br>Percentage of inhabitants: <strong>", Math.round(dataset[geo.id].amount * 1000) / 1000, "</strong>",
                        "</div>"].join('');
                }
                else if (absPerc == "absolute values" && linLog == "log") {
                    return ["<div class=hoverinfo>",
                        "<strong>", geo.properties.name, "</strong>",
                        "<br>Amount of refugees in logarithm: <strong>", Math.round(dataset[geo.id].amount * 1000) / 1000, "</strong>",
                        "</div>"].join('');
                }
                else if (absPerc == "percentage of inhabitants" && linLog == "log") {
                    return ["<div class=hoverinfo>",
                        "<strong>", geo.properties.name, "</strong>",
                        "<br>Percentage of inhabitants in logarithm: <strong>", Math.round(dataset[geo.id].amount * 1000) / 1000, "</strong>",
                        "</div>"].join('');
                }
            }
        },

        // when country clicked, graph below changes
        done: function(datamap) {
            datamap.svg.selectAll(".datamaps-subunit").on("click", function(geo) {

                newCountryClicked(geo);

            });
        }
    });
};

function newCountryClicked(geo) {

    // save the selected country
    newCountry = geo.id;
    nameCountry = geo.properties.name

    // define new dataset for new country
    correctDataFormatTimeline();

    // set y-axis again
    setYaxisTimeline();

    // change the graph of the timeline
    changeGraphTimeline();

    // change barchart if one of 5 countries is clicked
    if (newCountry == "SYR" || newCountry == "SOM" || newCountry == "SSD" || newCountry == "CAF" || newCountry == "COD") {
        countryStar = geo.id;
        countryStarName = geo.properties.name
        
        // put data in correct format
        correctDataFormatBarchart();

        setAmountOfRefugeesCorrect();
        
        // set domain
        setDomainBarchart();

        // change barchart
        changeBarchart();

        countryTwoSided = countryStarName;

        // change two-sided barchart
        changeTwoSided(2);

    };
};

function newCountryClickedText(country) {

    // save the selected country
    /*newCountry = "SSD";
    nameCountry = "South Sudan"*/

    // change barchart if one of 5 countries is clicked
    if (country == 0) {
        countryStar = "SYR"
        countryStarName = "Syria"
    } 
    else if (country == 1) {
        countryStar = "SSD"
        countryStarName = "South Sudan"
    } 
    else if (country == 2) {
        countryStar = "COD"
        countryStarName = "Democratic Republic of the Congo"
    } 
    else if (country == 3) {
        countryStar = "CAF"
        countryStarName = "Central African Republic"
    } 
    else if (country == 4) {
        countryStar = "SOM"
        countryStarName = "Somalia"
    }    
        
    // put data in correct format
    correctDataFormatBarchart();

    setAmountOfRefugeesCorrect();
    
    // set domain
    setDomainBarchart();

    // change barchart
    changeBarchart();

    countryTwoSided = countryStarName;

    // change two-sided barchart
    changeTwoSided(2);
};

// make the barchart
function makeBarchart() {

    // initialize svg
    chart = d3.select("#container3").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // make title
    chart.append("g")
        .attr("transform", "translate(0," + height + ")")
        .append("text")
            .attr("class", "graphTitle")
            .attr("x", width / 2)
            .attr("y", - height - margin.top / 2)
            .style("text-anchor", "middle")
            .text("Refugees from " + countryStarName);

    // put data in correct format
    correctDataFormatBarchart();

    setAmountOfRefugeesCorrect();
    
    // set domain
    setDomainBarchart();
    
    tooltip = d3.select("body")
        .append("div")
        .attr("class", "tipBarchart")
        .style("position", "absolute")
        .style("z-index", "10")
        .style("visibility", "hidden")

    // make x axis
    chart.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxisB)
        .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(-25)");
    chart.append("text")
        .attr("class", "axisTitle")
        .attr("x", width/2)
        .attr("y", height + 60)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Country");

    // make y axis
    chart.append("g")
        .attr("class", "y axis")
        .call(yAxisB);
    chart.append("text")
        .attr("class", "axisTitle")
        .attr("transform", "rotate(-90)")
        .attr("y", - 90)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Amount of refugees");

    // make bars
    chart.selectAll(".bar")
        .data(newDataBarchart)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return xB(d.country); })
        .attr("y", function(d) { return yB(d.amount); })
        .attr("height", function(d) { return height - yB(d.amount); })
        .attr("width", xB.rangeBand())
        .attr("fill", "#A15852")
        .on("mouseover", function(d) { 
            if (d.data == "yes") {
                d3.select(this)
                    .attr("fill", "#F2D286");
            } else if (d.data == "no") {
                d3.select(this)
                    .attr("fill", "grey");
            }
            return tooltip.style("visibility", "visible").text("Amount " + d.country + ": " + d.amount.toLocaleString());})
        .on("mousemove", function() { return tooltip.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px");})
        .on("mouseout", function() { 
            d3.select(this)
                .attr("fill", "#A15852");
            return tooltip.style("visibility", "hidden");})
        .on("click", function(d) { countryTwoSided = d.country; changeTwoSided(2) });

    // add comment
    chart.append("g")
        .attr("transform", "translate(0," + height + ")")
        .append("text")
            .attr("class", "comment")
            .attr("x", 0)
            .attr("y", - height - margin.top / 4)
            .style("text-anchor", "begin")
            .text("Amount of refugees: " + amountOfRefugees.toLocaleString());
};

// make correct data format for barchart
function correctDataFormatBarchart() {
    newDataBarchart = []
    j = 0
    dataBarchart.forEach(function(d){
        if (d.origin == countryStarName && d.origin != d.country) {
            newDataBarchart[j] = {"country": d.country, "amount": d.amount};
            if (d.female) {
                newDataBarchart[j].data = "yes"
            }
            else {
                newDataBarchart[j].data = "no"
            }
            j++;
        };
    });
};

function setAmountOfRefugeesCorrect() {
    dataBarchart.forEach(function(d){
        if (d.origin == countryStarName && d.origin == d.country) {
            amountOfRefugees = d.amount;
        };
    }); 
};

function setDomainBarchart() {    
    xB.domain(newDataBarchart.map(function(d) { return d.country; }));
    yB.domain([0, Math.ceil(d3.max(newDataBarchart, function(d) { return d.amount; })/100000)*100000]);
};

function changeBarchart() {
    // select the section for applying changes
    svgChangeChart = d3.select("#container3").transition();
    
    // change the title
    svgChangeChart.select(".graphTitle")
        .text("Refugees from " + countryStarName);

    svgChangeChart.select(".comment")
        .text("Amount of refugees: " + amountOfRefugees.toLocaleString());

    var bars = chart.selectAll(".bar").data(newDataBarchart, function(d) { return d.country; }) // (data) is an array/iterable thing, second argument is an ID generator function

    bars.exit()
    .transition()
        .duration(300)
    .attr("y", yB(0))
    .attr("height", height - yB(0))
    .style('fill-opacity', 1e-6)
    .remove();

    // data that needs DOM = enter() (a set/selection, not an event!)
    bars.enter().append("rect")
        .attr("class", "bar")
        .attr("y", yB(0))
        .attr("height", height - yB(0))
        .attr("fill", "#A15852");

    // the "UPDATE" set:
    bars.transition().duration(300).attr("x", function(d) { return xB(d.country); }) // (d) is one item from the data array, x is the scale object from above
        .attr("width", xB.rangeBand()) // constant, so no callback function(d) here
        .attr("y", function(d) { return yB(d.amount); })
        .attr("height", function(d) { return height - yB(d.amount); }); // flip the height, because y's domain is bottom up, but SVG renders top down

    // change the x axis
    svgChangeChart.select(".x.axis")
        .duration(750)
        .call(xAxisB)
            .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(-25)");

    // change the y axis
    svgChangeChart.select(".y.axis")
        .duration(750)
        .call(yAxisB);

    // make sure that you can still click on the bars and tooltip stays
    d3.selectAll(".bar")
        .on("mouseover", function(d) { 
            if (d.data == "yes") {
                d3.select(this)
                    .attr("fill", "#F2D286");
            } else if (d.data == "no") {
                d3.select(this)
                    .attr("fill", "grey");
            }
            return tooltip.style("visibility", "visible").text("Amount " + d.country + ": " + d.amount.toLocaleString());})
        .on("mousemove", function() { return tooltip.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px");})
        .on("mouseout", function() { 
            d3.select(this)
                .attr("fill", "#A15852");
            return tooltip.style("visibility", "hidden");})
        .on("click", function(d) { countryTwoSided = d.country; changeTwoSided(2) });
};

function makeTwoSidedBarchart() { 

    labelArea = 100;
    widthT2 = widthT - labelArea;
    width2 = widthT2 / 2;

    dataBarchart.forEach(function(d){
        if (d.female) {
            d.female["0-17"] = 0;
            d.male["0-17"] = 0;
            for (var each in d.female) {
                if (each == "0-4" || each == "5-11" || each == "12-17") {
                    d.female["0-17"] += d.female[each]
                    d.male["0-17"] += d.male[each]
                }
            }
        }
    })

    correctDataFormatTwoSided(1);

    // set age groups
    dataTwoSidedLeft = male
    dataTwoSidedRight = female

    // find min and max
    rightMax = 0
    leftMax = 0
    rightMaxYoung = 0
    leftMaxYoung = 0
    dataBarchart.forEach(function(d){
        for (var each in d.female) {
            if (each != "total") {
                if (leftMax < d.female[each]) {
                    leftMax = d.female[each]
                }
                if (rightMax < d.male[each]) {
                    rightMax = d.male[each]
                }
                if (each == "0-4" || each == "5-11" || each == "12-17") {
                    if (leftMaxYoung < d.female[each]) {
                        leftMaxYoung = d.female[each]
                    }
                    if (rightMaxYoung < d.male[each]) {
                        rightMaxYoung = d.male[each]
                    }
                }
            }
        }
    })

    totalMax = d3.max([leftMax, rightMax]);
    totalMaxYoung = d3.max([leftMaxYoung, rightMaxYoung])

    // set domain
    xL = d3.scale.linear()
        .domain([0, totalMax])
        .range([0, width2]);

    yT = d3.scale.ordinal()
        .domain(ageGroups)
        .rangeBands([50, heightT-200])

    array = [0, 1, 2]
    yD = d3.scale.ordinal()
        .domain(array)
        .rangeBands([50, heightT-200])

    xR = d3.scale.linear()
        .domain([0, totalMax])
        .range([0, width2]);

    // is xR en xL nodig??

    yPosByIndex = function(d, index) { return yD(index); }

        // initialize svg
    svgTwoSided = d3.select("#container4").append("svg")
        .attr("width", widthT + marginT.left + marginT.right + 100)
        .attr("height", heightT + marginT.top + marginT.bottom)
        .attr("id", "twoSided")
        .append("g")
            .attr("transform", "translate(" + marginT.left + "," + marginT.top + ")");

    svgTwoSided.selectAll("rect.left")
        .data(dataTwoSidedLeft)
        .attr("class", "leftData")
        .enter().append("rect")
        .attr("x", function(d) { return marginT.left + width2 - xL(d); })
        .attr("y", yPosByIndex)
        .attr("class", "left")
        .attr("width", xL)
        .attr("height", yT.rangeBand())
        .on("mouseover", function(d) { 
            var abs = Math.round(d * amountOfRefugees / 100); 
            if (countryStarName == countryTwoSided) { 
                return tooltip.style("visibility", "visible").text("Absolute value: " + abs.toLocaleString())
            } 
            else { 
                newDataBarchart.forEach(function(e) {
                    if (e.country == countryTwoSided) {
                        var abs = Math.round(d * e.amount / 100); 
                        return tooltip.style("visibility", "visible").text("Absolute value: " + abs.toLocaleString())   
                    }
                });
            };
        })
        .on("mousemove", function() { return tooltip.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px");})
        .on("mouseout", function() { return tooltip.style("visibility", "hidden");})
        .on("click", function(d) { 
            if (youngTotal == "total") {
                changeTwoSided(0) 
            }
            else if (youngTotal == "young") {
                changeTwoSided(1)
            };
        });

    svgTwoSided.selectAll("rect.right")
        .data(dataTwoSidedRight)
        .enter().append("rect")
        .attr("x", marginT.left + width2 + labelArea)
        .attr("y", yPosByIndex)
        .attr("class", "right")
        .attr("width", xR)
        .attr("height", yT.rangeBand())
        .on("mouseover", function(d) { 
            var abs = Math.round(d * amountOfRefugees / 100); 
            if (countryStarName == countryTwoSided) { 
                return tooltip.style("visibility", "visible").text("Absolute value: " + abs.toLocaleString())
            } 
            else { 
                newDataBarchart.forEach(function(e) {
                    if (e.country == countryTwoSided) {
                        var abs = Math.round(d * e.amount / 100); 
                        return tooltip.style("visibility", "visible").text("Absolute value: " + abs.toLocaleString())   
                    }
                });
            };
        })
        .on("mousemove", function() { return tooltip.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px");})
        .on("mouseout", function() { return tooltip.style("visibility", "hidden");})
        .on("click", function(d) { 
            if (youngTotal == "total") {
                changeTwoSided(0) 
            }
            else if (youngTotal == "young") {
                changeTwoSided(1)
            };
        });

    addPercentages();

    // select the section for applying changes
    svgChangeTwoSided = d3.select("#container4").transition();

    addTitlesTwoSided();
};

function changeTwoSided(value) {
    
    svgChangeTwoSided = d3.select("#container4").transition();

    if (value == 0 || value == 2 && youngTotal == "young") {
        youngTotal = "young"

        correctDataFormatTwoSided(0);   
        
        yT = d3.scale.ordinal()
            .domain(ageGroups)
            .rangeBands([50, heightT-200])

        xL = d3.scale.linear()
            .domain([0, totalMaxYoung])
            .range([0, width2]);

        xR = d3.scale.linear()
            .domain([0, totalMaxYoung])
            .range([0, width2]); 
    }
    else if (value == 1 || value == 2 && youngTotal == "total") {
        youngTotal = "total"
        
        correctDataFormatTwoSided(1);
        
        yT = d3.scale.ordinal()
            .domain(ageGroups)
            .rangeBands([50, heightT-200])

        xL = d3.scale.linear()
            .domain([0, totalMax])
            .range([0, width2]);

        xR = d3.scale.linear()
            .domain([0, totalMax])
            .range([0, width2]);
    }

    dataTwoSidedLeft = male
    dataTwoSidedRight = female

    // check if data is available
    if (male.length < 1) {
        
        // change the title
        svgChangeTwoSided.select(".graphTitle")
            .text("Data is not available for refugees from " + countryStarName + " in " + countryTwoSided);

        removeBars();

        removeAllText();
    }
    else {
        //changeTitles();

        removeBars();

        removeAllText();
        svgTwoSided.selectAll(".graphTitle").remove();
        
        addBars();

        addTitlesTwoSided();

        addPercentages();
    }
};

function addTitlesTwoSided() {

    // make title
    svgTwoSided.append("g")
        .attr("transform", "translate(0," + heightT + ")")
        .append("text")
            .attr("class", "graphTitle")
            .attr("x", marginT.left + widthT / 2)
            .attr("y", - heightT - marginT.top / 2)
            .style("text-anchor", "middle")
            //.text("Gender and age of refugees from " + countryStarName + " in " + countryTwoSided);

    if (countryStarName != countryTwoSided) {
        svgChangeTwoSided.select(".graphTitle")
            .text("Gender and age of refugees from " + countryStarName + " in " + countryTwoSided);
    }
    else if (countryStarName == countryTwoSided) {
        svgChangeTwoSided.select(".graphTitle")
            .text("Gender and age of refugees from " + countryStarName);
    }
    /*var svgChangeLegend = d3.select(".datamap").transition();

    if (absPerc == "absolute values") {
        // change the title
        svgChangeLegend.select("#legendTitle")
            .text("Amount of refugees (in millions)");

        // change axis
        xScale = d3.scale.linear()
            .range([0, legendWidth])
            .domain([minDataYear, maxDataYear/1000000]);
    }
    else if (absPerc == "percentage of inhabitants") {
        // change the title
        svgChangeLegend.select("#legendTitle")
            .text("Percentage refugees of inhabitants")*/

    // add titles
    svgTwoSided.append("g")
        .attr("transform", "translate(0," + heightT + ")")
        .append("text")
            .attr("class", "axisTitleMale")
            .attr("x", 0)
            .attr("y", - heightT + 25)
            .style("text-anchor", "middle")
            .text("Male (" + totalMale + "%)");

    svgTwoSided.append("g")
        .attr("transform", "translate(0," + heightT + ")")
        .append("text")
            .attr("class", "axisTitleFemale")
            .attr("x", marginT.left + widthT + marginT.right)
            .attr("y", - heightT + 25)
            .style("text-anchor", "middle")
            .text("Female  (" + totalFemale + "%)");

    svgTwoSided.append("g")
        .attr("transform", "translate(0," + heightT + ")")
        .append("text")
            .attr("class", "axisTitle")
            .attr("x", marginT.left + width2 + labelArea / 2)
            .attr("y", - heightT + 25)
            .style("text-anchor", "middle")
            .text("Age");

    svgTwoSided.selectAll("text.name")
        .data(ageGroups)
        .enter().append("text")
        .attr("x", marginT.left + width2 + labelArea / 2)
        .attr("y", function(d) { return yT(d) + yT.rangeBand()/2; })
        .attr("dy", ".20em")
        .attr("text-anchor", "middle")
        .attr("class", "ageGroups")
        .text(String);
};

/*function changeTitles() {
    // change the title
    svgChangeTwoSided.select(".graphTitle")
        .text("Gender and age of refugees from " + countryStarName + " in " + countryTwoSided);

    // change the axis titles
    svgChangeTwoSided.select(".axisTitleFemale")
        .text("Female  (" + totalFemale + "%)");

    svgChangeTwoSided.select(".axisTitleMale")
        .text("Male  (" + totalMale + "%)");
};*/

function removeBars() {
    svgChangeLeftTwoSided = svgTwoSided.selectAll("rect.left")
        .data(dataTwoSidedLeft)   

    // eventueel dingen aanpassen waar hij heengaat!!!
    svgChangeLeftTwoSided.exit()
        .transition()
            .duration(0)
        /*.attr("x", function(pos) { return width2 - labelArea})
        .attr("width", 10)
        .attr("y", 0)
        .attr("height", function(d) { return 0})*/
        .style('fill-opacity', 1e-6)
        .remove();

    svgChangeRightTwoSided = svgTwoSided.selectAll("rect.right")
        .data(dataTwoSidedRight)

    // eventueel dingen aanpassen waar hij heengaat!!!
    svgChangeRightTwoSided.exit()
        .transition().duration(0)
        .style('fill-opacity', 1e-6)
        .remove();
};

function addBars() {

    // eventueel waar de bars vandaan komen
    svgChangeLeftTwoSided.enter().append("rect")
        //.attr("class", "bar")
        /*.attr("x", function(pos) { return width2 - labelArea})
        .attr("width", 10)
        .attr("y", 0)
        .attr("height", function(d) { return 0})*/

    svgChangeLeftTwoSided.transition().duration(300)
        .attr("x", function(d) { return marginT.left + width2 - xL(d); })
        .attr("y", yPosByIndex)
        .attr("width", xL)
        .attr("height", yT.rangeBand())
        .attr("class", "left")
    
    d3.selectAll(".left")
        .on("mouseover", function(d) { 
            var abs = Math.round(d * amountOfRefugees / 100); 
            if (countryStarName == countryTwoSided) { 
                return tooltip.style("visibility", "visible").text("Absolute value: " + abs.toLocaleString())
            } 
            else { 
                newDataBarchart.forEach(function(e) {
                    if (e.country == countryTwoSided) {
                        var abs = Math.round(d * e.amount / 100); 
                        return tooltip.style("visibility", "visible").text("Absolute value: " + abs.toLocaleString())   
                    }
                });
            };
        })
        .on("mousemove", function() { return tooltip.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px");})
        .on("mouseout", function() { return tooltip.style("visibility", "hidden");})
        .on("click", function(d) { 
            if (youngTotal == "total") {
                changeTwoSided(0) 
            }
            else if (youngTotal == "young") {
                changeTwoSided(1)
            };
        });

    // eventueel waar de bars vandaan komen
    svgChangeRightTwoSided.enter().append("rect")

    svgChangeRightTwoSided.transition().duration(300)
        .attr("x", marginT.left + width2 + labelArea)
        .attr("y", yPosByIndex)
        .attr("width", xR)
        .attr("height", yT.rangeBand())
        .attr("class", "right")

    d3.selectAll(".right")
        .on("mouseover", function(d) { 
            var abs = Math.round(d * amountOfRefugees / 100); 
            if (countryStarName == countryTwoSided) { 
                return tooltip.style("visibility", "visible").text("Absolute value: " + abs.toLocaleString())
            } 
            else { 
                newDataBarchart.forEach(function(e) {
                    if (e.country == countryTwoSided) {
                        var abs = Math.round(d * e.amount / 100); 
                        return tooltip.style("visibility", "visible").text("Absolute value: " + abs.toLocaleString())   
                    }
                });
            };
        })
        .on("mousemove", function() { return tooltip.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px");})
        .on("mouseout", function() { return tooltip.style("visibility", "hidden");})
        .on("click", function(d) { 
            if (youngTotal == "total") {
                changeTwoSided(0) 
            }
            else if (youngTotal == "young") {
                changeTwoSided(1)
            };
        });

};

function addPercentages() {
    
    svgTwoSided.selectAll("text.leftscore")
        .data(dataTwoSidedLeft)
        .enter().append("text")
        //.attr("x", function(d) { return width2 - labelArea - xL(d); })
        .attr("x", 0)
        .attr("y", function(d, z) { return yD(z) + yD.rangeBand()/2; })
        .attr("dx", "0")
        .attr("dy", ".36em")
        .attr("text-anchor", "middle")
        .attr("class", "score")
        .text(String);

    svgTwoSided.selectAll("text.rightscore")
        .data(dataTwoSidedRight)
        .enter().append("text")
        //.attr("x", function(d) { return xR(d) + width2; })
        .attr("x", marginT.left + widthT + marginT.right)
        .attr("y", function(d, z) { return yD(z) + yD.rangeBand()/2; })
        .attr("dx", "0")
        .attr("dy", ".36em")
        .attr("text-anchor", "middle")
        .attr("class", "score")
        .text(String);
};

function removeAllText() {
    svgTwoSided.selectAll(".score").remove();
    svgTwoSided.selectAll(".ageGroups").remove();
    svgTwoSided.selectAll(".axisTitle").remove();
    svgTwoSided.selectAll(".axisTitleFemale").remove();
    svgTwoSided.selectAll(".axisTitleMale").remove();
};

function correctDataFormatTwoSided(origin) {
    
    female = []
    male = []
    j = 0

    femaleOld = []
    maleOld = []
    ageGroupsOld = []

    if (origin == 0) {
        ageGroups = ["0-4", "5-11", "12-17"]
        dataBarchart.forEach(function(d){
            if (d.origin == countryStarName && d.country == countryTwoSided) {
                for (var each in d.female) {
                    if (each == "0-4") {
                        female[0] = Math.round(d.female[each] * 10) / 10;
                        male[0] = Math.round(d.male[each] * 10) / 10;
                    }
                    else if (each == "5-11") {
                        female[1] = Math.round(d.female[each] * 10) / 10;
                        male[1] = Math.round(d.male[each] * 10) / 10;
                    }
                    else if (each == "12-17") {
                        female[2] = Math.round(d.female[each] * 10) / 10;
                        male[2] = Math.round(d.male[each] * 10) / 10;
                    }
                    else if (each == "0-17") {
                        totalFemale = Math.round(d.female[each] * 10) / 10;
                        totalMale = Math.round(d.male[each] * 10) / 10;
                    }
                }
            };
        });
    }
    else if (origin == 1) {
        ageGroups = ["0-17", "18-59", "60+"]
        dataBarchart.forEach(function(d){
            if (d.origin == countryStarName && d.country == countryTwoSided) {
                for (var each in d.female) {
                    if (each == "0-17") {
                        female[0] = Math.round(d.female[each] * 10) / 10;
                        male[0] = Math.round(d.male[each] * 10) / 10;
                    }
                    else if (each == "18-59") {
                        female[1] = Math.round(d.female[each] * 10) / 10;
                        male[1] = Math.round(d.male[each] * 10) / 10;
                    }
                    else if (each == "60+") {
                        female[2] = Math.round(d.female[each] * 10) / 10;
                        male[2] = Math.round(d.male[each] * 10) / 10;
                    }
                    else if (each == "total") {
                        totalFemale = Math.round(d.female[each] * 10) / 10;
                        totalMale = Math.round(d.male[each] * 10) / 10;
                    }
                }
            };
        })
    };
};

function makeTotalGraph() {
    dataOriginAsylum = dataOrigin

    svgTotal = d3.select("#container5").append("svg")
        .attr("width", widthG + marginG.left + marginG.right)
        .attr("height", heightG + marginG.top + marginG.bottom)
        .attr("id", "graph")
        .append("g")
            .attr("transform", "translate(" + marginG.left + "," + marginG.top + ")");

    // save data in correct format
    correctDataFormatTimelineTotal();

    dataTotal = dataTotalAbs;
    
    // set y-axis for default settings
    setYaxisTimelineTotal();

    // make title
    svgTotal.append("g")
        .attr("transform", "translate(0," + heightG + ")")
        .append("text")
            .attr("class", "graphTitle")
            .attr("x", widthG / 2)
            .attr("y", - heightG - marginG.top / 2)
            .style("text-anchor", "middle")
            .text("Amount of refugees in the world over time in " + absPercTotal);

    // make x axis
    svgTotal.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + heightG + ")")
        .call(xAxisG)
        .append("text")
            .attr("class", "axisTitle")
            .attr("x", widthG)
            .attr("y", 50)
            .style("text-anchor", "end")
            .text("Time");

    // make y axis
    svgTotal.append("g")
        .attr("class", "y axis")
        .call(yAxisG)
        .append("text")
            .attr("class", "axisTitle")
            .attr("id", "axisTitleYTotal")
            .attr("transform", "rotate(-90)")
            .attr("y", - 90)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Amount of refugees");

    // add line
    svgTotal.append("path")
        .attr("class", "lineTotal")
        .datum(dataTotal)
        .attr("fill", "none")
        .attr("stroke", colorRight)
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", 1.5)
        .attr("d", lineCountry);
};

// save data in correct format for timeline
function correctDataFormatTimelineTotal() {

    dataOriginAsylum.forEach(function(d) {
        for (i = 0; i < 26; i++) {
            if (!dataTotalAbs[i]) {
                dataTotalAbs[i] = {amount: 0, year: yearsTime[i], yearx: yearsString[i]}
            }
            if (!isNaN(d[yearsString[i]])) {
                dataTotalAbs[i].amount += +d[yearsString[i]]  
            }
        }
    });

    dataPopulation.forEach(function(d) {
        for (i = 0; i < 26; i++) {
            if (!dataTotalPop[i]) {
                dataTotalPop[i] = {amount: 0.0, year: yearsTime[i], yearx: yearsString[i]}
            }
            if (!isNaN(d[yearsString[i]])) {
                dataTotalPop[i].amount += +d[yearsString[i]]
            }
        }
    });

    for (i = 0; i < 26; i++) {
        perc = dataTotalAbs[i].amount / dataTotalPop[i].amount * 100
        dataTotalPerc[i] = {amount: perc, year: yearsTime[i], yearx: yearsString[i]}
    }
};

// set y-axis of timeline
function setYaxisTimelineTotal() {
    
    // define min and max for y-axis
    dataTotalAmount = dataTotal.map(function(obj){ return obj.amount; });
    maxDataTotalAmount = Math.max.apply(null, dataTotalAmount);
    minDataTotalAmount = Math.min.apply(null, dataTotalAmount);
    minY = Math.floor(minDataTotalAmount / 10) * 10;
    maxY = Math.ceil(maxDataTotalAmount / 10) * 10;

    // set domain for timeline
    //xG.domain(d3.extent(yearsTime));
    yG.domain([0, maxDataTotalAmount]); 
};

function updateGraphTotal(value) {
    
    // select the section for applying changes
    svgChangeTimelineTotal = d3.select("#container5").transition();
    
    if (value == 0) {
        absPercTotal = "absolute values";
        dataTotal = dataTotalAbs;

        svgChangeTimelineTotal.select("#axisTitleYTotal")
            .text("Amount of refugees")
    }
    else if (value == 1) {
        absPercTotal = "percentage of population";
        dataTotal = dataTotalPerc;

        svgChangeTimelineTotal.select("#axisTitleYTotal")
            .text("Percentage of population")
    }

    // change the title
    svgChangeTimelineTotal.select(".graphTitle")
        .text("Amount of refugees in the world over time in " + absPercTotal)

    // change y axis
    setYaxisTimelineTotal();

    svgChangeTimelineTotal.select(".y.axis")
        .duration(750)
        .call(yAxisG)

    // change the line
    svgChangeTimelineTotal.select(".lineTotal")
        .duration(750)
        .attr("d", lineCountry(dataTotal));
};