let map;
let infoWindow;

function initMap() {
    let mapOptions = {
    center: { lat: 41.881832, lng: -87.623177},
    zoom: 10
    };
    let map = new google.maps.Map(document.getElementById("map"), mapOptions);
    infoWindow = new google.maps.InfoWindow();

    const locationButton = document.createElement("button");

    locationButton.textContent = "Pan to Current Location";
    locationButton.classList.add("custom-map-control-button");
  
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
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
              infoWindow.setContent("Location found.");
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
            ? "Error: The Geolocation service failed."
            : "Error: Your browser doesn't support geolocation."
        );
        infoWindow.open(map);
      }

      
    //Defines then displays multiple markers on the map
    let markerList = [];
    let markerOptionsList = [ 
        {
            position: new google.maps.LatLng(41.881, -87.6),
            map: map
        },
        {
            position: new google.maps.LatLng(41.891800, -87.623171),
            map: map
        },
        {
            position: new google.maps.LatLng(41.901836, -87.623178),
            map: map
        },
    ];

    for (let i = 0; i < markerOptionsList.length; i++) {
        markerList[i] = new google.maps.Marker( markerOptionsList[i] );
    }

    // let marker = new google.maps.Marker(markerOptions);

    // console.log(marker);
}

window.initMap = initMap;