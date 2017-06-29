/*Naam: Sanne Berendschot
Studentnummer: 10269290
Minor Programmeren, Programmeerproject*/

// make array with all countries summed up
function makeArraysWorldRefugeesPopulation(data) {
    
    // start with empty array
    dataArray = [];

    // for every country and year
    data.forEach(function(d) {
        for (i = 0; i < amountOfYears; i++) {
            
            // if the year doesn't exist yet, make new object
            if (!dataArray[i]) {
                dataArray[i] = {amount: 0, year: yearsTime[i], yearx: yearsString[i]};
            };
            
            // check if value is a number
            if (!isNaN(d[yearsString[i]])) {
                dataArray[i].amount += +d[yearsString[i]];
            };
        };
    });

    // return the data array
    return dataArray;
};

// save data in correct format for timeline
function correctDataFormatTimelineTotal() {

    // make an array for total refugees and one for total population over time
    dataTotalAbs = makeArraysWorldRefugeesPopulation(dataOrigin);
    dataTotalPop = makeArraysWorldRefugeesPopulation(dataPopulation);

    // for every year, calculate percentage and save in array
    for (i = 0; i < amountOfYears; i++) {
        var perc = dataTotalAbs[i].amount / dataTotalPop[i].amount * 100;
        dataTotalPerc[i] = {amount: perc, year: yearsTime[i], yearx: yearsString[i]};
    };
};