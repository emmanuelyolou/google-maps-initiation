
import MapManager from "./map_manager.js";
export default class MarkerManager{
  markerList;
  agencyList;
  
  constructor(map){
      this.markerList = [];
      this.agencyList = [];
  }
     
  drop = (mapManager) => {
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
            map: mapManager.getMap(),
            animation: google.maps.Animation.DROP,
            icon: {
              url: './images/working.png',
              scaledSize: new google.maps.Size(40, 40)
            }
          })
        );
        this.markerList[i].addListener("click", () => {
          mapManager.showLocationInfo( this.markerList[i], this.getContentString( this.agencyList[i] ))
        });
      }, i * 300 );
    }
  }

  clearMarkerList() {
    for (let i = 0; i < this.markerList.length; i++) {
      this.markerList[i].setMap(null);
    }
    this.markerList = [];
  }

  getContentString = (agency) => {
    return  '<div id="content">' +
    '<div id="siteNotice">' +
    "</div>" +
    '<h1 id="firstHeading" class="firstHeading">' + agency.name_agence + '</h1>' +
    '<div id="bodyContent">' +
    "<p>" + agency.adres_agence + "</p>" +
    "</div>" +
    "</div>";
  }


}