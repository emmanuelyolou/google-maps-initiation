export class DirectionsHelper{
    directionsService;
    directionsRenderer;
    map;
    constructor(map){
        this.directionsService = new google.maps.DirectionsService();
        this.directionsRenderer = new google.maps.DirectionsRenderer();
        this.directionsRenderer.setOptions({
            polylineOptions: {
              strokeColor: '#7f1f80'
            }
          });
        this.map = map;
    }

    route(origin, destination, errorCallback){
        this.directionsRenderer.setMap(this.map);
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
          (result, status) => {
            try {
	            if(status == 'OK'){
	                this.directionsRenderer.setDirections(result);
	            }
	            else if (status == 'ZERO_RESULTS'){
	                throw Error("Pas de résultat disponible.");
	            }
	            else{
	                throw Error("Une erreur est survenue. Veuillez réessayer.");
	            }
            } catch (error) {
                errorCallback(error.message);
            }
          }
        );
    }
    removeRoute(){
        this.directionsRenderer.setMap(null);
    }
  
}