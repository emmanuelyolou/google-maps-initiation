
export default class MapManager{
    map;
    mapOptions;
    infoWindow;
    locationButton;
    userLocationMarker;

    constructor(){
        this.initMap();
        this.initLocationButton();
        let userLocationMarker = null;
    }
    
    initMap () {
        if(this.map === undefined){
            this.mapOptions = {
                center: { lat: 5.8325039, lng: -5.3648169},
                zoom: 8
              };
            this.map = new google.maps.Map(document.getElementById("map"), this.mapOptions);
            
            this.infoWindow = new google.maps.InfoWindow({
                maxWidth: 350
            });
        }
    }
    initInfoWindow ()  {
        if(this.infoWindow === undefined){
            this.infoWindow = new google.maps.InfoWindow({
                maxWidth: 350
            });
        }
    }
    
    getMap ()  {
        this.initMap();
        return this.map;
    }
    getInfoWindow () {
        this.initInfoWindow();
        return this.infoWindow;
    }
  
    showLocationInfo(marker, content){
        this.infoWindow.setContent(content);
        this.infoWindow.open({
            anchor: marker,
            map,
            shouldFocus: false,
        });
    }
    initLocationButton(){
        //Creation of the location button control
        const locationButton = document.createElement("button");
        const locationIcon = document.createElement("span");
        locationButton.classList.add("user-location-btn");
        locationIcon.classList.add("material-icons", "user-location-icon");
        locationIcon.textContent = "my_location";
        locationButton.appendChild(locationIcon);
        this.locationButton = locationButton;
        this.addControl(this.locationButton, google.maps.ControlPosition.RIGHT_BOTTOM);
        this.locationButton.addEventListener("click", () => this.showCurrentLocation());

    }

    addControl(control, position){
        this.map.controls[position].push(control);
    }
    
    showCurrentLocation(){
        // Try HTML5 geolocation.
        // let self = this;
        
        if (navigator.geolocation) {
            
                navigator.geolocation.getCurrentPosition( (position) => {
                    
                    const pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };
            
                    this.userLocationMarker = new UserPositionOverlay(pos, "./images/user.png")
                    this.userLocationMarker.setMap(this.map)
                    this.map.setCenter(pos);
                    },
                    () => {
                        this._handleLocationError(true, this.map.getCenter());
                    }
                );
        } else {
          // Browser doesn't support Geolocation
          this._handleLocationError(false, this.map.getCenter());
        }
    }

      //Fired if user refuses to give us access to his location
    _handleLocationError(browserHasGeolocation, pos) {
        this.infoWindow.setPosition(pos);
        this.infoWindow.setContent(
          browserHasGeolocation
            ? "Erreur: Le Service de Géolocatlisation a échoué."
            : "Erreur: Votre navigateur ne supporte pas la géolocalisation."
        );
        this.infoWindow.open(this.map);
      }
} 

/**
* The custom USGSOverlay object contains the USGS image,
* the bounds of the image, and a reference to the map.
*/
export class UserPositionOverlay extends google.maps.OverlayView {
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
