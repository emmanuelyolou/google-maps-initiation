export default class MatrixHelper {
    matrixService;
    constructor(){
        this.matrixService = new google.maps.DistanceMatrixService();
    }

    getDistanceMatrix(origin, destination, callback) {
        let result;
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
            }, function(response, status){
                if(status == 'OK'){
                    callback(response.rows[0].elements[0]);
                }
                else if (status == 'ZERO_RESULTS'){
                    //throw error('Pas de résultat)
                    callback(response, status);
                }
                else{
                    //throw error('erreur incoonue')
                }
                
            }
        );
    }
  
  
    distanceMatrixCallback(response, status){
        if(status == 'OK'){
            // console.log("distance: ", response.rows[0].elements[0].distance);
            // console.log("duration: ", response.rows[0].elements[0].duration);
        }
        return response;
    }

}