/*Naam: Sanne Berendschot
Studentnummer: 10269290
Minor Programmeren, Programmeerproject*/

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

// set title y axis of timeline
function setTitleYAxisTimeline(title) {
    svgGraphCountry.select("#axisTitleY")
        .text(title); 
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