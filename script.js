const API_URL = 'https://opendata.paris.fr/api/records/1.0/search/?dataset=velib-disponibilite-en-temps-reel&q=&rows=5&facet=station_state&facet=kioskstate&facet=creditcard&facet=overflowactivation&facet=nbbike&timezone=UTC';

const showVelibStation = (element, name, mechanicals, ebikes) => {
    element.innerHTML += `
        <div>
            <h2>Station : ${name}</h2>
            <p>${mechanicals} vélos classiques</p>
            <p>${ebikes} vélos électriques</p>
        </div>
    `;
};

const fetchVelibStations = async () => {
    const response = await fetch(API_URL);
    const data = await response.json();

    const stationsElement = document.getElementById('stations');
    stationsElement.innerHTML = ''; // Réinitialiser l'affichage

    data.records.forEach(record => {
        const { name, mechanical, ebike } = record.fields;
        showVelibStation(stationsElement, name, mechanical, ebike);
    });
};

fetchVelibStations(); // Appel initial
setInterval(fetchVelibStations, 60000); // Actualisation toutes les minutes
