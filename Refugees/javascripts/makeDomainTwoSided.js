/*Naam: Sanne Berendschot
Studentnummer: 10269290
Minor Programmeren, Programmeerproject*/

// checks if new value is larger than current max
function groupIsLarger(variable, group, d) {
    if (variable < d.female[group] || variable < d.male[group]) {
        return true;
    }
    else {
        return false;
    };
};

// selects the largest of female and male
function largest(group, d) {
    return d.female[group] > d.male[group] ? d.female[group] : d.male[group];
};

// find min and max for the two sided barchart, for all age groups and young group
function findMinMaxTwoSided() {

    // check every relevant age group
    dataBarchart.forEach(function(d) {
        for (var group in d.female) {
            if (group != "total") {
                
                // check if value is larger
                if (groupIsLarger(maxTotal, group, d)) {
                    
                    // save the largest value
                    maxTotal = largest(group, d);
                };

                // check only relevant age groups
                if (group == "0-4" || group == "5-11" || group == "12-17") {
                    
                    // check if value is larger
                    if (groupIsLarger(maxYoung, group, d)) {
                        
                        // save the largest value
                        maxYoung = largest(group, d);
                    };
                };
            };
        };
    });
};

// set the domains for the two sided barchart
function setDomainsTwoSided() {
    
    // set domains
    xT = d3.scale.linear()
        .domain([0, maxTotal])
        .range([0, widthTside]);
    
    yT = d3.scale.ordinal()
        .domain(ageGroups)
        .rangeBands([50, heightT - 200]);

    array = [0, 1, 2];
    yD = d3.scale.ordinal()
        .domain(array)
        .rangeBands([50, heightT - 200]);

    // make function to change index to position
    yPosition = function(d, i) { return yD(i); };
};