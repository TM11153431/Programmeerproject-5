/*Naam: Sanne Berendschot
Studentnummer: 10269290
Minor Programmeren, Programmeerproject*/

// add the data of the young group in total to the data for two sided barchart 
function addDataYoungGroupTwoSided() {
    
    // for every country
    dataBarchart.forEach(function(d){
        
        // if the data is available
        if (d.female) {

            // add the new group
            d.female["0-17"] = 0;
            d.male["0-17"] = 0;

            // search for right groups
            for (var group in d.female) {
                if (group == "0-4" || group == "5-11" || group == "12-17") {
                    
                    // calculate data for new group
                    d.female["0-17"] += d.female[group];
                    d.male["0-17"] += d.male[group];
                };
            };
        };
    });
};

// returns value rounded to tenth
function roundToTenth(value) {
    return Math.round(value * 10) / 10;
};

// fill the data array for female and male
function fillDataArraysFemaleMale(input, group, d) {
    dataFemale[input] = roundToTenth(d.female[group]);
    dataMale[input] = roundToTenth(d.male[group]);
};

// set female and male total to correct value
function setFemaleMaleTotal(group, d) {
    totalFemale = roundToTenth(d.female[group]);
    totalMale = roundToTenth(d.male[group]);
};

// make the correct data array for the selected country and age groups
function correctDataFormatTwoSided(input) {
        
    // start with empty arrays
    dataFemale = [];
    dataMale = [];

    // select correct age groups
    if (input == "young") {
        ageGroups = ["0-4", "5-11", "12-17"];
    }
    else if (input == "total") {
        ageGroups = ["0-17", "18-59", "60+"];
    };

    // search for correct country
    dataBarchart.forEach(function(d) {
        if (d.origin == currentConflictCountryName && d.country == countryTwoSided) {
            
            // search for correct groups
            for (var group in d.female) {
                
                // save correct groups in array
                if (group == ageGroups[0]) {
                    fillDataArraysFemaleMale(0, group, d);
                }
                else if (group == ageGroups[1]) {
                    fillDataArraysFemaleMale(1, group, d);
                }
                else if (group == ageGroups[2]) {
                    fillDataArraysFemaleMale(2, group, d);
                }

                // save total amounts
                else if (group == "total" && input == "total") {
                    setFemaleMaleTotal(group, d);
                }
                else if (group == "0-17" && input == "young") {
                    setFemaleMaleTotal(group, d);
                };
            };
        };
    });
};