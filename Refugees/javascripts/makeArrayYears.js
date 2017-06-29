/*Naam: Sanne Berendschot
Studentnummer: 10269290
Minor Programmeren, Programmeerproject*/

// make arrays for the years as a string and in time, and note amount of years
function makeArraysYears() {
    
    // make functions to parse date (also for tooltip)
    parseTime = d3.time.format("%Y").parse;
    bisectDate = d3.bisector(function(d) { return d.year; }).left;

    // set counter
    var j = 0;

    // for every year
    for (year = 1990; year < 2016; year++) {
        
        // update array
        yearsTime[j] = parseTime(year.toString());
        yearsString[j] = year.toString();
        
        // update counter
        j++;
    };

    // note amount of years
    amountOfYears = yearsString.length;
};