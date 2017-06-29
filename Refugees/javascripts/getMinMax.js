/*Naam: Sanne Berendschot
Studentnummer: 10269290
Minor Programmeren, Programmeerproject*/

// check if value is bigger or smaller, then save it
function checkMinMaxSave(value, minLin, maxLin, minLog, maxLog) {
    
    // check if data point is a number
    if (!isNaN(value)) {
        // save data point as new min and max if it is smaller/bigger than current
        if (value < minLin) {
            minLin = value;
        };
        if (value > maxLin) {
            maxLin = value;
        };
        // check if data point is not 0, for min of log
        if (value != 0) {
            // save data point as new min and max if it is smaller/bigger than current
            if (Math.log(value) < minLog) {
                minLog = Math.log(value);
            };
            if (Math.log(value) > maxLog) {
                maxLog = Math.log(value);
            };
        };
    };

    // return new values
    return [minLin, maxLin, minLog, maxLog];
};

// find min and max in datasets with absolute values
function findMinMaxAbsolute(data) {

    // check every data point
    data.forEach(function(d) {
        for (each in d) {
            
            // save variable
            var refugees = +d[each];

            // check if value is bigger or smaller, then save it
            var output = checkMinMaxSave(refugees, minLinAbs, maxLinAbs, minLogAbs, maxLogAbs);
            minLinAbs = output[0];
            maxLinAbs = output[1];
            minLogAbs = output[2];
            maxLogAbs = output[3];
        };
    });
};

// find min and max in datasets with percentages
function findMinMaxPercentage(data) {

    // check every data point
    data.forEach(function(d) {
        dataPopulation.forEach(function(e) {
            
            // check if country in both datasets matches
            if (d.Country == e.countrycode) {
                
                // for every year
                for (i = 0; i < amountOfYears; i++) {
                    
                    // calculate percentage
                    var perc = d[yearsString[i]] / e[yearsString[i]] * 100;

                    // check if value is bigger or smaller, then save it
                    var output = checkMinMaxSave(perc, minLinPerc, maxLinPerc, minLogPerc, maxLogPerc);
                    minLinPerc = output[0];
                    maxLinPerc = output[1];
                    minLogPerc = output[2];
                    maxLogPerc = output[3];
                };
            };
        });
    });
};

// find min and max of datasets absolute/percentage and linear/logarithm
function findMinMaxOfDatasets() {

    // find min and max absolute in data of origin
    findMinMaxAbsolute(dataOrigin);

    // find min and max absolute in data of asylum
    findMinMaxAbsolute(dataAsylum);

    // find min and max percentage in data of origin
    findMinMaxPercentage(dataOrigin);

    // find min and max percentage in data of origin
    findMinMaxPercentage(dataAsylum);
};