/*Naam: Sanne Berendschot
Studentnummer: 10269290
Minor Programmeren, Programmeerproject*/

// make global variables

// intialize variables for saving data
var dataOriginAsylum;
var dataOrigin;
var dataAsylum;
var dataBarchart;
var dataPopulation;

// initialize variables for min and max of all data sets
var maxLinAbs = 0;
var minLinAbs = 0;
var maxLinPerc = 0;
var minLinPerc = 0;
var minLogAbs = 0;
var maxLogAbs = 0;
var minLogPerc = 0;
var maxLogPerc = 0;

// initialize variables for functions to scale value to color
var colorLinAbs;
var colorLinPerc;
var colorLogAbs;
var colorLogPerc;

// initialize all colors
var colorLeft = "#FFF6EC";
var colorRight = "#660000";
var colorBorder = "black";
var colorDefault = "#F5F5F5";
var colorBarchartLeft = "#F2D286";
var colorBarchartRight = "#A15852"; 

// initialize dataset
var dataset;
var datasetDefault = {};

// set default settings
var toFrom = "from";
var linLog = "lin";
var absPerc = "absolute values";
var absPercTotal = "absolute values"
var youngTotal = "total";
var currentYear = 2015;

// array with conflict countries
var conflictCountries = ["COD", "CAF", "SOM", "SSD", "SYR"];

// initialize variables for map
var map;

// initialize variables for legend
var xScale;
var xAxisLegend;
var svgChangeLegend;

// initialize variables for graph country
var svgGraphCountry;
var svgTooltipTimelineCountry;
var xG;
var yG;
var xAxisG;
var yAxisG;
var lineCountry;
var bisectDate;

// set outlines for graph country & total
var marginG = {top: 150, right: 40, bottom: 120, left: 150},
    widthG = 700 - marginG.left - marginG.right,
    heightG = 600 - marginG.top - marginG.bottom;

// initialize variable for dataset graph country
var dataGraphCountry = [];
var maxDataGraphCountryAmount;
var parseTime;
var yearsTime = [];
var yearsString = [];
var amountOfYears;
var xB;
var yB;
var xAxisB;
var yAxisB;

// set x and y for tooltip timelines
var xTooltipTimeline = 0;
var yTooltipTimeline = - 35;

// set variables when changing timeline
var svgChangeTimeline;
var currentCountry = "SYR";
var currentCountryName = "Syria";

// set variables for barchart
var svgBarchart;
var dataBarchartCountry;
var currentConflictCountry = "SYR";
var currentConflictCountryName = "Syria";
var amountOfRefugees;
var tooltipBarchart;

// set outlines for barchart
var marginB = {top: 100, right: 40, bottom: 120, left: 150},
    widthB = 800 - marginB.left - marginB.right,
    heightB = 600 - marginB.top - marginB.bottom;

// set variables for two-sided barchart
var svgTwoSided;
var svgChangeTwoSided;
var dataFemale;
var dataMale;
var totalFemale;
var totalMale;
var ageGroups;
var youngTotal;
var countryTwoSided = "Syria";
var maxTotal = 0;
var maxYoung = 0;
var xT;
var yT;
var yD;
var yPosition;

// set outlines for two-sided barchart
var marginT = {top: 50, right: 40, bottom: 120, left: 40},
    widthT = 900 - marginT.left - marginT.right,
    heightT = 500 - marginT.top - marginT.bottom;
var labelArea = 100;
var widthTside = (widthT - labelArea) / 2;

// initialize variables for datasets for total graph
var dataTotal = [];
var dataTotalAbs = [];
var dataTotalPop = [];
var dataTotalPerc = [];

// set variables for total graph
var svgGraphTotal;
var svgTooltipTimelineTotal;
var maxDataGraphTotalAmount;