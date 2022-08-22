export default class MapManager{
    static map;
    static mapOptions;
    static infoWindow;
    constructor(){
        this.initMap();
    }
    
    initMap = () => {
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
    initInfoWindow = () => {
        if(this.infoWindow === undefined){
            infoWindow = new google.maps.InfoWindow({
                maxWidth: 350
            });
        }
    }
    
    getMap = () => {
        this.initMap();
        return this.map;
    }
    getInfoWindow = () => {
        this.initInfoWindow();
        return this.infoWindow;
    }
    
}