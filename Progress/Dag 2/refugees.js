/*Naam: Sanne Berendschot
Studentnummer: 10269290
Minor Programmeren, Programmeerproject*/

// make global variables for the data
var map;
var dataColorsFrom  = {};
var dataColorsTo = {};
var dataOriginAsylum;
var toFrom;
var newCountry = "BOL";
var nameCountry = "Bolivia";
var dataCountry = [];
var dataCountryAmount;
var dataOrigin;
var dataAsylum;

// parse the date
var parseTime = d3.time.format("%Y").parse;

// set outlines for graph
var margin = {top: 50, right: 40, bottom: 60, left: 60},
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

// load data
queue()
    .defer(d3.tsv, "Dataset Origin goed.tsv")   
    .defer(d3.tsv, "Dataset Asylum goed.tsv")    
    .await(makeGraph)

// make the two data visualisations
function makeGraph(error, datasetOrigin, datasetAsylum) {

    // check for error
    if (error) throw error;

    // save the data
    dataOrigin = datasetOrigin
    dataAsylum = datasetAsylum

    // make world map

    // find min and max of data in specific year for legend
    var dataYear = dataOrigin.map(function(obj){ return obj[2015]; });
    var maxDataYear = Math.max.apply(null, dataYear);
    var minDataYear = Math.min.apply(null, dataYear);

    // make function to scale values to a color
    var color = d3.scale.linear()
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

                // define new dataset for new country
                dataOriginAsylum.forEach(function(d) {
                    if (d.Country == newCountry) {
                        for (i = 0; i < 26; i++) {
                            object = {amount : d[yearsString[i]], year: yearsTime[i]}
                            dataCountry[i] = object;
                        }
                    }
                });

                // define the line for new country
                var lineNewCountry = d3.svg.line()
                    .x(function(d) { return x(d.year); })
                    .y(function(d) { return y(d.amount); });

                // define new min and max for y axis
                dataCountryAmount = dataCountry.map(function(obj){ return obj.amount; });
                var maxDataCountryAmount = Math.max.apply(null, dataCountryAmount);
                var minDataCountryAmount = Math.min.apply(null, dataCountryAmount);
                var minY = Math.floor(minDataCountryAmount /100) * 100;
                var maxY = Math.ceil(maxDataCountryAmount / 100) * 100;

                // scale the range of the data again
                x.domain(d3.extent(yearsTime));
                y.domain([minY, maxY]); 

                // select the correct section for change
                var svg = d3.select("#container2").transition();

                // change the title
                svg.select(".graphTitle")
                    .text("Amount of refugees " + toFrom + " " + nameCountry + " over time");

                // change the line
                svg.select(".line")
                    .duration(750)
                    .attr("d", lineNewCountry(dataCountry));
        
                // change the y axis
                svg.select(".y.axis")
                    .duration(750)
                    .call(yAxis);
            });
        }
    });

    // make legend for world map

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


    // make graph for refugees over time

    // initialize svg
    var svgGraph = d3.select("#container2").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .attr("id", "graph")
        .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // save data in correct format
    dataOrigin.forEach(function(d) {
        if (d.Country == "BOL") {
            for (i = 0; i < 26; i++) {
                object = {amount : d[yearsString[i]], year: yearsTime[i]}
                dataCountry[i] = object;
            }
        }
    });

    // find min and max for y axis
    dataCountryAmount = dataCountry.map(function(obj){ return obj.amount; });
    var maxDataCountryAmount = Math.max.apply(null, dataCountryAmount);
    var minDataCountryAmount = Math.min.apply(null, dataCountryAmount);
    var minY = Math.floor(minDataCountryAmount /100) * 100;
    var maxY = Math.ceil(maxDataCountryAmount / 100) * 100;

    // scale the range of the data (default settings)
    x.domain(d3.extent(yearsTime));
    y.domain([minY, maxY]); 

    // make title
    svgGraph.append("g")
        .attr("transform", "translate(0," + height + ")")
        .append("text")
            .attr("class", "graphTitle")
            .attr("x", width / 2)
            .attr("y", - height - margin.top / 2)
            .style("text-anchor", "middle")
            .text("Amount of refugees " + toFrom + " " + nameCountry + " over time");

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
            .attr("y", - 55)
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

    /*// define tooltip for showing the data
    var div = d3.select("#containerGraph").append("div") 
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
            .data(dataOriginAsylum)     
            
            // make scatterplot
            .enter().append("circle")               
                .attr("r", 3)
                .attr("id", "circle")
                .style("fill", "brown")   
                .attr("cx", function(d) { return x(d.Year); })     
                .attr("cy", function(d) { return y(d[newCountry]); })   
                
                // show information when on line
                .on("mouseover", function(d) {
                    div.transition()    
                        .duration(200)    
                        .style("opacity", .9);    
                    div .html("Year: " + d.Yearx + 
                            "<br/>Aantal vluchtelingen: " 
                            + Math.round(d[newCountry] * 10) / 10)  
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
    });*/

    // make barchart
    makeBarchart();
};

// update the data when men is clicked
function updateDataTo() {

    // use correct data
    dataset = dataColorsTo;
    dataOriginAsylum = dataAsylum;
    map.options.data = dataColorsTo;
    toFrom = "to";
    newCountry = "BOL";
    nameCountry = "Bolivia"

    // update colors in map
    map.updateChoropleth(dataset)

    // save new data
    dataOriginAsylum.forEach(function(d) {
        if (d.Country == "BOL") {
            for (i = 0; i < 26; i++) {
                object = {amount : d[yearsString[i]], year: yearsTime[i]}
                dataCountry[i] = object;
            }
        }
    });

    // define new min and max for y axis
    dataCountryAmount = dataCountry.map(function(obj){ return obj.amount; });
    var maxDataCountryAmount = Math.max.apply(null, dataCountryAmount);
    var minDataCountryAmount = Math.min.apply(null, dataCountryAmount);
    var minY = Math.floor(minDataCountryAmount /100) * 100;
    var maxY = Math.ceil(maxDataCountryAmount / 100) * 100;

    // scale the range of the data again
    x.domain(d3.extent(yearsTime));
    y.domain([minY, maxY]); 

    // select the section for applying changes
    var svgChange = d3.select("#graph").transition();

    // change the title
    svgChange.select(".graphTitle")
        .text("Amount of refugees " + toFrom + " " + nameCountry + " over time");

    // change the line
    svgChange.select(".line")
        .duration(750)
        .attr("d", lineCountry(dataCountry));

    // change the y axis
    svgChange.select(".y.axis")
        .duration(750)
        .call(yAxis);
};

// update the data when women is clicked
function updateDataFrom() {

    // use correct data
    dataset = dataColorsFrom;
    dataOriginAsylum = dataOrigin;   
    map.options.data = dataColorsFrom; 
    toFrom = "from";
    newCountry = "BOL";
    nameCountry = "Bolivia"

    // update colors in map
    map.updateChoropleth(dataset)

    // save new data
    dataOriginAsylum.forEach(function(d) {
        if (d.Country == "BOL") {
            for (i = 0; i < 26; i++) {
                object = {amount : d[yearsString[i]], year: yearsTime[i]}
                dataCountry[i] = object;
            }
        }
    });

    // define new min and max for y axis
    dataCountryAmount = dataCountry.map(function(obj){ return obj.amount; });
    var maxDataCountryAmount = Math.max.apply(null, dataCountryAmount);
    var minDataCountryAmount = Math.min.apply(null, dataCountryAmount);
    var minY = Math.floor(minDataCountryAmount /100) * 100;
    var maxY = Math.ceil(maxDataCountryAmount / 100) * 100;

    // scale the range of the data again
    x.domain(d3.extent(yearsTime));
    y.domain([minY, maxY]); 

    // select the section for applying changes
    var svgChange = d3.select("#container2").transition();

    // change the title
    svgChange.select(".graphTitle")
        .text("Amount of refugees " + toFrom + " " + nameCountry + " over time");

    // change the line
    svgChange.select(".line")
        .duration(750)
        .attr("d", lineCountry(dataCountry));

    // change the y axis
    svgChange.select(".y.axis")
        .duration(750)
        .call(yAxis);

};

// make the barchart
function makeBarchart() {
    
    // make scale for barchart
    var xB = d3.scale.ordinal()
        .rangeRoundBands([0, width], .4);

    var yB = d3.scale.linear()
        .range([height, 0]);

    // initialize svg
    var chart = d3.select("#container3").append("svg")
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
            .text("Refugees from Syria");

    // load data
    d3.csv("Life Expectancy 2015 goed.csv", type, function(error, dataB) {

        // set domain
        xB.domain(dataB.map(function(d) { return d.Country; }));
        yB.domain([0, Math.ceil(d3.max(dataB, function(d) { return d.LExp; })/10)*10]);

        // make x axis
        chart.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);
        chart.append("text")
            .attr("class", "axisTitle")
            .attr("x", width/2+margin.left)
            .attr("y", height + margin.bottom/1.5)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Country");

        // make y axis
        chart.append("g")
            .attr("class", "y axis")
            .call(yAxis);
        chart.append("text")
            .attr("class", "axisTitle")
            .attr("transform", "rotate(-90)")
            .attr("x", - height/2)
            .attr("y", - margin.left)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Amount of refugees");

        // make bars
        chart.selectAll(".bar")
            .data(dataB)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function(d) { return xB(d.Country); })
            .attr("y", function(d) { return yB(d.LExp); })
            .attr("height", function(d) { return height - yB(d.LExp); })
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
    });

    function type(d) {
      d.LExp = +d.LExp; // coerce to number
      return d;
    }
}