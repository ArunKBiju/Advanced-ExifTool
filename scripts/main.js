document.getElementById('imageInput').addEventListener('change', function (e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (event) {
    const img = new Image();
    img.src = event.target.result;

    img.onload = function () {
      document.getElementById('previewContainer').innerHTML = '';
      document.getElementById('previewContainer').appendChild(img);

      EXIF.getData(img, function () {
        const allMeta = EXIF.getAllTags(this);
        displayMetadata(allMeta);

        if (allMeta.GPSLatitude && allMeta.GPSLongitude) {
          const lat = convertGPS(allMeta.GPSLatitude, allMeta.GPSLatitudeRef);
          const lng = convertGPS(allMeta.GPSLongitude, allMeta.GPSLongitudeRef);
          showMap(lat, lng);
        }

        // Dummy AI lookup
        document.getElementById('aiResult').innerText = fakeAILookup(img);
      });
    };
  };
  reader.readAsDataURL(file);
});

function displayMetadata(data) {
  const container = document.getElementById('metadataContainer');
  container.innerHTML = '<h3>📋 Metadata</h3><pre>' + JSON.stringify(data, null, 2) + '</pre>';
}

function convertGPS(coord, ref) {
  const decimal = coord[0] + coord[1] / 60 + coord[2] / 3600;
  return (ref === 'S' || ref === 'W') ? -decimal : decimal;
}

function fakeAILookup(img) {
  // This can be replaced with a real ML API later
  const phrases = [
    "This looks like a famous monument.",
    "Possibly clicked at a tourist location.",
    "This may be a popular structure or historical site.",
    "Could be an architectural landmark."
  ];
  return phrases[Math.floor(Math.random() * phrases.length)];
}
