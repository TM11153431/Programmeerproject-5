/*Naam: Sanne Berendschot
Studentnummer: 10269290
Minor Programmeren, Programmeerproject*/

// change one border button
function changeBorderButton(id, onOff, halfFifth) {
    document.getElementById(id).setAttribute("class", onOff + halfFifth);
}

// change one border of the button off and one on
function changeBothBordersButtons(idOn, idOff, halfFifth) {
    changeBorderButton(idOn, "buttonOn", halfFifth);
    changeBorderButton(idOff, "buttonOff", halfFifth);
};

// change relevant variables when button is clicked
function changeVariablesButton(input) {
    if (input == 0) {
        toFrom = "from";
        dataOriginAsylum = dataOrigin;
        changeBothBordersButtons("org", "asy", " w3-half");
    }
    else if (input == 1) {
        toFrom = "to";
        dataOriginAsylum = dataAsylum;
        changeBothBordersButtons("asy", "org", " w3-half");
    }
    else if (input == 2) {
        absPerc = "absolute values";
        changeBothBordersButtons("abs", "perc", " w3-half");
    }
    else if (input == 3) {
        absPerc = "percentage of inhabitants";
        changeBothBordersButtons("perc", "abs", " w3-half");
    }
    else if (input == 4) {
        linLog = "lin";
        changeBothBordersButtons("lin", "log", " w3-half");
    }
    else if (input == 5) {
        linLog = "log";
        changeBothBordersButtons("log", "lin", " w3-half");
    }; 
};

// update the data and colors of the map
function updateColorsMap() {
    
    // update data for the map
    correctDataFormatMap();
    
    // reset map
    map.updateChoropleth(datasetDefault);
    
    // update colors in map
    map.updateChoropleth(dataset);
};

// change the title of timeline to correct title
function changeTitleTimeline(title) {
    svgChangeTimeline.select(".graphTitle")
        .text(title + toFrom + " " + currentCountryName + " per year in " + absPerc);
};

// remove axis from graph
function removeGraph() {
    svgGraphCountry.selectAll("#axisYTimeline").remove();
    svgGraphCountry.selectAll("#axisXTimeline").remove();
};

// change the graph of the timeline
function changeGraphTimeline() {

    // select correct section for applying changes
    svgChangeTimeline = d3.select("#container2").transition();
    
    // if country is clicked without data
    if (dataGraphCountry.length == 0) {
        
        // change the title
        changeTitleTimeline("Data is not available for refugees ");

        // remove the graph
        removeGraph();

        // disable tooltip
        svgGraphCountry.select("#tooltipTimeline")
            .on("mouseover", function() { svgTooltipTimelineCountry.style("display", "none"); })
            .on("mousemove", null);
    }
    
    // if country is clicked with data
    else {
        
        // change title
        changeTitleTimeline("Amount of refugees ");

        // remove the graph
        removeGraph();

        // add axis of timeline
        makeAxisTimelineCountry();

        // enable tooltip again
        svgGraphCountry.select("#tooltipTimeline")
            .on("mouseover", function() { svgTooltipTimelineCountry.style("display", null); })
            .on("mousemove", mousemoveCountry)
    };

    // change the line
    svgChangeTimeline.select(".line")
        .duration(750)
        .attr("d", lineCountry(dataGraphCountry));    
};

// update data, axis and graph of timeline
function updateTimeline() {

    // save new data for timeline
    correctDataFormatTimelineCountry();

    // set y axis again for timeline
    setYAxisTimelineCountry();

    // change the graph of the timeline
    changeGraphTimeline();
};

// make changes when new country is clicked on map
function newCountryClickedMap(geo) {

    // save the selected country
    currentCountry = geo.id;
    currentCountryName = geo.properties.name;

    // update data, axis and graph of timeline
    updateTimeline();

    // change barcharts if one of 5 conflict countries is clicked
    if (conflictCountries.includes(currentCountry)) {
        
        // update conflict country and change button borders
        changeConflictCountryAndButtonBorder(geo.id, geo.properties.name);
        
        // update barcharts with new conflict country    
        updateBarcharts();
    };
};

// update the data when a button is clicked
function updateButton(input) {

    // change relevant variables
    changeVariablesButton(input);

    // update the data and colors of the map
    updateColorsMap();

    // update legend
    changeLegendMap();

    // update data, axis and graph of timeline
    updateTimeline();
};

// update the total graph when button is clicked
function updateGraphTotal(input) {
    
    // select the section for applying changes
    svgChangeTimelineTotal = d3.select("#container5").transition();
    
    // check which change must be made
    if (input == 0) {

        // update variable and dataset
        absPercTotal = "absolute values";
        dataTotal = dataTotalAbs;

        // update title
        setTitleYAxisGraphTotal("Amount of refugees");
    }
    else if (input == 1) {
        
        // update variable and dataset
        absPercTotal = "percentage of population";
        dataTotal = dataTotalPerc;

        // update title
        setTitleYAxisGraphTotal("Percentage of population");
    };

    // change the title
    svgChangeTimelineTotal.select(".graphTitle")
        .text("Amount of refugees in the world over time in " + absPercTotal);

    // change y axis
    setYAxisTimelineTotal();

    svgChangeTimelineTotal.select(".y.axis")
        .duration(750)
        .call(yAxisG);

    // change the line
    svgChangeTimelineTotal.select(".line")
        .duration(750)
        .attr("d", lineCountry(dataTotal));
};