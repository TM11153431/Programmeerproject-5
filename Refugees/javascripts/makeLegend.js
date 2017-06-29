/*Naam: Sanne Berendschot
Studentnummer: 10269290
Minor Programmeren, Programmeerproject*/

// MAKE LEGEND

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

// make legend for world map
function makeLegendMap() {
    
    // select the correct section
    var svgMap = d3.select(".datamap");
    
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

// CHANGE LEGEND

// change title and scale of axis of legend
function changeTitleAndAxisLegend(title, min, max) {
    svgChangeLegend.select("#legendTitle")
        .text(title);

    setScaleLegend(min, max);
};

// check for lin or log and change the title and axis of the legend
function checkLinLogAndChange(titleLin, minLin, maxLin, titleLog, minLog, maxLog) {
    if (linLog == "lin") {
        changeTitleAndAxisLegend(titleLin, minLin, maxLin);
    }
    else if (linLog == "log") {
        changeTitleAndAxisLegend(titleLog, minLog, maxLog);
    };
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