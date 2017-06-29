# Vluchtelingen over de hele wereld en in conflictgebieden

![Startpagina](https://github.com/smeber/Programmeerproject/blob/master/doc/Startpagina.png)

Mijn project visualiseert de vluchtelingen over de gehele wereld: Waar komen ze vandaan? en: Waar gaan ze heen? 
Daarnaast worden 5 conflictsituatie's gevisualiseerd: 
Hierin wordt duidelijk van welk land ze vluchten en naar welke nabijgelegen landen. 
Hierbij wordt ook het geslacht en leeftijd van de vluchtelingen weergegeven.
Een precieze uitleg van alle features van de website is beschreven in de README.

# Code
De html code van mijn website staat in de index.html van mijn repository.
Deze code is gebouwd op één van de templates van W3Schools. 
Naast de html code heb ik één css file, waarin ik alle styling aangeef.

Mijn javascriptcode bestaat uit 25 verschillende files.
Er is een main file, die alle visualisaties maakt door de juiste functies aan te roepen, 
een file met alle globale variabelen en een file die arrays maakt voor alle jaren,
die ik gebruik door heel mijn code heen.
Daarnaast heb ik files die ik kan indelen in 5 categorieën: van mijn 5 data visualisaties.

1. Voor het maken van mijn kaart zijn 5 javascript files: 
één voor het vinden van de minimale en maximale waarden in de datasets,
één voor het maken van de juiste dataset,
eén voor het maken van de legenda,
één voor het maken van de slider,
en tot slot één voor het daadwerkelijk maken van de kaart.

2. Voor het maken van de tijdlijn per land zijn 3 javascript files:
één voor het maken van de dataset,
één voor het maken van de assen,
en één voor het maken van de tooltip.

3. Precies dezelfde files qua functionaliteit van de tijdlijn per land zijn er ook voor het maken van de tijdlijn van de wereld.
Er is één file die beide tijdlijnen daadwerkelijk maakt.
Daarnaast is er één file die de veranderingen toepast voor de kaart en beide tijdlijnen.

4. Voor het maken van de barchart zijn 4 javascript files:
één voor het maken van de dataset, 
één voor het maken van de assen, 
één voor het daadwerkelijk maken van de barchart (waarbij ook de tooltip wordt gedefinieerd),
en één voor het maken van de veranderingen voor de barchart.

5. Voor de two-sided barchart zijn precies dezelfde files qua functionaliteit als de barchart gemaakt,
waarbij nog een extra file bestaat waar het domein van de two-sided barchart gedefinieerd wordt.

# Data
Voor dit project wordt data van The World Bank en van UNHCR gebruikt. 
Er zijn vier datasets nodig: één met informatie over land van herkomst van vluchtelingen, 
één met informatie over land van aankomst, 
één met informatie over de populatie per land 
en tot slot één met informatie over de conflictgebieden. 
Deze vier datasets zijn één keer in het goede format gemaakt en vervolgens gebruikt voor de visualisaties. 
Op de sites van The World Bank en UNHCR zijn vergelijkbare visualisaties te vinden, 
die ik heb gebruikt om mijn eigen idee vorm te geven. 
De BBC heb ik gebruikt voor de verschillende nieuwsitems die te vinden zijn op mijn website.

# Libraries
De libraries die gebruikt zijn, zijn als volgt: D3, Queue, Datamaps, Topojson en Bootstrap.

# Challenges

# Design keuzes

