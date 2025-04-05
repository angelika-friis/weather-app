# Weather app

I detta projekt har jag utvecklat en väderapplikation med React. Applikationen hämtar aktuell väderdata från [SMHI:s](https://opendata.smhi.se/metfcst/pmp/introduction) och [yr.no:s](https://api.met.no/weatherapi/sunrise/3.0/documentation) API:er. Geografisk information hämtas från [OpenStreetMap Nominatim](https://nominatim.org/release-docs/develop/api/Lookup/) med API.


## Funktionalitet
Projektet innehåller följande funktioner:

- **Väderprognos:** Visar väderprognos för 10 kommande dagar. Inkluderar min/max temperatur, soluppgång och nedgång, nederbörd och timmöversikt.
- **Sökfunktion:** Möjlighet att söka efter väder i olika städer.
- **Favoritplatser:** Användare kan spara favoritplatser som visas vid nästa besök. Datan sparas i en cookie 🍪.
- **Auto location:** Applikationen visar vädret för användarens aktuella plats automatiskt vid uppstart (med hjälp av HTML5 Geolocation).
- **Respoinsiv:** Applikationen är responsiv och utvecklad för mobil, tablet och desktop.




## Installation och användning
``` bash
# Klona repot
git clone https://github.com/angelika-friis/weather-app.git

# Gå till projektmappen
cd weather-app

# Installera beroenden
npm install

# Starta projektet
npm start
```
## Skärminspelningar från 05-04-2025
![Skärminspelning 2025-04-05 kl  18 04 25](https://github.com/user-attachments/assets/68ea129a-8663-496e-83e1-fd7a6f3b1863)
![Skärminspelning 2025-04-05 kl  18 24 45](https://github.com/user-attachments/assets/340f3221-4946-4a78-b587-b9ac8f03f49f)

## Referenser och material jag har använt i projektet:
Iconer:
- https://github.com/nrkno/yr-weather-symbols
- https://www.npmjs.com/package/react-icons

SMHI Open Data Meteorological Forecasts - PMP:
- https://opendata.smhi.se/metfcst/pmp/introduction
- https://opendata.smhi.se/metfcst/pmp/parameters

Yr.no - Sunrise 3.0:
- https://api.met.no/weatherapi/sunrise/3.0/documentation

OpenStreetMap Nominatim: 
- https://nominatim.org/release-docs/develop/api/Lookup/

Geolocation:
- https://www.w3schools.com/jsref/prop_nav_geolocation.asp
- https://www.w3schools.com/jsref/met_geo_getcurrentposition.asp

Hur man kan göra en search bar i React:
- https://www.youtube.com/watch?v=sWVgMcz8Q44

Fetch:
- https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

Costume hook for determining window size
-https://usehooks.com/usewindowsize

Funktion för att räkna ut vädersträck från grader:
- https://stackoverflow.com/questions/48750528/get-direction-from-degrees

Konvertera en timestamp till rätt format:
- https://stackoverflow.com/questions/847185/convert-a-unix-timestamp-to-time-in-javascript
- https://www.freecodecamp.org/news/javascript-get-current-date-todays-date-in-js/
- https://saimana.com/list-of-country-locale-code/
- https://www.w3schools.com/jsref/jsref_tolocaletimestring.asp
- https://www.w3schools.com/jsref/jsref_tolocaledatestring.asp
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getDay
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat

Jämföra tider:
- https://stackoverflow.com/questions/19004950/how-to-compare-time-in-javascript
