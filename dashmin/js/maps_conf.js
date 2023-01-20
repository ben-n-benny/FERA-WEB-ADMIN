var lastPoint;

var color_array = [
  "#e38f05",
  "#e20276",
  "#df04e6",
  "#faff98",
  "#78d9a2",
  "#5c5759",
  "#2b0eb9",
  "#b2abe",
  "#8a980a",
  "#f83597",
  "#4c9f98",
  "#f01883",
  "#9cf25b",
  "#d8a982",
  "#8b72",
  "#254cad",
  "#d7da01",
  "#6823f0",
  "#d2cff4",
  "#17b486",
  "#611513",
  "#7c74a1",
  "#ac07ca",
  "#27d999",
  "#43ebd5",
  "#e1f882",
  "#c4ea42",
  "#7d13fc",
  "#a1944f",
  "#71dbae",
  "#396929",
  "#dc8262",
  "#632c04",
  "#3c2bfe",
  "#4cea2f",
  "#1f5e46",
  "#19948a",
  "#2a86b0",
  "#1cd80c",
  "#b9393c",
  "#dfef16",
  "#3b02f8",
  "#30e1db",
  "#cc3100",
  "#3902fb",
  "#3f3503",
  "#b1f184",
  "#96e1",
  "#b41e0d",
  "#3b6d38",
  "#51be01",
  "#d64406",
  "#2a2e3d",
  "#fa3775",
  "#8097de",
  "#2d86d6",
  "#498019",
  "#96a6a7",
  "#d30e3d",
  "#13e60e",
  "#d275f9",
  "#6f8de8",
  "#dbebff",
  "#887ea5",
  "#2c11d4",
  "#e4fff9",
  "#b23cb8",
  "#d3018",
  "#9c360d",
  "#ee22ca",
  "#b53c62",
  "#1e6c36",
  "#dc3c00",
  "#1c89bb",
  "#691442",
  "#5ab9b0",
  "#e60744",
  "#d7d7b9",
  "#5d1a06",
  "#99d615",
  "#142fd1",
  "#ccf3a7",
  "#4224f4",
  "#1b51b0",
  "#1a495a",
  "#38bc76",
  "#f8e2ec",
  "#50aa5e",
  "#f4b82f",
  "#8b4de1",
  "#dda1d6",
  "#a5a697",
  "#bc50be",
  "#a52e16",
  "#dc488e",
  "#5ef82f",
  "#7be865",
  "#2563cd",
  "#11bb40",
  "#17a64c",
];

function initMap() {

  var directionsService = new google.maps.DirectionsService();
 
  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 14,
    center: {
      lat: 14.622085,
      lng: 121.049639,
    },
  });

  new google.maps.Marker({
    position: {
      lat: 14.622085,
      lng: 121.049639,
    },
    map: map,
    title: "NEED HELP",
    label: "FIRE BURNING"
  });

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

      for (var nearestFireStation of results) {
        var color_index = 0;
        // console.log(station)
        // Create a new instance of the DirectionsService

        new google.maps.Marker({
          position: {
            lat: nearestFireStation.geometry.location.lat(),
            lng: nearestFireStation.geometry.location.lng(),
          },
          map: map,
          title: nearestFireStation.name,
        });
        var request = {
          origin: {
            lat: 14.622085,
            lng: 121.049639,
          },
          destination: {
            lat: nearestFireStation.geometry.location.lat(),
            lng: nearestFireStation.geometry.location.lng(),
          },
          travelMode: "DRIVING",
          provideRouteAlternatives: true,
        };

        // Get the route and display it on the map
        directionsService.route(request, function (response, status) {
          var single_color = color_array[color_index++]
          for (response_poly of response.routes) {
            var path = google.maps.geometry.encoding.decodePath(
              response_poly.overview_polyline
            );
            var polyline = new google.maps.Polyline({
              path: path,
              strokeColor: single_color,
              strokeOpacity: 0.8,
              strokeWeight: 8,
              fillColor: single_color,
              fillOpacity: 0.35,
              map: map,
            });
            polyline.setMap(map);
          }

          console.log(response);
        });
      }
    }
  });
}
