/*Naam: Sanne Berendschot
Studentnummer: 10269290
Minor Programmeren, Programmeerproject*/

// set text of percentage or absolute amount of refugees in tooltip
function setTextTooltipTimeline(title, amount) {
    svgTooltipTimelineCountry.select("text.textAmount")
        .attr("transform", "translate(" + xTooltipTimeline + "," + yTooltipTimeline + ")")
        .text(title + amount.toLocaleString());
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
    var amount = +d.amount;

    // place circle on correct place
    svgTooltipTimelineCountry.select("circle.yTooltip")
        .attr("transform", "translate(" + xG(d.year) + "," + yG(d.amount) + ")");

    // place correct text in tooltip
    if (absPerc == "absolute values") {
        setTextTooltipTimeline("Amount of refugees: ", amount);
    } 
    else if (absPerc == "percentage of inhabitants") {
        setTextTooltipTimeline("Percentage of inhabitants: ", amount);
    };

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