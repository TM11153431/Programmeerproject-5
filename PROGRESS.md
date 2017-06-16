# Dag 0 - 6 juni: 
Vandaag ben ik de hele dag bezig geweest met het uitwerken van mijn idee en het maken van het onderzoeksvoorstel.
Dit is te vinden in de README.md

# Dag 1 - 7 juni: 
Aangezien de laatste opdracht van Data Processing voor een deel lijkt op wat ik nu ga maken, 
heb ik de code van die opdracht gekopieerd en de HTML alvast aangepast.
Nu heb ik een goed begin, wat ik ga aanpassen en uitbreiden.
In de laatste opdracht van Data Processing had ik twee databestanden, 
terwijl de data in het bestand niet anders was, alleen een ander format.
Voor het Programmeerproject wil ik graag dat ik wel maar één bestand gebruik, 
dus moet ik het dataformat via Javascript aanpassen.
Daar ben ik vandaag de hele dag mee bezig geweest, aangezien ik dit nog heel lastig vind.
Volgens mij is het redelijk gelukt!
Morgen ga ik testen of de grafiekjes inderdaad werken op het dataformat dat ik nu gemaakt heb.

# Dag 2 - 8 juni: 
Helaas werkte het data format dat ik gister had gemaakt toch nog niet zoals het moest,
dus heb ik er eerst voor gezorgd dat het werkte.
Dat is eindelijk gelukt!!
Ik heb nu dus één databestand voor origine en één voor asylum,
waarmee ik visualisatie 1 en 2 maak.
De twee datasets heb ik vandaag definitief gemaakt.
Vervolgens heb ik ervoor gezorgd dat de link goed werkt tussen visualisatie 1 en 2.
Dit is ook helemaal gelukt. :)
Het updaten van de kleuren van de map had nog nooit gewerkt, 
en dat heb ik vandaag ook werkend gemaakt.
Daarna heb ik de barchart die ik in week 3 heb gemaakt gekopieerd en in mijn code geplakt.
Om dit werkend te krijgen moesten er wat dingen veranderd worden en nu kan je de visualisatie zien.
Deze visualisatie is nog met de oude data en de assen kloppen nog niet, maar er staat alvast iets.
Tot slot heb ik mijn code een beetje opgeschoond, 
want er stond ondertussen heel veel troep tussen.
Nu is het voor mezelf weer duidelijk wat wat is.

# Dag 3 - 9 juni:
Tijdens de presentatie heb ik zeer nuttige feedback gekregen.
Ik kan kijken of ik een zoomfunctie kan implementeren, 
zodat je kan inzoomen op verschillende delen van de wereld.
Daarnaast kan ik een link toevoegen tussen visualisatie 3 en 4, 
zodat je ook op de barchart kan klikken zodat visualisatie 4 verandert.
Tot slot moet ik gaan nadenken over het storytelling aspect van mijn project.
Bij de presentatie van Sebastiaan zag ik dat hij een icoontje had bij de titel van zijn project, 
bovenin, waar je tussen je verschillende sites kan klikken.
Dit heet een favicon en Sebastiaan heeft me verteld hoe dat geïmplementeerd moet worden.
Dat is gelukt. :)

# Zondag 11 juni:
Vandaag heb ik mijn code verder opgeschoond en stukken code in functies gezet.
In elk geval heb ik alle stukken code die herhaaldelijk worden gebruikt in functies gezet,
maar ook stukken die bij elkaar horen, om de 'main' code overzichtelijk te maken.
Ik vind het nog lastig om te weten wat goede dingen zijn om in verschillende functies te zetten,
en hoe ver je hiermee moet gaan.
Dit ga ik morgen aan de assistenten vragen.
Verder heb ik de tooltip geïmplementeerd voor de tijdlijn.
Deze werkt nog niet heel goed, aangezien je heel precies over de stipjes moet gaan om de informatie te zien.
Hier moet ik dus nog verder naar kijken.
Tot slot heb ik een slider gemaakt voor mijn wereldkaart.
Nu is het mogelijk om de wereldkaart te bekijken in verschillende jaren.

# Dag 4 - 12 juni:
Visualisatie 1 en 2 zijn tot op zekere hoogte klaar, 
dus ben ik vandaag aan de slag gegaan met visualisatie 3: de barchart.
Deze werkte nog op de oude data, die ik met Data Processing had gebruikt.
Vandaag heb ik veel tijd gestopt in het maken van een correct json file, 
die ik kan gebruiken voor visualisatie 3 en 4.
De data heb ik ingeladen en gebruikt voor visualisatie 3.
De barchart werkt nu voor de nieuwe data.
Vervolgens ben ik aan de slag gegaan met het linken van de wereldkaart en de barchart,
dat is ook redelijk gelukt!
De titel en de assen veranderen op dit moment goed mee wanneer je op één van de 5 conflictlanden klikt.
Het enige wat nog moet veranderen zijn de bars zelf.
Daar ga ik morgen mee verder.

# Dag 5 - 13 juni:
Het is gelukt om de barchart goed de laten meeveranderen, 
wanneer op één van de 5 conflictlanden wordt geklikt!
Gister bevatte de barchart ook het land waar de vluchtelingen vandaan komen.
Alle andere landen in de barchart telden dus op tot deze bar.
Dat vond ik raar, en daarom heb ik ervoor gekozen om deze bar weg te halen,
en het aantal vluchtelingen in totaal uit dat land als comment naast de grafiek te zetten.
Daarnaast heb ik een opzetje gemaakt voor de tooltip van de barchart.
Verder ben ik begonnen aan de two-sided barchart.
Er staat al een groot deel! De opzet is er in elk geval.
Het werkt op dit moment alleen voor de data die als eerst wordt ingeladen,
ik moet hem dus nog updaten wanneer een nieuw land wordt geklikt.
Morgen wil ik dit doen: de link maken tussen de barchart en de two-sided barchart.
Daarnaast klopt de omlijning nog niet helemaal, een deel van de two-sided barchart valt buiten een vak,
waardoor een stukje niet te zien is.
Ook mist de as nog bij de chart: female, male en age.
Er moet dus zeker nog veel aan gebeuren, maar het begin is er.

# Dag 6 - 14 juni:
Vandaag heb ik een as gemaakt voor de two-sided barchart, waarop staat welk geslacht het is en welke leeftijdsgroepen.
Vervolgens heb ik de barchart gelinkt aan de two-sided barchart.
Het is gelukt om de two-sided barchart te updaten als je op één van de bars klikt!
De bars gaan goed mee, de percentages veranderen en de titels ook.
Helaas staat de bar nog niet helemaal in het midden, en valt er nog steeds een deel weg.
Ook staan de assen en de percentages niet helemaal op een logische plek.
Ik heb ervoor gekozen om de two-sided barchart te verwijderen als er op een land geklikt wordt waar geen data van is.
Er wordt dan in de titel weergegeven dat er geen data beschikbaar is.
Dit heb ik gedaan, zodat het duidelijk is voor de gebruiker.
Op dit moment verandert de kleur van de barchart als je erover heen gaat de muis.
Ik wil graag dat de kleur verandert in een 'mooie' kleur als de data voor de two-sided barchart beschikbaar is,
en dat de kleur verandert in grijs als de data voor de two-sided barchart niet beschikbaar is.
Dit moet ik nog implementeren.
Wel heb ik er vandaag voor gezorgd dat de tooltip van de barchart de goede waarden weergeeft.

# Dag 7 - 15 juni:
Vandaag heb ik ervoor gezorgd dat de knoppen voor absolute values en percentage of inhabitants werken!
Daarvoor heb ik eerst nieuwe data opgezocht, van de totale populatie van elk land.
Vervolgens moest ik ervoor zorgen dat de kaart en de tijdlijn telkens de goede dataset weergeeft.
Ook bij de slider moest deze nieuwe dataset geïmplementeerd worden.
Helaas is nog steeds het verschil tussen Syrië en de rest van de landen heel erg groot.
Ik moet er dus nog goed over nadenken hoe ik de kleuren in de wereldkaart weergeef.
Nu had ik bedacht om misschien een maximum waarde in te stellen, waardoor de kleuren in de rest van de wereld goed zichtbaar zijn,
en de landen die boven deze maximum waarde zitten zwart te maken.
Op deze manier top je de data als het ware en kan je wel de verschillen tussen de landen laten zien,
en de landen met echt hoge waarden worden als één gezien.
Tot slot heb ik vandaag een beetje geëxperimenteerd met een website template, om mijn website er mooi uit te laten zien.
Dit is nog niet helemaal zoals ik het wil, dus hier moet ik nog naar kijken.

# Dag 8 - 16 juni:
Tijdens de presentaties vonden mensen vooral dat de two-sided barchart een vertekend beeld geeft,
hier moet ik dus wat aan doen!
Een optie is om een verdeling te maken tussen jongeren en ouderen.
Wellicht kan ik ervoor zorgen dat, als je een two-sided barchart hebt van jongeren en ouderen,
je kan klikken op jongeren en dat er dan ingezoomd wordt en je toch ook deze verdeling kan zien.
Dit kan ik doen als ik uiteindelijk tijd over heb. :)
Na de presentaties heb ik een mooi template gevonden om mijn website mee te maken,
aangezien ik erg onder de indruk was van de lay out van de anderen!
Mijn website ziet er nu echt super mooi uit, al zeg ik het zelf.
Vervolgens heb ik, voor het storytelling aspect, 
een grafiek gemaakt van de ontwikkeling van vluchtelingen over de tijd in de hele wereld.
Dit was even lastig, omdat ik de getallen van alle landen bij elkaar moest optellen, 
maar dat is gelukkig gelukt!
Mijn website is nu opgedeeld in vier delen: Story, World Overview, Conflict Areas en Contact.
