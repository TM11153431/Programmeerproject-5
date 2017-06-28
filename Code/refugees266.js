/*Naam: Sanne Berendschot
Studentnummer: 10269290
Minor Programmeren, Programmeerproject*/

// make global variables

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
var colorBarchartLeft = "#F2D286";
var colorBarchartRight = "#A15852"; 

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
var absPercTotal = "absolute values"
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
    widthG = 700 - marginG.left - marginG.right,
    heightG = 600 - marginG.top - marginG.bottom;

// initialize variable for dataset graph country
var dataGraphCountry = [];
var maxDataGraphCountryAmount;
var parseTime;
var yearsTime = [];
var yearsString = [];
var amountOfYears;
var xB;
var yB;
var xAxisB;
var yAxisB;

// set x and y for tooltip timelines
var xTooltipTimeline = 0;
var yTooltipTimeline = - 35;

// set variables when changing timeline
var svgChangeTimeline;
var currentCountry = "SYR";
var currentCountryName = "Syria";

// set variables for barchart
var svgBarchart;
var dataBarchartCountry;
var currentConflictCountry = "SYR";
var currentConflictCountryName = "Syria";
var amountOfRefugees;
var tooltipBarchart;

// set outlines for barchart
var marginB = {top: 100, right: 40, bottom: 120, left: 150},
    widthB = 800 - marginB.left - marginB.right,
    heightB = 600 - marginB.top - marginB.bottom;

// set variables for two-sided barchart
var svgTwoSided;
var svgChangeTwoSided;
var dataFemale;
var dataMale;
var totalFemale;
var totalMale;
var ageGroups;
var youngTotal;
var countryTwoSided = "Syria";
var maxTotal = 0;
var maxYoung = 0;
var xT;
var yT;
var yD;
var yPosition;

// set outlines for two-sided barchart
var marginT = {top: 50, right: 40, bottom: 120, left: 40},
    widthT = 900 - marginT.left - marginT.right,
    heightT = 500 - marginT.top - marginT.bottom;
var labelArea = 100;
var widthTside = (widthT - labelArea) / 2;

// initialize variables for datasets for total graph
var dataTotal = [];
var dataTotalAbs = [];
var dataTotalPop = [];
var dataTotalPerc = [];

// set variables for total graph
var svgGraphTotal;
var svgTooltipTimelineTotal;
var maxDataGraphTotalAmount;

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

    // make arrays for years
    makeArraysYears();

    // make world map
    makeAllOfMap();

    // make graph for refugees over time
    makeGraphCountry();

    // make barchart
    makeBarchart();

    // make two-sided barchart
    makeTwoSidedBarchart();

    // make total graph
    makeGraphTotal();
};

// make arrays for the years as a string and in time, and note amount of years
function makeArraysYears() {
    
    // make functions to parse date (also for tooltip)
    parseTime = d3.time.format("%Y").parse;
    bisectDate = d3.bisector(function(d) { return d.year; }).left;

    // set counter
    var j = 0;

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

// check if value is bigger or smaller, then save it
function checkMinMaxSave(value, minLin, maxLin, minLog, maxLog) {
    
    // check if data point is a number
    if (!isNaN(value)) {
        // save data point as new min and max if it is smaller/bigger than current
        if (value < minLin) {
            minLin = value;
        }
        if (value > maxLin) {
            maxLin = value;
        }
        // check if data point is not 0, for min of log
        if (value != 0) {
            // save data point as new min and max if it is smaller/bigger than current
            if (Math.log(value) < minLog) {
                minLog = Math.log(value);
            }
            if (Math.log(value) > maxLog) {
                maxLog = Math.log(value);
            }
        }
    }

    // return new values
    return [minLin, maxLin, minLog, maxLog]
};

// find min and max in datasets with absolute values
function findMinMaxAbsolute(data) {

    // check every data point
    data.forEach(function(d) {
        for (each in d) {
            // save variable
            var refugees = +d[each]

            // check if value is bigger or smaller, then save it
            var output = checkMinMaxSave(refugees, minLinAbs, maxLinAbs, minLogAbs, maxLogAbs);
            minLinAbs = output[0]
            maxLinAbs = output[1]
            minLogAbs = output[2]
            maxLogAbs = output[3]
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

                    // check if value is bigger or smaller, then save it
                    var output = checkMinMaxSave(perc, minLinPerc, maxLinPerc, minLogPerc, maxLogPerc);
                    minLinPerc = output[0]
                    maxLinPerc = output[1]
                    minLogPerc = output[2]
                    maxLogPerc = output[3]
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

    // empty data array
    dataset = {};

    // check every country
    dataOriginAsylum.forEach(function(d) {
        
        // save variables
        var country = d.Country;
        var refugees = +d[currentYear];

        // check for absolute or percentage
        if (absPerc == "absolute values") {

            // check for lin and log and fill data array with correct values
            checkLinLogFillDataset(refugees, Math.log(refugees), colorLinAbs, colorLogAbs, country);
        }
        else if (absPerc == "percentage of inhabitants") {
            
            // search for correct country
            dataPopulation.forEach(function(e) {
                if (d.Country == e.countrycode) {
                    
                    // save variables
                    var population = +e[currentYear];
                    var refugeesPerc = refugees / population * 100;

                    // check for lin and log and fill data array with correct values
                    checkLinLogFillDataset(refugeesPerc, Math.log(refugeesPerc), colorLinPerc, colorLogPerc, country);
                }
            });
        };
    });
};

// check for lin and log and fill data array with correct values
function checkLinLogFillDataset(valueLin, valueLog, colorLin, colorLog, country) {

    // check for lin and log
    if (linLog == "lin") {

        // check if value is a number and fill data array with correct values
        checkNumberFillDataset(valueLin, fillDataset(valueLin, colorLin(valueLin), country), country);
    }
    else if (linLog == "log") {

        // check if value is a number and fill data array with correct values
        checkNumberFillDataset(valueLin, checkZeroFillDataset(valueLin, valueLog, colorLog, country), country);
    };
};

// check if value is zero and fill data array with correct values
function checkZeroFillDataset(valueLin, valueLog, colorLog, country) {
    if (valueLin != 0) {
        fillDataset(valueLog, colorLog(valueLog), country);
    }
    else {
        fillDataset(valueLog, colorLeft, country);
    };
};

// check if value is a number and fill data array with correct values
function checkNumberFillDataset(valueLin, ifNumber, country) {
    if (!isNaN(valueLin)) {
        ifNumber;
    }
    else {
        fillDataset("not available", colorDefault, country);
    };
};

// fill the dataset with the correct values
function fillDataset(value, color, country) {
    dataset[country] = { amount: value, fillColor: color, country: country };
};

// return the correct border color for checking conflict country
function returnCorrectBorderColor(country) {
    if (!conflictCountries.includes(country)) {
        return colorBorder;    
    }
    else {
        return "gold";
    };
};

// return the correct border width for checking conflict country
function returnCorrectBorderWidth(country, widthNormal, widthConflict) {
    if (!conflictCountries.includes(country)) {
        return widthNormal;    
    }
    else {
        return widthConflict;
    };
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
                return returnCorrectBorderColor(d.id);
            },

            // set border width
            borderWidth: function(d) {
                return returnCorrectBorderWidth(d.id, 1, 3)
            },

            // set border color for mouse over
            highlightBorderColor: function(d) {
                return returnCorrectBorderColor(d.country);
            },
            
            // set border width for mouse over
            highlightBorderWidth: function(d) {
                return returnCorrectBorderWidth(d.country, 2, 4)
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
                newCountryClickedMap(geo);
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
    
        // update data and colors of the map
        updateColorsMap();

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
    var yLegend = 500

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
        checkLinLogAndChange("Amount of refugees (in millions)", minLinAbs / 1000000, maxLinAbs / 1000000, "Amount of refugees (in logarithm)", minLogAbs, maxLogAbs);
    }
    else if (absPerc == "percentage of inhabitants") {
        checkLinLogAndChange("Percentage refugees of inhabitants", minLinPerc, maxLinPerc, "Percentage refugees of inhabitants (in logarithm)", minLogPerc, maxLogPerc);
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

// check for lin or log and change the title and axis of the legend
function checkLinLogAndChange(titleLin, minLin, maxLin, titleLog, minLog, maxLog) {
    if (linLog == "lin") {
        changeTitleAndAxisLegend(titleLin, minLin, maxLin);
    }
    else if (linLog == "log") {
        changeTitleAndAxisLegend(titleLog, minLog, maxLog);
    }
};

// change title and scale of axis of legend
function changeTitleAndAxisLegend(title, min, max) {
    svgChangeLegend.select("#legendTitle")
        .text(title);

    setScaleLegend(min, max)
};

// make everything for the graph with refugees over time per country
function makeGraphCountry() {
    
    // save data in correct format
    correctDataFormatTimelineCountry();

    // initialize variables for axis
    initializeAxisAndLineTimelineCountry();

    // set y axis for default settings
    setYAxisTimelineCountry();
    
    // initialize svg for graph and make the titles and line
    var titleGraphCountry = "Amount of refugees " + toFrom + " " + currentCountryName + " per year in " + absPerc;
    initializeGraphMakeTitleLine("country", titleGraphCountry, dataGraphCountry);

    // make both axis
    makeAxisTimelineCountry();

    // add tooltip
    addTooltipTimelineCountry();
};

// save data in correct format for timeline
function correctDataFormatTimelineCountry() {
    
    // start with empty array
    dataGraphCountry = []
    
    // make counter for place in array
    var j = 0

    // search for correct country and check for absolute or percentage
    dataOriginAsylum.forEach(function(d) {
        if (absPerc == "absolute values" && d.Country == currentCountry) {
            // fill data array with correct data
            fillDataArrayTimeline(d, 0, j);
        }
        else if (absPerc == "percentage of inhabitants" && d.Country == currentCountry) {
            dataPopulation.forEach(function(e) {
                if (e.countrycode == currentCountry) {
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

// initialize the axis and the line for the timeline
function initializeAxisAndLineTimelineCountry() {
    
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

// set y axis of timeline country
function setYAxisTimelineCountry() {
    
    // define max for y axis
    var dataGraphCountryAmount = dataGraphCountry.map(function(d){ return d.amount; });
    maxDataGraphCountryAmount = Math.max.apply(null, dataGraphCountryAmount);
    
    // set domain for timeline
    xG.domain(d3.extent(yearsTime));
    yG.domain([0, maxDataGraphCountryAmount]); 
};

// initialize svg for graph and make the titles and line
function initializeGraphMakeTitleLineCountry() {
    
    // initialize svg
    svgGraphCountry = d3.select("#container2").append("svg")
        .attr("width", widthG + marginG.left + marginG.right)
        .attr("height", heightG + marginG.top + marginG.bottom)
        .attr("id", "graph")
        .append("g")
            .attr("transform", "translate(" + marginG.left + "," + marginG.top + ")");

    // make title
    svgGraphCountry.append("g")
        .attr("transform", "translate(0," + heightG + ")")
        .append("text")
            .attr("class", "graphTitle")
            .attr("x", widthG / 2)
            .attr("y", - heightG - marginG.top / 2)
            .style("text-anchor", "middle")
            .text("Amount of refugees " + toFrom + " " + currentCountryName + " per year in " + absPerc);

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
};

// initialize svg for graph and make the titles and line
function initializeGraphMakeTitleLine(countryTotal, title, data) {

    // initialize and save correct svg
    if (countryTotal == "country") {

        svgGraphCountry = d3.select("#container2").append("svg")
            .attr("width", widthG + marginG.left + marginG.right)
            .attr("height", heightG + marginG.top + marginG.bottom)
            .attr("id", "graphCountry")
            .append("g")
                .attr("transform", "translate(" + marginG.left + "," + marginG.top + ")");

        svg = svgGraphCountry;
    }
    else if (countryTotal == "total") {

        svgGraphTotal = d3.select("#container5").append("svg")
            .attr("width", widthG + marginG.left + marginG.right)
            .attr("height", heightG + marginG.top + marginG.bottom)
            .attr("id", "graphTotal")
            .append("g")
                .attr("transform", "translate(" + marginG.left + "," + marginG.top + ")");

        svg = svgGraphTotal;
    };

    // make title
    svg.append("g")
        .attr("transform", "translate(0," + heightG + ")")
        .append("text")
            .attr("class", "graphTitle")
            .attr("x", widthG / 2)
            .attr("y", - heightG - marginG.top / 2)
            .style("text-anchor", "middle")
            .text(title);

    // add line
    svg.append("path")
        .attr("class", "line")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", colorRight)
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", 1.5)
        .attr("d", lineCountry);
};

// make the axis for the timeline
function makeAxisTimelineCountry() {

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

    // set correct domain
    yG.domain([0, maxDataGraphCountryAmount]);

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

// make changes when new country is clicked on map
function newCountryClickedMap(geo) {

    // save the selected country
    currentCountry = geo.id;
    currentCountryName = geo.properties.name;

    // update data, axis and graph of timeline
    updateTimeline();

    // change barcharts if one of 5 conflict countries is clicked
    if (conflictCountries.includes(currentCountry)) {
        
        // update conflict country
        currentConflictCountry = geo.id;
        currentConflictCountryName = geo.properties.name;
        
        // update barcharts with new conflict country    
        updateBarcharts();
    };
};

// change the graph of the timeline
function changeGraphTimeline() {

    // select correct section for applying changes
    svgChangeTimeline = d3.select("#container2").transition();
    
    // if country is clicked without data
    if (dataGraphCountry.length == 0) {
        
        // change the title
        changeTitleTimeline("Data is not available for refugees ");

        // remove the graph
        removeGraph();

        // disable tooltip
        svgGraphCountry.select("#tooltipTimeline")
            .on("mouseover", function() { svgTooltipTimelineCountry.style("display", "none"); })
            .on("mousemove", null);
    }
    
    // if country is clicked with data
    else {
        
        // change title
        changeTitleTimeline("Amount of refugees ");

        // remove the graph
        removeGraph();

        // add axis of timeline
        makeAxisTimelineCountry();

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

// change the title of timeline to correct title
function changeTitleTimeline(title) {
    svgChangeTimeline.select(".graphTitle")
        .text(title + toFrom + " " + currentCountryName + " per year in " + absPerc);
};

// remove axis from graph
function removeGraph() {
    svgGraphCountry.selectAll("#axisYTimeline").remove();
    svgGraphCountry.selectAll("#axisXTimeline").remove();
};

// update the data when a button is clicked
function updateButton(input) {

    // change relevant variables
    changeVariablesButton(input);

    // update the data and colors of the map
    updateColorsMap();

    // update legend
    changeLegendMap();

    // update data, axis and graph of timeline
    updateTimeline();
};

// change relevant variables when button is clicked
function changeVariablesButton(input) {
    if (input == 0) {
        toFrom = "from";
        dataOriginAsylum = dataOrigin;
    }
    else if (input == 1) {
        toFrom = "to";
        dataOriginAsylum = dataAsylum;
    }
    else if (input == 2) {
        absPerc = "absolute values";
    }
    else if (input == 3) {
        absPerc = "percentage of inhabitants";
    }
    else if (input == 4) {
        linLog = "lin";
    }
    else if (input == 5) {
        linLog = "log";
    }; 
}

// update the data and colors of the map
function updateColorsMap() {
    
    // update data for the map
    correctDataFormatMap();
    
    // update colors in map
    map.updateChoropleth(dataset);
};

// update data, axis and graph of timeline
function updateTimeline() {

    // save new data for timeline
    correctDataFormatTimelineCountry();

    // set y axis again for timeline
    setYAxisTimelineCountry();

    // change the graph of the timeline
    changeGraphTimeline();
};

// make changes when new country is clicked by button
function newCountryClickedButton(input) {

    // save selected country
   changeConflictCountryButton(input);
    
    // update barcharts with new conflict country
    updateBarcharts();
};

// save the correct conflict country
function changeConflictCountryButton(input) {
    if (input == 0) {
        currentConflictCountry = "SYR";
        currentConflictCountryName = "Syria";
    } 
    else if (input == 1) {
        currentConflictCountry = "SSD";
        currentConflictCountryName = "South Sudan";
    } 
    else if (input == 2) {
        currentConflictCountry = "COD";
        currentConflictCountryName = "Democratic Republic of the Congo";
    } 
    else if (input == 3) {
        currentConflictCountry = "CAF";
        currentConflictCountryName = "Central African Republic";
    } 
    else if (input == 4) {
        currentConflictCountry = "SOM";
        currentConflictCountryName = "Somalia";
    }
};

// update barcharts when new conflict country is clicked
function updateBarcharts() { 
    
    // set the data, amount of refugees and domain of barchart correct
    setDataAmountDomainBarchart();

    // change barchart
    changeBarchart();

    // set new country for two sided barchart
    countryTwoSided = currentConflictCountryName;

    // change two-sided barchart
    changeTwoSided(2);
};

// set the data, amount of refugees and domain of barchart correct
function setDataAmountDomainBarchart() {
    
    // put data in correct format
    correctDataFormatBarchart();

    // set the amount of refugees correct
    setAmountOfRefugeesCorrect();
    
    // set new domain of barchart
    setDomainBarchart();
};

// make the barchart
function makeBarchart() {

    // initialize the axis for the barchart            
    initializeAxisBarchart();

    // set the data, amount of refugees and domain of barchart correct
    setDataAmountDomainBarchart();

    // initialize svg for barchart, add title, amount of refugees and tooltip
    initializeBarchartTitleAmountTooltip();

    // make both axis for barchart
    makeAxisBarchart();

    // make bars for barchart
    makeBarsBarchart();
};

// initialize the axis for the barchart
function initializeAxisBarchart() {
    
    // make scale for barchart
    xB = d3.scale.ordinal()
        .rangeRoundBands([0, widthB], .4);
    yB = d3.scale.linear()
        .range([heightB, 0]);

    // initialize x axis for barchart
    xAxisB = d3.svg.axis()
        .scale(xB)
        .orient("bottom");

    // initialize y axis for barchart
    yAxisB = d3.svg.axis()
        .scale(yB)
        .orient("left");
};

// make correct data format for barchart
function correctDataFormatBarchart() {
    
    // start with empty data array
    dataBarchartCountry = [];

    // initialize counter
    var j = 0;

    // search for correct country
    dataBarchart.forEach(function(d){
        if (d.origin == currentConflictCountryName && d.origin != d.country) {
            
            // save country and amount in array
            dataBarchartCountry[j] = {"country": d.country, "amount": d.amount};
            
            // check if data about gender and age is available, and store as well
            if (d.female) {
                dataBarchartCountry[j].data = "yes";
            }
            else {
                dataBarchartCountry[j].data = "no";
            }

            // update counter
            j++;
        };
    });
};

// set the amount of refugees correct for barchart
function setAmountOfRefugeesCorrect() {
    dataBarchart.forEach(function(d){
        if (d.origin == currentConflictCountryName && d.origin == d.country) {
            amountOfRefugees = d.amount;
        };
    }); 
};

// set the domain of the barchart correct
function setDomainBarchart() {    
    xB.domain(dataBarchartCountry.map(function(d) { return d.country; }));
    yB.domain([0, Math.ceil(d3.max(dataBarchartCountry, function(d) { return d.amount; }) / 10000) * 10000]);
};

// initialize svg for barchart, add title, amount of refugees and tooltip
function initializeBarchartTitleAmountTooltip() {
    
    // initialize svg for barchart
    svgBarchart = d3.select("#container3").append("svg")
        .attr("width", widthB + marginB.left + marginB.right)
        .attr("height", heightB + marginB.top + marginB.bottom)
        .append("g")
            .attr("transform", "translate(" + marginB.left + "," + marginB.top + ")");

    // make title
    svgBarchart.append("g")
        .attr("transform", "translate(0," + heightB + ")")
        .append("text")
            .attr("class", "graphTitle")
            .attr("x", widthB / 2)
            .attr("y", - heightB - marginB.top / 2)
            .style("text-anchor", "middle")
            .text("Refugees from " + currentConflictCountryName);

    // add amount of refugees to graph
    svgBarchart.append("g")
        .attr("transform", "translate(0," + heightB + ")")
        .append("text")
            .attr("id", "infoRefugees")
            .attr("x", 0)
            .attr("y", - heightB - marginB.top / 4)
            .style("text-anchor", "begin")
            .text("Amount of refugees: " + amountOfRefugees.toLocaleString());
    
    // append tooltip
    tooltipBarchart = d3.select("body")
        .append("div")
        .attr("id", "tooltipBarchart")
        .style("position", "absolute")
        .style("z-index", "10")
        .style("visibility", "hidden");
};

// make both axis for barchart
function makeAxisBarchart() {
    
    // make x axis
    svgBarchart.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + heightB + ")")
        .call(xAxisB)
        .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(-25)");
    svgBarchart.append("text")
        .attr("class", "axisTitle")
        .attr("x", widthB / 2)
        .attr("y", heightB + 60)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Country");

    // make y axis
    svgBarchart.append("g")
        .attr("class", "y axis")
        .call(yAxisB);
    svgBarchart.append("text")
        .attr("class", "axisTitle")
        .attr("transform", "rotate(-90)")
        .attr("y", - 90)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Amount of refugees");
};

// make the bars for the barchart
function makeBarsBarchart() {

    svgBarchart.selectAll(".bar")
        .data(dataBarchartCountry)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return xB(d.country); })
        .attr("y", function(d) { return yB(d.amount); })
        .attr("height", function(d) { return heightB - yB(d.amount); })
        .attr("width", xB.rangeBand())
        .attr("fill", colorBarchartRight);

    enableTooltipBarchart();
};

// change the barchart
function changeBarchart() {
    
    // change the title, the amount of refugees and the axis of the barchart
    changeTitleAmountAxisBarchart();

    // change the bars of the barchart
    changeBarsBarchart();

    // make sure that you can still click on the bars and tooltip stays
    enableTooltipBarchart();
};

// change the title, the amount of refugees and the axis of the barchart
function changeTitleAmountAxisBarchart() {
    
    // select the section for applying changes
    var svgChangeBarchart = d3.select("#container3").transition();
    
    // change the title
    svgChangeBarchart.select(".graphTitle")
        .text("Refugees from " + currentConflictCountryName);

    // change the amount of refugees
    svgChangeBarchart.select("#infoRefugees")
        .text("Amount of refugees: " + amountOfRefugees.toLocaleString());

    // change the x axis
    svgChangeBarchart.select(".x.axis")
        .duration(750)
        .call(xAxisB)
            .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(-25)");

    // change the y axis
    svgChangeBarchart.select(".y.axis")
        .duration(750)
        .call(yAxisB);
};

// change the bars of the barchart
function changeBarsBarchart() {
    
    // select the bars
    var bars = svgBarchart.selectAll(".bar")
        .data(dataBarchartCountry, function(d) { return d.country; })

    // remove all the bars
    bars.exit()
        .transition()
            .duration(300)
        .attr("y", yB(0))
        .attr("height", heightB - yB(0))
        .style('fill-opacity', 1e-6)
        .remove();

    // append new bars
    bars.enter().append("rect")
        .attr("class", "bar")
        .attr("y", yB(0))
        .attr("height", heightB - yB(0))
        .attr("fill", colorBarchartRight);

    // set correct height of bars
    bars.transition()
            .duration(300)
        .attr("x", function(d) { return xB(d.country); })
        .attr("width", xB.rangeBand())
        .attr("y", function(d) { return yB(d.amount); })
        .attr("height", function(d) { return heightB - yB(d.amount); });
};

// enable the tooltip works at the barchart
function enableTooltipBarchart() {
   
    // select all bars
    d3.selectAll(".bar")
        .on("mouseover", function(d) { 
            // if data is available, show bright color
            if (d.data == "yes") {
                d3.select(this)
                    .attr("fill", colorBarchartLeft);
            // if data is not available, show grey color
            } else if (d.data == "no") {
                d3.select(this)
                    .attr("fill", "grey");
            }
            // show information
            return tooltipBarchart.style("visibility", "visible").text("Amount " + d.country + ": " + d.amount.toLocaleString());})
        .on("mousemove", function() { return tooltipBarchart.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px");})
        .on("mouseout", function() { 
            // make sure barchart changes to original color
            d3.select(this)
                .attr("fill", colorBarchartRight);
            return tooltipBarchart.style("visibility", "hidden");})
        .on("click", function(d) { countryTwoSided = d.country; changeTwoSided(2) });
};

// make the two sided barchart
function makeTwoSidedBarchart() { 

    // add the data of the young group in total to the data for two sided barchart
    addDataYoungGroupTwoSided();

    // make the correct data array for the selected country and age groups
    correctDataFormatTwoSided("total");

    // find min and max for the two sided barchart, for all age groups and young group
    findMinMaxTwoSided();

    // set domains for two sided barchart
    setDomainsTwoSided();

    // initialize svg and bars for two sided barchart
    initializeTwoSidedBars();

    // add tooltip to the bars
    addTooltipToBars("rect.left")
    addTooltipToBars("rect.right")

    // add percentages as axis titles
    addPercentages("text.leftscore", dataMale, 0);
    addPercentages("text.rightscore", dataFemale, marginT.left + widthT + marginT.right);

    // select the section for applying changes
    svgChangeTwoSided = d3.select("#container4").transition();

    // add the tiltes for two sided barchart
    addTitlesTwoSided();
};

// add the data of the young group in total to the data for two sided barchart 
function addDataYoungGroupTwoSided() {
    
    // for every country
    dataBarchart.forEach(function(d){
        
        // if the data is available
        if (d.female) {

            // add the new group
            d.female["0-17"] = 0;
            d.male["0-17"] = 0;

            // search for right groups
            for (var group in d.female) {
                if (group == "0-4" || group == "5-11" || group == "12-17") {
                    
                    // calculate data for new group
                    d.female["0-17"] += d.female[group];
                    d.male["0-17"] += d.male[group];
                }
            }
        }
    });
};

// make the correct data array for the selected country and age groups
function correctDataFormatTwoSided(input) {
        
    // start with empty arrays
    dataFemale = []
    dataMale = []

    // select correct age groups
    if (input == "young") {
        ageGroups = ["0-4", "5-11", "12-17"];
    }
    else if (input == "total") {
        ageGroups = ["0-17", "18-59", "60+"];
    };

    // search for correct country
    dataBarchart.forEach(function(d) {
        if (d.origin == currentConflictCountryName && d.country == countryTwoSided) {
            
            // search for correct groups
            for (var group in d.female) {
                
                // save correct groups in array
                if (group == ageGroups[0]) {
                    fillDataArraysFemaleMale(0, group, d);
                }
                else if (group == ageGroups[1]) {
                    fillDataArraysFemaleMale(1, group, d);
                }
                else if (group == ageGroups[2]) {
                    fillDataArraysFemaleMale(2, group, d);
                }

                // save total amounts
                else if (group == "total" && input == "total") {
                    setFemaleMaleTotal(group, d);
                }
                else if (group == "0-17" && input == "young") {
                    setFemaleMaleTotal(group, d);
                };
            }
        };
    });

    // fill the data array for female and male
    function fillDataArraysFemaleMale(input, group, d) {
        dataFemale[input] = roundToTenth(d.female[group]);
        dataMale[input] = roundToTenth(d.male[group]);
    };

    // set female and male total to correct value
    function setFemaleMaleTotal(group, d) {
        totalFemale = roundToTenth(d.female[group]);
        totalMale = roundToTenth(d.male[group]);
    };

    // returns value rounded to tenth
    function roundToTenth(value) {
        return Math.round(value * 10) / 10;
    };
};

// find min and max for the two sided barchart, for all age groups and young group
function findMinMaxTwoSided() {

    // check every relevant age group
    dataBarchart.forEach(function(d) {
        for (var group in d.female) {
            if (group != "total") {
                
                // check if value is larger
                if (groupIsLarger(maxTotal, group, d)) {
                    
                    // save the largest value
                    maxTotal = largest(group, d);
                };

                // check only relevant age groups
                if (group == "0-4" || group == "5-11" || group == "12-17") {
                    
                    // check if value is larger
                    if (groupIsLarger(maxYoung, group, d)) {
                        
                        // save the largest value
                        maxYoung = largest(group, d);
                    };
                };
            }
        }
    });

    // checks if new value is larger than current max
    function groupIsLarger(variable, group, d) {
        if (variable < d.female[group] || variable < d.male[group]) {
            return true;
        }
        else {
            return false;
        };
    };

    // selects the largest of female and male
    function largest(group, d) {
        return d.female[group] > d.male[group] ? d.female[group] : d.male[group];
    };
};

// set the domains for the two sided barchart
function setDomainsTwoSided() {
    
    // set domains
    xT = d3.scale.linear()
        .domain([0, maxTotal])
        .range([0, widthTside]);
    
    yT = d3.scale.ordinal()
        .domain(ageGroups)
        .rangeBands([50, heightT - 200]);

    array = [0, 1, 2];
    yD = d3.scale.ordinal()
        .domain(array)
        .rangeBands([50, heightT - 200]);

    // make function to change index to position
    yPosition = function(d, i) { return yD(i); }
};

// initialize svg and bars for two sided barchart
function initializeTwoSidedBars() {
    
    // initialize svg
    svgTwoSided = d3.select("#container4").append("svg")
        .attr("width", widthT + marginT.left + marginT.right + 100)
        .attr("height", heightT + marginT.top + marginT.bottom)
        .append("g")
            .attr("transform", "translate(" + marginT.left + "," + marginT.top + ")");

    // initialize left rectangles
    svgTwoSided.selectAll("rect.left")
        .data(dataMale)
        .enter().append("rect")
        .attr("x", function(d) { return marginT.left + widthTside - xT(d); })
        .attr("y", yPosition)
        .attr("class", "left")
        .attr("width", xT)
        .attr("height", yT.rangeBand())

    // initialize right rectangles
    svgTwoSided.selectAll("rect.right")
        .data(dataFemale)
        .enter().append("rect")
        .attr("x", marginT.left + widthTside + labelArea)
        .attr("y", yPosition)
        .attr("class", "right")
        .attr("width", xT)
        .attr("height", yT.rangeBand())
};

// add the tooltip to the bars of two sided barchart
function addTooltipToBars(leftRight) {
    
    // select correct secction
    d3.selectAll(leftRight)
       
        // add tooltip
        .on("mouseover", function(d) { 
            
            // search for correct country and return tooltip
            if (currentConflictCountryName == countryTwoSided) { 
                
                // calculate absolute value
                var abs = Math.round(d * amountOfRefugees / 100); 
                enableTooltipTwoSided(abs);
            } 
            else { 
                dataBarchartCountry.forEach(function(e) {
                    if (e.country == countryTwoSided) {
                        
                        // calculate absolute value
                        var abs = Math.round(d * e.amount / 100); 
                        enableTooltipTwoSided(abs);
                    }
                });
            };
        })
        .on("mousemove", function() { return tooltipBarchart.style("top", (event.pageY - 10)+"px").style("left",(event.pageX + 10)+"px"); })
        .on("mouseout", function() { return tooltipBarchart.style("visibility", "hidden"); })
        
        // change two sided barchart on click
        .on("click", function(d) { 
            if (youngTotal == "total") {
                changeTwoSided(0); 
            }
            else if (youngTotal == "young") {
                changeTwoSided(1);
            };
        });

    // enables the tooltip for the two sided barchart
    function enableTooltipTwoSided(abs) {
        return tooltipBarchart.style("visibility", "visible").text("Absolute value: " + abs.toLocaleString());
    };
};

// add percentages as axis titles to two sided barchart
function addPercentages(select, data, x) {
 
    svgTwoSided.selectAll(select)
        .data(data)
        .enter().append("text")
        .attr("x", x)
        .attr("y", function(d, z) { return yD(z) + yD.rangeBand() / 2; })
        .attr("dx", "0")
        .attr("dy", ".36em")
        .attr("text-anchor", "middle")
        .attr("id", "score")
        .text(String);
};

// add titles to the two sided barchart
function addTitlesTwoSided() {

    // add main title
    svgTwoSided.append("g")
        .attr("transform", "translate(0," + heightT + ")")
        .append("text")
            .attr("class", "graphTitle")
            .attr("x", marginT.left + widthT / 2)
            .attr("y", - heightT - marginT.top / 2)
            .style("text-anchor", "middle");

    // check which title must be added
    if (currentConflictCountryName != countryTwoSided) {
        setTitleTwoSided("Gender and age of refugees from " + currentConflictCountryName + " in " + countryTwoSided);
    }
    else if (currentConflictCountryName == countryTwoSided) {
        setTitleTwoSided("Gender and age of refugees from " + currentConflictCountryName);
    }

    // add title male
    svgTwoSided.append("g")
        .attr("transform", "translate(0," + heightT + ")")
        .append("text")
            .attr("class", "axisTitle")
            .attr("x", 0)
            .attr("y", - heightT + 25)
            .style("text-anchor", "middle")
            .text("Male (" + totalMale + "%)");

    // add title female
    svgTwoSided.append("g")
        .attr("transform", "translate(0," + heightT + ")")
        .append("text")
            .attr("class", "axisTitle")
            .attr("x", marginT.left + widthT + marginT.right)
            .attr("y", - heightT + 25)
            .style("text-anchor", "middle")
            .text("Female  (" + totalFemale + "%)");

    // add title age
    svgTwoSided.append("g")
        .attr("transform", "translate(0," + heightT + ")")
        .append("text")
            .attr("class", "axisTitle")
            .attr("x", marginT.left + widthTside + labelArea / 2)
            .attr("y", - heightT + 25)
            .style("text-anchor", "middle")
            .text("Age");

    // add titles age groups
    svgTwoSided.selectAll("text.name")
        .data(ageGroups)
        .enter().append("text")
        .attr("x", marginT.left + widthTside + labelArea / 2)
        .attr("y", function(d) { return yT(d) + yT.rangeBand()/2; })
        .attr("dy", ".20em")
        .attr("text-anchor", "middle")
        .attr("id", "ageGroups")
        .text(String);
};

// set the correct title for two sided barchart
function setTitleTwoSided(title) {
    svgChangeTwoSided.select(".graphTitle")
        .text(title);
};

// change two sided barchart when other country is clicked
function changeTwoSided(value) {
    
    // select correct section
    svgChangeTwoSided = d3.select("#container4").transition();

    // update dataset and domains
    if (value == 0 || value == 2 && youngTotal == "young") {
        updateDataDomainTwoSided(maxYoung, "young");
    }
    else if (value == 1 || value == 2 && youngTotal == "total") {
        updateDataDomainTwoSided(maxTotal, "total");
    };

    // check if data is available
    if (dataFemale.length < 1) {
        
        // change two sided barchart when no data is available
        changeTwoSidedNoData();
    }
    else {
        
        // change two sided barchart when data is available
        changeTwoSidedDataAvailable();
    };
};

// update data and domain of two sided barchart
function updateDataDomainTwoSided(max, variable) {

    // update youngTotal
    youngTotal = variable;

    // update dataset
    correctDataFormatTwoSided(youngTotal);
    
    // update domain
    yT = d3.scale.ordinal()
        .domain(ageGroups)
        .rangeBands([50, heightT-200]);

    xT = d3.scale.linear()
        .domain([0, max])
        .range([0, widthTside]);
};

// change two sided barchart when no data is available
function changeTwoSidedNoData() {
    
    // change the title
    setTitleTwoSided("Data is not available for refugees from " + currentConflictCountryName + " in " + countryTwoSided);

    // remove the bars
    removeBarsTwoSided("rect.left", dataMale);
    removeBarsTwoSided("rect.right", dataFemale);

    // remove all the text
    removeAllTextTwoSided();
};

// change two sided barchart when data is available
function changeTwoSidedDataAvailable() {
  
    // remove the bars
    removeBarsTwoSided("rect.left", dataMale);
    removeBarsTwoSided("rect.right", dataFemale);

    // remove all text
    removeAllTextTwoSided();
    svgTwoSided.selectAll(".graphTitle").remove();
    
    // add the bars again
    var xLeft = function(d) { return marginT.left + widthTside - xT(d); }
    var xRight = marginT.left + widthTside + labelArea
    addBarsTwoSided("rect.left", dataMale, xLeft, "left");
    addBarsTwoSided("rect.right", dataFemale, xRight, "right");

    // add the titles again
    addTitlesTwoSided();

    // add percentages as axis title
    addPercentages("text.leftscore", dataMale, 0);
    addPercentages("text.rightscore", dataFemale, marginT.left + widthT + marginT.right);
};

// remove the bars of two sided barchart
function removeBarsTwoSided(select, data) {

    // select correct section
    var svgChangeTwoSidedData = svgTwoSided.selectAll(select)
        .data(data)   

    // remove bars
    svgChangeTwoSidedData.exit()
        .transition()
            .duration(100)
        .style('fill-opacity', 1e-6)
        .remove();
};

// add the bars of two sided barchart
function addBarsTwoSided(select, data, x, addClass) {

    // select correct section
    var svgChangeTwoSidedData = svgTwoSided.selectAll(select)
        .data(data)
    
    // initialize rectangles
    svgChangeTwoSidedData.enter().append("rect")

    // add bars
    svgChangeTwoSidedData.transition()
        .attr("x", x)
        .attr("y", yPosition)
        .attr("width", xT)
        .attr("height", yT.rangeBand())
        .attr("class", addClass)
    
    // add tooltip to bars of two sided barchart
    addTooltipToBars("rect.left")
    addTooltipToBars("rect.right")
};

// remove all test from two sided barchart
function removeAllTextTwoSided() {
    svgTwoSided.selectAll("#score").remove();
    svgTwoSided.selectAll("#ageGroups").remove();
    svgTwoSided.selectAll(".axisTitle").remove();
};

// make the graph with total overview
function makeGraphTotal() {

    // save data in correct format
    correctDataFormatTimelineTotal();

    // set default dataset
    dataTotal = dataTotalAbs;

    // set y axis for default settings
    setYAxisTimelineTotal();

    // initialize svg for graph and make the titles and line
    var titleGraphTotal = "Amount of refugees in the world over time in " + absPercTotal;
    initializeGraphMakeTitleLine("total", titleGraphTotal, dataTotal);

    // make both axis for graph total
    makeAxisTimelineTotal();

    // add tooltip
    addTooltipTimelineTotal();
};

// save data in correct format for timeline
function correctDataFormatTimelineTotal() {

    // make an array for total refugees and one for total population over time
    dataTotalAbs = makeArraysWorldRefugeesPopulation(dataOrigin);
    dataTotalPop = makeArraysWorldRefugeesPopulation(dataPopulation);

    // for every year, calculate percentage and save in array
    for (i = 0; i < amountOfYears; i++) {
        var perc = dataTotalAbs[i].amount / dataTotalPop[i].amount * 100;
        dataTotalPerc[i] = {amount: perc, year: yearsTime[i], yearx: yearsString[i]};
    }
};

// make array with all countries summed up
function makeArraysWorldRefugeesPopulation(data) {
    
    // start with empty array
    dataArray = [];

    // for every country and year
    data.forEach(function(d) {
        for (i = 0; i < amountOfYears; i++) {
            
            // if the year doesn't exist yet, make new object
            if (!dataArray[i]) {
                dataArray[i] = {amount: 0, year: yearsTime[i], yearx: yearsString[i]};
            };
            
            // check if value is a number
            if (!isNaN(d[yearsString[i]])) {
                dataArray[i].amount += +d[yearsString[i]];
            };
        };
    });

    // return the data array
    return dataArray;
};

// set y axis of timeline total
function setYAxisTimelineTotal() {
    
    // define max for y axis
    var dataGraphTotalAmount = dataTotal.map(function(obj){ return obj.amount; });
    maxDataGraphTotalAmount = Math.max.apply(null, dataGraphTotalAmount);

    // set domain for timeline
    yG.domain([0, maxDataGraphTotalAmount]); 
};

// make both axis for the total graph
function makeAxisTimelineTotal() {

    // make x axis
    svgGraphTotal.append("g")
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
    svgGraphTotal.append("g")
        .attr("class", "y axis")
        .call(yAxisG)
        .append("text")
            .attr("class", "axisTitle")
            .attr("id", "axisTitleYTotal")
            .attr("transform", "rotate(-90)")
            .attr("y", - 100)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Amount of refugees");
};

// update the total graph when button is clicked
function updateGraphTotal(input) {
    
    // select the section for applying changes
    svgChangeTimelineTotal = d3.select("#container5").transition();
    
    // check which change must be made
    if (input == 0) {

        // update variable and dataset
        absPercTotal = "absolute values";
        dataTotal = dataTotalAbs;

        // update title
        setTitleYAxisGraphTotal("Amount of refugees");
    }
    else if (input == 1) {
        
        // update variable and dataset
        absPercTotal = "percentage of population";
        dataTotal = dataTotalPerc;

        // update title
        setTitleYAxisGraphTotal("Percentage of population");
    };

    // change the title
    svgChangeTimelineTotal.select(".graphTitle")
        .text("Amount of refugees in the world over time in " + absPercTotal)

    // change y axis
    setYAxisTimelineTotal();

    svgChangeTimelineTotal.select(".y.axis")
        .duration(750)
        .call(yAxisG)

    // change the line
    svgChangeTimelineTotal.select(".line")
        .duration(750)
        .attr("d", lineCountry(dataTotal));
};

// set the correct title for graph total
function setTitleYAxisGraphTotal(title) {
    svgChangeTimelineTotal.select("#axisTitleYTotal")
        .text(title);
};

// add the toooltip for the total timeline
function addTooltipTimelineTotal() {
    
    // make svg for tooltip
    svgTooltipTimelineTotal = svgGraphTotal.append("g")
        .style("display", "none");

    // append vertical line
    svgTooltipTimelineTotal.append("line")
        .attr("class", "xTooltip")
        .style("stroke", "black")
        .style("stroke-dasharray", "3,3")
        .style("opacity", 0.5)
        .attr("y1", 0)
        .attr("y2", heightG);

    // append horizontal line
    svgTooltipTimelineTotal.append("line")
        .attr("class", "yTooltip")
        .style("stroke", "black")
        .style("stroke-dasharray", "3,3")
        .style("opacity", 0.5)
        .attr("x1", widthG)
        .attr("x2", widthG);

    // append circle
    svgTooltipTimelineTotal.append("circle")
        .attr("class", "yTooltip")
        .style("fill", "none")
        .style("stroke", "black")
        .attr("r", 4);

    // add text for amount
    svgTooltipTimelineTotal.append("text")
        .attr("class", "textAmount")
        .attr("dx", 8)
        .attr("dy", "-.3em");

    // add text for year
    svgTooltipTimelineTotal.append("text")
        .attr("class", "textYear")
        .attr("dx", 8)
        .attr("dy", "1em");

    // append tooltip to graph
    svgGraphTotal.append("rect")
        .attr("width", widthG)
        .attr("height", heightG)
        .style("fill", "none")
        .style("pointer-events", "all")
        .on("mouseover", function() { svgTooltipTimelineTotal.style("display", null); })
        .on("mousemove", mousemoveTotal)
        .on("mouseout", function() { svgTooltipTimelineTotal.style("display", "none"); });
};

// change tooltip when mouse is moved
function mousemoveTotal() {

    // set correct domain
    yG.domain([0, maxDataGraphTotalAmount]); 

    // select correct year and data
    var timeMouse = xG.invert(d3.mouse(this)[0]),
    i = bisectDate(dataTotal, timeMouse, 1),
    dataLeft = dataTotal[i - 1],
    dataRight = dataTotal[i],
    d = timeMouse - dataLeft.year > dataRight.year - timeMouse ? dataRight : dataLeft;  

    // set amount of refugees
    var amount = +d.amount

    // place circle on correct place
    svgTooltipTimelineTotal.select("circle.yTooltip")
        .attr("transform", "translate(" + xG(d.year) + "," + yG(d.amount) + ")");

    // place correct text in tooltip
    if (absPercTotal == "absolute values") {
        svgTooltipTimelineTotal.select("text.textAmount")
            .attr("transform", "translate(" + xTooltipTimeline + "," + yTooltipTimeline + ")")
            .text("Amount of refugees: " + amount.toLocaleString());
    }
    else if (absPercTotal == "percentage of population") {
        svgTooltipTimelineTotal.select("text.textAmount")
            .attr("transform", "translate(" + xTooltipTimeline + "," + yTooltipTimeline + ")")
            .text("Percentage of population: " + amount.toLocaleString());    
    }

    // place correct year in tooltip
    svgTooltipTimelineTotal.select("text.textYear")
        .attr("transform", "translate(" + xTooltipTimeline + "," + yTooltipTimeline + ")")
        .text("Year: " + d.yearx);

    // place vertical line on correct place
    svgTooltipTimelineTotal.select(".xTooltip")
        .attr("transform", "translate(" + xG(d.year) + "," + yG(d.amount) + ")")
        .attr("y2", heightG - yG(d.amount));

    // place horizontal line on correct place
    svgTooltipTimelineTotal.select(".yTooltip")
        .attr("transform", "translate(" + widthG * -1 + "," + yG(d.amount) + ")")
        .attr("x2", widthG + widthG);
};