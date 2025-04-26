let map;

function showMap(lat, lng) {
  if (!map) {
    map = L.map('map').setView([lat, lng], 15);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);
  } else {
    map.setView([lat, lng], 15);
  }

  L.marker([lat, lng]).addTo(map)
    .bindPopup('📍 Image Location')
    .openPopup();
}
