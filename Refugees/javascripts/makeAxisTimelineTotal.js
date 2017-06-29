/*Naam: Sanne Berendschot
Studentnummer: 10269290
Minor Programmeren, Programmeerproject*/

// set the correct title for graph total
function setTitleYAxisGraphTotal(title) {
    svgChangeTimelineTotal.select("#axisTitleYTotal")
        .text(title);
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