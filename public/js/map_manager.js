export default class MapManager{
    map;
    mapOptions;
    infoWindow;
    locationButton;

    constructor(){
        this.initMap();
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
            this.initLocationButton();
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
        this.addControl(locationButton, google.maps.ControlPosition.RIGHT_BOTTOM);
    }

    addControl(control, position){
        this.map.controls[position].push(control);
    }
    
}