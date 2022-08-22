
import MapManager from "./map_manager.js";
export default class MarkerManager{
  markerList;
  agencyList;
  
  constructor(map){
      this.markerList = [];
      this.agencyList = [];
  }
     
  drop = (map) => {
    this.clearMarkerList();
    //The display of each marker is delayed in relation to the next marker
    for (let i = 0; i < this.agencyList.length; i++) {
      setTimeout(() => {
        this.markerList.push(
          new google.maps.Marker({
            position: {
              lat: this.agencyList[i].latitude_agence,
              lng: this.agencyList[i].longitude_agence
            },
            map,
            animation: google.maps.Animation.DROP,
          })
        );
          this.markerList[i].setMap(map);
        this.markerList[i].addListener("click", () => this.showLocationInfo(this.markerList[i], this.agencyList[i]));
      }, i * 300 );
    }
  }

  clearMarkerList() {
    for (let i = 0; i < this.markerList.length; i++) {
      this.markerList[i].setMap(null);
    }
    this.markerList = [];
  }

  showLocationInfo(marker, agency){
    {
      infoWindow.setContent(getContentString(agency));
      infoWindow.open({
        anchor: marker,
        map,
        shouldFocus: false,
      });
    }
  }

}