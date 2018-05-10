function getValue(Distance,Name) {
    var lat = $('#lat').val();
    var lng = $('#lng').val();
    var obj = {coordinates : {lat: lat*1,lng: lng*1},
        name:'Ваші кординати:' + 'lat: ' +lat + ' lng:' + lng + '<br>' + 'Найблище село:' + Name + '<br>' + 'Відстань:'+ Distance
    };
    return obj ;
}
var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
var markers = [
    {
        coordinates: {lat: 48.53115, lng: 25.03649},
        image:  iconBase + 'parking_lot_maps.png',
        name:'Коломия'
    },
    {
        coordinates: { lat: 48.7377, lng: 24.8611},
        name:'Отинія'
    },
    {
        coordinates: { lat: 48.6727, lng: 25.5016},
        name:'Городенка'
    },
    {
        coordinates: { lat: 48.4469, lng: 25.5694},
        name:'Снятин'
    },
    {
        coordinates: { lat: 48.362340, lng: 24.405498},
        name:'Поляниця'
    },
    {
        coordinates: { lat: 48.2715495414, lng: 24.360388475},
        name:'Ясіня'
    },
    {
        coordinates: { lat: 48.635, lng: 24.569},
        name:'Надвірна'
    },
    {
        coordinates: { lat: 48.5199966431, lng: 24.6244888306},
        name:'Делятин'
    }
];
function initMap() {
    var element = document.getElementById('map');
    var options = {
        zoom:9,
        center : markers[0].coordinates
    };
    var map = new google.maps.Map(element,options);
    function addMarker(proporties) {
        var marker = new google.maps.Marker({
            position: proporties.coordinates,
            map: map,
            animation: google.maps.Animation.BOUNCE
        });
        if(proporties.image){
            marker.setIcon(proporties.image)
        }
        if(proporties.name){
            var InfoWindow = new google.maps.InfoWindow({
                content:'<h2>' + (proporties.name) + '</h2>'
            });
            InfoWindow.open(map,marker);
        }
    }
    function drawLine(firstLat,firstLng,secondLat,secondLng) {
        var flightPlanCoordinates = [
            {lat: firstLat, lng: firstLng},
            {lat: secondLat, lng: secondLng}
        ];
        var flightPath = new google.maps.Polyline({
            path: flightPlanCoordinates,
            strokeColor: '#FF0000',
            strokeOpacity: 1.0,
            strokeWeight: 2
        });
        flightPath.setMap(map);
    }
    for(var i = 0 ; i< markers.length; i++){
        console.log(markers[i]);
        addMarker(markers[i]);
    }
    $('#enter').on('click', function(){
        addMarker(getValue(getMinDistance()[0],getMinDistance()[1]));
    });
    function getMinDistance() {
        var min = Math.sqrt(Math.pow((getValue().coordinates.lat - markers[0].coordinates.lat),2)+Math.pow((getValue().coordinates.lng - markers[0].coordinates.lng),2));
        var name = '';
        var Citi_Nearest_Lat = 0;
        var Citi_Nearest_Lng = 0;
        for(var i = 0 ; i< markers.length; i++){
            if(min > Math.sqrt(Math.pow((getValue().coordinates.lat - markers[i].coordinates.lat),2)+Math.pow((getValue().coordinates.lng - markers[i].coordinates.lng),2))){
                min = Math.sqrt(Math.pow((getValue().coordinates.lat - markers[i].coordinates.lat),2)+Math.pow((getValue().coordinates.lng - markers[i].coordinates.lng),2));
                name = markers[i].name;
                Citi_Nearest_Lat = markers[i].coordinates.lat;
                Citi_Nearest_Lng = markers[i].coordinates.lng;
            }
        }
        drawLine(getValue().coordinates.lat,getValue().coordinates.lng,Citi_Nearest_Lat,Citi_Nearest_Lng);
        return [min,name];
    }
}
google.maps.event.addDomListener(window, 'load', initMap);