/*Naam: Sanne Berendschot
Studentnummer: 10269290
Minor Programmeren, Programmeerproject*/

// fills data array for timeline
function fillDataArrayTimeline(d, e, j) {
    
    // for every year 
    for (i = 0; i < amountOfYears; i++) {
        
        // select correct value
        if (absPerc == "absolute values") {
            var value = d[yearsString[i]];
        }
        else if (absPerc == "percentage of inhabitants") {
            var value = d[yearsString[i]] / e[yearsString[i]] * 100;
        };
        
        // check if value is a number 
        if (!isNaN(value)) {
            
            // fill data array
            dataGraphCountry[j] = {amount : value, year: yearsTime[i], yearx: yearsString[i]};
            
            // update counter
            j++;
        };
    };
};

// save data in correct format for timeline
function correctDataFormatTimelineCountry() {
    
    // start with empty array
    dataGraphCountry = [];
    
    // make counter for place in array
    var j = 0;

    // search for correct country and check for absolute or percentage
    dataOriginAsylum.forEach(function(d) {
        if (absPerc == "absolute values" && d.Country == currentCountry) {
            
            // fill data array with correct data
            fillDataArrayTimeline(d, 0, j);
        }
        else if (absPerc == "percentage of inhabitants" && d.Country == currentCountry) {
            dataPopulation.forEach(function(e) {
                if (e.countrycode == currentCountry) {
            
                    // fill data array with correct data
                    fillDataArrayTimeline(d, e, j);    
                };
            });
        };
    });
};