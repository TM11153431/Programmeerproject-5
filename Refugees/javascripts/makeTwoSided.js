/*Naam: Sanne Berendschot
Studentnummer: 10269290
Minor Programmeren, Programmeerproject*/

// initialize svg and bars for two sided barchart
function initializeTwoSidedBars() {
    
    // initialize svg
    svgTwoSided = d3.select("#container4").append("svg")
        .attr("width", widthT + marginT.left + marginT.right + 100)
        .attr("height", heightT + marginT.top + marginT.bottom)
        .append("g")
            .attr("transform", "translate(" + marginT.left + "," + marginT.top + ")");

    // initialize left rectangles
    svgTwoSided.selectAll("rect.left")
        .data(dataMale)
        .enter().append("rect")
        .attr("x", function(d) { return marginT.left + widthTside - xT(d); })
        .attr("y", yPosition)
        .attr("class", "left")
        .attr("width", xT)
        .attr("height", yT.rangeBand());

    // initialize right rectangles
    svgTwoSided.selectAll("rect.right")
        .data(dataFemale)
        .enter().append("rect")
        .attr("x", marginT.left + widthTside + labelArea)
        .attr("y", yPosition)
        .attr("class", "right")
        .attr("width", xT)
        .attr("height", yT.rangeBand());
};

// enables the tooltip for the two sided barchart
function enableTooltipTwoSided(abs) {
    return tooltipBarchart.style("visibility", "visible").text("Absolute value: " + abs.toLocaleString());
};

// add the tooltip to the bars of two sided barchart
function addTooltipToBars(leftRight) {
    
    // select correct secction
    d3.selectAll(leftRight)
       
        // add tooltip
        .on("mouseover", function(d) { 
            
            // search for correct country and return tooltip
            if (currentConflictCountryName == countryTwoSided) { 
                
                // calculate absolute value
                var abs = Math.round(d * amountOfRefugees / 100); 
                enableTooltipTwoSided(abs);
            } 
            else { 
                dataBarchartCountry.forEach(function(e) {
                    if (e.country == countryTwoSided) {
                        
                        // calculate absolute value
                        var abs = Math.round(d * e.amount / 100); 
                        enableTooltipTwoSided(abs);
                    };
                });
            };
        })
        .on("mousemove", function() { return tooltipBarchart.style("top", (event.pageY - 10)+"px").style("left",(event.pageX + 10)+"px"); })
        .on("mouseout", function() { return tooltipBarchart.style("visibility", "hidden"); })
        
        // change two sided barchart on click
        .on("click", function(d) { 
            if (youngTotal == "total") {
                changeTwoSided(0); 
            }
            else if (youngTotal == "young") {
                changeTwoSided(1);
            };
        });
};

// make the two sided barchart
function makeTwoSidedBarchart() { 

    // add the data of the young group in total to the data for two sided barchart
    addDataYoungGroupTwoSided();

    // make the correct data array for the selected country and age groups
    correctDataFormatTwoSided("total");

    // find min and max for the two sided barchart, for all age groups and young group
    findMinMaxTwoSided();

    // set domains for two sided barchart
    setDomainsTwoSided();

    // initialize svg and bars for two sided barchart
    initializeTwoSidedBars();

    // add tooltip to the bars
    addTooltipToBars("rect.left");
    addTooltipToBars("rect.right");

    // add percentages as axis titles
    addPercentages("text.leftscore", dataMale, 0);
    addPercentages("text.rightscore", dataFemale, marginT.left + widthT + marginT.right);

    // select the section for applying changes
    svgChangeTwoSided = d3.select("#container4").transition();

    // add the tiltes for two sided barchart
    addTitlesTwoSided();
};