const mapId = 'map';
const initialCoordinates = [39.5694, 2.6502]; //Mallorca palma
const map = L.map(mapId).setView(initialCoordinates, 1);

const MAPBOX_API = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}'

const ATTRIBUTION =
    'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';
// Este token será el que obtengamos en la web de Mapbox
const ACCESS_TOKEN =
    'pk.eyJ1IjoibWFyaWRldiIsImEiOiJjbXZqM3g1enQwYXhnMnpzamVneTBxYXluIn0.9jjky_6WPeNttbhD3SJn-w';

L.tileLayer(MAPBOX_API, {
    attribution: ATTRIBUTION,
    maxZoom: 13,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: ACCESS_TOKEN
}).addTo(map);

// Añadimos el marcador a nuestra posición inicial
L.marker(initialCoordinates).bindPopup("<b>Palma de Mallorca</b><br>Posición inicial del mapa").addTo(map);



//LLAMADA A LA API DE TERREMOTOS
async function getEarthquakeToday() {
    // const EARTHQUAKETODAY_API = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"
    try {
        const response = await fetch("ApiTerremoto.json");
        const res = await response.json();
        const dataCooPosition = res.features;//retorna los terremotos de hoy

        return dataCooPosition
    }
    catch (error) {
        console.error("Error al intentar", error);
        return []
    }
}
//LLAMADA A LA API FILTRADA
async function getEarthquakeFilter(starttime, endtime, minmagnitude) {
    const FilterApi = `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${starttime}&endtime=${endtime}&minmagnitude=${minmagnitude}&limit=300&orderby=magnitude`
    try {
        const response = await fetch(FilterApi);
        const res = await response.json();
        const dataFilter = res.features;//retorna los terremotos de hoy + el faltrado por magnitud

        return dataFilter //devulve el valor, no la variable) async lo envuelve en una promesa
    }
    catch (error) {
        console.error("Error al intentar", error);
        return []

    };

};
//getEarthquakeFilter("2026-01-01", "2026-01-31", 5).then(urlFecha => console.log(urlFecha))

function paintEarthquake(datas, mapa) {
    try {
        datas.forEach(element => {
            const [longitud, latitud] = element.geometry.coordinates;
            const { code, mag, magType, place, time, title } = element.properties;

            const popupContent = `<b>${title}</b><br>
                                ${place}<br>
                                ${new Date(time).toLocaleString()}<br>
                                <b>Code:</b> ${code}<br>
                                <b>Magnitud:</b> ${mag}<br>
                                <b>Tipo de Magnitud:</b> ${magType}`;

            L.marker([latitud, longitud]).bindPopup(popupContent).addTo(mapa);
        });
    }
    catch (error) {
        console.log("error al intentar", error);

    };

};

getEarthquakeToday().then(dataArr => paintEarthquake(dataArr, map));

//...................................... MAPA 2 ..................................................................
const form = document.getElementById("filter-form");
const inputMagnitude = document.getElementById("magnitude")
const outputMagnitud = document.getElementById("outputMagnitud")


const mapId2 = 'map-filtered';
const map2 = L.map(mapId2).setView(initialCoordinates, 1);
const earthquakesGroup = L.layerGroup().addTo(map2);

L.tileLayer(MAPBOX_API, {
    attribution: ATTRIBUTION,
    maxZoom: 13, 
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: ACCESS_TOKEN
}).addTo(map2);

form.addEventListener( "submit", e => {
    e.preventDefault();
    earthquakesGroup.clearLayers();
    const {magnitude, startDate,endDate} = form.elements;
    
    getEarthquakeFilter(startDate.value, endDate.value, magnitude.value).then(dataArr => paintEarthquake(dataArr, earthquakesGroup))
    
});

inputMagnitude.addEventListener( "input", e => {
    outputMagnitud.textContent = inputMagnitude.value
} )

