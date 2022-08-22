import { readTextFile } from "./utils.js";

let map;
let infoWindow;
let userLocationMarker;
let markerList = [];
let agencyList = [];
(function initMap() {
  let mapOptions = {
    center: { lat: 5.8325039, lng: -5.3648169},
    zoom: 8
  };
  map = new google.maps.Map(document.getElementById("map"), mapOptions);
  infoWindow = new google.maps.InfoWindow({
    maxWidth: 350
  });
  //Creation of the location button control
  const locationButton = document.createElement("button");
  const locationIcon = document.createElement("span");
  locationButton.classList.add("user-location-btn");
  locationIcon.classList.add("material-icons", "user-location-icon");
  locationIcon.textContent = "my_location";
  locationButton.appendChild(locationIcon);

  const originLocationInput = document.createElement("select");
  const destinationInput = document.createElement("select");
  originLocationInput.classList.add('location-input',)
  destinationInput.classList.add('location-input',);
  destinationInput.setAttribute('placeholder', "Destination");
  originLocationInput.setAttribute('placeholder', "Départ");

  map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(locationButton);
  map.controls[google.maps.ControlPosition.LEFT_TOP].push(originLocationInput);
  map.controls[google.maps.ControlPosition.LEFT_TOP].push(destinationInput);
  locationButton.addEventListener("click", showCurrentLocation);
  
  //Defines then displays multiple markers on the map
  agencyList = JSON.parse(readTextFile("./utb_agence.json"));
  //We wait for a few seconds before showing the markers on the map
  setTimeout(drop, 3300);


  /**
 * The custom USGSOverlay object contains the USGS image,
 * the bounds of the image, and a reference to the map.
 */
  class UserPositionOverlay extends google.maps.OverlayView {
    pos;
    image;
    div;
    constructor(pos, image) {
      super();
      this.pos = pos;
      this.image = image;
      this.div = null;
    }

    /**
   * onAdd is called when the map's panes are ready and the overlay has been
   * added to the map.
   */
    onAdd() {
      this.div = document.createElement("div");
      this.div.classList.add("user-position-marker");
      this.div.style.position = "absolute";
      
      // Create the img element and attach it to the div.
      const img = document.createElement("img");

      img.src = this.image;

      //Create a wrapper for the image to display the animation
      let userMarkerImgWrapper = document.createElement('div');
      userMarkerImgWrapper.classList.add('user-position-img-wrapper');
      userMarkerImgWrapper.appendChild(img);
      this.div.appendChild(userMarkerImgWrapper);

      // Add the element to the "overlayLayer" pane.
      const panes = this.getPanes();
      panes.overlayLayer.appendChild(this.div);
    }

    draw() {
      const overlayProjection = this.getProjection();
      const position = overlayProjection.fromLatLngToDivPixel( this.pos );
      this.div.style.left = position.x + "px";
      this.div.style.top = position.y + "px";
    }

    /**
   * The onRemove() method will be called automatically from the API if
   * we ever set the overlay's map property to 'null'.
   */
    onRemove() {
      if (this.div) {
        this.div.parentNode.removeChild(this.div);
        delete this.div;
      }
    }
    /**
   *  Set the visibility to 'hidden' or 'visible'.
   */
    hide() {
      if (this.div) {
        this.div.style.visibility = "hidden";
      }
    }
    show() {
      if (this.div) {
        this.div.style.visibility = "visible";
      }
    }
    toggle() {
      if (this.div) {
        if (this.div.style.visibility === "hidden") {
          this.show();
        } else {
          this.hide();
        }
      }
    }
    toggleDOM(map) {
      if (this.getMap()) {
        this.setMap(null);
      } else {
        this.setMap(map);
      }
    }
  }
  
  function drop(){
    clearMarkerList();
    //The display of each marker is delayed in relation to the next marker
    for (let i = 0; i < agencyList.length; i++) {
      setTimeout(() => {
        markerList.push(
          new google.maps.Marker({
            position: {
              lat: agencyList[i].latitude_agence,
              lng: agencyList[i].longitude_agence
            },
            map,
            animation: google.maps.Animation.DROP,
          })
        );
        markerList[i].addListener("click", () => showLocationInfo(markerList[i], agencyList[i]));
      }, i * 300 );
    }
  }

  function clearMarkerList() {
    for (let i = 0; i < markerList.length; i++) {
      markerList[i].setMap(null);
    }
    markerList = [];
  }

  function showLocationInfo(marker, agency){
    {
      infoWindow.setContent(getContentString(agency));
      infoWindow.open({
        anchor: marker,
        map,
        shouldFocus: false,
      });
    }
  }

  function showCurrentLocation(){

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          // infoWindow.setPosition(pos);
          // infoWindow.setContent("Votre position.");
          // infoWindow.open(map);

          // userLocationMarker.setPosition(pos);
          // userLocationMarker.setMap(map);
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

    
  function getContentString(agency){
    return  '<div id="content">' +
    '<div id="siteNotice">' +
    "</div>" +
    '<h1 id="firstHeading" class="firstHeading">' + agency.name_agence + '</h1>' +
    '<div id="bodyContent">' +
    "<p>" + agency.adres_agence + "</p>" +
    "</div>" +
    "</div>";
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
    console.log(response1, response2);
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
