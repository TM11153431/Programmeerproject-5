/*Naam: Sanne Berendschot
Studentnummer: 10269290
Minor Programmeren, Programmeerproject*/

// MAKE DATASET

// fill the dataset with the correct values
function fillDataset(value, color, country) {
    dataset[country] = { amount: value, fillColor: color, country: country };
};

// check if value is a number and fill data array with correct values
function checkNumberFillDataset(valueLin, ifNumber, country) {
    if (!isNaN(valueLin)) {
        ifNumber;
    }
    else {
        fillDataset("not available", colorDefault, country);
    };
};

// check if value is zero and fill data array with correct values
function checkZeroFillDataset(valueLin, valueLog, colorLog, country) {
    if (valueLin != 0) {
        fillDataset(valueLog, colorLog(valueLog), country);
    }
    else {
        fillDataset(valueLog, colorLeft, country);
    };
};

// check for lin and log and fill data array with correct values
function checkLinLogFillDataset(valueLin, valueLog, colorLin, colorLog, country) {

    // check for lin and log
    if (linLog == "lin") {

        // check if value is a number and fill data array with correct values
        checkNumberFillDataset(valueLin, fillDataset(valueLin, colorLin(valueLin), country), country);
    }
    else if (linLog == "log") {

        // check if value is a number and fill data array with correct values
        checkNumberFillDataset(valueLin, checkZeroFillDataset(valueLin, valueLog, colorLog, country), country);
    };
};

// function to change value to color
function color(min, max) {
    
    colorFunction = d3.scale.linear()
        .domain([min, max])
        .range([colorLeft,colorRight]);

    return colorFunction;
};

// make functions to change value to color
function makeFunctionsValueToColor() {
    
    // make function for changing linear/absolute value to color
    colorLinAbs = color(minLinAbs, maxLinAbs);

    // make function for changing linear/percentage value to color
    colorLinPerc = color(minLinPerc, maxLinPerc);

    // make function for changing logarithm/absolute value to color
    colorLogAbs = color(minLogAbs, maxLogAbs);

    // make function for changing logarithm/percentage value to color
    colorLogPerc = color(minLogPerc, maxLogPerc);
};

// calculate and select the correct dataset for the map
function correctDataFormatMap() {

    // empty data array
    dataset = {};

    // check every country
    dataOriginAsylum.forEach(function(d) {
        
        // save variables
        var country = d.Country;
        var refugees = +d[currentYear];

        // check for absolute or percentage
        if (absPerc == "absolute values") {

            // check for lin and log and fill data array with correct values
            checkLinLogFillDataset(refugees, Math.log(refugees), colorLinAbs, colorLogAbs, country);
        }
        else if (absPerc == "percentage of inhabitants") {
            
            // search for correct country
            dataPopulation.forEach(function(e) {
                if (d.Country == e.countrycode) {
                    
                    // save variables
                    var population = +e[currentYear];
                    var refugeesPerc = refugees / population * 100;

                    // check for lin and log and fill data array with correct values
                    checkLinLogFillDataset(refugeesPerc, Math.log(refugeesPerc), colorLinPerc, colorLogPerc, country);
                };
            });
        };
    });
};

// MAKE DEFAULT DATASET

// fill the default dataset
function fillDefaultDataset(data) {
    data.forEach(function(d) {
        datasetDefault[d.Country] = { fillColor: colorDefault };
    });
};

// make a default dataset for resetting
function makeDefaultDataset() {
    fillDefaultDataset(dataOrigin);
    fillDefaultDataset(dataAsylum);
};