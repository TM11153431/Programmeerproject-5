/*Naam: Sanne Berendschot
Studentnummer: 10269290
Minor Programmeren, Programmeerproject*/

// return the correct border color for checking conflict country
function returnCorrectBorderColor(country) {
    if (!conflictCountries.includes(country)) {
        return colorBorder;    
    }
    else {
        return "gold";
    };
};

// return the correct border width for checking conflict country
function returnCorrectBorderWidth(country, widthNormal, widthConflict) {
    if (!conflictCountries.includes(country)) {
        return widthNormal;    
    }
    else {
        return widthConflict;
    };
};

// text to show in tooltip of map
function tooltipMapText(geo, data) {
    return ["<div class=hoverinfo>",
        "<strong>", geo.properties.name, "</strong>",
        "<br>Percentage of inhabitants: <strong>", Math.round(data.amount * 1000) / 1000, "</strong>",
        "</div>"].join('');
};

// make the map
function makeMap() {
    map = new Datamap({
        
        // select correct container
        element: document.getElementById("container1"),

        // set default settings
        fills: { defaultFill: colorDefault },
        data: dataset,    
        geographyConfig: {
            
            // set border colors
            borderColor: function(d) {
                return returnCorrectBorderColor(d.id);
            },

            // set border width
            borderWidth: function(d) {
                return returnCorrectBorderWidth(d.id, 1, 3);
            },

            // set border color for mouse over
            highlightBorderColor: function(d) {
                return returnCorrectBorderColor(d.country);
            },
            
            // set border width for mouse over
            highlightBorderWidth: function(d) {
                return returnCorrectBorderWidth(d.country, 2, 4);
            },

            // set fill color for mouse over
            highlightFillColor: function(geo) {
                return geo["fillColor"] || colorDefault;

            },
            
            // make tooltip
            popupTemplate: function(geo, data) {
            
                // when data is not available, say so
                if (!data || isNaN(data.amount)) { 
                    return ["<div class=hoverinfo>",
                        "<strong>", geo.properties.name, "</strong>",
                        "<br>Data is not available","</div>"].join(''); 
                };
                
                // show correct information in tooltip
                if (absPerc == "absolute values" && linLog == "lin") { 
                    var amount = Math.round(data.amount * 10) / 10;
                    return ["<div class=hoverinfo>",
                        "<strong>", geo.properties.name, "</strong>",
                        "<br>Amount of refugees: <strong>", amount.toLocaleString(), "</strong>",
                        "</div>"].join('');
                } 
                else if (absPerc == "percentage of inhabitants" || (absPerc == "absolute values" && linLog == "log")) {
                    return tooltipMapText(geo, data);
                }
            }
        },

        // when country clicked, graph changes
        done: function(datamap) {
            datamap.svg.selectAll(".datamaps-subunit").on("click", function(geo) {
                newCountryClickedMap(geo);
            });
        }
    });
};

// make everything for the map
function makeAllOfMap() {
    
    // set default border buttons
    changeBothBordersButtons("org", "asy", " w3-half");
    changeBothBordersButtons("abs", "perc", " w3-half");
    changeBothBordersButtons("lin", "log", " w3-half");

    // find min and max for every dataset
    findMinMaxOfDatasets();

    // make function to scale values to a color for map
    makeFunctionsValueToColor();

    // set default dataset
    makeDefaultDataset();

    // set correct dataset and format for map
    correctDataFormatMap();

    // make the map
    makeMap();

    // make slider
    makeSlider();

    // make legend for world map
    makeLegendMap();
};