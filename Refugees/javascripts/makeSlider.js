/*Naam: Sanne Berendschot
Studentnummer: 10269290
Minor Programmeren, Programmeerproject*/

// update when slider is used
function update() {

    // update data and colors of the map
    updateColorsMap();

    // adjust the text on the range slider
    d3.select("#YearSlider-value").text(currentYear);
    d3.select("#YearSlider").property("value", currentYear);
};
    
// make slider for world map
function makeSlider() {

    // update map and variable when slider is used
    d3.select("#YearSlider").on("input", function() {
        currentYear = +this.value;
        update(currentYear);
    });

    // initialize with current year
    update(currentYear);
};