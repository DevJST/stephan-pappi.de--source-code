var spMap;
google.maps.event.addDomListener(window, 'load', loadSpMap());

var lat_lng;
var sp_latlngbounds;

function loadSpMap() {
    
    var myLatlng = new google.maps.LatLng(48.356793, 12.793780);
    
    lat_lng = new Array();
    lat_lng.push(myLatlng);
 
    var mapOptions = {

      //Zoom on load
      zoom: 15,

      //Map center
      center: myLatlng,
        
      mapTypeControlOptions: {
        
        style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
        
        mapTypeIds: [
          google.maps.MapTypeId.ROADMAP,
          google.maps.MapTypeId.SATELLITE,
          google.maps.MapTypeId.HYBRID,
          google.maps.MapTypeId.TERRAIN
        ]
      }
    };
    
    var mapId = document.getElementById("map-content");
    spMap = new google.maps.Map(mapId,mapOptions);
    
    var newMarker = addSpMarker(); 
    addSpWindow(newMarker);
    
    google.maps.event.trigger(newMarker, "click");
}

function addSpMarker() {
    
    var marker = new google.maps.Marker ({
        
        position: new google.maps.LatLng(48.357404, 12.793996),

        title: "Unsere Firma"
    });
    
    marker.setMap(spMap);
    
    sp_latlngbounds = new google.maps.LatLngBounds();
    sp_latlngbounds.extend(marker.position);
    
    return marker;
}

function addSpWindow(marker) {
 
    var infowindow = new google.maps.InfoWindow({
      
        content: "Unsere Firma"
    });
    
    google.maps.event.addListener(marker, 'click', function() {
    
        infowindow.open(spMap,marker);
    });
}

function addSpVisitorLocation() {
    
 
  // Try HTML5 geolocation
  if(navigator.geolocation) {
      
    navigator.geolocation.getCurrentPosition(function(position) {
        
      var pos = new google.maps.LatLng(position.coords.latitude,
                                       position.coords.longitude);
     
      var marker = new google.maps.Marker ({
        
        map: spMap,
        position: pos,
        content: 'Location found using HTML5.'
      });

      spMap.setCenter(pos);
    
      lat_lng.push(pos);
      sp_latlngbounds.extend(marker.position);
        
      spMap.setCenter(sp_latlngbounds.getCenter());
      spMap.fitBounds(sp_latlngbounds);
        
      drawSpMapRoute();
        
      }, function() {
        
        handleNoGeolocation(true);
      });
  
  } else {
      
      handleNoGeolocation(false);
  }
}

function handleNoGeolocation(errorFlag) {
  
  if (errorFlag) {
      
    var content = 'Error: The Geolocation service failed.';
      
  } else {
      
    var content = 'Error: Your browser doesn\'t support geolocation.';
  }
}

function drawSpMapRoute() {
    
    //Initialize the Path Array
    var path = new google.maps.MVCArray();
 
    //Initialize the Direction Service
    var service = new google.maps.DirectionsService();
 
    //Set the Path Stroke Color
    var poly = new google.maps.Polyline({ map: spMap, strokeColor: '#4986E7' });
 
    //Loop and Draw Path Route between the Points on MAP
    for (var i = 0; i < lat_lng.length; i++) {
        
        if ((i + 1) < lat_lng.length) {
                
            var src = lat_lng[i];
            var des = lat_lng[i + 1];
            
            path.push(src);
            poly.setPath(path);
            
            service.route({
                origin: src,
                destination: des,
                travelMode: google.maps.DirectionsTravelMode.DRIVING
            }, function (result, status) {
                    
                if (status == google.maps.DirectionsStatus.OK) {
                    
                    for (var i = 0, len = result.routes[0].overview_path.length; i < len; i++) {
                        
                        path.push(result.routes[0].overview_path[i]);
                    }
                }
            });
        }
    }
}

$( "#map-section" ).on( "click", ".map-find-us-button", function() {
 
    addSpVisitorLocation();
});