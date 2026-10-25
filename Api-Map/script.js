const mapId = 'map';
const initialCoordinates = [0.0, 0.0];
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


//LLAMADA A LA API DE TERREMOTOS
async function getEarthquakeToday() {
    const EARTHQUAKETODAY_API = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"
    try {
        const response = await fetch(EARTHQUAKETODAY_API);
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

function getMagnitudeClass(mag) {
    /*getMagnitudeClass(null) con mi código tal cual. me saldrá mag-micro,
    porque al comparar null < 2 JavaScript convierte el null en 0, y 0 < 2 es verdad.
    Un terremoto sin dato se pintaría como si fuera micro*/
    if (mag == null) {// == comprueba tambien por undefined
        return "mag-sin-dato"
    }
    else if(mag < 2) {
        return "mag-micro";
    }else if(mag < 4){
        return "mag-menor";
    }else if(mag < 5){
        return "mag-ligero";
    }else if(mag < 6){
        return "mag-moderado";
    }else{
        return "mag-fuerte";
    }
}


const loader = document.getElementById("loader")
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

            L.circleMarker([latitud, longitud], {
                className: getMagnitudeClass(mag)
            }).bindPopup(popupContent).addTo(mapa);
        });
        
    }
    catch (error) {
        console.log("error al intentar", error);

    };

};

getEarthquakeToday().then(dataArr => {paintEarthquake(dataArr, map); loader.classList.add("oculto")});



//...................................... MAPA 2 ..................................................................
const form = document.getElementById("filter-form");
const inputMagnitude = document.getElementById("magnitude");
const outputMagnitud = document.getElementById("outputMagnitud");

const loader2 = document.getElementById("loader2");

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

form.addEventListener("submit", e => {
    e.preventDefault();
    earthquakesGroup.clearLayers();
    const { magnitude, startDate, endDate } = form.elements;

    loader2.classList.remove("oculto")

    getEarthquakeFilter(startDate.value, endDate.value, magnitude.value).then(dataArr => { paintEarthquake(dataArr, earthquakesGroup); loader2.classList.add("oculto")})

});

inputMagnitude.addEventListener("input", e => {
    outputMagnitud.textContent = inputMagnitude.value
})

