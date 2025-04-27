let selectedFile = null;

document.getElementById('browseBtn').addEventListener('click', () => {
  document.getElementById('imageInput').click();
});

document.getElementById('imageInput').addEventListener('change', function(event) {
  selectedFile = event.target.files[0];
  displayImagePreview(selectedFile);
});

document.getElementById('dragArea').addEventListener('dragover', (e) => {
  e.preventDefault();
  document.getElementById('dragArea').classList.add('dragover');
});

document.getElementById('dragArea').addEventListener('dragleave', (e) => {
  e.preventDefault();
  document.getElementById('dragArea').classList.remove('dragover');
});

document.getElementById('dragArea').addEventListener('drop', (e) => {
  e.preventDefault();
  document.getElementById('dragArea').classList.remove('dragover');
  selectedFile = e.dataTransfer.files[0];
  displayImagePreview(selectedFile);
});

function displayImagePreview(file) {
  const reader = new FileReader();

  reader.onload = function(e) {
    const img = new Image();
    img.onload = function() {
      const previewArea = document.getElementById('imagePreviewArea');
      previewArea.innerHTML = ""; 
      previewArea.appendChild(img);
    };
    img.src = e.target.result;
  };
  
  reader.readAsDataURL(file);
}

document.getElementById('submitBtn').addEventListener('click', function() {
  if (!selectedFile) {
    alert("Please select an image first.");
    return;
  }
  handleFile(selectedFile);
});

function handleFile(file) {
  const reader = new FileReader();
  reader.onload = function(e) {
    const img = new Image();
    img.onload = function() {
      EXIF.getData(img, function() {
        const allMetaData = EXIF.getAllTags(this);
        displayMetadata(allMetaData);
        if (allMetaData.GPSLatitude && allMetaData.GPSLongitude) {
          const lat = convertDMSToDD(allMetaData.GPSLatitude, allMetaData.GPSLatitudeRef);
          const lon = convertDMSToDD(allMetaData.GPSLongitude, allMetaData.GPSLongitudeRef);
          initializeMap(lat, lon);
        }
      });
    };
    img.src = e.target.result;

    fakeAILookup(file);
  };
  reader.readAsDataURL(file);
}

function displayMetadata(metadata) {
  let output = "<h3>Metadata:</h3><ul>";
  for (let key in metadata) {
    output += `<li><b>${key}:</b> ${metadata[key]}</li>`;
  }
  output += "</ul>";
  document.getElementById('metadata').innerHTML = output;
}

function convertDMSToDD(dms, ref) {
  const degrees = dms[0];
  const minutes = dms[1];
  const seconds = dms[2];
  let dd = degrees + minutes/60 + seconds/3600;
  if (ref === "S" || ref === "W") {
    dd = dd * -1;
  }
  return dd;
}

function fakeAILookup(file) {
  const lookupArea = document.getElementById('ai-lookup');
  lookupArea.innerHTML = "Generating description...";

  setTimeout(() => {
    const fileName = file.name.toLowerCase();
    let description = "An image of something interesting.";

    if (fileName.includes("taj")) description = "An image of the Taj Mahal, India.";
    else if (fileName.includes("beach")) description = "A beautiful beach scenery.";
    else if (fileName.includes("dog")) description = "A cute dog captured.";
    else if (fileName.includes("mountain")) description = "A stunning mountain landscape.";

    lookupArea.innerHTML = description;
  }, 1000);
}
