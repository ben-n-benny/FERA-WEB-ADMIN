var lastPoint;

function initMap() {
  // Initialize the map
  //   var map = new google.maps.Map(document.getElementById("map"), {
  //     zoom: 14,
  //     center: { lat: 37.7749, lng: -122.4194 },
  //   });

  //   // Add the two markers to the map
  //   var marker1 = new google.maps.Marker({
  //     position: { lat: 37.7749, lng: -122.4194 },
  //     map: map,
  //     title: "Marker 1",
  //   });

  //   var marker2 = new google.maps.Marker({
  //     position: { lat: 37.788022, lng: -122.399797 },
  //     map: map,
  //     title: "Marker 2",
  //   });

  //   // Create a new instance of the DirectionsService
  //   var directionsService = new google.maps.DirectionsService();

  //   // Create a new instance of the DirectionsRenderer
  //   var directionsRenderer = new google.maps.DirectionsRenderer();

  //   // Set the map and display the route
  //   directionsRenderer.setMap(map);

  //   // Set the origin and destination for the route
  //   var request = {
  //     origin: marker1.getPosition(),
  //     destination: marker2.getPosition(),
  //     travelMode: "DRIVING",
  //   };

  //   // Get the route and display it on the map
  //   directionsService.route(request, function (response, status) {
  //     if (status == "OK") {
  //       directionsRenderer.setDirections(response);
  //     }
  //   });

  var directionsService = new google.maps.DirectionsService();

  // Create a new instance of the DirectionsRenderer

  var nearestFireStation;
  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 14,
    center: {
      lat: 14.622085,
      lng: 121.049639,
    },
  });

  // Set the map and display the route

  // var origin_marker = new google.maps.Marker({
  //   position: {
  //     lat: 13.349617,
  //     lng: 123.732094,
  //   },
  //   map: map,
  //   title: "ME",
  // });

  // Create a new Places service
  var service = new google.maps.places.PlacesService(map);

  // Search for fire stations near the map's center
  var request = {
    location: {
      lat: 14.622085,
      lng: 121.049639,
    },
    radius: "50000",
    type: ["fire_station"],
  };

  service.nearbySearch(request, function (results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      // The first result is the nearest fire station
      //nearestFireStation = results;

      for (nearestFireStation of results) {
        var station = nearestFireStation;

        // console.log(station)
        // Create a new instance of the DirectionsService

        // var fire_station_marker = new google.maps.Marker({
        //   position: {
        //     lat: station.geometry.location.lat(),
        //     lng: station.geometry.location.lng(),
        //   },
        //   map: map,
        //   title: station.name,
        // });
        var request = {
          origin: {
            lat: 14.622085,
            lng: 121.049639,
          },
          destination: {
            lat: station.geometry.location.lat(),
            lng: station.geometry.location.lng(),
          },
          travelMode: "DRIVING",
          provideRouteAlternatives: true,
        };

        // Get the route and display it on the map
        directionsService.route(request, function (response, status) {
          for (response_poly of response.routes) {
            var path = google.maps.geometry.encoding.decodePath(
              response_poly.overview_polyline
            );
            var polyline = new google.maps.Polyline({
              path: path,
              strokeColor: "#FF0000",
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: "#FF0000",
              fillOpacity: 0.35,
              map: map,
              // strokeColor: "#0000FF",
              // strokeOpacity: 1.0,
              // strokeWeight: 2
            });
            polyline.setMap(map);
          }

          console.log(response);
          // if (status == "OK") {
          //   new google.maps.DirectionsRenderer({
          //     map: map,
          //     directions: response,
          //   });

          //   for (var i = 0, len = response.routes.length; i < len; i++) {}
          //   // var directionsRenderer = new google.maps.DirectionsRenderer();
          //   // directionsRenderer.setMap();
          //   // directionsRenderer.setDirections(response);
          // }
        });
      }
    }
  });
}
