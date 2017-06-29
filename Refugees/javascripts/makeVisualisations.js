/*Naam: Sanne Berendschot
Studentnummer: 10269290
Minor Programmeren, Programmeerproject*/

// load data
queue()
    .defer(d3.tsv, "Dataset Origin goed 23 juni.tsv")   
    .defer(d3.tsv, "Dataset Asylum goed 23 juni.tsv")
    .defer(d3.tsv, "Data Population Worldbank.tsv")    
    .defer(d3.json, "dataBarchart.json")    
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