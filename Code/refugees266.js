/*Naam: Sanne Berendschot
Studentnummer: 10269290
Minor Programmeren, Programmeerproject*/

// make global variables

// initialize variables for datasets for total graph
var dataTotal = [];
var dataTotalAbs = [];
var dataTotalPop = [];
var dataTotalPerc = [];

// intialize variables for saving data
var dataOriginAsylum;
var dataOrigin;
var dataAsylum;
var dataBarchart;
var dataPopulation

// initialize variables for min and max of all data sets
var maxLinAbs = 0;
var minLinAbs = 0;
var maxLinPerc = 0;
var minLinPerc = 0;
var minLogAbs = 0;
var maxLogAbs = 0;
var minLogPerc = 0;
var maxLogPerc = 0;

// initialize variables for functions to scale value to color
var colorLinAbs;
var colorLinPerc;
var colorLogAbs;
var colorLogPerc;

// initialize all colors
var colorLeft = "#FFF6EC";
var colorRight = "#660000";
var colorBorder = "black";
var colorDefault = "#F5F5F5";

// initialize dataset
var dataset;

// initialize variables for datasets for colorcodes for map
var dataColorsOriginLinAbs  = {};
var dataColorsAsylumLinAbs = {};
var dataColorsOriginLinPerc = {};
var dataColorsAsylumLinPerc = {};
var dataColorsOriginLogAbs = {};
var dataColorsAsylumLogAbs = {};
var dataColorsOriginLogPerc = {};
var dataColorsAsylumLogPerc = {};

// set default settings
var toFrom = "from";
var linLog = "lin";
var absPerc = "absolute values";
var youngTotal = "total";
var currentYear = 2015;

// array with conflict countries
var conflictCountries = ["COD", "CAF", "SOM", "SSD", "SYR"]

// initialize variables for map
var map;

// initialize variables for legend
var xScale;
var xAxisLegend;
var svgChangeLegend;

// initialize variables for graph country
var svgGraphCountry;
var svgTooltipTimelineCountry;
var xG;
var yG;
var xAxisG;
var yAxisG;
var lineCountry;
var bisectDate;

// set outlines for graph country & total
var marginG = {top: 150, right: 40, bottom: 120, left: 150},
    widthG = 800 - marginG.left - marginG.right,
    heightG = 600 - marginG.top - marginG.bottom;

// initialize variable for dataset graph country
var dataGraphCountry = [];
var maxDataGraphCountryAmount;
var parseTime;
var yearsTime = [];
var yearsString = [];
var amountOfYears;

// set x and y for tooltip timelines
var xTooltipTimeline = 0
var yTooltipTimeline = - 35


////////



///

var svgTotal;

var svgTooltipTimelineTotal;
var absPercTotal = "absolute values"

var dataTotalAmount;
var maxDataTotalAmount;
var minDataTotalAmount;

var newCountry = "SYR";
var nameCountry = "Syria";



var svgChangeTimeline;
var countryStar = "SYR";
var countryStarName = "Syria";


var newDataBarchart;
var dataBarchartTotal;
var chart;
var svgChangeChart;
var amountOfRefugees;
var tooltip;

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

var marginT;
var widthT;
var heightT;

var labelArea;
var width2;
var widthT2;

// set outlines for graphs
var margin = {top: 100, right: 40, bottom: 120, left: 150},
    width = 800 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;


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
    .defer(d3.tsv, "Dataset Origin goed 23 juni.tsv")   
    .defer(d3.tsv, "Dataset Asylum goed 23 juni.tsv")
    .defer(d3.tsv, "Data Population Worldbank.tsv")    
    .defer(d3.json, "dataBarchart.json")    
    .await(makeVisualisations)

// make all data visualisations
function makeVisualisations(error, datasetOrigin, datasetAsylum, datasetPopulation, datasetBarchart) {

    // check for error
    if (error) throw error;

    // save the data
    dataOrigin = datasetOrigin;
    dataAsylum = datasetAsylum;
    dataPopulation = datasetPopulation;
    dataBarchart = datasetBarchart;

    // set default dataset
    dataOriginAsylum = dataOrigin

    // make world map
    makeAllOfMap();

    // make graph for refugees over time
    makeGraphCountry();

    // make barchart
    makeBarchart();

    /////

    // make two-sided barchart
    makeTwoSidedBarchart();

    // make total graph
    makeTotalGraph();

    // add tooltip
    addTooltipTimelineTotal();
};

// make everything for the map
function makeAllOfMap() {
    
    // find min and max for every dataset
    findMinMaxOfDatasets();

    // make function to scale values to a color for map
    makeFunctionsValueToColor();

    // set correct dataset and format for map DEZE MOET NOG!!
    correctDataFormatMap();

    // make the map
    makeMap();

    // make slider
    makeSlider();

    // make legend for world map
    makeLegendMap();
};

// find min and max of datasets absolute/percentage and linear/logarithm
function findMinMaxOfDatasets() {

    // find min and max absolute in data of origin
    findMinMaxAbsolute(dataOrigin);

    // find min and max absolute in data of asylum
    findMinMaxAbsolute(dataAsylum);

    // find min and max percentage in data of origin
    findMinMaxPercentage(dataOrigin);

    // find min and max percentage in data of origin
    findMinMaxPercentage(dataAsylum);

};

// find min and max in datasets with absolute values
function findMinMaxAbsolute(data) {

    // check every data point
    data.forEach(function(d) {
        for (each in d) {
            // check if data point is a number
            if (!isNaN(d[each])) {
                // save data point as new min and max if it is smaller/bigger than current
                if (+d[each] < minLinAbs) {
                    minLinAbs = +d[each];
                }
                if (+d[each] > maxLinAbs) {
                    maxLinAbs = +d[each];
                }
                // check if data point is not 0, for min of log
                if (d[each] != 0) {
                    // save data point as new min and max if it is smaller/bigger than current
                    if (Math.log(d[each]) < minLogAbs) {
                        minLogAbs = Math.log(d[each]);
                    }
                    if (Math.log(d[each]) > maxLogAbs) {
                        maxLogAbs = Math.log(d[each]);
                    }
                }
            }
        }
    })
};

// find min and max in datasets with percentages
function findMinMaxPercentage(data) {
    
    // check every data point
    data.forEach(function(d) {
        dataPopulation.forEach(function(e) {
            // check if country in both datasets matches
            if (d.Country == e.countrycode) {
                // for every year
                for (i = 0; i < amountOfYears; i++) {
                    // calculate percentage
                    var perc = d[yearsString[i]] / e[yearsString[i]] * 100
                    // check if data point is a number
                    if (!isNaN(perc)) {
                        // save data point as new min and max if it is smaller/bigger than current
                        if (perc < minLinPerc) {
                            minLinPerc = perc; 
                        }
                        if (perc > maxLinPerc) {
                            maxLinPerc = perc;
                        }
                        // check if data point is not 0, for min of log
                        if (perc != 0) {
                            // save data point as new min and max if it is smaller/bigger than current
                            if (Math.log(perc) < minLogPerc) {
                                minLogPerc = Math.log(perc);
                            }
                            if (Math.log(perc) > maxLogPerc) {
                                maxLogPerc = Math.log(perc);
                            }
                        }
                     }
                }
            }
        })
    })
};

// make functions to change value to color
function makeFunctionsValueToColor() {
    
    // make function for changing linear/absolute value to color
    colorLinAbs = color(minLinAbs, maxLinAbs)

    // make function for changing linear/percentage value to color
    colorLinPerc = color(minLinPerc, maxLinPerc);

    // make function for changing logarithm/absolute value to color
    colorLogAbs = color(minLogAbs, maxLogAbs);

    // make function for changing logarithm/percentage value to color
    colorLogPerc = color(minLogPerc, maxLogPerc);
};

// function to change value to color
function color(min, max) {
    
    colorFunction = d3.scale.linear()
        .domain([min, max])
        .range([colorLeft,colorRight]);

    return colorFunction;
};

// calculate and select the correct dataset for the map
function correctDataFormatMap() {
    
    // empty all arrays for data
    dataColorsOriginLinAbs = {};
    dataColorsAsylumLinAbs = {};
    dataColorsOriginLinPerc = {};
    dataColorsAsylumLinPerc = {};
    dataColorsOriginLogAbs = {};
    dataColorsAsylumLogAbs = {};
    dataColorsOriginLogPerc = {};
    dataColorsAsylumLogPerc = {};

    // 
    dataOriginAsylum.forEach(function(d){
        var country = d.Country,
            refugees = +d[currentYear],
            refugeesLog = Math.log(refugees);

        if (toFrom == "from" && absPerc == "absolute values") {
            if (linLog == "lin") {
                if (!isNaN(refugees)) {
                    dataColorsOriginLinAbs[country] = { amount: refugees, fillColor: colorLinAbs(refugees), country: country };
                }
                else {
                    dataColorsOriginLinAbs[country] = { amount: "not available", fillColor: colorDefault, country: country };    
                }
                dataset = dataColorsOriginLinAbs;
            }
            else if (linLog == "log") {
                if (!isNaN(refugees)) {
                    if (refugees != 0) {
                        dataColorsOriginLogAbs[country] = { amount: refugeesLog, fillColor: colorLogAbs(refugeesLog), country: country };
                    }
                    else {
                        dataColorsOriginLogAbs[country] = { amount: refugeesLog, fillColor: colorLeft, country: country };   
                    }
                }
                else {
                    dataColorsOriginLogAbs[country] = { amount: "not available", fillColor: colorDefault, country: country };   
                }
                dataset = dataColorsOriginLogAbs;    
            }
        } else if (toFrom == "to" && absPerc == "absolute values") {
            if (linLog == "lin") {
                if (!isNaN(refugees)) {
                    dataColorsAsylumLinAbs[country] = { amount: refugees, fillColor: colorLinAbs(refugees), country: country };
                }
                else {
                    dataColorsAsylumLinAbs[country] = { amount: "not available", fillColor: colorDefault, country: country };    
                }
                dataset = dataColorsAsylumLinAbs;
            }
            else if (linLog == "log"){
                if (!isNaN(refugees)) {
                    if (refugees != 0) {
                        dataColorsAsylumLogAbs[country] = { amount: refugeesLog, fillColor: colorLogAbs(refugeesLog), country: country };
                    }
                    else {
                        dataColorsAsylumLogAbs[country] = { amount: refugeesLog, fillColor: colorLeft, country: country };   
                    }
                }
                else {
                    dataColorsAsylumLogAbs[country] = { amount: "not available", fillColor: colorDefault, country: country };    
                }
                dataset = dataColorsAsylumLogAbs;   
            }
        } else if (toFrom == "from" && absPerc == "percentage of inhabitants") {
            dataPopulation.forEach(function(e) {
                if (d.Country == e.countrycode) {
                    population = +e[currentYear];
                    if (linLog == "lin") {
                        value = refugees/population*100;
                        if (!isNaN(value)) {
                            dataColorsOriginLinPerc[country] = { amount: value, fillColor: colorLinPerc(value), country: country };
                        }
                        else {
                            dataColorsOriginLinPerc[country] = { amount: "not available", fillColor: colorDefault, country: country };   
                        }
                        dataset = dataColorsOriginLinPerc;
                    }
                    else if (linLog == "log") {
                        value = Math.log(refugees/population*100);
                        if (!isNaN(value)) {
                            if (value != 0) {
                                dataColorsOriginLogPerc[country] = { amount: value, fillColor: colorLogPerc(value), country: country };
                            }
                            else {
                                dataColorsOriginLogPerc[country] = { amount: value, fillColor: colorLeft, country: country };   
                            }
                        }
                        else {
                            dataColorsOriginLogPerc[country] = { amount: "not available", fillColor: colorDefault, country: country };   
                        }
                        dataset = dataColorsOriginLogPerc;    
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
                            dataColorsAsylumLinPerc[country] = { amount: value, fillColor: colorLinPerc(value), country: country };
                        }
                        else {
                            dataColorsAsylumLinPerc[country] = { amount: "not available", fillColor: colorDefault, country: country };   
                        }
                        dataset = dataColorsAsylumLinPerc;
                    }
                    else if (linLog == "log") {
                        value = Math.log(refugees/population*100);
                        if (!isNaN(value)) {
                            if (value != 0) {
                                dataColorsAsylumLogPerc[country] = { amount: value, fillColor: colorLogPerc(value), country: country };
                            }
                            else {
                                dataColorsAsylumLogPerc[country] = { amount: value, fillColor: colorLeft, country: country };   
                            }
                        }
                        else {
                            dataColorsAsylumLogPerc[country] = { amount: "not available", fillColor: colorDefault, country: country };   
                        }
                        dataset = dataColorsAsylumLogPerc;
                    }
                }
            })
        } else {
            console.log('No To or From was given')
        }
    });
};

// make the map
function makeMap() {
    map = new Datamap({
        // select correct container
        element: document.getElementById("container1"),

        // set default settings
        fills: { defaultFill: colorDefault },
        data: dataset,    
        geographyConfig: {
            // set border colors
            borderColor: function(d) {
                // check if country is a conflict country
                if (!conflictCountries.includes(d.id)) {
                    return colorBorder;    
                }
                else {
                    return "gold";
                }
            },

            // set border width
            borderWidth: function(d) {
                // check if country is a conflict country
                if (!conflictCountries.includes(d.id)) {
                    return 1;    
                }
                else {
                    return 3;
                }
            },

            // set border color for mouse over
            highlightBorderColor: function(d) {
                // check if country is a conflict country
                if (!conflictCountries.includes(d.country)) {
                    return colorBorder;    
                }
                else {
                    return "gold";
                }
            },
            
            // set border width for mouse over
            highlightBorderWidth: function(d) {
                // check if country is a conflict country
                if (!conflictCountries.includes(d.country)) {
                    return 2;    
                }
                else {
                    return 4;
                }
            },

            // set fill color for mouse over
            highlightFillColor: function(geo) {
                return geo["fillColor"] || colorDefault;

            },
            
            // make tooltip
            popupTemplate: function(geo, data) {
            
                // when data is not available, say so
                if (!data || isNaN(data.amount)) { 
                    return ["<div class=hoverinfo>",
                        "<strong>", geo.properties.name, "</strong>",
                        "<br>Data is not available","</div>"].join(''); 
                };
                
                // show correct information in tooltip
                if (absPerc == "absolute values" && linLog == "lin") { 
                    var amount = Math.round(data.amount * 10) / 10;
                    return ["<div class=hoverinfo>",
                        "<strong>", geo.properties.name, "</strong>",
                        "<br>Amount of refugees: <strong>", amount.toLocaleString(), "</strong>",
                        "</div>"].join('');
                } 
                else if (absPerc == "percentage of inhabitants" || (absPerc == "absolute values" && linLog == "log")) {
                    return tooltipMapText(geo, data);
                }
            }
        },

        // when country clicked, graph changes
        done: function(datamap) {
            datamap.svg.selectAll(".datamaps-subunit").on("click", function(geo) {
                newCountryClicked(geo);
            });
        }
    });
};

// text to show in tooltip of map
function tooltipMapText(geo, data) {
    return ["<div class=hoverinfo>",
        "<strong>", geo.properties.name, "</strong>",
        "<br>Percentage of inhabitants: <strong>", Math.round(data.amount * 1000) / 1000, "</strong>",
        "</div>"].join('');
};

// make slider for world map
function makeSlider() {

    // update map and variable when slider is used
    d3.select("#YearSlider").on("input", function() {
        currentYear = +this.value
        update(currentYear);
    });

    // initialize with current year
    update(currentYear);

    // update when slider is used
    function update() {

        // select correct dataset for selected year
        correctDataFormatMap();

        // update colors of world map
        map.updateChoropleth(dataset)
        
        // adjust the text on the range slider
        d3.select("#YearSlider-value").text(currentYear);
        d3.select("#YearSlider").property("value", currentYear);
    };
};

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
    var xLegend = 20
    var yLegend = 460

    // append title
    svgMap.append("text")
        .attr("id", "legendTitle")
        .attr("x", xLegend)
        .attr("y", yLegend - 10)
        .text("Amount of refugees (in millions)");

    // draw the rectangle and fill with gradient
    svgMap.append("rect")
        .attr("width", legendWidth)
        .attr("height", legendHeight)
        .style("fill", "url(#linear-gradient)")
        .style("x", xLegend)
        .style("y", yLegend);
    
    // set scale for x axis, in millions
    setScaleLegend(minLinAbs / 1000000, maxLinAbs / 1000000);

    // define x axis
    defineXAxisLegend();

    // place x axis
    svgMap.append("g")
        .attr("transform", "translate(" + xLegend + "," + (yLegend + legendHeight) + ")")
        .attr("id", "legendX")
        .call(xAxisLegend)
        .selectAll("text")
                .style("text-anchor", "end")
                .attr("dx", "-.8em")
                .attr("dy", ".15em")
                .attr("transform", "rotate(-90)");
};

// set scale for x axis legend
function setScaleLegend(min, max) {
    xScale = d3.scale.linear()
        .range([0, legendWidth])
        .domain([min, max]);
}

// define x axis of the legend
function defineXAxisLegend() {
    xAxisLegend = d3.svg.axis()
        .orient("bottom")
        .ticks(10)
        .scale(xScale);
};

// change the legend of the map
function changeLegendMap() {

    // select the section for applying changes
    svgChangeLegend = d3.select(".datamap").transition();

    // check which legend and change title and scale legend
    if (absPerc == "absolute values") {
        if (linLog == "lin") {
            
            // change title and axis
            changeTitleAndAxisLegend("Amount of refugees (in millions)", minLinAbs / 1000000, maxLinAbs / 1000000);
        }
        else if (linLog == "log") {

            // change title and axis
            changeTitleAndAxisLegend("Amount of refugees (in logarithm)", minLogAbs, maxLogAbs);
        }
    }
    else if (absPerc == "percentage of inhabitants") {
        if (linLog == "lin") {
            
            // change title and axis
            changeTitleAndAxisLegend("Percentage refugees of inhabitants", minLinPerc, maxLinPerc);
        }
        else if (linLog == "log") {
            
            // change title and axis
            changeTitleAndAxisLegend("Percentage refugees of inhabitants (in logarithm)", minLogPerc, maxLogPerc);
        }
    };

    // define new x axis legend
    defineXAxisLegend();

    // change x axis legend
    svgChangeLegend.select("#legendX")
        //.duration(750)
        .call(xAxisLegend)
        .selectAll("text")
                .style("text-anchor", "end")
                .attr("dx", "-.8em")
                .attr("dy", ".15em")
                .attr("transform", "rotate(-90)");
};

// change title and scale of axis of legend
function changeTitleAndAxisLegend(title, min, max) {
    svgChangeLegend.select("#legendTitle")
        .text(title);

    setScaleLegend(min, max)
};

// make everything for the graph with refugees over time per country
function makeGraphCountry() {
    
    // initialize svg
    svgGraphCountry = d3.select("#container2").append("svg")
        .attr("width", widthG + marginG.left + marginG.right)
        .attr("height", heightG + marginG.top + marginG.bottom)
        .attr("id", "graph")
        .append("g")
            .attr("transform", "translate(" + marginG.left + "," + marginG.top + ")");

    // make arrays for years
    makeArraysYears();
    
    // save data in correct format
    correctDataFormatTimeline();

    // initialize variables for axis
    initializeAxisAndLineTimeline();

    // set y axis for default settings
    setYAxisTimeline();
    
    // make both axis
    makeAxisTimeline();

    // make title
    svgGraphCountry.append("g")
        .attr("transform", "translate(0," + heightG + ")")
        .append("text")
            .attr("class", "graphTitle")
            .attr("x", widthG / 2)
            .attr("y", - heightG - marginG.top / 2)
            .style("text-anchor", "middle")
            .text("Amount of refugees " + toFrom + " " + nameCountry + " per year in " + absPerc);

    // add line
    svgGraphCountry.append("path")
        .attr("class", "line")
        .datum(dataGraphCountry)
        .attr("fill", "none")
        .attr("stroke", colorRight)
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", 1.5)
        .attr("d", lineCountry);

    // add tooltip
    addTooltipTimelineCountry();
};

// make arrays for the years as a string and in time, and note amount of years
function makeArraysYears() {
    
    // make functions to parse date (also for tooltip)
    parseTime = d3.time.format("%Y").parse;
    bisectDate = d3.bisector(function(d) { return d.year; }).left;

    // set counter
    j = 0;

    // for every year
    for (year = 1990; year < 2016; year++) {
        
        // update array
        yearsTime[j] = parseTime(year.toString());
        yearsString[j] = year.toString();
        
        // update counter
        j++;
    };

    // note amount of years
    amountOfYears = yearsString.length;
};

// save data in correct format for timeline
function correctDataFormatTimeline() {
    
    // start with empty array
    dataGraphCountry = []
    
    // make counter for place in array
    j = 0

    // search for correct country and check for absolute or percentage
    dataOriginAsylum.forEach(function(d) {
        if (absPerc == "absolute values" && d.Country == newCountry) {
            // fill data array with correct data
            fillDataArrayTimeline(d, 0, j);
        }
        else if (absPerc == "percentage of inhabitants" && d.Country == newCountry) {
            dataPopulation.forEach(function(e) {
                if (e.countrycode == newCountry) {
                    // fill data array with correct data
                    fillDataArrayTimeline(d, e, j);    
                }
            })
        }
    });
};

// fills data array for timeline
function fillDataArrayTimeline(d, e, j) {
    
    // for every year 
    for (i = 0; i < amountOfYears; i++) {
        
        // select correct value
        if (absPerc == "absolute values") {
            var value = d[yearsString[i]];
        }
        else if (absPerc == "percentage of inhabitants") {
            var value = d[yearsString[i]] / e[yearsString[i]] * 100;
        }
        
        // check if value is a number 
        if (!isNaN(value)) {
            
            // fill data array
            dataGraphCountry[j] = {amount : value, year: yearsTime[i], yearx: yearsString[i]};
            
            // update counter
            j++;
        }
    }
};

function initializeAxisAndLineTimeline() {
    
    // set the ranges for graph
    xG = d3.time.scale()
        .rangeRound([0, widthG]);
    yG = d3.scale.linear()
        .rangeRound([heightG, 0]);

    // initialize x axis for graph
    xAxisG = d3.svg.axis()
        .scale(xG)
        .orient("bottom");

    // initialize y axis for graph
    yAxisG = d3.svg.axis()
        .scale(yG)
        .orient("left");

    // make function to draw the line for graph
    lineCountry = d3.svg.line()
        .x(function(d) { return xG(d.year); })
        .y(function(d) { return yG(d.amount); });
};

// set y axis of timeline
function setYAxisTimeline() {
    
    // define max for y axis
    var dataGraphCountryAmount = dataGraphCountry.map(function(d){ return d.amount; });
    maxDataGraphCountryAmount = Math.max.apply(null, dataGraphCountryAmount);
    
    // set domain for timeline
    xG.domain(d3.extent(yearsTime));
    yG.domain([0, maxDataGraphCountryAmount]); 
};

// make the axis for the timeline
function makeAxisTimeline() {

    // make x axis
    svgGraphCountry.append("g")
        .attr("class", "x axis")
        .attr("id", "axisXTimeline")
        .attr("transform", "translate(0," + heightG + ")")
        .call(xAxisG)
        .append("text")
            .attr("class", "axisTitle")
            .attr("x", widthG)
            .attr("y", 50)
            .style("text-anchor", "end")
            .text("Time");

    // make y axis
    svgGraphCountry.append("g")
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
        setTitleYAxisTimeline("Percentage of inhabitants");
    } 
    else if (absPerc == "absolute values") {
        setTitleYAxisTimeline("Amount of refugees");
    };
};

// set title y axis of timeline
function setTitleYAxisTimeline(title) {
    svgGraphCountry.select("#axisTitleY")
        .text(title); 
};

// add the tooltip for the timeline for countries
function addTooltipTimelineCountry() {

    // make svg for tooltip
    svgTooltipTimelineCountry = svgGraphCountry.append("g")
        .style("display", "none");

    // append vertical line
    svgTooltipTimelineCountry.append("line")
        .attr("class", "xTooltip")
        .style("stroke", "black")
        .style("stroke-dasharray", "3,3")
        .style("opacity", 0.5)
        .attr("y1", 0)
        .attr("y2", heightG);

    // append horizontal line
    svgTooltipTimelineCountry.append("line")
        .attr("class", "yTooltip")
        .style("stroke", "black")
        .style("stroke-dasharray", "3,3")
        .style("opacity", 0.5)
        .attr("x1", widthG)
        .attr("x2", widthG);

    // append circle
    svgTooltipTimelineCountry.append("circle")
        .attr("class", "yTooltip")
        .style("fill", "none")
        .style("stroke", "black")
        .attr("r", 4);

    // add text for year
    svgTooltipTimelineCountry.append("text")
        .attr("class", "textYear")
        .attr("dx", 8)
        .attr("dy", "1em");

    // add text for amount of refugees
    svgTooltipTimelineCountry.append("text")
        .attr("class", "textAmount")
        .attr("dx", 8)
        .attr("dy", "-.3em");

    // append the tooltip to graph
    svgGraphCountry.append("rect")
        .attr("id", "tooltipTimeline")
        .attr("width", widthG)
        .attr("height", heightG)
        .style("fill", "none")
        .style("pointer-events", "all")
        .on("mouseover", function() { svgTooltipTimelineCountry.style("display", null); })
        .on("mousemove", mousemoveCountry)
        .on("mouseout", function() { svgTooltipTimelineCountry.style("display", "none"); });
};

// change tooltip when mouse is moved
function mousemoveCountry() {

    // select correct year and data
    var timeMouse = xG.invert(d3.mouse(this)[0]),
        i = bisectDate(dataGraphCountry, timeMouse, 1),
        dataLeft = dataGraphCountry[i - 1],
        dataRight = dataGraphCountry[i],
        d = timeMouse - dataLeft.year > dataRight.year - timeMouse ? dataRight : dataLeft;

    // set amount of refugees
    var amount = +d.amount

    // place circle on correct place
    svgTooltipTimelineCountry.select("circle.yTooltip")
        .attr("transform", "translate(" + xG(d.year) + "," + yG(d.amount) + ")");

    // place correct text in tooltip
    if (absPerc == "absolute values") {
        setTextTooltipTimeline("Amount of refugees: ", amount);
    } 
    else if (absPerc == "percentage of inhabitants") {
        setTextTooltipTimeline("Percentage of inhabitants: ", amount);
    }

    // place correct year in tooltip
    svgTooltipTimelineCountry.select("text.textYear")
        .attr("transform", "translate(" + xTooltipTimeline + "," + yTooltipTimeline + ")")
        .text("Year: " + d.yearx);

    // place vertical line on correct place 
    svgTooltipTimelineCountry.select(".xTooltip")
        .attr("transform", "translate(" + xG(d.year) + "," + yG(d.amount) + ")")
        .attr("y2", heightG - yG(d.amount));

    // place horizontal line on correct place
    svgTooltipTimelineCountry.select(".yTooltip")
        .attr("transform", "translate(" + widthG * -1 + "," + yG(d.amount) + ")")
        .attr("x2", widthG + widthG);
};

// set text of percentage or absolute amount of refugees in tooltip
function setTextTooltipTimeline(title, amount) {
    svgTooltipTimelineCountry.select("text.textAmount")
        .attr("transform", "translate(" + xTooltipTimeline + "," + yTooltipTimeline + ")")
        .text(title + amount.toLocaleString());
};


///// 


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
        .attr("class", "textAmount")
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
        .attr("class", "textYear")
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

        svgTooltipTimelineTotal.select("text.textAmount")
            .attr("transform", "translate(" + xTooltipTimeline + "," + yTooltipTimeline + ")")
            .text("Amount of refugees: " + amount.toLocaleString());

        svgTooltipTimelineTotal.select("text.y3")
            .attr("transform", "translate(" + xTooltipTimeline + "," + yTooltipTimeline + ")")
            .text("Year: " + d.yearx);

        svgTooltipTimelineTotal.select("text.textYear")
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

function removeGraph() {
    svgGraphCountry.selectAll("#axisYTimeline").remove();
    svgGraphCountry.selectAll("#axisXTimeline").remove();
    svgGraphCountry.selectAll("#comment1").remove();
}

// change the graph of the timeline
function changeGraphTimeline() {

    // select the section for applying changes
    svgChangeTimeline = d3.select("#container2").transition();
    
    if (dataGraphCountry.length == 0) {
        // change the title
        svgChangeTimeline.select(".graphTitle")
            .text("Data is not available for refugees " + toFrom + " " + nameCountry + " per year in " + absPerc);

        // remove graph
        removeGraph();

        // disable tooltip
        svgGraphCountry.select("#tooltipTimeline")
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
        svgGraphCountry.select("#tooltipTimeline")
            .on("mouseover", function() { svgTooltipTimelineCountry.style("display", null); })
            .on("mousemove", mousemoveCountry)
    }

    // change the line
    svgChangeTimeline.select(".line")
        .duration(750)
        .attr("d", lineCountry(dataGraphCountry));    
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

    correctDataFormatMap();
    
    // update colors in map
    map.updateChoropleth(dataset)

    // update legend
    changeLegendMap();

    // save new data
    correctDataFormatTimeline();

    // set y-axis again
    setYAxisTimeline();

    // change the graph of the timeline
    changeGraphTimeline();
};

function newCountryClicked(geo) {

    // save the selected country
    newCountry = geo.id;
    nameCountry = geo.properties.name

    // define new dataset for new country
    correctDataFormatTimeline();

    // set y-axis again
    setYAxisTimeline();

    // change the graph of the timeline
    changeGraphTimeline();

    // change barchart if one of 5 countries is clicked
    if (conflictCountries.includes(newCountry)) {
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

    marginT = {top: 50, right: 40, bottom: 120, left: 40},
    widthT = 900 - marginT.left - marginT.right,
    heightT = 500 - marginT.top - marginT.bottom;

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
            .domain([minLinAbs, maxLinAbs/1000000]);
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