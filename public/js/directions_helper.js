export class DirectionsHelper{
    directionsService;
    directionsRenderer;
    map;
    constructor(map){
        this.directionsService = new google.maps.DirectionsService();
        this.directionsRenderer = new google.maps.DirectionsRenderer();
        this.map = map;
        this.directionsRenderer.setMap(map);
    }

    route(origin, destination){
        this.directionsService.route({
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
          function(result, status){
            if(status == 'OK'){
                this.directionsRenderer.setDirections(result);
            }
            else{
                throw Error("Une erreur est survenue.");
            }
          }
        );
    }
  
}