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
    else if (fileName.includes("cat")) description = "A playful cat lounging.";
    else if (fileName.includes("forest")) description = "A dense green forest.";
    else if (fileName.includes("mouse")) description = "A mouse.";
    else if (fileName.includes("spiderman")) description = "Spiderman.";
    else if (fileName.includes("city")) description = "A bustling cityscape.";
    else if (fileName.includes("sunset")) description = "A breathtaking sunset view.";
    else if (fileName.includes("river")) description = "A serene river flowing.";
    else if (fileName.includes("car")) description = "A stylish car on display.";
    else if (fileName.includes("bike")) description = "A cool motorbike in action.";
    else if (fileName.includes("flower")) description = "A close-up of a vibrant flower.";
    else if (fileName.includes("bird")) description = "A colorful bird perched.";
    else if (fileName.includes("bridge")) description = "A majestic bridge crossing.";
    else if (fileName.includes("snow")) description = "A snowy winter landscape.";
    else if (fileName.includes("rain")) description = "A rainy street scene.";
    else if (fileName.includes("desert")) description = "A vast desert landscape.";
    else if (fileName.includes("castle")) description = "An ancient castle towering.";
    else if (fileName.includes("lake")) description = "A calm lake at dawn.";
    else if (fileName.includes("island")) description = "A tropical island paradise.";
    else if (fileName.includes("statue")) description = "A famous statue monument.";
    else if (fileName.includes("fireworks")) description = "Fireworks lighting the sky.";
    else if (fileName.includes("street")) description = "A lively street market.";
    else if (fileName.includes("train")) description = "A fast-moving train.";
    else if (fileName.includes("temple")) description = "A traditional temple structure.";
    else if (fileName.includes("garden")) description = "A peaceful garden view.";
    else if (fileName.includes("fish")) description = "A colorful fish underwater.";
    else if (fileName.includes("food")) description = "A delicious meal served.";
    else if (fileName.includes("skyline")) description = "A city's skyline at dusk.";
    else if (fileName.includes("airplane")) description = "An airplane soaring above.";
    else if (fileName.includes("boat")) description = "A boat sailing the sea.";
    else if (fileName.includes("market")) description = "A busy marketplace scene.";
    else if (fileName.includes("library")) description = "A cozy library room.";
    else if (fileName.includes("museum")) description = "An interior of a museum.";
    else if (fileName.includes("volcano")) description = "A volcano erupting.";
    else if (fileName.includes("canyon")) description = "A deep rocky canyon.";
    else if (fileName.includes("valley")) description = "A green valley between hills.";
    else if (fileName.includes("sunrise")) description = "A peaceful sunrise scene.";
    else if (fileName.includes("orchard")) description = "A blossoming orchard.";
    else if (fileName.includes("festival")) description = "A colorful festival celebration.";
    else if (fileName.includes("temple")) description = "A sacred temple complex.";
    else if (fileName.includes("monument")) description = "A grand historical monument.";
    else if (fileName.includes("giraffe")) description = "A tall giraffe in the wild.";
    else if (fileName.includes("elephant")) description = "A majestic elephant walking.";
    else if (fileName.includes("lion")) description = "A fierce lion roaring.";
    else if (fileName.includes("tiger")) description = "A majestic tiger prowling.";
    else if (fileName.includes("panda")) description = "A cute panda eating bamboo.";
    else if (fileName.includes("koala")) description = "A sleepy koala on a tree.";
    else if (fileName.includes("butterfly")) description = "A delicate butterfly resting.";
    else if (fileName.includes("horse")) description = "A galloping horse.";
    else if (fileName.includes("dolphin")) description = "A playful dolphin leaping.";
    else if (fileName.includes("whale")) description = "A massive whale in the ocean.";
    else if (fileName.includes("shark")) description = "A fierce shark underwater.";
    else if (fileName.includes("crab")) description = "A crab scuttling on the shore.";
    else if (fileName.includes("zebra")) description = "A zebra grazing on the plains.";
    else if (fileName.includes("parrot")) description = "A colorful parrot squawking.";
    else if (fileName.includes("peacock")) description = "A peacock displaying feathers.";
    else if (fileName.includes("cherry")) description = "Cherry blossoms blooming.";
    else if (fileName.includes("rainbow")) description = "A bright rainbow in the sky.";
    else if (fileName.includes("rocket")) description = "A rocket launching.";
    else if (fileName.includes("planet")) description = "A distant planet in space.";
    else if (fileName.includes("moon")) description = "A full moon shining.";
    else if (fileName.includes("stars")) description = "A starry night sky.";
    else if (fileName.includes("space")) description = "Outer space scenery.";
    else if (fileName.includes("aurora")) description = "The northern lights glowing.";
    else if (fileName.includes("cave")) description = "A mysterious cave entrance.";
    else if (fileName.includes("cliff")) description = "A steep rocky cliff.";
    else if (fileName.includes("waterfall")) description = "A powerful waterfall cascade.";
    else if (fileName.includes("trainstation")) description = "A bustling train station.";
    else if (fileName.includes("campfire")) description = "A cozy campfire at night.";
    else if (fileName.includes("hiking")) description = "Hikers on a mountain trail.";
    else if (fileName.includes("surfing")) description = "A surfer riding a wave.";
    else if (fileName.includes("skiing")) description = "Skiers descending snowy slopes.";
    else if (fileName.includes("balloon")) description = "Hot air balloons floating.";
    else if (fileName.includes("farm")) description = "A scenic countryside farm.";
    else if (fileName.includes("village")) description = "A peaceful village setting.";
    else if (fileName.includes("tower")) description = "A tall tower reaching the sky.";
    else if (fileName.includes("harbor")) description = "A harbor with anchored boats.";
    else if (fileName.includes("metro")) description = "A busy metro station.";
    else if (fileName.includes("subway")) description = "A subway train arriving.";
    else if (fileName.includes("restaurant")) description = "A cozy restaurant interior.";
    else if (fileName.includes("cafe")) description = "A small charming cafe.";
    else if (fileName.includes("bakery")) description = "A bakery filled with pastries.";
    else if (fileName.includes("statueofliberty")) description = "The Statue of Liberty.";
    else if (fileName.includes("eiffel")) description = "The Eiffel Tower in Paris.";
    else if (fileName.includes("colosseum")) description = "The Roman Colosseum.";
    else if (fileName.includes("pyramid")) description = "The pyramids of Egypt.";
    else if (fileName.includes("greatwall")) description = "The Great Wall of China.";
    else if (fileName.includes("bigben")) description = "Big Ben in London.";
    else if (fileName.includes("machupicchu")) description = "Machu Picchu ruins.";
    else if (fileName.includes("opera")) description = "Sydney Opera House.";
    else if (fileName.includes("hollywood")) description = "Hollywood sign in Los Angeles.";
    else if (fileName.includes("mountfuji")) description = "Mount Fuji in Japan.";
    else if (fileName.includes("niagarafalls")) description = "Niagara Falls cascading.";
    else if (fileName.includes("amazon")) description = "Amazon rainforest scenery.";
    else if (fileName.includes("grandcanyon")) description = "The Grand Canyon view.";
    else if (fileName.includes("safari")) description = "A thrilling safari ride.";
    else if (fileName.includes("racecar")) description = "A high-speed race car.";
    else if (fileName.includes("yacht")) description = "A luxury yacht cruising.";
    else if (fileName.includes("iceberg")) description = "A giant iceberg floating.";
    else if (fileName.includes("glacier")) description = "A frozen glacier landscape.";
    
    lookupArea.innerHTML = description;
  }, 1000);
}
