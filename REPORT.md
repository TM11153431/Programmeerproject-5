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

# Leerproces
Tijdens deze vier weken ben ik door veel ups en downs gegaan. ;)
Hieronder licht ik toe welke problemen ik in de afgelopen tijd ben tegen gekomen en wat ik geleerd heb tijdens dit vak.

Aan het begin moest ik mijn datasets in het goede format krijgen, wat mij heel veel pijn en moeite heeft gekost.
Ik vond dit ontzettend ingewikkeld, omdat ik niet precies snapte wat er gebeurde. 
Nu, aan het einde van dit vak,
zit dit helemaal in mijn vingers en heb ik hier totaal geen moeite meer mee.
Daarnaast heb ik veel moeite gehad met de tooltip van de tijdlijnen.
Sowieso was het lastig om deze te implementeren, 
en ik wilde deze tooltips graag in één functie voor beide grafieken,
omdat de code bijna hetzelfde is.
Helaas werkte dit helemaal niet en is het me niet gelukt om dit goed te krijgen.
Ook bij een andere functie wanneer ik een svg wilde meegeven deed dit lastig,
waardoor ik besloten heb om dit te laten voor later.
Helaas was er aan het einde geen tijd meer voor om dit op te schonen en in één functie te zetten.
Verder heb ik veel ruzie gehad met styling dingen, 
omdat ik het heel lastig vond om dingen op de goede plek te krijgen.
De landen in de menubalk op één lijn, de buttons op de goede plek, de grafieken op de goede plek,
maar ook de two-sided barchart was lastig goed te plaatsen.
Gelukkig is dit allemaal gelukt en ziet mijn website er mooi uit!

Over het algemeen vond ik het dat het meeste heel erg goed lukte, 
wanneer ik er rustig voor ging zitten en dingen op internet op zocht.
Eerlijk gezegd had ik niet echt een goede start,
aangezien ik de opdrachten van Data Processing niet echt goed gemaakt had,
en d3 nog niet goed snapte.
Toch is dit helemaal goed opgelost tijdens dit vak en kan ik nu goed programmeren met d3!
Ik vind het nu relatief makkelijk om dingen aan te passen en op te zoeken.

Daarnaast heb ik echt een website leren bouwen, wat ik ontzettend gaaf vind! 
Persoonlijk vind ik dat het er mooi uitziet,
wat mij telkens energie gaf om het nog beter en mooier te maken.
Ik heb ook zeer bewuste design choices gemaakt en vond het erg leuk en goed om hierover na te denken.

# Design keuzes
Door de vier weken heen zijn veel design keuzes gemaakt. 
Hieronder licht ik per deel van de website toe waarom ik hiervoor gekozen heb.

1. Home<br>
Als startpagina heb ik een aangrijpende foto gekozen, om de aandacht te trekken van mensen.
Waarschijnlijk zijn mensen geraakt en daardoor ook geïnteresseerd om verder te kijken.
Links bovenin staan 5 knoppen, 
waardoor het voor de gebruiker makkelijk is om gelijk naar de informatie te scrollen die zij willen zien.
Ik heb de website in deze 5 delen opgedeeld, omdat ik dit logisch vond.
Er is een duidelijk onderscheid tussen de twee grafieken die een overzicht geven over de hele wereld
en de twee grafieken die een overzicht geven voor de conflictgebieden.
Daarnaast is het belangrijk om mensen een inleiding te geven, 
zodat zij weten wat er op de website te vinden is.

2. Story<br>
Dit deel is er tijdens het maken van de website bijgekomen, 
maar is wel een belangrijk onderdeel van het verhaal dat de website brengt.
De story wordt gebruikt om de gebruiker een inleiding te geven voor de website,
een kader waarin de website gemaakt is.
Voordat de gebruiker de data induikt, op gedetailleerd niveau, 
vond ik het belangrijk dat de gebruiker allereerst een overzicht krijgt 
van de ontwikkeling van aantallen vluchtelingen over de hele wereld. 
Met deze kennis zijn de rest van de visualisaties beter te plaatsen.
Aangezien absolute getallen niet altijd een goed beeld geven,
heb ik ervoor gekozen om de gebruiker ook de mogelijkheid te geven om te kijken naar het percentage vluchtelingen van de populatie.
Deze visualisatie geeft de ontwikkeling over tijd weer, waardoor ik voor een lijngrafiek heb gekozen.
Tot slot wordt een definitie van vluchtelingen gegeven,
omdat dit ook belangrijk is voor het kader waarin de website geschreven is.

3. World overview<br>
Na de inleiding over vluchtelingen over de hele wereld, duiken we iets dieper de data in, 
en kan er gekeken worden naar vluchtelingen uit landen en naar landen toe.
Omdat dit een wereld overzicht is, heb ik gekozen voor een foto die een soort overzicht geeft: 
het is meer vanuit de lucht genomen en daardoor is er een overzicht te zien van het kamp.<br><br>
In deze sectie kunnen alle landen vergeleken worden om de verschillen zichtbaar te maken.
Hierbij is de mogelijkheid om tussen absolute waarden en percentages te kiezen,
tussen origine en asiel en tussen lineaire schaal en logaritmische schaal.
Dit heb ik gedaan, omdat ik de variabelen absoluut/percentage en origine/asiel zeer relevant vind voor de website, 
en het beeld van de gebruiker.
Om duidelijk te maken voor de gebruiker dat dit knoppen zijn, 
én om duidelijk te maken welke knoppen op dit moment 'aan' staan, 
heb ik een omlijning om de tekst heen gezet, waarvan de data op dat moment weergeven wordt.
Aangezien er één land is dat zóveel vluchtelingen heeft, wordt het contrast tussen de andere landen niet meer zichtbaar.
Dat is de reden dat ik ook de logaritmische schaal heb toegevoegd,
om toch ook de verschillen tussen de rest van de landen duidelijk te maken.
Ik heb ervoor gekozen om de wereldkaart standaard op absolute waarden, origine en lineaire schaal te zetten,
omdat dit voor mensen het meest tastbare is, 
en om duidelijk te maken dat er uit Syrië op dit moment ontzettend veel mensen vluchten.
De kleur van de landen waarvan geen data beschikbaar is, heb ik grijs gemaakt,
omdat dit intuïtief voor mensen betekent dat er geen data beschikbaar is.
Deze kleur kan ook niet verward worden met een kleur van de kleurenschaal,
waardoor dit geen probleem vormt.
Ik heb een kleurenschaal gebruikt voor de kaart,
omdat dit nog preciezer het aantal weergeeft, 
dan wanneer alleen een paar 'buckets' gebruikt worden.
De kleurenschaal van origin/asylum blijft altijd gelijk, 
terwijl de kleurenschaal verandert wanneer op absolute/percentage of lineair/logaritmisch geklikt wordt.
Dit vind ik logisch, omdat je dan asylum en origin beter met elkaar kan vergelijken, 
dan wanneer je deze schaal wel mee laten veranderen tussen deze categorieën.
Ik heb een slider aan de kaart toegevoegd,
zodat mensen duidelijk de ontwikkelingen over de tijd kunnen zien, over de hele wereld.
Deze heb ik standaard op 2015 gezet, aangezien dit de acutele data is,
en ik de website ook in het teken van de acutaliteit gemaakt heb.
Toen ik met het project begon had ik bedacht om sterren op m'n kaart te plakken, 
op de conflictlanden, waar je op kan klikken.
Later vond ik dit eigenlijk toch niet zo'n mooi en praktisch idee, 
aangezien je dan het land misschien niet meer goed ziet, 
en de kleur van het land ook niet, wat naar mijn idee heel erg onhandig is. 
Daarom hebben vijf landen een gele rand, wat de vijf conflitgebieden aangeeft.
Op deze manier is het wel duidelijk voor de gebruiker welke landen de conflictlanden zijn, 
en de link naar het volgende hoofdstuk duidelijk is.
Aangezien deze visualisatie een vergelijking is tussen landen heb ik een wereldkaart gebruikt.<br><br>
Om de ontwikkelingen over tijd per land duidelijk te maken,
kan er op een land geklikt worden,
waardoor de tijdlijn rechts verandert.
Op deze manier is per land heel duidelijk te zien hoe de vluchtelingen aantallen zijn veranderd over de tijd heen per land.
Ik heb ervoor gekozen om deze grafiek wel mee te laten veranderen 
wanneer op absolute waarden/percentage of origine/asiel wordt geklikt, 
maar niet bij de lineaire/logaritmische schaal, 
aangezien de logaritmische schaal niet zoveel zegt wanneer naar één land gekeken wordt.
Deze schaal is echt alleen maar relevant om de verschillen tussen landen duidelijk te maken,
maar het verliest zijn waarde wanneer ingezoomd wordt op één land.
Daarnaast vinden mensen deze schaal vaak moeilijk te interpreteren, 
en was het over het algemeen niet nodig om het verloop duidelijk weer te geven.
De y-as van de grafiek heb ik laten meeveranderen per land, 
omdat dan het verloop veel beter zichtbaar is en deze grafiek niet bedoeld is om verschillende landen met elkaar te vergelijken,
daar is de kaart al voor!
De tooltip die ik heb toegevoegd, heb ik vastgezet op één plek.
Dit vind ik rustiger dan wanneer de tekst meespringt naast de muis.
De plek waar de tekst staat vind ik mooi passen in het geheel.
Aangezien deze visualisatie een ontwikkeling over tijd is heb ik een lijngrafiek gebruikt.<br><br>
Onder de visualisaties staan drie verhaaltjes met informatie.
De meest linkse is een quote uit een actueel niewsbericht van de BBC, 
om wederom de relevantie van de website aan te tonen.
Voor de geïnteresseerden kan er op de link geklikt worden, om meer hierover te lezen.
In het midden is een korte uitleg van de functionaliteit van de grafieken, 
om zeker te weten dat de gebruiker alle features weet te vinden.
Tot slot wordt er een kort overzicht gegeven van de opmerkelijke data die gevonden kan worden in de visualisaties.
Dit is gedaan om de gebruiker nog iets meer mee te nemen in de visualisatie,
en dat de gebruiker precies weet hoe alles geïnterpreteerd kan worden.
Nu kan de gebruiker zelf aan de slag, en wellicht nog meer mooie dingen vinden!

4. Conflict areas<br>
Nu een beeld gevormd is van de vluchtelingen over de hele wereld, 
kunnen we nog dieper de data induiken en inzoomen op de vijf conflictgebieden.
Aangezien ik het naar en te heftig vond om een foto van een daadwerkelijk conflict te plaatsen,
heb ik gekozen voor een foto met kinderen. 
In de data die eronder te weergegeven wordt is namelijk ook aandacht besteed aan verschillende leeftijdsgroepen van vluchtelingen, 
en hieruit blijkt dat er veel kinderen op de vlucht zijn.
In de menubalk onder de foto staan de vijf conflictgebieden, op aflopende aantallen.
Op deze manier wordt aangegeven vanuit welk land de meeste vluchtelingen komen. 
Op deze landen kan geklikt worden, waardoor de grafieken eronder veranderen. 
Deze grafieken kunnen ook veranderd worden door op één van de conflictgebieden te klikken in de kaart erboven 
(die met de gele rand :)). 
De buttons heb ik later toegevoegd, zodat er makkelijk geswitcht kan worden tussen conflictlanden.
De kaart is namelijk op dat moment redelijk ver weg.
Wederom heb ik gekozen voor een rand om de tekst heen wanneer deze op dat moment wordt weergeven,
om de hierboven genoemde redenen.<br><br>
De barchart laat de landen zien waar vluchtelingen heen gaan, vanuit het gekozen conflictgebied.
Aan het begin had ik in deze barchart ook het conflictland zelf staan,
maar dit was zeer onlogisch omdat de rest van de landen optelt tot dit land.
Hierdoor werd moest de y-as veel langer, waardoor de verschillen tussen de andere landen minder goed zichtbaar werden,
terwijl dit juist het doel is van deze visualisatie! 
Omdat ik de informatie over het aantal vluchtelingen in totaal niet verloren wilde laten gaan,
heb ik ervoor gekozen om dit getal bij de grafiek te plaatsen.
Wanneer over de landen gehovered wordt, 
zijn de absolute aantallen van vluchtelingen te zien en verandert de bar van kleur.
Wanneer deze geel oplicht betekent dit dat er data beschikbaar is voor de rechter grafiek,
en wanneer deze grijs oplicht is dit niet het geval.
Ik vond deze kleuren wederom intuïtief, waardoor het naar mijn idee een goede keuze is.
Daarnaast vind ik het handig dat je van tevoren weet of er data beschikbaar is,
zodat de gebruiker niet onnodig hoeft te klikken.
Aangezien deze visualisatie een vergelijking laat zien tussen de verschillende landen, heb ik een barchart gebruikt.<br><br>
De two-sided barchart rechts laat het geslacht en leeftijdsgroep van de vluchtelingen zien.
Op deze manier kan goed vergeleken worden of er relatief veel ouderen of jongeren vluchten en naar welke landen.
Om ook duidelijk te maken welk geslacht relatief veel vlucht, kunnen deze waarden afgelezen worden bij de assen.
Ik heb ervoor gekozen om het domein bij elke weergave hetzelfde te houden, 
zodat ook goed het verschil tussen landen gezien kan worden.
De gebruiker kan zien of het balkje groeit of juist krimpt.
Aan het begin had ik voor deze visualisatie vijf leeftijdsgroepen: van 0-4, 5-11, 12-17, 18-59 en 60+. 
Aangezien deze leeftijdsgroepen zeer onevenredig verdeeld zijn, gaf dit een verkeerd beeld van de situatie.
De groep van 18-59 was (natuurlijk) altijd veel groter dan de andere groepen.
Daarom heb ik ervoor gekozen om de groepen 0-4, 5-11 en 12-17 bij elkaar te voegen, 
om hier de groep 'jongeren' van te maken.
Nu kunnen duidelijk de jongeren, volwassenen en ouderen vergeleken worden met elkaar.
Deze groepen zijn al meer evenredig, en hebben een duidelijke betekenis,
waardoor ik denk dat dit een goede verdeling is van de leeftijdsgroepen.
Om de informatie niet verloren te laten gaan over de verschillen in de jongere groep,
is er de mogelijkheid om ofwel op de bars te klikken, 
ofwel de andere leeftijdsgroepen aan te klikken door middel van het dropdown menu.
Wanneer gekozen wordt voor de jongere groep, 
zijn de leeftijdsgroepen wederom ongeveer evenredig verdeeld,
waardoor dit een mooi beeld geeft van de verdeling van vluchtelingen onder jongeren.
Aangezien deze visualisatie een vergelijking over twee variabelen weergeeft, heb ik een two-sided barchart gebruikt.<br><br>
Wederom staat er onder deze twee grafieken een korte uitleg over de grafieken en een beschrijving van opmerkelijke data,
om dezelfde reden als hierboven gegeven is. 
Daarnaast wordt ook informatie gegeven over de vijf conflictlanden.
Hierin wordt kort verteld wat er in dat land aan de hand is, 
en kan wederom doorgeklikt worden naar een relevant en actueel nieuwsbericht,
om de gebruiker nog meer informatie te verschaffen over het onderwerp.

5. Contact + footer<br>
De foto boven contact heb ik zo gekozen, omdat het het einde is van mijn webpagina.
Ik vind het mooi dat de kinderen je als het ware 'uitzwaaien'.<br><br>
Dit deel van de website heb ik gemaakt, zodat mensen mij kunnen bereiken als zij vragen hebben.
Ik ben altijd bereid om toelichting te geven wanneer mensen daarom vragen.<br><br>
Tot slot heb ik een footer gebruikt om mijn bronnen en andere gegevens weer te geven, 
aangezien dit natuurlijk ontzettend belangrijk is!

Algemene opmerkingen over design keuzes:
- De kleuren op de website zijn zo gekozen omdat ik dit in het geheel vond passen. 
Aangezien ik het accent op de visualisaties willde leggen
heb ik de kleuren in de grafieken een heldere en krachtige kleur gegeven (rood en geel), 
terwijl de achtergrond en tekst relatief rustig is (grijs).
- Ik heb bewust gekozen om foto's van Arabisch uitziende vluchtelingen af te wisselen voor Afrikaanse ogende vluchtelingen,
om duidelijk te maken dat uit beide delen van de wereld veel vluchtelingen komen.
Op dit moment worden voornamelijk de Syrische vluchtelingen vaak benoemd,
terwijl er, gezien mijn visualisaties, ook een heel groot deel uit Afrika komt.
- Bij alle getallen heb ik een komma bij elke duizend geplaatst, zodat het makkelijker te lezen is.
