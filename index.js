let map;

function initMap() {
    let mapOptions = {
    center: { lat: 41.881832, lng: -87.623177},
    zoom: 10
    };

    let map = new google.maps.Map(document.getElementById("map"), mapOptions);
    let markerList = [];
    let markerOptionsList = [ 
        {
            position: new google.maps.LatLng(41.881, -87.6),
            map: map
        },
        {
            position: new google.maps.LatLng(41.891800, -87.623171),
            map: map
        },
        {
            position: new google.maps.LatLng(41.901836, -87.623178),
            map: map
        },
    ];

    for (let i = 0; i < markerOptionsList.length; i++) {
        markerList[i] = new google.maps.Marker( markerOptionsList[i] );
    }

    // let marker = new google.maps.Marker(markerOptions);

    // console.log(marker);
}

window.initMap = initMap;