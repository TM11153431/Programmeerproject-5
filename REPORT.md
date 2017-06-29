# Vluchtelingen over de hele wereld en in conflictgebieden

![Startpagina](https://github.com/smeber/Programmeerproject/blob/master/doc/Startpagina.png)

Mijn project visualiseert de vluchtelingen over de gehele wereld: Waar komen ze vandaan? en: Waar gaan ze heen? 
Daarnaast worden 5 conflictsituatie's gevisualiseerd: 
Hierin wordt duidelijk van welk land ze vluchten en naar welke nabijgelegen landen. 
Hierbij wordt ook het geslacht en leeftijd van de vluchtelingen weergegeven.
Een precieze uitleg van alle features van de website is beschreven in de README.

# Technisch design
<b>html en css</b><br>
De html code van mijn website staat in de index.html van mijn repository.
Deze code is gebouwd op één van de templates van W3Schools. 
Naast de html code heb ik één css file, waarin ik alle styling aangeef.

<b>javascript</b><br>
Mijn javascriptcode bestaat uit 25 verschillende files.
Er is een main file, die alle visualisaties maakt door de juiste functies aan te roepen, 
een file met alle globale variabelen en een file die arrays maakt voor alle jaren,
die ik gebruik door heel mijn code heen.
Daarnaast heb ik files die ik kan indelen in 5 categorieën: voor elke visualisatie één.

<em>Kaart</em><br>
Voor het maken van mijn kaart zijn 5 javascript files: 
één voor het vinden van de minimale en maximale waarden in de datasets,
één voor het maken van de juiste dataset,
eén voor het maken van de legenda,
één voor het maken van de slider,
en tot slot één voor het daadwerkelijk maken van de kaart.

<em>Tijdlijn land</em><br>
Voor het maken van de tijdlijn per land zijn 3 javascript files:
één voor het maken van de dataset,
één voor het maken van de assen,
en één voor het maken van de tooltip.

<em>Tijdlijn wereld</em><br>
Precies dezelfde files qua functionaliteit van de tijdlijn per land zijn er ook voor het maken van de tijdlijn van de wereld.
Er is één file die beide tijdlijnen daadwerkelijk maakt.
Daarnaast is er één file die de veranderingen toepast voor de kaart en beide tijdlijnen.

<em>Barchart</em><br>
Voor het maken van de barchart zijn 4 javascript files:
één voor het maken van de dataset, 
één voor het maken van de assen, 
één voor het daadwerkelijk maken van de barchart (waarbij ook de tooltip wordt gedefinieerd),
en één voor het maken van de veranderingen voor de barchart.

<em>Two-sided barchart</em><br>
Voor de two-sided barchart zijn precies dezelfde files qua functionaliteit als de barchart gemaakt,
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

# Leerproces
Tijdens deze vier weken ben ik door veel ups en downs gegaan. ;)
Hieronder licht ik toe welke problemen ik in de afgelopen tijd ben tegen gekomen en wat ik geleerd heb tijdens dit vak.

<b>Challenges</b><br>
Aan het begin moest ik mijn datasets in het goede format krijgen, 
wat mij heel veel pijn en moeite heeft gekost. 
Ik vond dit ontzettend ingewikkeld, omdat ik niet precies snapte wat er gebeurde. 
Nu, aan het einde van dit vak, zit dit helemaal in mijn vingers en heb ik hier totaal geen moeite meer mee. 
Daarnaast heb ik veel moeite gehad met de tooltip van de tijdlijnen. 
Sowieso was het lastig om deze te implementeren, en daarnaast wilde ik deze tooltips graag in één functie voor beide grafieken, 
omdat de code bijna hetzelfde is. 
Helaas werkte dit helemaal niet en is het me niet gelukt om dit goed te krijgen. 
Ook bij een andere functie waarbij ik een svg wilde meegeven was dit lastig, 
waardoor ik besloten heb om dit later op te lossen. 
Helaas was er aan het einde geen tijd meer voor om dit op te schonen en in één functie te zetten. 
Verder heb ik veel moeite gehad met de styling van dingen.
Het was heel lastig om dingen op de goede plek te krijgen:
De landen in de menubalk op één lijn, de buttons op de goede plek, de grafieken op de goede plek, 
maar ook de two-sided barchart was lastig goed te plaatsen. 
Gelukkig is dit allemaal gelukt en ziet mijn website er mooi uit!

<b>Verworven kwaliteiten</b><br>
Over het algemeen vond ik het dat het meeste heel erg goed lukte, 
wanneer ik er rustig voor ging zitten en dingen op internet op zocht.
Eerlijk gezegd had ik niet echt een goede start,
aangezien ik de opdrachten van Data Processing niet heel goed gemaakt had,
en d3 nog niet goed snapte.
Gelukkig is dit helemaal opgelost tijdens dit vak en kan ik nu goed programmeren met d3!
Ik vind het nu relatief makkelijk om dingen aan te passen en op te zoeken.
Daarnaast heb ik echt een website leren bouwen, wat ik ontzettend gaaf vind! 
Persoonlijk vind ik dat het er mooi uitziet,
wat mij telkens energie gaf om het nog beter en mooier te maken.
Ik heb ook zeer bewuste design choices gemaakt en vond het erg leuk en goed om hierover na te denken.
Tot slot heb ik geleerd om netjes te werken, alles bij te houden,
code goed en duidelijk neer te zetten, te commenten, in functies te plaatsen en zelfs in verschillende files.
Het was tot slot zeer leerzaam om samen met je groepje telkens een stapje verder te komen.

# Design keuzes
Door de vier weken heen zijn veel design keuzes gemaakt. 
Hieronder licht ik per deel van de website het idee erachter toe.

<b>Home</b><br>
Als startpagina heb ik een aangrijpende foto gekozen, om de aandacht te trekken van mensen.
Waarschijnlijk zijn mensen geraakt en daardoor geïnteresseerd om verder te kijken.
Links bovenin staan 5 knoppen, 
waardoor het voor de gebruiker makkelijk is om gelijk naar de informatie te scrollen die zij willen zien.
Ik heb de website in deze 5 delen opgedeeld, omdat ik dit logisch vond.
Er is een duidelijk onderscheid tussen de twee grafieken die een overzicht geven over de hele wereld
en de twee grafieken die een overzicht geven voor de conflictgebieden.
Daarnaast is het belangrijk om mensen een inleiding te geven, 
zodat zij weten wat er op de website te vinden is.

<b>Story</b><br>
Dit deel is er tijdens het maken van de website bijgekomen, 
maar is wel een belangrijk onderdeel van het verhaal dat de website brengt.
De story wordt gebruikt om de gebruiker een inleiding te geven voor de website,
een kader waarin de website gemaakt is.
Voordat de gebruiker de data induikt, op gedetailleerd niveau, 
vond ik het belangrijk dat de gebruiker allereerst een overzicht krijgt 
van de ontwikkeling van aantallen vluchtelingen over de hele wereld. 
Met deze kennis is de rest van de visualisaties beter te plaatsen.
Aangezien absolute getallen niet altijd een goed beeld geven,
heb ik ervoor gekozen om de gebruiker de mogelijkheid te geven om ook te kijken naar het percentage vluchtelingen van de populatie.
Deze visualisatie geeft de ontwikkeling over tijd weer, waardoor ik voor een lijngrafiek heb gekozen.
Tot slot wordt een definitie van vluchtelingen gegeven,
omdat dit belangrijk is voor het kader waarin de website geschreven is.

<b>World overview</b><br>
<em>Algemeen</em><br>
Na de inleiding over vluchtelingen over de hele wereld, duiken we dieper de data in, 
en kan er gekeken worden naar vluchtelingen uit landen en naar landen toe.
Omdat dit een wereld overzicht is, heb ik gekozen voor een foto die een soort overzicht geeft: 
het is vanuit een hoog perspectief genomen, waardoor er overzicht is van het kamp.

<em>Kaart</em><br>
In deze sectie kunnen alle landen vergeleken worden met elkaar, en worden de verschillen zichtbaar gemaakt.
Hierbij is er de mogelijkheid om tussen absolute waarden en percentages te kiezen,
tussen origine en asiel en tussen lineaire en logaritmische schaal.
Om duidelijk te maken voor de gebruiker dat dit knoppen zijn, 
én om duidelijk te maken welke knoppen op dit moment 'aan' staan, 
heb ik een omlijning om de tekst heen gezet, waarvan de data op dat moment weergeven wordt.
De zes verschillende variabelen heb ik zo gekomen, omdat ik de variabelen absoluut/percentage en origine/asiel 
zeer relevant vind voor de website en het beeld van de gebruiker.
Aangezien er één land is waaruit zóveel mensen vluchten, 
wordt het contrast tussen de andere landen niet meer zichtbaar.
Dat is de reden waarom ook de logaritmische schaal is toegevoegd,
om op deze manier de verschillen tussen de rest van de landen duidelijk te maken.
Ik heb ervoor gekozen om de wereldkaart standaard op absolute waarden, origine en lineaire schaal te zetten,
omdat dit voor mensen het meest tastbare is, 
en om duidelijk te maken dat er uit Syrië op dit moment ontzettend veel mensen vluchten.
De kleur van de landen waarvan geen data beschikbaar is, heb ik grijs gemaakt,
omdat dit intuïtief voor mensen betekent dat er geen data beschikbaar is.
Deze kleur kan daarnaast niet verward worden met een kleur van de kleurenschaal,
waardoor dit geen probleem vormt.
Ik heb gekozen voor een kleurenschaal voor de kaart,
boven het gebruik van een paar 'buckets', omdat dit preciezer is.
De kleurenschaal van origin/asylum blijft altijd gelijk, 
terwijl de kleurenschaal verandert wanneer op absolute/percentage of lineair/logaritmisch geklikt wordt.
Dit heb ik gedaan omdat op deze manier asylum en origin beter met elkaar vergeleken kunnen worden, 
dan wanneer je deze schaal wel mee laten veranderen tussen de twee categorieën.
Ik heb een slider aan de kaart toegevoegd,
zodat mensen duidelijk de ontwikkelingen over de tijd kunnen zien, over de hele wereld.
Deze heb ik standaard op 2015 gezet, aangezien dit de meest acutele data is,
en de website in het teken van de acutaliteit gemaakt is.
Toen ik met het project begon had ik bedacht om sterren op m'n kaart te plakken, 
op de conflictlanden, waar je op kan klikken.
Later vond ik dit toch niet zo'n mooi en praktisch idee, 
aangezien je dan het land én zijn kleur minder goed ziet, 
wat naar mijn idee heel erg onhandig is en een deel van de functionaliteit wegneemt. 
In plaats hiervan heb ik ervoor gekozen om de vijf conflictlanden een dikke en opvallende rand te geven,
zodat wel duidelijk wordt welke landen de conflictlanden zijn, 
en er een link naar het volgende deel is.
Aangezien deze visualisatie een vergelijking is tussen landen heb ik een wereldkaart gebruikt.

<em>Tijdlijn land</em><br>
Om de ontwikkelingen over tijd per land duidelijk te maken kan er op een land geklikt worden,
waardoor de tijdlijn verandert.
Op deze manier is per land heel duidelijk te zien hoe de vluchtelingen aantallen zijn veranderd over de tijd heen.
Ik heb ervoor gekozen om deze grafiek mee te laten veranderen 
wanneer op absolute waarden/percentage of origine/asiel wordt geklikt, 
maar niet wanneer de lineaire/logaritmische schaal wordt aangepast. 
De logaritmische schaal zegt namelijk niet zoveel wanneer naar één land gekeken wordt.
Deze schaal is zeer nuttig om de verschillen tussen landen duidelijk te maken,
maar verliest zijn waarde wanneer ingezoomd wordt op één land.
Daarnaast vinden mensen deze schaal vaak moeilijk te interpreteren.
De y-as van de grafiek heb ik laten meeveranderen per land, 
omdat op deze manier het verloop veel beter zichtbaar is 
en deze grafiek niet bedoeld is om verschillende landen met elkaar te vergelijken,
daar is de kaart al voor!
De tooltip die ik heb toegevoegd heb ik vastgezet op één plek.
Dit vind ik rustiger dan wanneer de tekst meespringt naast de muis.
De plek waar de tekst staat vind ik mooi passen in het geheel.
Aangezien deze visualisatie een ontwikkeling over tijd is heb ik een lijngrafiek gebruikt.

<em>Informatie</em><br>
Onder de twee visualisaties staan drie blokken tekst met informatie.
Er is een quote uit een actueel niewsbericht van de BBC, 
om wederom de relevantie van de website aan te tonen.
Voor de geïnteresseerden kan er op de link geklikt worden, om het artikel helemaal te lezen.
Daarnaast wordt een korte uitleg van de functionaliteit van de grafieken beschreven, 
om zeker te maken dat de gebruiker alle features weet te vinden.
Tot slot wordt er een kort overzicht gegeven van interessante data die gevonden is met behulp van de visualisatie.
Dit is gedaan om de gebruiker nog meer mee te nemen in de visualisatie,
en dat de gebruiker precies weet hoe alles geïnterpreteerd kan worden.
Nu kan de gebruiker zelf aan de slag en wellicht nog meer interessante dingen vinden!

<b>Conflictgebieden</b><br>
<em>Algemeen</em><br>
Nu een beeld gevormd is van de vluchtelingen over de hele wereld, 
kan nog dieper de data ingedoken worden en ingezoomd worden op de vijf conflictgebieden.
Aangezien ik het te heftig vond om een foto van een daadwerkelijk conflict te plaatsen,
heb ik gekozen voor een foto met kinderen.
In de data die in deze sectie wordt weergegeven is namelijk aandacht besteed aan verschillende leeftijdsgroepen van vluchtelingen, 
en hieruit blijkt dat er veel kinderen op de vlucht zijn.
In de menubalk onder de foto staan de vijf conflictgebieden, op aflopende aantallen.
Op deze manier wordt aangegeven vanuit welk land de meeste vluchtelingen komen. 
Op deze landen kan geklikt worden, waardoor de grafieken eronder veranderen. 
Deze grafieken kunnen ook veranderd worden door op één van de conflictgebieden te klikken in de kaart erboven 
(die met de gele rand :)). 
De buttons waren oorspronkelijk niet het plan en heb ik later toegevoegd, 
zodat er makkelijk geswitcht kan worden tussen conflictlanden.
De kaart is namelijk op dat moment redelijk ver weg.
Wederom heb ik gekozen voor een rand om de tekst heen wanneer deze data op dat moment wordt weergeven,
om de hierboven genoemde redenen.

<em>Barchart</em><br>
De barchart laat de landen zien waar vluchtelingen heen gaan, vanuit het gekozen conflictgebied.
Aan het begin stond in deze barchart ook het conflictland zelf,
maar dit was zeer onlogisch omdat de rest van de landen optelt tot dit land.
Hierdoor werd de y-as veel langer, waardoor de verschillen tussen de andere landen minder goed zichtbaar werden,
terwijl dit juist het doel is van deze visualisatie! 
Omdat ik de informatie over het totale aantal vluchtelingen niet verloren wilde laten gaan,
heb ik ervoor gekozen om dit getal bij de grafiek te plaatsen.
Wanneer over de landen gehovered wordt, 
zijn de absolute aantallen van vluchtelingen te zien en verandert de bar van kleur.
Wanneer deze geel oplicht betekent dit dat er data beschikbaar is voor de rechter grafiek,
en wanneer deze grijs oplicht is dit niet het geval.
Ik vond deze kleuren wederom intuïtief, waardoor het naar mijn idee een goede keuze is.
Daarnaast vind ik het handig dat je van tevoren weet of er data beschikbaar is,
zodat de gebruiker niet onnodig hoeft te klikken.
Aangezien deze visualisatie een vergelijking laat zien tussen de verschillende landen, heb ik een barchart gebruikt.

<em>Two-sided barchart</em><br>
De two-sided barchart rechts laat het geslacht en leeftijdsgroep van de vluchtelingen zien.
Op deze manier kan goed vergeleken worden of er relatief veel ouderen of jongeren vluchten en naar welke landen.
Om ook duidelijk te maken welk geslacht relatief veel vlucht, kunnen deze waarden afgelezen worden bij de assen.
Ik heb ervoor gekozen om het domein bij elke weergave hetzelfde te houden, 
zodat het verschil tussen landen goed gezien kan worden.
De gebruiker kan zien of het balkje groeit of juist krimpt.
Aan het begin had deze visualisatie vijf leeftijdsgroepen: 0-4, 5-11, 12-17, 18-59 en 60+. 
Aangezien deze leeftijdsgroepen zeer onevenredig verdeeld zijn, gaf dit een verkeerd beeld van de situatie.
De groep van 18-59 was (natuurlijk) altijd veel groter dan de andere groepen.
Daarom heb ik ervoor gekozen om de groepen 0-4, 5-11 en 12-17 bij elkaar te voegen, 
om hier de groep 'jongeren' van te maken.
Nu kunnen duidelijk de jongeren, volwassenen en ouderen met elkaar vergeleken worden.
Deze groepen zijn meer evenredig, en hebben een duidelijke betekenis,
waardoor ik denk dat dit een goede verdeling is van de leeftijdsgroepen.
Om de informatie niet verloren te laten gaan over de verschillen in de jongere groep,
is er de mogelijkheid om ofwel op de bars te klikken, 
ofwel de andere leeftijdsgroepen aan te klikken door middel van het dropdown menu.
Wanneer gekozen wordt voor de jongere groep, 
zijn de leeftijdsgroepen wederom ongeveer evenredig verdeeld,
waardoor dit een mooi beeld geeft van de verdeling van vluchtelingen onder jongeren.
Aangezien deze visualisatie een vergelijking over twee variabelen weergeeft, heb ik een two-sided barchart gebruikt.

<em>Informatie</em><br>
Wederom staat er onder deze twee grafieken een korte uitleg over de grafieken en een beschrijving van opmerkelijke data,
om dezelfde reden als hierboven gegeven is. 
Daarnaast wordt informatie gegeven over de vijf conflictlanden.
Hierin wordt kort de situatie in dat land toegelicht, 
en kan wederom doorgeklikt worden naar een relevant en actueel nieuwsbericht,
om de gebruiker nog meer informatie te verschaffen over het onderwerp.

<b>Contact en footer</b><br>
<em>Algemeen</em><br>
Deze foto heb ik gekozen, omdat hier het einde is van mijn webpagina.
Ik vind het mooi dat de kinderen je als het ware 'uitzwaaien'.

<em>Contact</em><br>
Dit deel van de website heb ik gemaakt zodat mensen mij kunnen bereiken als zij vragen hebben.
Ik ben altijd bereid om toelichting te geven wanneer mensen daarom vragen. :)

<em>Footer</em><br>
Tot slot heb ik een footer gebruikt om mijn bronnen en andere gegevens weer te geven, 
aangezien dit natuurlijk ontzettend belangrijk is!

<b>Algemene opmerkingen</b>
- De kleuren op de website zijn zo gekozen omdat ik dit in het geheel vond passen. 
Aangezien ik het accent op de visualisaties willde leggen
heb ik de kleuren in de grafieken een heldere en krachtige kleur gegeven (rood en geel), 
terwijl de achtergrond en tekst relatief rustig is (grijs).
- Ik heb bewust gekozen om foto's van Arabisch uitziende vluchtelingen af te wisselen voor Afrikaanse ogende vluchtelingen,
om duidelijk te maken dat uit beide delen van de wereld vluchtelingen komen.
Op dit moment worden voornamelijk de Syrische vluchtelingen vaak benoemd,
terwijl er, gezien mijn visualisaties, ook een heel groot deel uit Afrika komt.
- Bij alle getallen heb ik een komma bij de duizendtallen geplaatst, zodat het makkelijker te lezen is.
