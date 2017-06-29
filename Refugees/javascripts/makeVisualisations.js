/*Naam: Sanne Berendschot
Studentnummer: 10269290
Minor Programmeren, Programmeerproject*/

// load data
queue()
    .defer(d3.tsv, "https://raw.githubusercontent.com/smeber/Programmeerproject/master/Refugees/data/dataOrigin.tsv")   
    .defer(d3.tsv, "https://raw.githubusercontent.com/smeber/Programmeerproject/master/Refugees/data/dataAsylum.tsv")
    .defer(d3.tsv, "https://raw.githubusercontent.com/smeber/Programmeerproject/master/Refugees/data/dataPopulation.tsv")
    .defer(d3.json, "https://raw.githubusercontent.com/smeber/Programmeerproject/master/Refugees/data/dataBarchart.json")
    .await(makeVisualisations)

// make all data visualisations
function makeVisualisations(error, datasetOrigin, datasetAsylum, datasetPopulation, datasetBarchart) {

    // check for error
    if (error) throw error;

    // save the data
    dataOrigin = datasetOrigin;
    dataAsylum = datasetAsylum;
    dataPopulation = datasetPopulation;
    dataBarchart = datasetBarchart;

    // set default dataset
    dataOriginAsylum = dataOrigin;

    // make arrays for years
    makeArraysYears();

    // make world map
    makeAllOfMap();

    // make graph for refugees over time
    makeGraphCountry();

    // make barchart
    makeBarchart();

    // make two-sided barchart
    makeTwoSidedBarchart();

    // make total graph
    makeGraphTotal();
};
