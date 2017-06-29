/*Naam: Sanne Berendschot
Studentnummer: 10269290
Minor Programmeren, Programmeerproject*/

// update data and domain of two sided barchart
function updateDataDomainTwoSided(max, variable) {

    // update youngTotal
    youngTotal = variable;

    // update dataset
    correctDataFormatTwoSided(youngTotal);
    
    // update domain
    yT = d3.scale.ordinal()
        .domain(ageGroups)
        .rangeBands([50, heightT-200]);

    xT = d3.scale.linear()
        .domain([0, max])
        .range([0, widthTside]);
};

// remove all test from two sided barchart
function removeAllTextTwoSided() {
    svgTwoSided.selectAll("#score").remove();
    svgTwoSided.selectAll("#ageGroups").remove();
    svgTwoSided.selectAll(".axisTitle").remove();
};

// remove the bars of two sided barchart
function removeBarsTwoSided(select, data) {

    // select correct section
    var svgChangeTwoSidedData = svgTwoSided.selectAll(select)
        .data(data);

    // remove bars
    svgChangeTwoSidedData.exit()
        .transition()
            .duration(100)
        .style('fill-opacity', 1e-6)
        .remove();
};

// change two sided barchart when no data is available
function changeTwoSidedNoData() {
    
    // change the title
    setTitleTwoSided("Data is not available for refugees from " + currentConflictCountryName + " in " + countryTwoSided);

    // remove the bars
    removeBarsTwoSided("rect.left", dataMale);
    removeBarsTwoSided("rect.right", dataFemale);

    // remove all the text
    removeAllTextTwoSided();
};

// add the bars of two sided barchart
function addBarsTwoSided(select, data, x, addClass) {

    // select correct section
    var svgChangeTwoSidedData = svgTwoSided.selectAll(select)
        .data(data);
    
    // initialize rectangles
    svgChangeTwoSidedData.enter().append("rect");

    // add bars
    svgChangeTwoSidedData.transition()
        .attr("x", x)
        .attr("y", yPosition)
        .attr("width", xT)
        .attr("height", yT.rangeBand())
        .attr("class", addClass);
    
    // add tooltip to bars of two sided barchart
    addTooltipToBars("rect.left");
    addTooltipToBars("rect.right");
};

// change two sided barchart when data is available
function changeTwoSidedDataAvailable() {
  
    // remove the bars
    removeBarsTwoSided("rect.left", dataMale);
    removeBarsTwoSided("rect.right", dataFemale);

    // remove all text
    removeAllTextTwoSided();
    svgTwoSided.selectAll(".graphTitle").remove();
    
    // add the bars again
    var xLeft = function(d) { return marginT.left + widthTside - xT(d); }
    var xRight = marginT.left + widthTside + labelArea;

    addBarsTwoSided("rect.left", dataMale, xLeft, "left");
    addBarsTwoSided("rect.right", dataFemale, xRight, "right");

    // add the titles again
    addTitlesTwoSided();

    // add percentages as axis title
    addPercentages("text.leftscore", dataMale, 0);
    addPercentages("text.rightscore", dataFemale, marginT.left + widthT + marginT.right);
};

// change two sided barchart when other country is clicked
function changeTwoSided(value) {
    
    // select correct section
    svgChangeTwoSided = d3.select("#container4").transition();

    // update dataset and domains
    if (value == 0 || value == 2 && youngTotal == "young") {
        updateDataDomainTwoSided(maxYoung, "young");
    }
    else if (value == 1 || value == 2 && youngTotal == "total") {
        updateDataDomainTwoSided(maxTotal, "total");
    };

    // check if data is available
    if (dataFemale.length < 1) {
        
        // change two sided barchart when no data is available
        changeTwoSidedNoData();
    }
    else {
        
        // change two sided barchart when data is available
        changeTwoSidedDataAvailable();
    };
};