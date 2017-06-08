/*Naam: Sanne Berendschot
Studentnummer: 10269290
Minor Programmeren, Programmeerproject*/

// make global variables for the data
var map;
var datasetWomen = {};
var datasetMen = {};
var WomenWorld;
var WomenTime;
var MenWorld;
var MenTime;
var genderTime;
var gender;
var newCountry = "BOL";
var nameCountry = "Bolivia";

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

// make array for the years
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

console.log(yearsTime)
console.log(yearsString)

// define the line for default country
var lineCountry = d3.svg.line()
    .x(function(d) { console.log(d); if (d.Country == "BOL") { console.log("YAAAAAAAAAAAAAAAAAAY"); for (i = 0; i < 27; i++) {console.log(i); console.log(yearsTime[i]); }}})
    .y(function(d) { if (d.Country == "BOL") { for (i = 0; i < 27; i++) {a = yearsString[i]; console.log(d); console.log(d[a]); return y(d[a]) }}})
    //.y(function(d) {console.log(d); if (d.Country == "BOL") {console.log(d[yearsTime[i]]); return y(d.BOL); }});




/* Maak voor het land een nieuwe dataset:
data = [{1990:62},
        {1991:78},
        ]
voor x:
return Object.keys(d)[0]
voor y: 
return d[Object.keys(d)[0]]*/



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
    .defer(d3.tsv, "WomenWorld.tsv")
    .defer(d3.tsv, "DataOrigin4.tsv")
    .defer(d3.tsv, "MenWorld.tsv")
    .defer(d3.tsv, "MenTime.tsv") 
    .defer(d3.tsv, "Dataset Origin Worldbank2 Met Lege Landen2.tsv")    
    .await(makeGraph)

// make the two data visualisations
function makeGraph(error, dataWomenWorld, dataOrigin, dataMenWorld, dataMenTime, dataOriginTranspone) {

    // check for error
    if (error) throw error;

    console.log(dataWomenWorld)
    console.log(dataMenTime)

    // save the data
    WomenWorld = dataWomenWorld;
    WomenTime = dataOrigin;
    MenWorld = dataMenWorld;
    MenTime = dataMenTime;
    var dataOrigin = dataOriginTranspone

    console.log(dataOrigin)

    // make world map

    // find min and max of data
    var LExpWomen = dataOrigin.map(function(obj){ return obj[2015]; });
    var maxLExpWomen = Math.max.apply(null, LExpWomen);
    var minLExpWomen = Math.min.apply(null, LExpWomen);
    //maxLExpWomen = 15
    
    var LExpMen = MenWorld.map(function(obj){ return obj.LExpVr; });
    var minLExpMen = Math.min.apply(null, LExpMen);

    // make function to scale values to a color
    var color = d3.scale.linear()
        .domain([minLExpWomen,maxLExpWomen])
        .range(["#FFB266","brown"]);

    // put data in dataset in correct format
    dataOrigin.forEach(function(d){
        var country = d.Country,
            value = +d[2015];
            //value = Math.log(value)
        datasetWomen[country] = { LExp: value, fillColor: color(value) };
    });

    MenWorld.forEach(function(d){
        var country = d.Country,
            value = +d.LExpVr;
        datasetMen[country] = { LExp: value, fillColor: color(value) };
    });

    //console.log(datasetWomen)

    datasetNew = {};    
    dataOrigin.forEach(function(d){
        //console.log(d[1990])
        if (d.Country == "VUT"){
            console.log(d.Country)
        };
        // d.hoi = +d.x2015

        // var bla = [{d.Country : d.x2015,
        // datasetNew["Year"] = parseTime("2015")
        // datasetNew["Yearx"] = "2015"},
        // {datasetNew[d.Country] = d.x2014
        // datasetNew["Year"] = parseTime("2014")
        // datasetNew["Yearx"] = "2014"}]
    });

    console.log(datasetNew)

    console.log(dataOrigin)

    // set default datasets
    dataset = datasetWomen
    genderTime = dataOrigin
    gender = "vanuit"

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
                    "<br>Aantal vluchtelingen: <strong>", Math.round(dataset[geo.id].LExp * 10) / 10, "</strong>",
                    "</div>"].join('');
            }
        },

        // when country clicked, graph below changes
        done: function(datamap) {
            datamap.svg.selectAll(".datamaps-subunit").on("click", function(geo) {

                // save the selected country
                newCountry = geo.id;
                nameCountry = geo.properties.name

                // define the line for new country
                var lineNewCountry = d3.svg.line()
                    .x(function(d) { return x(d.Year); })
                    .y(function(d) { return y(d[newCountry]); });

                // scale the range of the data again 
                x.domain(d3.extent(genderTime, function(d) { return d.Year; }));
                y.domain(d3.extent(genderTime, function(d) { return d[newCountry]; }));

                // select the correct section for change
                var svg = d3.select("#graph").transition();

                // change the title
                svg.select(".graphTitle")
                    .text("Aantal vluchtelingen " + gender + " " + nameCountry + " over tijd");

                // change the line
                svg.select(".line")
                    .duration(750)
                    .attr("d", lineNewCountry(genderTime));
        
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
        .text("Aantal vluchtelingen");

    // draw the rectangle and fill with gradient
    svgMap.append("rect")
        .attr("width", legendWidth)
        .attr("height", legendHeight)
        .style("fill", "url(#linear-gradient)")
        .style("x", xCo)
        .style("y", yCo);

    // set scale for x-axis
    var xScale = d3.scale.linear()
        .range([0, legendWidth])
        .domain([minLExpMen,maxLExpWomen]);

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


    // make graph for life expectancy over time

    // initialize svg
    var svgGraph = d3.select("#container2").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .attr("id", "graph")
        .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // save data in correct format
    WomenTime.forEach(function(d){
        d.Yearx = d.Year,
        d.Year = parseTime(d.Year);
    });

    MenTime.forEach(function(d){
        d.Yearx = d.Year,
        d.Year = parseTime(d.Year);
    });

    // scale the range of the data (default settings)
    x.domain(d3.extent(WomenTime, function(d) { return d.Year; }));
    y.domain(d3.extent(WomenTime, function(d) { return d[newCountry]; }));

    // make title
    svgGraph.append("g")
        .attr("transform", "translate(0," + height + ")")
        .append("text")
            .attr("class", "graphTitle")
            .attr("x", width / 2)
            .attr("y", - height - margin.top / 2)
            .style("text-anchor", "middle")
            .text("Aantal vluchtelingen " + gender + " " + nameCountry + " over tijd");

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
            .text("Tijd");

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
            .text("Aantal vluchtelingen");

    datasetNew2 = {};
    // define the line for default country
    dataOrigin.forEach(function(d) {
        if (d.Country == "BOL") {
            for (i = 0; i < 26; i++) {
                console.log(yearsTime[i])
                a = yearsString[i]
                console.log(d[a])
                datasetNew2[yearsTime[i]] = d[a];
            }
        }
    });
    console.log(datasetNew2)
    //datasetMen[country] = { LExp: value, fillColor: color(value) };
        /*
        .x(function(d) { console.log(d); if (d.Country == "BOL") { console.log("YAAAAAAAAAAAAAAAAAAY"); for (i = 0; i < 27; i++) {console.log(i); console.log(yearsTime[i]); }}})
        .y(function(d) { if (d.Country == "BOL") { for (i = 0; i < 27; i++) {a = yearsString[i]; console.log(d); console.log(d[a]); return y(d[a]) }}})
        *///.y(function(d) {console.log(d); if (d.Country == "BOL") {console.log(d[yearsTime[i]]); return y(d.BOL); }});




    /* Maak voor het land een nieuwe dataset:
    data = [{1990:62},
            {1991:78},
            ]
    voor x:
    return Object.keys(d)[0]
    voor y: 
    return d[Object.keys(d)[0]]*/

    // add line
    svgGraph.append("path")
        .attr("class", "line")
        .datum(dataOrigin)
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
            .text("Ga over de lijn om de exacte waarden te zien");

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
            .data(genderTime)     
            
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
};

// update the data when men is clicked
function updateDataTo() {

    // use correct data
    dataset = datasetMen;
    genderTime = MenTime;
    map.options.data = datasetMen;
    gender = "naar";
    newCountry = "BOL";

    // scale the range of the data
    x.domain(d3.extent(MenTime, function(d) { return d.Year; }));
    y.domain(d3.extent(MenTime, function(d) { return d[newCountry]; }));

    // select the section for applying changes
    var svgChange = d3.select("#graph").transition();

    // change the title
    svgChange.select(".graphTitle")
        .text("Aantal vluchtelingen " + gender + " " + nameCountry + " over tijd");

    // change the line
    svgChange.select(".line")
        .duration(750)
        .attr("d", lineCountry(MenTime));

    // change the y axis
    svgChange.select(".y.axis")
        .duration(750)
        .call(yAxis);
};

// update the data when women is clicked
function updateDataFrom() {

    // use correct data
    dataset = datasetWomen;
    genderTime = WomenTime;   
    map.options.data = datasetWomen; 
    gender = "vanuit";
    newCountry = "BOL";

    // scale the range of the data
    x.domain(d3.extent(WomenTime, function(d) { return d.Year; }));
    y.domain(d3.extent(WomenTime, function(d) { return d[newCountry]; }));

    // select the section for applying changes
    var svgChange = d3.select("#graph").transition();

    // change the title
    svgChange.select(".graphTitle")
        .text("Aantal vluchtelingen " + gender + " " + nameCountry + " over tijd");

    // change the line
    svgChange.select(".line")
        .duration(750)
        .attr("d", lineCountry(WomenTime));

    // change the y axis
    svgChange.select(".y.axis")
        .duration(750)
        .call(yAxis);
};