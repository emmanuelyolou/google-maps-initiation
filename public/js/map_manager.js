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
                    this.userLocationMarker.setMap(map)
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