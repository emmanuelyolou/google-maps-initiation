let map;
let infoWindow;
let userLocationMarker;
let markerList = [];
let markerOptionsList = [];
function initMap() {
  let mapOptions = {
    center: { lat: 5.8325039, lng: -5.3648169},
    zoom: 8
  };
  map = new google.maps.Map(document.getElementById("map"), mapOptions);
  infoWindow = new google.maps.InfoWindow({
    maxWidth: 350
  });

  // userLocationMarker = new google.maps.Marker({
  //   icon: {
  //     scaledSize: new google.maps.Size(32, 32),
  //     url: "./images/user.png",
  //   },
  //     optimized: false,
  //     animation: google.maps.Animation.DROP
  //   // label: {
  //   //   text: "e88a", // codepoint from https://fonts.google.com/icons
  //   //   fontFamily: "Material Icons",
  //   //   color: "#ffffff",
  //   //   fontSize: "18px",
  //   // }
  // });

  //Creation of the location button control
  const locationButton = document.createElement("button");
  const locationIcon = document.createElement("span");
  locationButton.classList.add("user-location-btn");
  locationIcon.classList.add("material-icons", "user-location-icon");
  locationIcon.textContent = "my_location";
  locationButton.appendChild(locationIcon);

  map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(locationButton);
  locationButton.addEventListener("click", showCurrentLocation);

  //Defines then displays multiple markers on the map
  markerOptionsList = [ 
    {
        position: { lat: 6.6461292, lng: -4.7079362}, //Dimbokro
        title: "Dimbokro",
    },
    {
        position: { lat: 6.9282028, lng: -6.0334362}, //Bonon
        title: "Utb express",
    },
    {
        position: { lat: 5.8325039, lng: -5.3648169}, //Divo
        title: "Utb-Divo",
    },
  ];
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
    }

    /**
   * onAdd is called when the map's panes are ready and the overlay has been
   * added to the map.
   */
    onAdd() {
      this.div = document.createElement("div");
      this.div.style.borderStyle = "none";
      this.div.style.borderWidth = "0px";
      this.div.style.position = "absolute";

      // Create the img element and attach it to the div.
      const img = document.createElement("img");

      img.src = this.image;
      img.style.width = "100%";
      img.style.height = "100%";
      img.style.position = "absolute";
      this.div.appendChild(img);

      // Add the element to the "overlayLayer" pane.
      const panes = this.getPanes();

      panes.overlayLayer.appendChild(this.div);
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
}


function drop(){
  clearMarkerList();
  //The display of each marker is delayed in relation to the next marker
  for (let i = 0; i < markerOptionsList.length; i++) {
    setTimeout(() => {
      markerList.push(
        new google.maps.Marker({
          position: markerOptionsList[i].position,
          map,
          animation: google.maps.Animation.DROP,
        })
      );
      markerList[i].addListener("click", () => showLocationInfo(markerList[i], markerOptionsList[i]));
    }, i * 300 );
  }
}

function clearMarkerList() {
  for (let i = 0; i < markerList.length; i++) {
    markerList[i].setMap(null);
  }
  markerList = [];
}

function showLocationInfo(marker, markerOptions){
  {
    infoWindow.setContent(getContentString(markerOptions.title));
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