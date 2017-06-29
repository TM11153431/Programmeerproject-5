/*Naam: Sanne Berendschot
Studentnummer: 10269290
Minor Programmeren, Programmeerproject*/

// make correct data format for barchart
function correctDataFormatBarchart() {
    
    // start with empty data array
    dataBarchartCountry = [];

    // initialize counter
    var j = 0;

    // search for correct country
    dataBarchart.forEach(function(d){
        if (d.origin == currentConflictCountryName && d.origin != d.country) {
            
            // save country and amount in array
            dataBarchartCountry[j] = {"country": d.country, "amount": d.amount};
            
            // check if data about gender and age is available, and store as well
            if (d.female) {
                dataBarchartCountry[j].data = "yes";
            }
            else {
                dataBarchartCountry[j].data = "no";
            };

            // update counter
            j++;
        };
    });
};

// set the amount of refugees correct for barchart
function setAmountOfRefugeesCorrect() {
    dataBarchart.forEach(function(d){
        if (d.origin == currentConflictCountryName && d.origin == d.country) {
            amountOfRefugees = d.amount;
        };
    }); 
};