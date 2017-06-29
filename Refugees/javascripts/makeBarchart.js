/*Naam: Sanne Berendschot
Studentnummer: 10269290
Minor Programmeren, Programmeerproject*/

// initialize svg for barchart, add title, amount of refugees and tooltip
function initializeBarchartTitleAmountTooltip() {
    
    // initialize svg for barchart
    svgBarchart = d3.select("#container3").append("svg")
        .attr("width", widthB + marginB.left + marginB.right)
        .attr("height", heightB + marginB.top + marginB.bottom)
        .append("g")
            .attr("transform", "translate(" + marginB.left + "," + marginB.top + ")");

    // make title
    svgBarchart.append("g")
        .attr("transform", "translate(0," + heightB + ")")
        .append("text")
            .attr("class", "graphTitle")
            .attr("x", widthB / 2)
            .attr("y", - heightB - marginB.top / 2)
            .style("text-anchor", "middle")
            .text("Refugees from " + currentConflictCountryName);

    // add amount of refugees to graph
    svgBarchart.append("g")
        .attr("transform", "translate(0," + heightB + ")")
        .append("text")
            .attr("id", "infoRefugees")
            .attr("x", 0)
            .attr("y", - heightB - marginB.top / 4)
            .style("text-anchor", "begin")
            .text("Amount of refugees: " + amountOfRefugees.toLocaleString());
    
    // append tooltip
    tooltipBarchart = d3.select("body")
        .append("div")
        .attr("id", "tooltipBarchart")
        .style("position", "absolute")
        .style("z-index", "10")
        .style("visibility", "hidden");
};

// enable the tooltip works at the barchart
function enableTooltipBarchart() {
   
    // select all bars
    d3.selectAll(".bar")
        .on("mouseover", function(d) { 
            // if data is available, show bright color
            if (d.data == "yes") {
                d3.select(this)
                    .attr("fill", colorBarchartLeft);
            // if data is not available, show grey color
            } else if (d.data == "no") {
                d3.select(this)
                    .attr("fill", "grey");
            };
            // show information
            return tooltipBarchart.style("visibility", "visible").text("Amount " + d.country + ": " + d.amount.toLocaleString()); })
        .on("mousemove", function() { return tooltipBarchart.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px"); })
        .on("mouseout", function() { 
            // make sure barchart changes to original color
            d3.select(this)
                .attr("fill", colorBarchartRight);
            return tooltipBarchart.style("visibility", "hidden"); })
        .on("click", function(d) { countryTwoSided = d.country; changeTwoSided(2) });
};

// make the bars for the barchart
function makeBarsBarchart() {

    svgBarchart.selectAll(".bar")
        .data(dataBarchartCountry)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return xB(d.country); })
        .attr("y", function(d) { return yB(d.amount); })
        .attr("height", function(d) { return heightB - yB(d.amount); })
        .attr("width", xB.rangeBand())
        .attr("fill", colorBarchartRight);

    enableTooltipBarchart();
};

// set the data, amount of refugees and domain of barchart correct
function setDataAmountDomainBarchart() {
    
    // put data in correct format
    correctDataFormatBarchart();

    // set the amount of refugees correct
    setAmountOfRefugeesCorrect();
    
    // set new domain of barchart
    setDomainBarchart();
};

// make the barchart
function makeBarchart() {

    // set default button border
    changeBorderButton("SYR", "buttonOn", " w3-fifth");
    changeBorderButton("SSD", "buttonOff", " w3-fifth");
    changeBorderButton("SOM", "buttonOff", " w3-fifth");
    changeBorderButton("COD", "buttonOff", " w3-fifth");
    changeBorderButton("CAF", "buttonOff", " w3-fifth");

    // initialize the axis for the barchart            
    initializeAxisBarchart();

    // set the data, amount of refugees and domain of barchart correct
    setDataAmountDomainBarchart();

    // initialize svg for barchart, add title, amount of refugees and tooltip
    initializeBarchartTitleAmountTooltip();

    // make both axis for barchart
    makeAxisBarchart();

    // make bars for barchart
    makeBarsBarchart();
};