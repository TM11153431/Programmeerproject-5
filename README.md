# Programmeerproject Sanne Berendschot

# Titel
Vluchtelingen over de wereld en in conflictgebieden

# Doel
Mijn project visualiseert de vluchtelingen over de gehele wereld: Waar komen ze vandaan? en: Waar gaan ze heen?
Daarnaast worden 5 conflictsituatie's gevisualiseerd: Hierin wordt duidelijk van welk land ze vluchten en naar welke nabijgelegen landen.
Hierbij wordt ook het geslacht en leeftijd van de vluchtelingen weergegeven.

# Website
- Home

De website heeft een startpagina die de het hele scherm vult. 
Links bovenin zijn de 5 kopjes te zien waaruit mijn website bestaat: Home, Story, World overview, Conflict areas en Contact. 
Op deze knoppen kan geklikt worden, om in één keer naar de gewenste informatie te gaan.

![Startpagina](https://github.com/smeber/Programmeerproject/blob/master/doc/Startpagina.png)

- Story

De story is een korte inleiding tot mijn website. 
Allereerst wordt de relevantie van de website aangeduid en vervolgens wordt een overzicht van de ontwikkeling van vluchtelingen over de hele wereld weergegeven. 
Dit is te zien in absolute waarden, of in percentages van de wereldpopulatie.
Deze visualisatie bevat een tooltip, om de exacte waarden te zien.
Tot slot wordt de definitie van vluchtelingen beschreven.

![Story](https://github.com/smeber/Programmeerproject/blob/master/doc/Story%20all.png)

- World overview

Dit deel bevat twee visualisaties, die hieronder worden toegelicht.

1. Wereldkaart - 
   Dit is een kaart met overview, de start van de visualisatie.
   De kaart laat met kleuren de hoeveelheden van vluchtelingen per land zien.
   Gekozen kan worden voor origin/asylum, absolute waarden/percentages van inwoners en lineaire/logaritmische schaal.
   Wanneer op een land geklikt wordt, verandert visualisatie 2.
   De kaart bevat ook een slider, waarmee je de situatie over tijd kan zien.
   Vijf landen zijn goud omlijnd, dit zijn de conflictgebieden waarover meer informatie te vinden is in de volgende sectie.
   Wanneer op één van deze landen geklikt wordt, verandert visualisatie 3.
   
2. Tijdlijn van land - 
   Deze visualisatie is een line graph van het land dat is aangeklikt.
   Op de y-as staat, afhankelijk van wat aangeklikt is, 
   de absolute aantallen of de percentages van vluchtelingen. 
   Op de x-as staat de tijd.
   Deze grafiek bevat een tooltip: de precieze waarden worden weergegeven wanneer over de lijn gehovered wordt.

Onder beide visualisaties staan 3 kopjes: BBC News, Explanation en Remarkable data.
Hier wordt de relevantie nogmaals aangegeven met een actueel nieuwsbericht, 
worden de visualisaties toegelicht en is een korte beschrijving van interessante bevindingen binnen de data te gegeven.
   
   ![World overview](https://github.com/smeber/Programmeerproject/blob/master/doc/World%20overview%20all.png)

- Conflictgebieden

Dit deel bevat ook twee visualisaties, die hieronder worden toegelicht.

3. Uitstroom naar landen - 
   Deze visualisatie is een barchart van de hoeveelheid vluchtelingen in alle instroomlanden en blijft gelijk per conflictgebied.
   De conflictgebieden kan je veranderen door ofwel op de menubalk erboven te klikken, 
   ofwel op één van de conflictlanden op de kaart klikken.
   Elke bar is een land, waarheen de vluchtelingen vluchten.
   De hoogte geeft aan hoeveel vluchtelingen vanuit het vluchtland naar dat land zijn gevlucht.
   Wanneer over de bars gehovered wordt, worden de exacte waarden gegeven.
   Ook kan er op de bars geklikt worden, waardoor visualisatie 4 verandert.
   De kleur van de bar verandert in geel wanneer de data voor visualisatie 4 beschikbaar is, en grijs zo niet.
   
4. Geslacht en leeftijd van vluchtelingen - 
   Deze visualisatie is een two-sided barchart van het land dat is aangeklikt.
   Elke bar is een leeftijdsgroep en de lengte van de bar geeft de hoeveelheid vluchtelingen per geslacht aan in die leeftijdsgroep.
   De bar naar links geeft de hoeveelheid mannen aan, naar rechts de hoeveelheid vrouwen.
   Hierbij worden de percentuele waarden weergegeven naast de bars, en de absolute gegevens met behulp van een tooltip.
   Standaard staan de leeftijdsgroepen op jongeren (0-17 jaar), volwassenen (18-59 jaar) en ouderen (60+).
   Wanneer op de bars geklikt wordt, of met het dropdown menu anders gekozen wordt,
   veranderen de leeftijdsgroepen naar een specificatie van de jongere groep: 0-4 jaar, 5-11 jaar en 12-17 jaar.
   
Onder beide visualisaties staat verschillende informatie.
Allereerst 2 kopjes: Explanation en Remarkable data, 
waarbij de visualisaties worden toegelicht en een korte beschrijving van interessante bevindingen binnen de data wordt gegeven.
Daaronder staat over elk conflictgbied een korte beschrijving wat hier gaande is.
Wanneer hierop geklikt wordt, wordt doorgelinkt naar een relevant nieuwsbericht.
   
   ![Conflict areas](https://github.com/smeber/Programmeerproject/blob/master/doc/Conflict%20areas%20all.png)
   
- Contact

Tot slot bevat mijn website een contact deel, waar mijn contactgegevens te vinden zijn. 
Onderaan de website is een footer geplaatst, waarin de bronnen vermeld staan en verdere gegevens.

![Contact](https://github.com/smeber/Programmeerproject/blob/master/doc/Contact%20all.png)

# Data
Voor dit project wordt data van The World Bank en van UNHCR gebruikt. 
Er zijn vier datasets nodig: 
één met informatie over land van herkomst van vluchtelingen, 
één met informatie over land van aankomst, 
één met informatie over de populatie per land 
en tot slot één met informatie over de conflictgebieden.
Deze vier datasets zijn één keer in het goede format gemaakt en vervolgens gebruikt voor de visualisaties.
Op de sites van The World Bank en UNHCR zijn vergelijkbare visualisaties te vinden, 
die ik heb gebruikt om mijn eigen idee vorm te geven.
De BBC heb ik gebruikt voor de verschillende nieuwsitems die te vinden zijn op mijn website.

# Problemen
De grote moeilijkheid in mijn project is om te zorgen dat de sterren op de kaart goed werken, en dat de pijlen goed tevoorschijn komen.
Wanneer de sterren niet lukt, kan dit vervangen worden door een dropdown menu. Hierin staan 6 keuzes: de wereldkaart en de 5 conflictgebieden. Op die manier kunnen de verschillende kaarten weergegeven worden.
Wanneer de pijlen niet lukken, kan dit vervangen worden door de hoeveelheid vluchtelingen aan te geven met kleuren, net zoals de standaard wereldkaart.

[![BCH compliance](https://bettercodehub.com/edge/badge/smeber/Programmeerproject?branch=master)](https://bettercodehub.com/)
