let mapInitialized = false;
let map;

function initializeMap(lat, lon) {
  if (!mapInitialized) {
    map = L.map('map').setView([lat, lon], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data © OpenStreetMap contributors'
    }).addTo(map);
    L.marker([lat, lon]).addTo(map);
    mapInitialized = true;
  } else {
    map.setView([lat, lon], 13);
    L.marker([lat, lon]).addTo(map);
  }
}
