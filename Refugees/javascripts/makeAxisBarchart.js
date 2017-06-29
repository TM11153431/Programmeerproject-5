/*Naam: Sanne Berendschot
Studentnummer: 10269290
Minor Programmeren, Programmeerproject*/

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

// set the domain of the barchart correct
function setDomainBarchart() {    
    xB.domain(dataBarchartCountry.map(function(d) { return d.country; }));
    yB.domain([0, Math.ceil(d3.max(dataBarchartCountry, function(d) { return d.amount; }) / 10000) * 10000]);
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