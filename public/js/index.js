import { readTextFile, setAttributes } from "./utils.js";
import MarkerManager from "./marker_manager.js";
import MapManager from "./map_manager.js";
import UserPositionOverlay from './user_position_overlay.js'
import MatrixHelper from "./matrix_helper.js";

let userLocationMarker;
(function initMap() {
  let mapManager = new MapManager();
  let map = mapManager.getMap();
  let infoWindow = mapManager.getInfoWindow();
    
  mapManager.locationButton.addEventListener("click", showCurrentLocation);

  const originLocationInput = document.createElement("select");
  const destinationInput = document.createElement("select");
  //For the display of info about the route
  const routeInfoInput = document.createElement("textarea");

  originLocationInput.classList.add('location-input', 'origin-location')
  destinationInput.classList.add('location-input', 'destination');
  routeInfoInput.classList.add("route-info")
  //Default selected options 
  const originPlaceholder = document.createElement("option");
  const destinationPlaceholder = document.createElement("option");

  //Default text and values for the select tags
  originPlaceholder.innerHTML = "Choisissez un départ";
  destinationPlaceholder.innerHTML = "Choisissez une destination";
  originPlaceholder.setAttribute("value", "0")
  destinationPlaceholder.setAttribute('value', "0");

  originLocationInput.appendChild(originPlaceholder);
  destinationInput.appendChild(destinationPlaceholder);

  mapManager.addControl(originLocationInput, google.maps.ControlPosition.LEFT_TOP);
  mapManager.addControl(destinationInput, google.maps.ControlPosition.LEFT_TOP);
  mapManager.addControl(routeInfoInput, google.maps.ControlPosition.LEFT_TOP);
  
  let markerManager = new MarkerManager(map);
  //Defines then displays multiple markers on the map
  markerManager.agencyList = JSON.parse(readTextFile("./utb_agence.json"));

  markerManager.agencyList.forEach(agency => {
    //Append the agency as an entry in the origin location list
    let originOption = document.createElement("option");
    originOption.innerHTML = agency.name_agence;
    originOption.setAttribute('value', agency.id_agence);
    originLocationInput.appendChild(originOption);

    //Append the agency as an entry in the origin location list
    let destinationOption = document.createElement("option");
    destinationOption.innerHTML = agency.name_agence;
    destinationOption.setAttribute('value', agency.id_agence);
    destinationInput.appendChild(destinationOption);
  });

  let matrixHelper = new MatrixHelper(); 
  [originLocationInput, destinationInput].forEach( inputField => {
    inputField.addEventListener('change', () => {
      let selectedOriginAgency;
      let selectedDestinationAgency;
      
      if(originLocationInput.value != "0" && destinationInput.value != "0" ){
        selectedOriginAgency = 
          markerManager.agencyList.filter(agency => agency.id_agence == originLocationInput.value)[0];
        selectedDestinationAgency = 
          markerManager.agencyList.filter(agency => agency.id_agence == destinationInput.value)[0];
        matrixHelper.getDistanceMatrix(
          { lat: selectedOriginAgency.latitude_agence, lng: selectedOriginAgency.longitude_agence},
          { lat: selectedDestinationAgency.latitude_agence, lng: selectedDestinationAgency.longitude_agence },
          function(response){ 
            routeInfoInput.value = "Distance: " + response.distance.text;
            // routeDistanceInfo.innerHTML +
          }
        );
      }
      else{
        routeInfoInput.value = "";
      }
    });
  });

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

  
  
  // let directionService = new google.maps.DirectionsService();

  // directionService.route({
  //   origin: origin,
  //   destination: destination,
  //   travelMode: 'DRIVING',
  //   // transitOptions: TransitOptions,
  //   // drivingOptions: DrivingOptions,
  //   // unitSystem: UnitSystem,
  //   // waypoints[]: DirectionsWaypoint,
  //   // optimizeWaypoints: Boolean,
  //   // provideRouteAlternatives: Boolean,
  //   // avoidFerries: Boolean,
  //   // avoidHighways: Boolean,
  //   // avoidTolls: Boolean,
  //   // region: String
  // },
  // function handleResponse(resp1, resp2){
  //   // console.log(resp1, resp2);
  // })
})();
