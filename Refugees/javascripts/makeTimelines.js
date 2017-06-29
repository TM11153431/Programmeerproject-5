/*Naam: Sanne Berendschot
Studentnummer: 10269290
Minor Programmeren, Programmeerproject*/

// initialize svg for graph and make the titles and line
function initializeGraphMakeTitleLine(countryTotal, title, data) {

    // initialize and save correct svg
    if (countryTotal == "country") {

        svgGraphCountry = d3.select("#container2").append("svg")
            .attr("width", widthG + marginG.left + marginG.right)
            .attr("height", heightG + marginG.top + marginG.bottom)
            .attr("id", "graphCountry")
            .append("g")
                .attr("transform", "translate(" + marginG.left + "," + marginG.top + ")");

        svg = svgGraphCountry;
    }
    else if (countryTotal == "total") {

        svgGraphTotal = d3.select("#container5").append("svg")
            .attr("width", widthG + marginG.left + marginG.right)
            .attr("height", heightG + marginG.top + marginG.bottom)
            .attr("id", "graphTotal")
            .append("g")
                .attr("transform", "translate(" + marginG.left + "," + marginG.top + ")");

        svg = svgGraphTotal;
    };

    // make title
    svg.append("g")
        .attr("transform", "translate(0," + heightG + ")")
        .append("text")
            .attr("class", "graphTitle")
            .attr("x", widthG / 2)
            .attr("y", - heightG - marginG.top / 2)
            .style("text-anchor", "middle")
            .text(title);

    // add line
    svg.append("path")
        .attr("class", "line")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", colorRight)
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", 1.5)
        .attr("d", lineCountry);
};

// make everything for the graph with refugees over time per country
function makeGraphCountry() {
    
    // save data in correct format
    correctDataFormatTimelineCountry();

    // initialize variables for axis
    initializeAxisAndLineTimelineCountry();

    // set y axis for default settings
    setYAxisTimelineCountry();
    
    // initialize svg for graph and make the titles and line
    var titleGraphCountry = "Amount of refugees " + toFrom + " " + currentCountryName + " per year in " + absPerc;
    initializeGraphMakeTitleLine("country", titleGraphCountry, dataGraphCountry);

    // make both axis
    makeAxisTimelineCountry();

    // add tooltip
    addTooltipTimelineCountry();
};

// make the graph with total overview
function makeGraphTotal() {

    // save data in correct format
    correctDataFormatTimelineTotal();

    // set default dataset
    dataTotal = dataTotalAbs;

    // set y axis for default settings
    setYAxisTimelineTotal();

    // initialize svg for graph and make the titles and line
    var titleGraphTotal = "Amount of refugees in the world over time in " + absPercTotal;
    initializeGraphMakeTitleLine("total", titleGraphTotal, dataTotal);

    // make both axis for graph total
    makeAxisTimelineTotal();

    // add tooltip
    addTooltipTimelineTotal();
};