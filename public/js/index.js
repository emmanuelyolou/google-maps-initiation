import { readTextFile } from "./utils.js";
import MarkerManager from "./marker_manager.js";
import MapManager from "./map_manager.js";
import UserPositionOverlay from './user_position_overlay.js'

let userLocationMarker;
(function initMap() {
  let mapManager = new MapManager();
  let map = mapManager.getMap();
  let infoWindow = mapManager.getInfoWindow();
  
  const originLocationInput = document.createElement("select");
  const destinationInput = document.createElement("select");
  originLocationInput.classList.add('location-input',)
  destinationInput.classList.add('location-input',);
  destinationInput.setAttribute('placeholder', "Destination");
  originLocationInput.setAttribute('placeholder', "Départ");

  map.controls[google.maps.ControlPosition.LEFT_TOP].push(originLocationInput);
  map.controls[google.maps.ControlPosition.LEFT_TOP].push(destinationInput);
  mapManager.locationButton.addEventListener("click", showCurrentLocation);
  
  let markerManager = new MarkerManager(map);
  //Defines then displays multiple markers on the map
  markerManager.agencyList = JSON.parse(readTextFile("./utb_agence.json"));
  //We wait for a few seconds before showing the markers on the map
  // setTimeout(markerManager.drop(map), 3300);
  markerManager.drop(mapManager);


  function showCurrentLocation(){

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          userLocationMarker = new UserPositionOverlay(pos, "./images/user.png")
          userLocationMarker.setMap(map)
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
  }

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

  
  // SECTION MATRIX DISTANCE

  //The position of the Dimbokro's Agency
  let origin = { lat: 6.6461292, lng: -4.7079362 };
  //Divo agency coordinates
  let destination = { lat: 5.8325039, lng: -5.3648169};

  let matrixService = new google.maps.DistanceMatrixService();
  matrixService.getDistanceMatrix(
    {
      origins: [ origin ],
      destinations: [destination],
      travelMode: 'DRIVING',
      // transitOptions: TransitOptions,
      // drivingOptions: DrivingOptions,
      // unitSystem: UnitSystem,
      // avoidHighways: Boolean,
      // avoidTolls: Boolean,
    }, distanceMatrixCallback);
  
  function distanceMatrixCallback(response1, response2){
    // console.log(response1, response2);
  }

  let directionService = new google.maps.DirectionsService();

  directionService.route({
    origin: origin,
    destination: destination,
    travelMode: 'DRIVING',
    // transitOptions: TransitOptions,
    // drivingOptions: DrivingOptions,
    // unitSystem: UnitSystem,
    // waypoints[]: DirectionsWaypoint,
    // optimizeWaypoints: Boolean,
    // provideRouteAlternatives: Boolean,
    // avoidFerries: Boolean,
    // avoidHighways: Boolean,
    // avoidTolls: Boolean,
    // region: String
  },
  function handleResponse(resp1, resp2){
    // console.log(resp1, resp2);
  })
})();
