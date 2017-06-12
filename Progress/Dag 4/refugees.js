/*Naam: Sanne Berendschot
Studentnummer: 10269290
Minor Programmeren, Programmeerproject*/

// make global variables for the data
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
var countryStar = "SSD";
var countryStarName = "South Sudan";

var dataBarchart;
var newData;
var chart;
var svgChangeChart;

// parse the date
var parseTime = d3.time.format("%Y").parse;

// set outlines for graph
var margin = {top: 50, right: 40, bottom: 60, left: 150},
    width = 800 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// set the ranges
var x = d3.time.scale()
    .rangeRound([0, width]);

var y = d3.scale.linear()
    .rangeRound([height, 0]);

// make array for the years as a string and in time
var yearsTime = []
var yearsString = []
j = 0
for (i = 1990; i < 2016; i++) {
    year = i.toString();
    parsed = parseTime(year)
    yearsTime[j] = parsed
    yearsString[j] = year
    j++
};

// make function to draw the line
var lineCountry = d3.svg.line()
    .x(function(d) { return x(d.year); })
    .y(function(d) { return y(d.amount); });

// initialize x axis
var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

// initialize y axis
var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

// make scale for barchart
var xB = d3.scale.ordinal()
    .rangeRoundBands([0, width], .4);

var yB = d3.scale.linear()
    .range([height, 0]);

// initialize x axis
var xAxisB = d3.svg.axis()
    .scale(xB)
    .orient("bottom");

// initialize y axis
var yAxisB = d3.svg.axis()
    .scale(yB)
    .orient("left");

// load data
queue()
    .defer(d3.tsv, "Dataset Origin goed.tsv")   
    .defer(d3.tsv, "Dataset Asylum goed.tsv")    
    .defer(d3.json, "dataBarchart3.json")    
    .await(makeVisualisations)

// make the two data visualisations
function makeVisualisations(error, datasetOrigin, datasetAsylum, datasetBarchart3) {

    // check for error
    if (error) throw error;

    // save the data
    dataOrigin = datasetOrigin;
    dataAsylum = datasetAsylum;
    dataBarchart = datasetBarchart3;

    // make world map

    // find min and max of data in specific year for legend
    var dataYear = dataOrigin.map(function(obj){ return obj[2015]; });
    maxDataYear = Math.max.apply(null, dataYear);
    minDataYear = Math.min.apply(null, dataYear);

    // make function to scale values to a color
    color = d3.scale.linear()
        .domain([minDataYear,maxDataYear])
        .range(["#FFB266","brown"]);

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

    // set default datasets
    dataset = dataColorsFrom
    dataOriginAsylum = dataOrigin
    toFrom = "from"

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
            .text("Amount of refugees " + toFrom + " " + nameCountry + " per year");

    // make x axis
    svgGraph.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .append("text")
            .attr("class", "axisTitle")
            .attr("x", width)
            .attr("y", 50)
            .style("text-anchor", "end")
            .text("Time");

    // make y axis
    svgGraph.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
            .attr("class", "axisTitle")
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
        .attr("stroke", "brown")
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
                .style("fill", "brown")   
                .attr("cx", function(d) { return x(d.year); })     
                .attr("cy", function(d) { return y(d.amount); })
                
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
};

// save data in correct format for timeline
function correctDataFormatTimeline() {
    dataOriginAsylum.forEach(function(d) {
        if (d.Country == newCountry) {
            for (i = 0; i < 26; i++) {
                object = {amount : d[yearsString[i]], year: yearsTime[i], yearx: yearsString[i]}
                dataCountry[i] = object;
            }
        }
    });
};

// set y-axis of timeline
function setYaxisTimeline() {
    
    // define min and max for y-axis
    dataCountryAmount = dataCountry.map(function(obj){ return obj.amount; });
    maxDataCountryAmount = Math.max.apply(null, dataCountryAmount);
    minDataCountryAmount = Math.min.apply(null, dataCountryAmount);
    minY = Math.floor(minDataCountryAmount /100) * 100;
    maxY = Math.ceil(maxDataCountryAmount / 100) * 100;

    // set domain for timeline
    x.domain(d3.extent(yearsTime));
    y.domain([minY, maxY]); 
};

// change the graph of the timeline
function changeGraphTimeline() {

    // select the section for applying changes
    svgChangeTimeline = d3.select("#container2").transition();

    // change the title
    svgChangeTimeline.select(".graphTitle")
        .text("Amount of refugees " + toFrom + " " + nameCountry + " per year");

    // change the line
    svgChangeTimeline.select(".line")
        .duration(750)
        .attr("d", lineCountry(dataCountry));

    // change the y axis
    svgChangeTimeline.select(".y.axis")
        .duration(750)
        .call(yAxis);
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
                value = +d[year];
                //value = Math.log(value)
            if (toFrom == "from") {
                dataColorsFrom[country] = { amount: value, fillColor: color(value) };
                dataset = dataColorsFrom;
            } else if (toFrom == "to") {
                dataColorsTo[country] = { amount: value, fillColor: color(value) };
                dataset = dataColorsTo;
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
        .attr("stop-color", "#FFB266");

    // set the darkest color
    linearGradient.append("stop") 
        .attr("offset", "100%")   
        .attr("stop-color", "brown");

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
function updateDataToFrom(ToOrFrom) {

    // use correct data
    if (ToOrFrom == 0) {
        dataset = dataColorsFrom;
        dataOriginAsylum = dataOrigin;   
        map.options.data = dataColorsFrom; 
        toFrom = "from";
    } else if (ToOrFrom == 1) {
        dataset = dataColorsTo;
        dataOriginAsylum = dataAsylum;
        map.options.data = dataColorsTo;
        toFrom = "to";
    } else {
        console.log("You didn't define ToOrFrom")
    }    

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
        scope: "world",
        
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
        },

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

                if (newCountry == "SYR" || newCountry == "SOM" || newCountry == "SSD" || newCountry == "CAF" || newCountry == "COD") {
                    countryStar = geo.id;
                    countryStarName = geo.properties.name
                    console.log(countryStar)    
                };

                // define new dataset for new country
                correctDataFormatTimeline();

                // set y-axis again
                setYaxisTimeline();

                // change the graph of the timeline
                changeGraphTimeline();

                newData = []
                j = 0
                dataBarchart.forEach(function(d){
                    if (d.origin == countryStarName) {
                        newData[j] = {"country": d.country, "amount": d.amount};
                        j++;
                    };
                });
                
                // set domain
                xB.domain(newData.map(function(d) { return d.country; }));
                yB.domain([0, Math.ceil(d3.max(newData, function(d) { return d.amount; })/1000000)*1000000]);

                // select the section for applying changes
                svgChangeChart = d3.select("#container3").transition();
                
                // change the title
                svgChangeChart.select(".graphTitle")
                    .text("Refugees from " + countryStarName);

                // change the line
                svgChangeChart.select(".bar")
                    .duration(750)
                    .attr("d", lineCountry(dataCountry));

                // change the y axis
                svgChangeChart.select(".x.axis")
                    .duration(750)
                    .call(xAxisB);

                // change the y axis
                svgChangeChart.select(".y.axis")
                    .duration(750)
                    .call(yAxisB);
            });
        }
    });
};

// make the barchart
function makeBarchart() {

    console.log(dataBarchart)

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

    newData = []
    j = 0
    dataBarchart.forEach(function(d){
        if (d.origin == countryStarName) {
            newData[j] = {"country": d.country, "amount": d.amount};
            j++;
        };
    });
    
    // set domain
    xB.domain(newData.map(function(d) { return d.country; }));
    yB.domain([0, Math.ceil(d3.max(newData, function(d) { return d.amount; })/1000000)*1000000]);

    // make x axis
    chart.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxisB);
    chart.append("text")
        .attr("class", "axisTitle")
        .attr("x", width/2)
        .attr("y", height + 30)
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
        .data(newData)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return xB(d.country); })
        .attr("y", function(d) { return yB(d.amount); })
        .attr("height", function(d) { return height - yB(d.amount); })
        .attr("width", xB.rangeBand());

    /*var bar = chart.selectAll("g")
        .data(data)
        .enter().append("g")
        .attr("transform", function(d, i) { return "translate(" + x(d.Country) + ",0)"; });

    bar.append("rect")
        .attr("y", function(d) { return y(d.LExp); })
        .attr("height", function(d) { return height - y(d.LExp); })
        .attr("width", x.rangeBand());

    bar.append("text")
        .attr("x", x.rangeBand() / 2)
        .attr("y", function(d) { return y(d.LExp) + 3; })
        .attr("dy", ".75em")
        .text(function(d) { return Math.round(d.LExp*10)/10; });*/
};