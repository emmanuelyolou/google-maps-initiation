let map;
let infoWindow;

function initMap() {
  let mapOptions = {
    center: { lat: 5.8325039, lng: -5.3648169},
    zoom: 8
  };
  map = new google.maps.Map(document.getElementById("map"), mapOptions);
  infoWindow = new google.maps.InfoWindow({
    maxWidth: 350
  });

  const locationButton = document.createElement("button");
  const locationIcon = document.createElement("span");
  locationButton.classList.add("user-location-btn");
  locationIcon.classList.add("material-icons", "user-location-icon");
  locationIcon.textContent = "my_location";
  locationButton.appendChild(locationIcon);

  map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(locationButton);
  locationButton.addEventListener("click", () => {
      // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          infoWindow.setPosition(pos);
          infoWindow.setContent("Votre position.");
          infoWindow.open(map);
          map.setCenter(pos);
        },
        () => {
          handleLocationError(true, infoWindow, map.getCenter());
        }
      );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  });

  //Fired if user refuses to give us access to his location
  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(
      browserHasGeolocation
        ? "Erreur: Le Service de Géolocatlisation a échoué."
        : "Erreur: Votre navigateur ne supporte pas la géolocalisation."
    );
    infoWindow.open(map);
  }

  
  //Defines then displays multiple markers on the map
  let markerList = [];
  let markerOptionsList = [ 
    {
        position: { lat: 6.6461292, lng: -4.7079362}, //Dimbokro
        map: map,
        title: "Dimbokro"
    },
    {
        position: { lat: 6.9282028, lng: -6.0334362}, //Bonon
        map: map,
        icon: {
          scaledSize: new google.maps.Size(65, 50),
          url: './basketball-g0fea61622_1920-removebg-preview.png'
        },
        title: "Utb express"
    },
    {
        position: { lat: 5.8325039, lng: -5.3648169}, //Divo
        map: map,
        title: "Utb-Divo"
    },
  ];
  for (let i = 0; i < markerOptionsList.length; i++) {
      markerList[i] = new google.maps.Marker( markerOptionsList[i] );

    markerList[i].addListener("click", () => {
      infoWindow.setContent(getContentString(markerList[i].title));
      infoWindow.open({
        anchor: markerList[i],
        map,
        shouldFocus: false,
      });
    });
  }

  // let marker = new google.maps.Marker(markerOptions);

  // console.log(marker);
}

function getContentString(label){
  return  '<div id="content">' +
  '<div id="siteNotice">' +
  "</div>" +
  '<h1 id="firstHeading" class="firstHeading">' + label + '</h1>' +
  '<div id="bodyContent">' +
  "<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large " +
  "rock caves and ancient paintings. Uluru is listed as a World " +
  "Heritage Site.</p>" +
  '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">' +
  "https://en.wikipedia.org/w/index.php?title=Uluru</a> " +
  "(last visited June 22, 2009).</p>" +
  "</div>" +
  "</div>";
} 

window.initMap = initMap;