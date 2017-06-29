/*Naam: Sanne Berendschot
Studentnummer: 10269290
Minor Programmeren, Programmeerproject*/

// save the current conflict country
function saveConflictCountry(id, name) {
    currentConflictCountry = id;
    currentConflictCountryName = name;
};

// change the border buttons and the current conflict country
function changeConflictCountryAndButtonBorder(id, name) {
    changeBorderButton(currentConflictCountry, "buttonOff", " w3-fifth");
    saveConflictCountry(id, name);
    changeBorderButton(currentConflictCountry, "buttonOn", " w3-fifth");
};

// save the correct conflict country according to input
function changeConflictCountryButton(input) {
    if (input == 0) {
        changeConflictCountryAndButtonBorder("SYR", "Syria");
    } 
    else if (input == 1) {
        changeConflictCountryAndButtonBorder("SSD", "South Sudan");
    } 
    else if (input == 2) {
        changeConflictCountryAndButtonBorder("COD", "Democratic Republic of the Congo");
    } 
    else if (input == 3) {
        changeConflictCountryAndButtonBorder("CAF", "Central African Republic");
    } 
    else if (input == 4) {
        changeConflictCountryAndButtonBorder("SOM", "Somalia");
    };
};

// change the title, the amount of refugees and the axis of the barchart
function changeTitleAmountAxisBarchart() {
    
    // select the section for applying changes
    var svgChangeBarchart = d3.select("#container3").transition();
    
    // change the title
    svgChangeBarchart.select(".graphTitle")
        .text("Refugees from " + currentConflictCountryName);

    // change the amount of refugees
    svgChangeBarchart.select("#infoRefugees")
        .text("Amount of refugees: " + amountOfRefugees.toLocaleString());

    // change the x axis
    svgChangeBarchart.select(".x.axis")
        .duration(750)
        .call(xAxisB)
            .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(-25)");

    // change the y axis
    svgChangeBarchart.select(".y.axis")
        .duration(750)
        .call(yAxisB);
};

// change the bars of the barchart
function changeBarsBarchart() {
    
    // select the bars
    var bars = svgBarchart.selectAll(".bar")
        .data(dataBarchartCountry, function(d) { return d.country; });

    // remove all the bars
    bars.exit()
        .transition()
            .duration(300)
        .attr("y", yB(0))
        .attr("height", heightB - yB(0))
        .style('fill-opacity', 1e-6)
        .remove();

    // append new bars
    bars.enter().append("rect")
        .attr("class", "bar")
        .attr("y", yB(0))
        .attr("height", heightB - yB(0))
        .attr("fill", colorBarchartRight);

    // set correct height of bars
    bars.transition()
            .duration(300)
        .attr("x", function(d) { return xB(d.country); })
        .attr("width", xB.rangeBand())
        .attr("y", function(d) { return yB(d.amount); })
        .attr("height", function(d) { return heightB - yB(d.amount); });
};

// change the barchart
function changeBarchart() {
    
    // change the title, the amount of refugees and the axis of the barchart
    changeTitleAmountAxisBarchart();

    // change the bars of the barchart
    changeBarsBarchart();

    // make sure that you can still click on the bars and tooltip stays
    enableTooltipBarchart();
};

// update barcharts when new conflict country is clicked
function updateBarcharts() { 
    
    // set the data, amount of refugees and domain of barchart correct
    setDataAmountDomainBarchart();

    // change barchart
    changeBarchart();

    // set new country for two sided barchart
    countryTwoSided = currentConflictCountryName;

    // change two-sided barchart
    changeTwoSided(2);
};

// make changes when new country is clicked by button
function newCountryClickedButton(input) {

    // save selected country
   changeConflictCountryButton(input);
    
    // update barcharts with new conflict country
    updateBarcharts();
};