export default class MatrixHelper {
    matrixService;
    constructor(){
        this.matrixService = new google.maps.DistanceMatrixService();
    }

    getDistanceMatrix(origin, destination) {
        this.matrixService.getDistanceMatrix(
            {
                origins: [ origin ],
                destinations: [destination],
                travelMode: 'DRIVING',
                // transitOptions: TransitOptions,
                // drivingOptions: DrivingOptions,
                // unitSystem: UnitSystem,
                // avoidHighways: Boolean,
                // avoidTolls: Boolean,
            }, this.distanceMatrixCallback
        );
    }
  
  
    distanceMatrixCallback(response, status){
        if(status == 'OK'){
            console.log("distance: ", response.rows[0].elements[0].distance);
            console.log("duration: ", response.rows[0].elements[0].duration);
        }
    }

}