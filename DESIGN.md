# Programmeerproject Sanne Berendschot

# Visualisaties
Er zijn 4 visualisaties, die als volgt geplaats worden:
![Visualisatie overview](https://github.com/smeber/Programmeerproject/blob/master/doc/Visualisatie%20overview.jpg)

De visualisaties zijn als volgt:

1. Wereldkaart - 
   Dit is een kaart met overview, de start van de visualisatie.
   De kaart laat met kleuren de hoeveelheden van vluchtelingen per land zien.
   Gekozen kan worden voor origin/asylum en absolute waarden/percentages van inwoners.
   Wanneer op een land geklikt wordt, verandert visualisatie 2.
   Onder de kaart is een slider, waarmee je de situatie over tijd kan zien.
   Wanneer de slider op het laatste jaar staat, zijn er 5 sterren te zien op de kaart, overeenkomend met de 5 conflictsituaties.
   Op deze sterren kan geklikt worden, waardoor visualisatie 3 en de kaart verandert:
   De hele kaart wordt grijs, behalve het conflictgebied.
   In het conflictgebied verschijnen pijlen, die wijzen van welk land naar welk land de vluchtelingen stromen. 
   Hoe dikker de pijl, des te meer vluchtelingen.
   Nu kan ook op de landen geklikt worden, waardoor visualisatie 4 verandert.
   
   ![Visualisatie 1](https://github.com/smeber/Programmeerproject/blob/master/doc/Visualisatie%201.jpg)
      
2. Tijdlijn van land - 
   Deze visualisatie is een line graph van het land dat is aangeklikt.
   Op de y-as staan de aantallen (of percentages als dit is aangeklikt?) vluchtelingen en op de x-as staat de tijd.
   Deze grafiek bevat een tooltip: de precieze waarden worden weergegeven wanneer over de lijn gehovered wordt.
   
   ![Visualisatie 2](https://github.com/smeber/Programmeerproject/blob/master/doc/Visualisatie%202%20nieuw.jpg)
   
3. Uitstroom naar landen - 
   Deze visualisatie is een barchart van de hoeveelheid vluchtelingen in alle instroomlanden en blijft gelijk per conflictgebied.
   Elke bar is een land, waarheen de vluchtelingen vluchten.
   De hoogte geeft aan hoeveel vluchtelingen vanuit het vluchtland naar dat land zijn gevlucht.
   Eventueel kan hier een tooltip aan toegevoegd worden, waarbij de precieze waarden weergegeven worden.
   
   ![Visualisatie 3](https://github.com/smeber/Programmeerproject/blob/master/doc/Visualisatie%203%20nieuw.jpg)
   
4. Geslacht en leeftijd van vluchtelingen - 
   Deze visualisatie is een two-sided barchart van het land dat is aangeklikt.
   Elke bar is een leeftijdsgroep en de lengte van de bar geeft de hoeveelheid vluchtelingen per geslacht aan in die leeftijdsgroep.
   De bar naar links geeft de hoeveelheid mannen aan, naar rechts de hoeveelheid vrouwen.
   Hierbij worden de percentuele waarden weergegeven naast de bars, en de absolute gegevens met behul van een tooltip.
   
   ![Visualisatie 4](https://github.com/smeber/Programmeerproject/blob/master/doc/Visualisatie%204%20nieuw.jpg)

# Data
Voor dit project wordt data van The World Bank en van UNHCR gebruikt. 
Er zijn twee datasets nodig: één voor de wereldkaart en de tijdlijn (visualisatie 1 en 2) en één voor de informatie per conflictgebied (visualisatie 3 en 4). 
De twee datasets worden één keer in het goede format gemaakt en vervolgens gebruikt voor de visualisaties.
Op deze sites zijn ook vergelijkbare visualisaties te vinden, die ik heb gebruikt om mijn eigen idee vorm te geven.

# Code
Mijn plan is om één main file te maken, waarin de datasets worden ingeladen en alle functies aangeroepen worden. 
In 4 andere files, voor elke visualisatie één, staan de relevante functies voor die visualisatie.

# Libraries
De libraries die gebruikt zijn, zijn als volgt: D3, Queue, Datamaps, Topojson en Bootstrap

# Plan
Stappenplan van stukjes code die ik in volgorde ga uitvoeren:
- Wereldkaart 
- Tijdlijn linken aan wereldkaart
- Knoppen Origin/Asylum
- Slider wereldkaart voor verschillende jaren
- Dataset voor visualisatie 3 en 4 in goed format
- Barchart
- Barchart linken aan wereldkaart
- Two-sided barchart
- Two-sided barchart linken aan wereldkaart
- Sterren op wereldkaart
- Pijlen maken
- Tooltips maken
- Eventueel knoppen voor abs/% maken
- Layout mooi maken
- Code opschonen
