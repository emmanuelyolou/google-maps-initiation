export default class MatrixHelper {
    matrixService;
    constructor(){
        this.matrixService = new google.maps.DistanceMatrixService();
    }

    getDistanceMatrix(origin, destination, callback, errorCallbak) {
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
                try {
                    if(status == 'OK' & response.rows[0].elements[0].status == 'OK'){
	                    callback(response.rows[0].elements[0]);
	                }
	                else if (status == 'OK' && response.rows[0].elements[0].status != 'OK'){
	                    throw Error("Pas de résultat disponible.");
	                }
	                else{
	                    throw error('Une erreur inconnue est survenue, veuillez réessayer.')
	                }
                    } catch (error) {
                        errorCallbak(error.message);
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