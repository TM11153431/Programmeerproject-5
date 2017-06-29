/*Naam: Sanne Berendschot
Studentnummer: 10269290
Minor Programmeren, Programmeerproject*/

// add percentages as axis titles to two sided barchart
function addPercentages(select, data, x) {

    svgTwoSided.selectAll(select)
        .data(data)
        .enter().append("text")
        .attr("x", x)
        .attr("y", function(d, z) { return yD(z) + yD.rangeBand() / 2; })
        .attr("dx", "0")
        .attr("dy", ".36em")
        .attr("text-anchor", "middle")
        .attr("id", "score")
        .text(String);
};

// set the correct title for two sided barchart
function setTitleTwoSided(title) {
    svgChangeTwoSided.select(".graphTitle")
        .text(title);
};

// add titles to the two sided barchart
function addTitlesTwoSided() {

    // add main title
    svgTwoSided.append("g")
        .attr("transform", "translate(0," + heightT + ")")
        .append("text")
            .attr("class", "graphTitle")
            .attr("x", marginT.left + widthT / 2)
            .attr("y", - heightT - marginT.top / 2)
            .style("text-anchor", "middle");

    // check which title must be added
    if (currentConflictCountryName != countryTwoSided) {
        setTitleTwoSided("Gender and age of refugees from " + currentConflictCountryName + " in " + countryTwoSided);
    }
    else if (currentConflictCountryName == countryTwoSided) {
        setTitleTwoSided("Gender and age of refugees from " + currentConflictCountryName);
    };

    // add title male
    svgTwoSided.append("g")
        .attr("transform", "translate(0," + heightT + ")")
        .append("text")
            .attr("class", "axisTitle")
            .attr("x", 0)
            .attr("y", - heightT + 25)
            .style("text-anchor", "middle")
            .text("Male (" + totalMale + "%)");

    // add title female
    svgTwoSided.append("g")
        .attr("transform", "translate(0," + heightT + ")")
        .append("text")
            .attr("class", "axisTitle")
            .attr("x", marginT.left + widthT + marginT.right)
            .attr("y", - heightT + 25)
            .style("text-anchor", "middle")
            .text("Female  (" + totalFemale + "%)");

    // add title age
    svgTwoSided.append("g")
        .attr("transform", "translate(0," + heightT + ")")
        .append("text")
            .attr("class", "axisTitle")
            .attr("x", marginT.left + widthTside + labelArea / 2)
            .attr("y", - heightT + 25)
            .style("text-anchor", "middle")
            .text("Age");

    // add titles age groups
    svgTwoSided.selectAll("text.name")
        .data(ageGroups)
        .enter().append("text")
        .attr("x", marginT.left + widthTside + labelArea / 2)
        .attr("y", function(d) { return yT(d) + yT.rangeBand()/2; })
        .attr("dy", ".20em")
        .attr("text-anchor", "middle")
        .attr("id", "ageGroups")
        .text(String);
};