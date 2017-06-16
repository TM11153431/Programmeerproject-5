/*Naam: Sanne Berendschot
Studentnummer: 10269290
Minor Programmeren, Programmeerproject*/

// make global variables for the data
var dataTotal = [];

var map;
var dataColorsFrom  = {};
var dataColorsTo = {};
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
var maxDataYear;
var minDataYear;
var svgChangeTimeline;
var yearSlider;
var color;
var countryStar = "SYR";
var countryStarName = "Syria";
var dataColorsFromPerc = {};
var dataColorsToPerc = {};
var absPerc;

var dataBarchart;
var newDataBarchart;
var chart;
var svgChangeChart;
var amountOfRefugees;
var tooltip;

var colorLeft = "#FFB266"
var colorRight = 'brown'

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
var svgChangeTwoSided

// parse the date
var parseTime = d3.time.format("%Y").parse;

// set outlines for graphs
var margin = {top: 50, right: 40, bottom: 120, left: 150},
    width = 800 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// set the ranges for graph
var xG = d3.time.scale()
    .rangeRound([0, width]);

var yG = d3.scale.linear()
    .rangeRound([height, 0]);

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
    .defer(d3.tsv, "Dataset Asylum goed.tsv")
    .defer(d3.tsv, "Data Population Worldbank.tsv")    
    .defer(d3.json, "dataBarchart.json")    
    .await(makeVisualisations)

// make the two data visualisations
function makeVisualisations(error, datasetOrigin, datasetAsylum, datasetPopulation, datasetBarchart) {

    // check for error
    if (error) throw error;

    // save the data
    dataOrigin = datasetOrigin;
    dataAsylum = datasetAsylum;
    dataPopulation = datasetPopulation;
    dataBarchart = datasetBarchart;

    // make world map

    // find min and max of data in specific year for legend
    var dataYear = dataOrigin.map(function(obj){ return obj[2015]; });
    maxDataYear = Math.max.apply(null, dataYear);
    minDataYear = Math.min.apply(null, dataYear);

    // make function to scale values to a color for map
    color = d3.scale.linear()
        //.domain([minDataYear,maxDataYear])
        .domain([minDataYear, 10000])
        .range([colorLeft,colorRight]);

    colorPerc = d3.scale.linear()
        .domain([0,0.1])
        .range([colorLeft,colorRight]);

    // put data in dataset in correct format
    dataOrigin.forEach(function(d){
        var country = d.Country,
            value = +d[2015];
            //value = Math.log(value)
        dataColorsFrom[country] = { amount: value, fillColor: color(value) };
    });

    dataAsylum.forEach(function(d){
        var country = d.Country,
            value = +d[2015];
        dataColorsTo[country] = { amount: value, fillColor: color(value) };
    });

    dataOrigin.forEach(function(d){
        dataPopulation.forEach(function(e){
            if (d.Country == e.countrycode) {
                var country = d.Country,
                    refugees = +d[2015],
                    population = +e[2015],
                    value = refugees/population*100;
                dataColorsFromPerc[country] = { amount: value, fillColor: colorPerc(value) };
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
                dataColorsToPerc[country] = { amount: value, fillColor: colorPerc(value) };
            };
        });
    });

    // set default datasets
    dataset = dataColorsFrom
    dataOriginAsylum = dataOrigin
    toFrom = "from"
    absPerc = "absolute values"

    // make the map
    makeMap();

    // make slider
    makeSlider();

    // make legend for world map
    makeLegendMap();

    // make graph for refugees over time

    // initialize svg
    var svgGraph = d3.select("#container2").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .attr("id", "graph")
        .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // save data in correct format
    correctDataFormatTimeline();
    
    // set y-axis for default settings
    setYaxisTimeline();

    // make title
    svgGraph.append("g")
        .attr("transform", "translate(0," + height + ")")
        .append("text")
            .attr("class", "graphTitle")
            .attr("x", width / 2)
            .attr("y", - height - margin.top / 2)
            .style("text-anchor", "middle")
            .text("Amount of refugees " + toFrom + " " + nameCountry + " per year in " + absPerc);

    // make x axis
    svgGraph.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxisG)
        .append("text")
            .attr("class", "axisTitle")
            .attr("x", width)
            .attr("y", 50)
            .style("text-anchor", "end")
            .text("Time");

    // make y axis
    svgGraph.append("g")
        .attr("class", "y axis")
        .call(yAxisG)
        .append("text")
            .attr("class", "axisTitle")
            .attr("id", "axisTitleY")
            .attr("transform", "rotate(-90)")
            .attr("y", - 90)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Amount of refugees");

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

    // add comment
    svgGraph.append("g")
        .attr("transform", "translate(0," + height + ")")
        .append("text")
            .attr("x", 0)
            .attr("y", margin.bottom)
            .style("text-anchor", "begin")
            .text("Hover over the line for exact data");

    // define tooltip for showing the data
    var div = d3.select("#container2").append("div") 
        .attr("class", "tooltip")     
        .style("opacity", 0);

    // initialize mouseover
    var mouseOver = svgGraph.append("g")
      .attr("transform", "translate(" + 0 + "," + 0 + ")");

    // define area over which to move
    mouseOver.append("svg:rect")
        .attr("width", width)
        .attr("height", height)
        .attr("fill", "none")
        .attr("pointer-events", "all");

    // add tooltip
    mouseOver.on('mousemove', function() {

        // select correct section and data
        var svgScatter = svgGraph.selectAll("dot")  
            .data(dataCountry)     
            
            // make scatterplot
            .enter().append("circle")               
                .attr("r", 3)
                .attr("id", "circle")
                .style("fill", colorRight)   
                .attr("cx", function(d) { return xG(d.year); })     
                .attr("cy", function(d) { return yG(d.amount); })
                
                // show information when on line
                .on("mouseover", function(d) {
                    div.transition()    
                        .duration(200)    
                        .style("opacity", .9);    
                    div .html("Year: " + d.yearx + 
                            "<br/>Vluchtelingen: " 
                            + d.amount)  
                        .style("left", (d3.event.pageX - 700) + "px")   
                        .style("top", (d3.event.pageY - 220) + "px");  
                    })          
                
                // remove information when not on line
                .on("mouseout", function(d) {   
                    div.transition()    
                        .duration(500)    
                        .style("opacity", 0);
                });      

            // remove scatterplot when not on line
            svgScatter.transition().style("opacity", 0);
    });

    // make barchart
    makeBarchart();

    // make two-sided barchart
    makeTwoSidedBarchart();

    makeTotalGraph();
};

// save data in correct format for timeline
function correctDataFormatTimeline() {
    if (absPerc == "absolute values") {
        dataOriginAsylum.forEach(function(d) {
            if (d.Country == newCountry) {
                for (i = 0; i < 26; i++) {
                    object = {amount : d[yearsString[i]], year: yearsTime[i], yearx: yearsString[i]}
                    dataCountry[i] = object;
                }
            }
        });
    }
    else if (absPerc == "percentage of inhabitants") {
        dataOriginAsylum.forEach(function(d) {
            dataPopulation.forEach(function(e) {
                if (d.Country == newCountry && e.countrycode == newCountry) {
                    for (i = 0; i < 26; i++) {
                        object = {amount : d[yearsString[i]]/e[yearsString[i]]*100, year: yearsTime[i], yearx: yearsString[i]}
                        dataCountry[i] = object;
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

// change the graph of the timeline
function changeGraphTimeline() {

    // select the section for applying changes
    svgChangeTimeline = d3.select("#container2").transition();

    // change the title
    svgChangeTimeline.select(".graphTitle")
        .text("Amount of refugees " + toFrom + " " + nameCountry + " per year in " + absPerc);

    // change y axis title
    if (absPerc == "percentage of inhabitants") {
        svgChangeTimeline.select("#axisTitleY")
            .text("Percentage of inhabitants");
    } 
    else if (absPerc == "absolute values") {
        svgChangeTimeline.select("#axisTitleY")
            .text("Amount of refugees");
    };

    // change the line
    svgChangeTimeline.select(".line")
        .duration(750)
        .attr("d", lineCountry(dataCountry));

    // change the y axis
    svgChangeTimeline.select(".y.axis")
        .duration(750)
        .call(yAxisG);
};

// make slider for world map
function makeSlider() {

    // update map when slider is used
    d3.select("#YearSlider").on("input", function() {
        update(+this.value);
    });

    // initialize with year 2015
    update(2015);

    // update when slider is used
    function update(year) {

        // put data in dataset in correct format
        dataOriginAsylum.forEach(function(d){
            var country = d.Country,
                refugees = +d[year];
                //value = Math.log(value)
            if (toFrom == "from" && absPerc == "absolute values") {
                dataColorsFrom[country] = { amount: refugees, fillColor: color(refugees) };
                dataset = dataColorsFrom;
            } else if (toFrom == "to" && absPerc == "absolute values") {
                dataColorsTo[country] = { amount: refugees, fillColor: color(refugees) };
                dataset = dataColorsTo;
            } else if (toFrom == "from" && absPerc == "percentage of inhabitants") {
                dataPopulation.forEach(function(e) {
                    if (d.Country == e.countrycode) {
                        population = +e[year];
                        value = refugees/population*100;
                        dataColorsFromPerc[country] = { amount: value, fillColor: colorPerc(value) };
                        dataset = dataColorsFromPerc;
                    }
                })
            } else if (toFrom == "to" && absPerc == "percentage of inhabitants") {
                dataPopulation.forEach(function(e) {
                    if (d.Country == e.countrycode) {
                        population = +e[year];
                        value = refugees/population*100;
                        dataColorsToPerc[country] = { amount: value, fillColor: colorPerc(value) };
                        dataset = dataColorsToPerc;
                    }
                })
            } else {
                console.log('No To or From was given')
            }
        });

        // update colors of world map
        map.updateChoropleth(dataset)
        
        // adjust the text on the range slider
        d3.select("#YearSlider-value").text(year);
        d3.select("#YearSlider").property("value", year);
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
    
    // set scale for x-axis
    var xScale = d3.scale.linear()
        .range([0, legendWidth])
        .domain([minDataYear,maxDataYearMillion]);

    // define x axis
    var xAxisLegend = d3.svg.axis()
          .orient("bottom")
          .ticks(10)
          .scale(xScale);

    // place x axis
    svgMap.append("g")
        .attr("transform", "translate(" + xCo + "," + (yCo + legendHeight) + ")")
        .attr("id", "legendX")
        .call(xAxisLegend);
};

// update the data when origin or asylumm is clicked
function updateDataToFrom(input) {

    // use correct data
    if (input == 0 && absPerc == "absolute values" || input == 2 && toFrom == "from") {
        dataset = dataColorsFrom;
        dataOriginAsylum = dataOrigin;
        map.options.data = dataColorsFrom; 
        toFrom = "from";
        absPerc = "absolute values";
    }
    else if (input == 0 && absPerc == "percentage of inhabitants" || input == 3 && toFrom == "from") {
        dataset = dataColorsFromPerc;
        dataOriginAsylum = dataOrigin;
        map.options.data = dataColorsFromPerc; 
        toFrom = "from";
        absPerc = "percentage of inhabitants";
    }
    else if (input == 1 && absPerc == "absolute values" || input == 2 && toFrom == "to") {
        dataset = dataColorsTo;
        dataOriginAsylum = dataAsylum;
        map.options.data = dataColorsTo; 
        toFrom = "to";
        absPerc = "absolute values";   
    }
    else if (input == 1 && absPerc == "percentage of inhabitants" || input == 3 && toFrom == "to") {
        dataset = dataColorsToPerc;
        dataOriginAsylum = dataAsylum;
        map.options.data = dataColorsToPerc; 
        toFrom = "to";
        absPerc = "percentage of inhabitants"; 
    }

    /*if (input == 0) {
        dataset = dataColorsFrom;
        dataOriginAsylum = dataOrigin;   
        map.options.data = dataColorsFrom; 
        toFrom = "from";
    } else if (input == 1) {
        dataset = dataColorsTo;
        dataOriginAsylum = dataAsylum;
        map.options.data = dataColorsTo;
        toFrom = "to";
    } else {
        console.log("You didn't define ToOrFrom")
    }*/

    // update colors in map
    map.updateChoropleth(dataset)

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
        fills: { defaultFill: "#F5F5F5" },
        data: dataset,    
        geographyConfig: {
            borderColor: "#331900",
            
            // settings for mouse hover
            highlightBorderWidth: 2,
            highlightFillColor: function(geo) {
                return geo["fillColor"] || "#F5F5F5";
            },
            highlightBorderColor: "black",
            
            // make tooltip
            popupTemplate: function(geo, data) {
                
                // only show information when data is present
                if (!dataset) { return ; }
                
                // show country and life expectancy in information box
                return ["<div class=hoverinfo>",
                    "<strong>", geo.properties.name, "</strong>",
                    "<br>Amount of refugees: <strong>", Math.round(dataset[geo.id].amount * 10) / 10, "</strong>",
                    "</div>"].join('');
            }
        },

        // when country clicked, graph below changes
        done: function(datamap) {
            datamap.svg.selectAll(".datamaps-subunit").on("click", function(geo) {

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
                    changeTwoSided();

                };

            });
        }
    });
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
            .style("text-anchor", "end")
            .text("Refugees from " + countryStarName);

    // put data in correct format
    correctDataFormatBarchart();

    setAmountOfRefugeesCorrect();
    
    // set domain
    setDomainBarchart();
    
    tooltip = d3.select("body")
        .attr("class", "tipBarchart")
        .append("div")
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
        .on("mouseover", function(d) { return tooltip.style("visibility", "visible").text("Amount " + d.country + ": " + d.amount);})
        .on("mousemove", function() { return tooltip.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px");})
        .on("mouseout", function() { return tooltip.style("visibility", "hidden");})
        .on("click", function(d) { countryTwoSided = d.country; changeTwoSided() });

    // add comment
    chart.append("g")
        .attr("transform", "translate(0," + height + ")")
        .append("text")
            .attr("class", "comment")
            .attr("x", width - 5*margin.right)
            .attr("y", - height - 10)
            .style("text-anchor", "begin")
            .text("Amount of refugees: " + amountOfRefugees);
};

// make correct data format for barchart
function correctDataFormatBarchart() {
    newDataBarchart = []
    j = 0
    dataBarchart.forEach(function(d){
        if (d.origin == countryStarName && d.origin != d.country) {
            newDataBarchart[j] = {"country": d.country, "amount": d.amount};
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
        .text("Amount of refugees: " + amountOfRefugees);

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
        .attr("height", height - yB(0));

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
    d3.selectAll("rect")
        .on("mouseover", function(d) { return tooltip.style("visibility", "visible").text("Amount " + d.country + ": " + d.amount);})
        .on("mousemove", function() { return tooltip.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px");})
        .on("mouseout", function() { return tooltip.style("visibility", "hidden");})
        .on("click", function(d) { countryTwoSided = d.country; changeTwoSided() });
};

function makeTwoSidedBarchart() { 

    var margin = {top: 50, right: 40, bottom: 120, left: 40},
    width = 900 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

    width2 = width/2;
    labelArea = 100;

    correctDataFormatTwoSided(0);

    // set age groups
    dataTwoSidedLeft = male
    dataTwoSidedRight = female

    rightMax = d3.max(dataTwoSidedRight)
    leftMax =d3.max(dataTwoSidedLeft)

    totalMax = d3.max([leftMax, rightMax])
    // set domain
    xL = d3.scale.linear()
        .domain([0, totalMax])
        .range([0, width/2]);

    yT = d3.scale.ordinal()
        .domain(ageGroups)
        .rangeBands([50, height-150])

    array = [0, 1, 2, 3, 4]
    yD = d3.scale.ordinal()
        .domain(array)
        .rangeBands([50, height-150])

    xR = d3.scale.linear()
        .domain([0, totalMax])
        .range([0, width/2]);

    yPosByIndex = function(d, index) { return yD(index); }

        // initialize svg
    svgTwoSided = d3.select("#container4").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .attr("id", "twoSided")
        .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svgTwoSided.selectAll("rect.left")
        .data(dataTwoSidedLeft)
        .attr("class", "leftData")
        .enter().append("rect")
        .attr("x", function(d) { return width2 - labelArea - xL(d); })
        .attr("y", yPosByIndex)
        .attr("class", "left")
        .attr("width", xL)
        .attr("height", yT.rangeBand());

    svgTwoSided.selectAll("rect.right")
        .data(dataTwoSidedRight)
        .enter().append("rect")
        .attr("x", width2)
        .attr("y", yPosByIndex)
        .attr("class", "right")
        .attr("width", xR)
        .attr("height", yT.rangeBand());

    addPercentages();

    addTitlesTwoSided();
};

function changeTwoSided() {
    
    var margin = {top: 50, right: 40, bottom: 120, left: 40},
    width = 900 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

    correctDataFormatTwoSided(1);

    dataTwoSidedLeft = male
    dataTwoSidedRight = female

    // select the section for applying changes
    svgChangeTwoSided = d3.select("#container4").transition();

    // check if data is available
    if (male.length < 1) {
        
        // change the title
        svgChangeTwoSided.select(".graphTitle")
            .text("Data is not available for " + countryTwoSided);

        removeBars();

        removeAllText();
    }
    else {
        changeTitles();

        removeBars();

        addBars();

        removeAllText();
        svgTwoSided.selectAll(".graphTitle").remove();

        addTitlesTwoSided();

        addPercentages();
    }
};

function addTitlesTwoSided() {
    
    // make title
    svgTwoSided.append("g")
        .attr("transform", "translate(0," + height + ")")
        .append("text")
            .attr("class", "graphTitle")
            .attr("x", width / 2)
            .attr("y", - height - margin.top/2)
            .style("text-anchor", "middle")
            .text("Gender and age of refugees from " + countryStarName + " in " + countryTwoSided);

    // add titles
    svgTwoSided.append("g")
        .attr("transform", "translate(0," + height + ")")
        .append("text")
            .attr("class", "axisTitleMale")
            .attr("x", margin.left)
            .attr("y", - height + 25)
            .style("text-anchor", "middle")
            .text("Male (" + totalMale + "%)");

    svgTwoSided.append("g")
        .attr("transform", "translate(0," + height + ")")
        .append("text")
            .attr("class", "axisTitleFemale")
            .attr("x", width - margin.right)
            .attr("y", - height + 25)
            .style("text-anchor", "middle")
            .text("Female  (" + totalFemale + "%)");

    svgTwoSided.append("g")
        .attr("transform", "translate(0," + height + ")")
        .append("text")
            .attr("class", "axisTitle")
            .attr("x", width2 + labelArea/2)
            .attr("y", - height + 25)
            .style("text-anchor", "middle")
            .text("Age");

    svgTwoSided.selectAll("text.name")
        .data(ageGroups)
        .enter().append("text")
        .attr("x", width2 - labelArea + labelArea/2)
        .attr("y", function(d) { return yT(d) + yT.rangeBand()/2; })
        .attr("dy", ".20em")
        .attr("text-anchor", "middle")
        .attr("class", "ageGroups")
        .text(String);
};

function changeTitles() {
    // change the title
    svgChangeTwoSided.select(".graphTitle")
        .text("Gender and age of refugees from " + countryStarName + " in " + countryTwoSided);

    // change the axis titles
    svgChangeTwoSided.select(".axisTitleFemale")
        .text("Female  (" + totalFemale + "%)");

    svgChangeTwoSided.select(".axisTitleMale")
        .text("Male  (" + totalMale + "%)");
};

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
        .attr("x", function(pos) { return width2 - labelArea - xL(pos); })
        .attr("y", yPosByIndex)
        .attr("width", xL)
        .attr("height", yT.rangeBand())
        .attr("class", "left");

    // eventueel waar de bars vandaan komen
    svgChangeRightTwoSided.enter().append("rect")

    svgChangeRightTwoSided.transition().duration(300)
        .attr("x", width2)
        .attr("y", yPosByIndex)
        .attr("width", xR)
        .attr("height", yT.rangeBand())
        .attr("class", "right");
};

function addPercentages() {
    
    svgTwoSided.selectAll("text.leftscore")
        .data(dataTwoSidedLeft)
        .enter().append("text")
        //.attr("x", function(d) { return width2 - labelArea - xL(d); })
        .attr("y", function(d, z) { return yD(z) + yD.rangeBand()/2; })
        .attr("dx", "20")
        .attr("dy", ".36em")
        .attr("text-anchor", "end")
        .attr("class", "score")
        .text(String);

    svgTwoSided.selectAll("text.rightscore")
        .data(dataTwoSidedRight)
        .enter().append("text")
        //.attr("x", function(d) { return xR(d) + width2; })
        .attr("x", width)
        .attr("y", function(d, z) { return yD(z) + yD.rangeBand()/2; })
        .attr("dx", -5)
        .attr("dy", ".36em")
        .attr("text-anchor", "end")
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
    ageGroups = []
    j = 0

    if (origin == 0) {
        dataBarchart.forEach(function(d){
            if (d.origin == countryStarName && d.origin == d.country) {
                for (var each in d.female) {
                    if (each != "total") {
                        ageGroups[j] = each;
                        female[j] = d.female[each]
                        male[j] = d.male[each]
                        j++
                    }
                    else if(each == "total") {
                        totalFemale = d.female[each];
                        totalMale = d.male[each];
                    }
                }
            };
        });
    }
    else if (origin == 1) {
        dataBarchart.forEach(function(d){
            if (d.origin == countryStarName && d.country == countryTwoSided) {
                for (var each in d.female) {
                    if (each != "total") {
                        ageGroups[j] = each;
                        female[j] = d.female[each]
                        male[j] = d.male[each]
                        j++
                    }
                    else if(each == "total") {
                        totalFemale = d.female[each];
                        totalMale = d.male[each];
                    }
                }
            };
        });
    };

};

function makeTotalGraph() {
    dataOriginAsylum = dataOrigin
    
    var svgTotal = d3.select("#container5").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr("id", "graph")
    .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // save data in correct format
    correctDataFormatTimelineTotal();
    
    // set y-axis for default settings
    setYaxisTimelineTotal();

    // make title
    svgTotal.append("g")
        .attr("transform", "translate(0," + height + ")")
        .append("text")
            .attr("class", "graphTitle")
            .attr("x", width / 2)
            .attr("y", - height - margin.top / 2)
            .style("text-anchor", "middle")
            .text("Amount of refugees in the world over time");

    // make x axis
    svgTotal.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxisG)
        .append("text")
            .attr("class", "axisTitle")
            .attr("x", width)
            .attr("y", 50)
            .style("text-anchor", "end")
            .text("Time");

    // make y axis
    svgTotal.append("g")
        .attr("class", "y axis")
        .call(yAxisG)
        .append("text")
            .attr("class", "axisTitle")
            .attr("id", "axisTitleY")
            .attr("transform", "rotate(-90)")
            .attr("y", - 90)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Amount of refugees");

    // add line
    svgTotal.append("path")
        .attr("class", "line")
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

    for (i = 0; i < 26; i++) {
        object = {amount : 0, year: yearsTime[i], yearx: yearsString[i]}
        dataTotal[i] = object
    }

    dataOriginAsylum.forEach(function(d) {
        for (i = 0; i < 26; i++) {
            dataTotal[i].amount += +d[yearsString[i]]  
        }
    });
};

// set y-axis of timeline
function setYaxisTimelineTotal() {
    
    // define min and max for y-axis
    dataCountryAmount = dataTotal.map(function(obj){ return obj.amount; });
    maxDataCountryAmount = Math.max.apply(null, dataCountryAmount);
    minDataCountryAmount = Math.min.apply(null, dataCountryAmount);
    minY = Math.floor(minDataCountryAmount / 10) * 10;
    maxY = Math.ceil(maxDataCountryAmount / 10) * 10;

    // set domain for timeline
    xG.domain(d3.extent(yearsTime));
    yG.domain([minDataYear, maxDataCountryAmount]); 
};