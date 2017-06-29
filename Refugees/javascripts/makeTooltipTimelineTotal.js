/*Naam: Sanne Berendschot
Studentnummer: 10269290
Minor Programmeren, Programmeerproject*/

// set the text for tooltip timeline correct
function setTextTooltipTimelineTotal(title, amount) {
    svgTooltipTimelineTotal.select("text.textAmount")
            .attr("transform", "translate(" + xTooltipTimeline + "," + yTooltipTimeline + ")")
            .text(title + amount.toLocaleString());
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
    var amount = +d.amount;

    // place circle on correct place
    svgTooltipTimelineTotal.select("circle.yTooltip")
        .attr("transform", "translate(" + xG(d.year) + "," + yG(d.amount) + ")");

    // place correct text in tooltip
    if (absPercTotal == "absolute values") {
        setTextTooltipTimelineTotal("Amount of refugees: ", amount);
    }
    else if (absPercTotal == "percentage of population") {
        setTextTooltipTimelineTotal("Percentage of pupulation: ", amount);
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
        .attr("transform", "translate(" + widthG * - 1 + "," + yG(d.amount) + ")")
        .attr("x2", widthG + widthG);
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